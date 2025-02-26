<?php
/**
 * Contact Form Processor
 * Handles contact form submission and sends emails to the Eswatini Judiciary
 */

// Start session for CSRF protection
session_start();

// Set headers for JSON response
header('Content-Type: application/json');

// Function to generate a CSRF token
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Function to validate CSRF token
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to verify reCAPTCHA
function verifyRecaptcha($recaptchaResponse) {
    $recaptchaSecret = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your actual secret key
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $result = json_decode($result, true);
    
    return isset($result['success']) && $result['success'] === true;
}

// Initialize response array
$response = [
    'success' => false,
    'message' => 'An error occurred while processing your request.'
];

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check CSRF token
    if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
        $response['message'] = 'Security validation failed. Please try again.';
        echo json_encode($response);
        exit;
    }
    
    // Verify reCAPTCHA
    if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        $response['message'] = 'Please complete the reCAPTCHA verification.';
        echo json_encode($response);
        exit;
    }
    
    if (!verifyRecaptcha($_POST['g-recaptcha-response'])) {
        $response['message'] = 'reCAPTCHA verification failed. Please try again.';
        echo json_encode($response);
        exit;
    }
    
    // Validate required fields
    $requiredFields = ['name', 'email', 'department', 'subject', 'message'];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            $response['message'] = 'Please fill in all required fields.';
            echo json_encode($response);
            exit;
        }
    }
    
    // Sanitize and collect form data
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : 'Not provided';
    $department = sanitizeInput($_POST['department']);
    $subject = sanitizeInput($_POST['subject']);
    $message = sanitizeInput($_POST['message']);
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }
    
    // Determine recipient email based on department
    $to = 'info@judiciary.org.sz'; // Default recipient
    
    // You can add department-specific email addresses here
    $departmentEmails = [
        'High Court' => 'highcourt@judiciary.org.sz',
        'Supreme Court' => 'supremecourt@judiciary.org.sz',
        'Magistrate Court' => 'magistratecourt@judiciary.org.sz',
        'Master of the High Court' => 'master@judiciary.org.sz',
        'Judicial Service Commission' => 'jsc@judiciary.org.sz'
    ];
    
    // If department has a specific email, use it
    if (isset($departmentEmails[$department])) {
        $to = $departmentEmails[$department];
    }
    
    // Set up email headers
    $headers = "From: $name <website@judiciary.org.sz>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Build email content
    $emailContent = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .header {
                background-color: #1e293b;
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 10px 20px;
                border-radius: 0 0 5px 5px;
                font-size: 12px;
                color: #777;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                text-align: left;
                padding: 8px;
                border-bottom: 1px solid #ddd;
                width: 30%;
            }
            td {
                padding: 8px;
                border-bottom: 1px solid #ddd;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <p>A new contact form submission has been received from the Eswatini Judiciary website.</p>
                
                <table>
                    <tr>
                        <th>Name:</th>
                        <td>$name</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>$email</td>
                    </tr>
                    <tr>
                        <th>Phone:</th>
                        <td>$phone</td>
                    </tr>
                    <tr>
                        <th>Department:</th>
                        <td>$department</td>
                    </tr>
                    <tr>
                        <th>Subject:</th>
                        <td>$subject</td>
                    </tr>
                </table>
                
                <h3>Message:</h3>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>This email was sent from the contact form on the Eswatini Judiciary website.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    $mailSent = mail($to, "Website Contact: $subject", $emailContent, $headers);
    
    // Send confirmation email to user
    $confirmationSubject = "Thank you for contacting the Eswatini Judiciary";
    $confirmationMessage = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .header {
                background-color: #1e293b;
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 10px 20px;
                border-radius: 0 0 5px 5px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Contacting Us</h2>
            </div>
            <div class='content'>
                <p>Dear $name,</p>
                
                <p>Thank you for contacting the Eswatini Judiciary. We have received your message regarding:</p>
                
                <p><strong>$subject</strong></p>
                
                <p>Our team will review your inquiry and respond to you as soon as possible. Please note that our standard response time is within 48 hours on business days.</p>
                
                <p>If your matter is urgent, please call us directly at +268 2404 2968.</p>
                
                <p>Best regards,<br>
                Eswatini Judiciary</p>
            </div>
            <div class='footer'>
                <p>This is an automated response. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $confirmationHeaders = "From: Eswatini Judiciary <info@judiciary.org.sz>\r\n";
    $confirmationHeaders .= "MIME-Version: 1.0\r\n";
    $confirmationHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $confirmationSent = mail($email, $confirmationSubject, $confirmationMessage, $confirmationHeaders);
    
    // Log contact in database if needed
    // This section can be expanded to store messages in a database
    
    // Check if emails were sent successfully
    if ($mailSent) {
        // Update response for success
        $response['success'] = true;
        $response['message'] = 'Your message has been sent successfully. We will contact you soon.';
        
        // Generate a new CSRF token for the next submission
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    } else {
        $response['message'] = 'There was a problem sending your message. Please try again later.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

// Return JSON response
echo json_encode($response);