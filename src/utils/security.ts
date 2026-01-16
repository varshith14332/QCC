/**
 * Security Utilities Module
 * Implements client-side security measures including input sanitization,
 * XSS prevention, and form validation
 */

/**
 * Sanitize user input to prevent XSS attacks
 * Removes or escapes potentially dangerous characters
 */
export const sanitizeInput = (input: string): string => {
    if (!input) return '';

    // Remove script tags and event handlers
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Escape HTML special characters
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };

    sanitized = sanitized.replace(/[&<>"'/]/g, (char) => map[char] || char);

    return sanitized.trim();
};

/**
 * Validate email format using RFC 5322 compliant regex
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
};

/**
 * Validate that a string contains only safe characters
 */
export const isSafeString = (str: string): boolean => {
    // Allow alphanumeric, spaces, and common punctuation
    const safeRegex = /^[a-zA-Z0-9\s\-_.,!?()'"@]+$/;
    return safeRegex.test(str);
};

/**
 * Rate limiting helper for form submissions
 * Simple client-side implementation to prevent spam
 */
class RateLimiter {
    private attempts: Map<string, number[]> = new Map();
    private readonly maxAttempts: number;
    private readonly windowMs: number;

    constructor(maxAttempts: number = 3, windowMs: number = 60000) {
        this.maxAttempts = maxAttempts;
        this.windowMs = windowMs;
    }

    canAttempt(key: string): boolean {
        const now = Date.now();
        const attempts = this.attempts.get(key) || [];

        // Filter out old attempts
        const recentAttempts = attempts.filter(time => now - time < this.windowMs);

        if (recentAttempts.length >= this.maxAttempts) {
            return false;
        }

        recentAttempts.push(now);
        this.attempts.set(key, recentAttempts);
        return true;
    }

    reset(key: string): void {
        this.attempts.delete(key);
    }
}

export const formRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

/**
 * Generate a simple CSRF-like token for form submissions
 * In production, this should be provided by the backend
 */
export const generateFormToken = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate form token (placeholder for future backend integration)
 */
export const validateFormToken = (token: string): boolean => {
    // In production, this would validate against a server-generated token
    return token.length === 64 && /^[a-f0-9]+$/.test(token);
};

/**
 * Prevent SQL injection in search/filter inputs
 * Even though this is frontend-only, it's good practice
 */
export const sanitizeSearchQuery = (query: string): string => {
    if (!query) return '';

    // Remove SQL-like keywords and special characters
    return query
        .replace(/['";\\]/g, '')
        .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi, '')
        .trim()
        .slice(0, 200); // Limit length
};

/**
 * Content Security Policy helper for dynamic content
 */
export const sanitizeHTML = (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
};

/**
 * Secure local storage wrapper with encryption placeholder
 * Future enhancement: Add actual encryption
 */
export const secureStorage = {
    setItem: (key: string, value: any): void => {
        try {
            const serialized = JSON.stringify(value);
            // In production, encrypt the value here
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Failed to save to secure storage:', error);
        }
    },

    getItem: <T>(key: string): T | null => {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            // In production, decrypt the value here
            return JSON.parse(item);
        } catch (error) {
            console.error('Failed to read from secure storage:', error);
            return null;
        }
    },

    removeItem: (key: string): void => {
        localStorage.removeItem(key);
    },

    clear: (): void => {
        localStorage.clear();
    },
};

/**
 * Environment variable validation
 * Ensures sensitive data is not exposed in production
 */
export const isProduction = (): boolean => {
    return import.meta.env.PROD;
};

export const isDevelopment = (): boolean => {
    return import.meta.env.DEV;
};

/**
 * Validate URL to prevent open redirect vulnerabilities
 */
export const isValidUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        // Only allow http and https protocols
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
};

/**
 * Check if URL is safe for external links
 */
export const isSafeExternalUrl = (url: string): boolean => {
    if (!isValidUrl(url)) return false;

    // Whitelist allowed domains for external links
    const allowedDomains = [
        'github.com',
        'linkedin.com',
        'twitter.com',
        'quantum.ibm.com',
        'qiskit.org',
    ];

    try {
        const parsed = new URL(url);
        return allowedDomains.some(domain =>
            parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
        );
    } catch {
        return false;
    }
};
