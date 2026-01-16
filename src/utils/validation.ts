/**
 * Form Validation Utilities
 * Implements comprehensive validation with security in mind
 */

import { sanitizeInput, isValidEmail } from './security';
import type { JoinClubFormData, ContactFormData, ValidationResult } from '../types';

/**
 * Validate Join Club form
 */
export const validateJoinClubForm = (data: JoinClubFormData): ValidationResult => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name || data.name.trim().length === 0) {
        errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
        errors.name = 'Name must not exceed 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(data.name)) {
        errors.name = 'Name contains invalid characters';
    }

    // Email validation
    if (!data.email || data.email.trim().length === 0) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Department validation
    if (!data.department || data.department.trim().length === 0) {
        errors.department = 'Department is required';
    } else if (data.department.trim().length > 100) {
        errors.department = 'Department name is too long';
    }

    // Year validation
    if (!data.year || data.year.trim().length === 0) {
        errors.year = 'Year is required';
    }

    // Skills validation (optional but must be reasonable length)
    if (data.skills && data.skills.length > 500) {
        errors.skills = 'Skills description is too long (max 500 characters)';
    }

    // Motivation validation
    if (!data.motivation || data.motivation.trim().length === 0) {
        errors.motivation = 'Please tell us why you want to join';
    } else if (data.motivation.trim().length < 10) {
        errors.motivation = 'Please provide a more detailed reason (at least 10 characters)';
    } else if (data.motivation.length > 1000) {
        errors.motivation = 'Motivation is too long (max 1000 characters)';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate Contact form
 */
export const validateContactForm = (data: ContactFormData): ValidationResult => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name || data.name.trim().length === 0) {
        errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    } else if (data.name.length > 100) {
        errors.name = 'Name must not exceed 100 characters';
    }

    // Email validation
    if (!data.email || data.email.trim().length === 0) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!data.subject || data.subject.trim().length === 0) {
        errors.subject = 'Subject is required';
    } else if (data.subject.length > 200) {
        errors.subject = 'Subject is too long (max 200 characters)';
    }

    // Message validation
    if (!data.message || data.message.trim().length === 0) {
        errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    } else if (data.message.length > 2000) {
        errors.message = 'Message is too long (max 2000 characters)';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Sanitize form data before submission
 */
export const sanitizeJoinClubForm = (data: JoinClubFormData): JoinClubFormData => {
    return {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email).toLowerCase(),
        department: sanitizeInput(data.department),
        year: sanitizeInput(data.year),
        skills: sanitizeInput(data.skills),
        motivation: sanitizeInput(data.motivation),
    };
};

/**
 * Sanitize contact form data before submission
 */
export const sanitizeContactForm = (data: ContactFormData): ContactFormData => {
    return {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email).toLowerCase(),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
    };
};
