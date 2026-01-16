# Quantum Computing Club Website - Security Documentation

## Overview

This document outlines the security measures implemented in the Quantum Computing Club website to protect user data and prevent common web vulnerabilities.

## Implemented Security Features

### 1. Input Sanitization & XSS Prevention

**Location**: `src/utils/security.ts`

- **XSS Protection**: All user inputs are sanitized using the `sanitizeInput()` function
  - Removes `<script>` tags
  - Escapes HTML special characters (&, <, >, ", ', /)
  - Applied on form submission (not on every keystroke to maintain UX)

- **Usage Example**:
  ```typescript
  const sanitizedData = sanitizeInput(userInput);
  ```

### 2. Form Validation

**Location**: `src/utils/validation.ts`

- **Email Validation**: RFC 5322 compliant regex
- **Input Length Limits**: Prevents buffer overflow attacks
  - Names: 2-100 characters
  - Messages: 10-2000 characters
  - Skills: max 500 characters
  - Motivation: 10-1000 characters
- **Character Whitelisting**: Only allows safe characters in certain fields

### 3. Rate Limiting

**Location**: `src/utils/security.ts` - `RateLimiter` class

- **Client-side rate limiting** to prevent form spam
- Default: 3 attempts per 60 seconds
- Implemented on:
  - Join Club form
  - Contact form
- Automatically resets after successful submission

**Usage**:
```typescript
if (!formRateLimiter.canAttempt('form-key')) {
  // Show error
  return;
}
```

### 4. CSRF Token Generation

**Location**: `src/utils/security.ts`

- Generates cryptographically random tokens using `crypto.getRandomValues()`
- 64-character hexadecimal tokens
- Ready for backend validation
- Tokens included in all form submissions

**Usage**:
```typescript
const token = generateFormToken();
// Include in API request
```

### 5. Secure Storage Wrapper

**Location**: `src/utils/security.ts` - `secureStorage` object

- Wrapper around localStorage with encryption placeholder
- JSON serialization/deserialization
- Error handling for storage failures
- Ready for encryption implementation in production

**Usage**:
```typescript
secureStorage.setItem('key', data);
const data = secureStorage.getItem<Type>('key');
```

### 6. URL Validation

**Location**: `src/utils/security.ts`

- **URL Validation**: `isValidUrl()` - Only allows http/https protocols
- **External URL Whitelist**: `isSafeExternalUrl()`
  - Whitelisted domains: github.com, linkedin.com, twitter.com, quantum.ibm.com, qiskit.org
  - Prevents open redirect vulnerabilities
  - Applied to all social media links

### 7. SQL Injection Prevention

**Location**: `src/utils/security.ts` - `sanitizeSearchQuery()`

- Removes SQL keywords (SELECT, INSERT, UPDATE, DELETE, etc.)
- Removes dangerous characters (', ", ;, \)
- Limits query length to 200 characters
- Applied to search/filter inputs

### 8. Content Security

- **HTML Sanitization**: `sanitizeHTML()` for dynamic content
- **No inline scripts**: All JavaScript in separate files
- **Environment validation**: `isProduction()` and `isDevelopment()` helpers

## Security Best Practices Followed

### Frontend Security

1. **No Sensitive Data in Frontend**
   - No API keys or secrets in code
   - Environment variables properly configured
   - Placeholder values for demo purposes

2. **HTTPS Only** (Production)
   - Configure deployment for HTTPS
   - Set secure cookie flags when adding authentication

3. **Input Validation**
   - All forms validated before submission
   - Client-side AND server-side validation (ready for backend)
   - Clear error messages without exposing system details

4. **External Resource Safety**
   - Google Fonts loaded over HTTPS
   - All external links use `rel="noopener noreferrer"`
   - URL validation for all external links

### Data Privacy

1. **Minimal Data Collection**
   - Only collect necessary information
   - Clear privacy notices on forms
   - User consent for newsletter subscription

2. **Transparent Data Usage**
   - Privacy policy notice on forms
   - Clear communication about data usage

## Backend Integration Requirements

When integrating with a backend, implement these additional security measures:

### 1. Server-Side Validation
```typescript
// All client-side validation must be duplicated on server
- Email format validation
- Input length checks
- Character whitelisting
- CSRF token validation
```

### 2. Authentication & Authorization
```typescript
// Placeholder routes ready for:
- JWT or session-based authentication
- Role-based access control (admin, member, guest)
- Password hashing with bcrypt
- Rate limiting on API endpoints
```

### 3. Database Security
```typescript
// Use prepared statements
- Parameterized queries
- ORM with SQL injection protection
- Database connection string in environment variables
```

### 4. HTTPS Configuration
```typescript
// Force HTTPS in production
- SSL/TLS certificates
- HSTS headers
- Secure cookie flags
```

### 5. API Security
```typescript
- CORS configuration
- API rate limiting
- Request size limits
- Authentication tokens
```

## Environment Variables

**Create `.env` file** (not included in repo):
```env
VITE_API_URL=https://api.quantumclub.edu
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
# Add other environment-specific variables
```

## Security Headers (For Backend/Server)

Recommended security headers to implement:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

## Security Checklist for Production

- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Implement server-side validation
- [ ] Set up authentication system
- [ ] Add CAPTCHA to public forms
- [ ] Enable API rate limiting
- [ ] Set up logging and monitoring
- [ ] Regular dependency updates
- [ ] Security audit of code
- [ ] Penetration testing

## Reporting Security Issues

If you discover a security vulnerability, please email: security@quantumclub.edu

**Do not** open public issues for security vulnerabilities.

## Dependencies Security

Regular security audits using:
```bash
npm audit
npm audit fix
```

Keep all dependencies up to date.

## Future Enhancements

1. **Add reCAPTCHA** to forms
2. **Implement Content Security Policy** headers
3. **Add security headers** via middleware
4. **Encryption** for secureStorage
5. **2FA** for admin accounts
6. **Session management** for authenticated users
7. **Audit logging** for sensitive operations
8. **Automated security scanning** in CI/CD pipeline

---

**Last Updated**: January 2026  
**Security Contact**: security@quantumclub.edu
