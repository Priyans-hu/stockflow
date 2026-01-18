# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email the maintainer or use GitHub's private vulnerability reporting
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Measures

StockFlow implements the following security measures:

### Authentication
- JWT-based authentication with configurable expiration
- Password hashing using bcryptjs with salt rounds
- Role-based access control (Admin, Manager, Staff)

### API Security
- Input validation on all endpoints using express-validator
- MongoDB injection prevention via Mongoose
- CORS configuration for allowed origins
- Request body size limits

### Data Protection
- Passwords never returned in API responses
- Sensitive config via environment variables
- No credentials stored in version control

## Best Practices for Deployment

- Use HTTPS in production
- Set strong JWT_SECRET (min 32 characters)
- Configure proper CORS origins
- Enable rate limiting
- Regular dependency updates
- Set NODE_ENV=production
