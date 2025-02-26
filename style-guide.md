# Eswatini Judiciary Website Style Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Iconography](#iconography)
5. [UI Components](#ui-components)
6. [Responsive Behavior](#responsive-behavior)
7. [Animation Guidelines](#animation-guidelines)
8. [Accessibility Standards](#accessibility-standards)
9. [Implementation Notes](#implementation-notes)

## Introduction

This style guide defines the visual language and design system for the redesigned Eswatini Judiciary website. The design emphasizes professionalism, trust, and accessibility while incorporating modern gradient dark themes for a sophisticated digital experience.

## Color Palette

### Primary Colors
- **Primary Dark (`#121823`)**: Used for the main background color.
- **Primary Medium (`#1e293b`)**: Used for cards, header backgrounds, and secondary elements.
- **Primary Light (`#334155`)**: Used for hover states and tertiary elements.

### Accent Colors
- **Accent Blue (`#3b82f6`)**: Primary accent color for headings and important UI elements.
- **Accent Blue Light (`#60a5fa`)**: Used for hover states and secondary accents.
- **Accent Teal (`#0ea5e9`)**: Used in gradients and to provide visual variety.

### Text Colors
- **Text Light (`#f8fafc`)**: Primary text color on dark backgrounds.
- **Text Muted (`#94a3b8`)**: Secondary text color for less important information.
- **Text Dark (`#0f172a`)**: Used for text on light backgrounds (rare).

### Gradients
- **Gradient Dark**: `linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-medium) 100%)`
- **Gradient Accent**: `linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-teal) 100%)`
- **Gradient Card**: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)`

## Typography

### Font Family
- **Primary Font**: 'Poppins', sans-serif
  - Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### Font Sizes
- **Headings**:
  - H1: 48px (Hero titles)
  - H2: 32px (Section headings)
  - H3: 28px (Card headings)
  - H4: 20px (Subheadings)
  - H5: 18px (Card titles)
  - H6: 16px (Small titles)

- **Body Text**:
  - Regular: 16px
  - Small: 14px
  - Extra Small: 12px

### Line Heights
- Headings: 1.3
- Body text: 1.6

## Iconography

The website uses Font Awesome 6 icons for consistency and flexibility.

### Icon Usage Guidelines
- Use icons to enhance understanding, not to replace text
- Keep icon styles consistent across the site
- Icon colors should match the text they accompany
- Special icons (like service icons) use the accent gradient background

### Common Icons
- Navigation: `fa-chevron-down`
- Contact: `fa-envelope`, `fa-phone-alt`, `fa-map-marker-alt`
- Social: `fa-facebook`, `fa-twitter`, `fa-instagram`
- Services: `fa-gavel`, `fa-balance-scale`, `fa-file-contract`
- Controls: `fa-arrow-left`, `fa-arrow-right`

## UI Components

### Buttons
- **Primary Button**: Gradient background, white text, 8px border radius, subtle drop shadow
- **Outline Button**: Transparent background, accent color border and text

### Cards
- Subtle gradient background
- 8px border radius
- Light drop shadow
- Padding: 30px (standard), 20px (compact)
- Interactive cards have hover effects (slight elevation and brightness change)

### Navigation
- **Main Navigation**: Horizontal layout with dropdowns on desktop
- **Mobile Navigation**: Slide-in sidebar
- **Active state**: Underline accent indicator

### Form Elements
- Input fields have dark backgrounds with 1px lighter border
- Focus states include accent color border
- Form labels are positioned above inputs
- Error states use a subtle red accent

## Responsive Behavior

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: > 1024px

### Layout Adjustments
- **Header**: Collapses to hamburger menu on tablet and mobile
- **Grid Layouts**: Reduce columns progressively as viewport narrows
- **Card Sections**: Switch from grid to single column on mobile
- **Sliders**: Maintain horizontal scrolling but show fewer items on smaller screens

## Animation Guidelines

Animations are subtle and purposeful, enhancing the user experience without being distracting.

### Transition Properties
- Standard transition: `all 0.3s ease`
- Apply to: hover states, focus states, and interactive elements

### Animation Types
- **Hover Effects**: Slight elevation (3-5px) with increased shadow
- **Page Transitions**: Fade in elements as they enter viewport
- **Menu Animations**: Smooth slide transitions for dropdowns and mobile menu
- **Sliders**: Smooth transitions between slides

## Accessibility Standards

The design adheres to WCAG 2.1 AA standards:

- **Color Contrast**: Text meets minimum contrast requirements (4.5:1 for normal text, 3:1 for large text)
- **Keyboard Navigation**: All interactive elements are accessible via keyboard
- **Focus States**: Visible focus indicators for all interactive elements
- **Text Resize**: Layout accommodates 200% text size without loss of content
- **Alternative Text**: All informational images have appropriate alt text

## Implementation Notes

### CSS Organization
- CSS uses custom properties (variables) for consistent theming
- The CSS is organized by component with global styles at the top
- Media queries are included with their relevant components

### JavaScript Functionality
- JavaScript handles the following key functions:
  - Mobile menu toggle
  - Dropdown menu behavior
  - Sliders/carousels
  - News item display
  - Scroll effects
  - Smooth scrolling for anchor links

### Database Integration
- SQLite is used for backend data storage
- PHP handles data retrieval and processing
- Key database tables include:
  - News
  - Court cases
  - Judges
  - Events
  - Documents
  - Users (for admin purposes)