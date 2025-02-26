<?php
/**
 * Database Connection Class
 * Handles SQLite database connection and queries for the Eswatini Judiciary website
 */
class Database {
    private $db;
    private static $instance;

    /**
     * Private constructor to prevent direct instantiation
     */
    private function __construct() {
        try {
            // Create or open SQLite database file
            $this->db = new SQLite3('judiciary_database.sqlite');
            
            // Enable foreign key constraints
            $this->db->exec('PRAGMA foreign_keys = ON;');
            
            // Create necessary tables if they don't exist
            $this->createTables();
        } catch (Exception $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }

    /**
     * Get singleton instance
     * @return Database
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Create database tables if they don't exist
     */
    private function createTables() {
        // News table
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS news (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                image TEXT,
                published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_featured INTEGER DEFAULT 0
            )
        ');
        
        // Court cases table
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS court_cases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_number TEXT NOT NULL,
                title TEXT NOT NULL,
                court_type TEXT NOT NULL,
                judge TEXT,
                filing_date DATETIME,
                status TEXT,
                next_hearing_date DATETIME,
                description TEXT
            )
        ');
        
        // Judges table
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS judges (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                title TEXT NOT NULL,
                court TEXT NOT NULL,
                bio TEXT,
                image TEXT,
                appointment_date DATETIME
            )
        ');
        
        // Court calendar/events table
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                event_date DATETIME NOT NULL,
                location TEXT,
                event_type TEXT,
                is_public INTEGER DEFAULT 1
            )
        ');
        
        // Documents/publications table
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                file_path TEXT NOT NULL,
                category TEXT,
                publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_public INTEGER DEFAULT 1
            )
        ');
        
        // Users table for admin access
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                email TEXT NOT NULL,
                role TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME
            )
        ');
    }

    /**
     * Execute a query with parameters
     * @param string $query SQL query
     * @param array $params Query parameters
     * @return SQLite3Result|bool Query result or false on failure
     */
    public function query($query, $params = []) {
        try {
            $stmt = $this->db->prepare($query);
            
            if (!$stmt) {
                return false;
            }
            
            // Bind parameters if any
            foreach ($params as $param => $value) {
                $stmt->bindValue($param, $value);
            }
            
            return $stmt->execute();
        } catch (Exception $e) {
            error_log('Database query error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Fetch a single row
     * @param string $query SQL query
     * @param array $params Query parameters
     * @return array|bool Row as associative array or false on failure
     */
    public function fetchOne($query, $params = []) {
        $result = $this->query($query, $params);
        
        if ($result) {
            return $result->fetchArray(SQLITE3_ASSOC);
        }
        
        return false;
    }

    /**
     * Fetch all rows
     * @param string $query SQL query
     * @param array $params Query parameters
     * @return array Array of rows
     */
    public function fetchAll($query, $params = []) {
        $result = $this->query($query, $params);
        $rows = [];
        
        if ($result) {
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $rows[] = $row;
            }
        }
        
        return $rows;
    }

    /**
     * Insert data into a table
     * @param string $table Table name
     * @param array $data Associative array of column => value
     * @return int|bool Last insert ID or false on failure
     */
    public function insert($table, $data) {
        $columns = array_keys($data);
        $placeholders = array_map(function($col) {
            return ':' . $col;
        }, $columns);
        
        $query = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        $params = [];
        foreach ($data as $column => $value) {
            $params[':' . $column] = $value;
        }
        
        $result = $this->query($query, $params);
        
        if ($result) {
            return $this->db->lastInsertRowID();
        }
        
        return false;
    }

    /**
     * Update data in a table
     * @param string $table Table name
     * @param array $data Associative array of column => value
     * @param string $where Where clause
     * @param array $whereParams Where clause parameters
     * @return bool True on success, false on failure
     */
    public function update($table, $data, $where, $whereParams = []) {
        $sets = array_map(function($col) {
            return $col . ' = :' . $col;
        }, array_keys($data));
        
        $query = sprintf(
            'UPDATE %s SET %s WHERE %s',
            $table,
            implode(', ', $sets),
            $where
        );
        
        $params = [];
        foreach ($data as $column => $value) {
            $params[':' . $column] = $value;
        }
        
        // Merge where parameters
        $params = array_merge($params, $whereParams);
        
        $result = $this->query($query, $params);
        
        return ($result !== false);
    }

    /**
     * Delete data from a table
     * @param string $table Table name
     * @param string $where Where clause
     * @param array $params Where clause parameters
     * @return bool True on success, false on failure
     */
    public function delete($table, $where, $params = []) {
        $query = sprintf('DELETE FROM %s WHERE %s', $table, $where);
        $result = $this->query($query, $params);
        
        return ($result !== false);
    }

    /**
     * Close database connection
     */
    public function close() {
        if ($this->db) {
            $this->db->close();
        }
    }

    /**
     * Get latest news items
     * @param int $limit Number of items to retrieve
     * @param bool $featuredOnly Only retrieve featured news
     * @return array News items
     */
    public function getLatestNews($limit = 5, $featuredOnly = false) {
        $query = 'SELECT * FROM news';
        
        if ($featuredOnly) {
            $query .= ' WHERE is_featured = 1';
        }
        
        $query .= ' ORDER BY published_date DESC LIMIT :limit';
        
        return $this->fetchAll($query, [':limit' => $limit]);
    }

    /**
     * Get upcoming court events
     * @param int $limit Number of events to retrieve
     * @return array Court events
     */
    public function getUpcomingEvents($limit = 5) {
        $query = 'SELECT * FROM events 
                 WHERE event_date >= date("now") 
                 AND is_public = 1
                 ORDER BY event_date ASC
                 LIMIT :limit';
                 
        return $this->fetchAll($query, [':limit' => $limit]);
    }

    /**
     * Get recent court cases
     * @param int $limit Number of cases to retrieve
     * @return array Court cases
     */
    public function getRecentCases($limit = 10) {
        $query = 'SELECT * FROM court_cases
                 ORDER BY filing_date DESC
                 LIMIT :limit';
                 
        return $this->fetchAll($query, [':limit' => $limit]);
    }

    /**
     * Get document by category
     * @param string $category Document category
     * @param int $limit Number of documents to retrieve
     * @return array Documents
     */
    public function getDocumentsByCategory($category, $limit = 10) {
        $query = 'SELECT * FROM documents
                 WHERE category = :category
                 AND is_public = 1
                 ORDER BY publication_date DESC
                 LIMIT :limit';
                 
        return $this->fetchAll($query, [
            ':category' => $category,
            ':limit' => $limit
        ]);
    }

    /**
     * Search across multiple tables
     * @param string $term Search term
     * @return array Search results
     */
    public function search($term) {
        $results = [];
        $searchTerm = '%' . $term . '%';
        
        // Search news
        $newsQuery = 'SELECT id, title, content, "news" AS type FROM news
                     WHERE title LIKE :term OR content LIKE :term
                     LIMIT 10';
        $results['news'] = $this->fetchAll($newsQuery, [':term' => $searchTerm]);
        
        // Search cases
        $casesQuery = 'SELECT id, case_number, title, "case" AS type FROM court_cases
                      WHERE title LIKE :term OR case_number LIKE :term OR description LIKE :term
                      LIMIT 10';
        $results['cases'] = $this->fetchAll($casesQuery, [':term' => $searchTerm]);
        
        // Search documents
        $docsQuery = 'SELECT id, title, description, "document" AS type FROM documents
                     WHERE title LIKE :term OR description LIKE :term
                     AND is_public = 1
                     LIMIT 10';
        $results['documents'] = $this->fetchAll($docsQuery, [':term' => $searchTerm]);
        
        return $results;
    }
}