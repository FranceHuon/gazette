# 📰 Gazette - RSS News Aggregator

A modern, full-stack RSS news aggregator built with TypeScript, featuring user authentication, media subscriptions, and content curation.

## 🚀 Features

- **📱 Modern UI**: Responsive design with Chakra UI and Next.js
- **🔐 Authentication**: JWT-based user authentication with secure cookie handling
- **📰 RSS Aggregation**: Automatic fetching and parsing of RSS feeds from multiple sources
- **⭐ Content Curation**: Like/unlike articles and manage personal library
- **📋 Subscription Management**: Subscribe/unsubscribe to media sources
- **🌍 Internationalization**: Multi-language support with i18next
- **🐳 Docker Ready**: Complete containerization for easy deployment
- **📊 Lighthouse CI**: Automated accessibility and performance audits
- **🔄 Real-time Sync**: Automatic RSS feed synchronization

## 🏗️ Architecture

This is a **monorepo** built with modern TypeScript technologies:

### Backend (`apps/backend/`)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with MikroORM
- **Authentication**: JWT with cookie-based sessions
- **RSS Processing**: Custom RSS parser with XML parsing
- **Scheduling**: Automated RSS feed synchronization

### Frontend (`apps/frontend/`)
- **Framework**: Next.js 14 with App Router
- **UI Library**: Chakra UI with custom theme
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Shared (`packages/shared/`)
- **DTOs**: Type-safe data transfer objects
- **Interfaces**: Shared TypeScript interfaces
- **Enums**: Common enumerations

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Package Manager**: pnpm (workspace)
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions with Lighthouse CI
- **Code Quality**: ESLint, TypeScript

## 📋 Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (recommended package manager)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (if running locally)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/adatechschool/gazette
cd gazette
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Build shared packages

```bash
cd packages/shared
pnpm build
cd ../..
```

### 4. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gazette_db
DB_PORT=5432

# Application Ports
FRONTEND_PORT=3002
BACKEND_PORT=3000

# Environment
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3002,http://frontend:3002
```

### 5. Start with Docker (Recommended)

```bash
# Start all services
docker compose up --build -d

# Check services status
docker compose ps

# View logs
docker compose logs -f
```

### 6. Apply database migrations

```bash
# Inside the backend container
docker compose exec backend pnpm migration:up
```

### 7. Access the application

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3000
- **Database Admin**: http://localhost:8080 (Adminer)

## 🏃‍♂️ Development

### Available Scripts

```bash
# Root level
pnpm dev                    # Start all services in development mode
pnpm docker:up             # Start Docker services
pnpm docker:down           # Stop Docker services
pnpm docker:build          # Build Docker images
pnpm docker:logs           # View Docker logs
pnpm lint                  # Run ESLint
pnpm lint:fix              # Fix ESLint issues

# Backend (from apps/backend/)
pnpm dev                   # Start in watch mode
pnpm build                 # Build for production
pnpm migration:create      # Create new migration
pnpm migration:up          # Apply migrations
pnpm migration:down        # Rollback migrations
pnpm schema:fresh          # Reset database schema

# Frontend (from apps/frontend/)
pnpm dev                   # Start development server
pnpm build                 # Build for production
pnpm start                 # Start production server
```

### Database Management

```bash
# Create a new migration
docker compose exec backend pnpm migration:create

# Apply pending migrations
docker compose exec backend pnpm migration:up

# Rollback last migration
docker compose exec backend pnpm migration:down

# Reset database (⚠️ Destructive)
docker compose exec backend pnpm schema:fresh
```

### RSS Feed Sources

The application currently supports these RSS sources:
- **Bondy Blog**: News and investigation blog
- **Arrêt sur Images**: Media analysis
- **Blast**: Investigation media

To add new sources, modify `apps/backend/src/config/rss-sources.ts`.

## 🏗️ Project Structure

```
gazette/
├── apps/
│   ├── backend/                 # NestJS API
│   │   ├── src/
│   │   │   ├── entities/        # Database entities
│   │   │   ├── modules/         # Feature modules
│   │   │   ├── migrations/      # Database migrations
│   │   │   └── config/          # Configuration files
│   │   └── Dockerfile
│   └── frontend/                # Next.js application
│       ├── src/
│       │   ├── app/             # App Router pages
│       │   ├── components/      # React components
│       │   ├── contexts/        # React contexts
│       │   ├── hooks/           # Custom hooks
│       │   ├── services/        # API services
│       │   └── theme/           # Chakra UI theme
│       └── Dockerfile
├── packages/
│   └── shared/                  # Shared TypeScript code
│       └── src/
│           ├── dtos/            # Data transfer objects
│           ├── interfaces/      # TypeScript interfaces
│           └── enums/           # Enumerations
├── .github/
│   └── workflows/               # GitHub Actions CI/CD
├── docker-compose.yml           # Docker services
└── lighthouserc.js             # Lighthouse CI configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `DB_NAME` | Database name | `gazette_db` |
| `DB_PORT` | Database port | `5432` |
| `FRONTEND_PORT` | Frontend port | `3002` |
| `BACKEND_PORT` | Backend port | `3000` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRATION` | JWT expiration time | `7d` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3002` |

### Docker Configuration

The application uses multi-stage Docker builds for optimized production images:

- **Builder stage**: Installs dependencies and builds applications
- **Runtime stage**: Minimal image with only necessary files

## 🧪 Testing

```bash
# Run backend tests
docker compose exec backend pnpm test

# Run frontend tests
cd apps/frontend && pnpm test
```

## 📊 CI/CD

The project includes GitHub Actions workflows for:

- **Automated Testing**: Run tests on every push
- **Lighthouse CI**: Performance and accessibility audits
- **Docker Builds**: Automated container builds
- **Database Migrations**: Automated schema updates

## 🚀 Deployment

### Production Deployment

1. **Build production images**:
   ```bash
   docker compose -f docker-compose.prod.yml build
   ```

2. **Set production environment variables**:
   ```bash
   export NODE_ENV=production
   export JWT_SECRET=your-production-secret
   ```

3. **Start production services**:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

### Environment-Specific Configurations

- **Development**: Hot reload, debug logging, development database
- **Production**: Optimized builds, production database, security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/adatechschool/gazette/issues)
- **Documentation**: Check the code comments and this README
- **Team**: Contact the development team for urgent matters

## 🔄 Changelog

### Latest Updates
- ✅ Lighthouse CI integration for accessibility audits
- ✅ Improved error handling with toast notifications
- ✅ Enhanced Docker multi-stage builds
- ✅ Automated RSS feed synchronization
- ✅ User authentication and subscription management

---

**Built with ❤️ by the Gazette Team**
