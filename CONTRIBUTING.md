# Contributing to StockFlow

Thank you for considering contributing to StockFlow!

## How to Contribute

### Fork and Clone

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/StockFlow.git`
3. Create a feature branch: `git checkout -b feat/your-feature`

### Development Setup

```bash
# Backend setup
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Make Changes

1. Follow the code style guidelines below
2. Test your changes locally
3. Commit with descriptive messages
4. Push and open a Pull Request

## Reporting Issues

- Check if the issue already exists
- Describe the issue clearly with steps to reproduce
- Include environment details (OS, Node version, browser)
- Add screenshots if applicable

## Code Style

### Backend (Node.js/Express)
- Use ES6+ features (async/await, destructuring)
- Add input validation for endpoints
- Include proper error handling
- Follow existing file structure

### Frontend (React)
- Use functional components with hooks
- Use the API service layer for API calls
- Handle loading and error states
- Follow TailwindCSS conventions

### Commit Messages
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Adding tests

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Happy coding!
