# 📰 Gazette - RSS News Aggregator

A modern, full-stack RSS news aggregator built with TypeScript, featuring user authentication, media subscriptions, and content curation.

## 🚀 Features

- **📱 Modern UI**: Responsive design with Chakra UI and Next.js 15
- **🔐 Authentication**: JWT-based user authentication with secure cookie handling
- **📰 RSS Aggregation**: Automatic fetching and parsing of RSS feeds from multiple sources
- **⭐ Content Curation**: Like/unlike articles and manage personal library
- **📋 Subscription Management**: Subscribe/unsubscribe to media sources
- **🌍 Internationalization**: Multi-language support with i18next
- **🐳 Backend Containerization**: Docker support for backend services
- **📊 Lighthouse CI**: Automated accessibility and performance audits
- **🔄 Real-time Sync**: Automatic RSS feed synchronization (daily cron job)
- **🛡️ Type Safety**: Full TypeScript coverage with shared DTOs
- **🎨 Code Quality**: ESLint with @antfu/eslint-config and Husky pre-commit hooks

## 🏗️ Architecture

This is a **monorepo** built with modern TypeScript technologies:

### Backend (`apps/backend/`)

- **Framework**: NestJS 11 with TypeScript
- **Database**: PostgreSQL 15 with MikroORM 6
- **Authentication**: JWT with cookie-based sessions and bcryptjs
- **RSS Processing**: Custom RSS parser with fast-xml-parser
- **Scheduling**: Automated RSS feed synchronization with @nestjs/schedule (daily cron)
- **Logging**: Structured logging with Pino and nestjs-pino
- **API Documentation**: Swagger/OpenAPI integration
- **Validation**: Class-validator and class-transformer

### Frontend (`apps/frontend/`)

- **Framework**: Next.js 15 with App Router
- **UI Library**: Chakra UI v2 with custom theme and Emotion
- **State Management**: TanStack React Query v5 for server state
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Ky for API requests
- **Icons**: Lucide React and React Icons
- **Development**: Next.js with Turbopack support

### Shared (`packages/shared/`)

- **DTOs**: Type-safe data transfer objects with class-validator
- **Interfaces**: Shared TypeScript interfaces
- **Enums**: Common enumerations
- **Build**: tsup for dual CJS/ESM output

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Package Manager**: pnpm 10.12.4+ (workspace with lockfile)
- **Database**: PostgreSQL 15 with Alpine Linux
- **Containerization**: Docker with multi-stage builds (backend only)
- **CI/CD**: GitHub Actions with Lighthouse CI
- **Code Quality**: ESLint with @antfu/eslint-config, TypeScript 5.4+, Husky pre-commit hooks
- **Testing**: Jest for backend, built-in Next.js testing for frontend

## 📋 Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 10.12.4+](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for backend services)
- [PostgreSQL](https://www.postgresql.org/) (if running locally without Docker)

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

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3002,http://frontend:3002

# Frontend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 5. Start Backend Services with Docker

```bash
# Start backend and database services
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

### 7. Start Frontend (Native)

```bash
# In a new terminal, start the frontend
cd apps/frontend
pnpm dev
```

### 8. Access the application

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api (Swagger)
- **Database Admin**: http://localhost:8080 (Adminer)

## 🏃‍♂️ Development

### Available Scripts

```bash
# Root level
pnpm dev                    # Start backend and frontend in parallel (use with Docker backend)
pnpm docker:up             # Start Docker services (backend + database)
pnpm docker:down           # Stop Docker services
pnpm docker:build          # Build Docker images
pnpm docker:logs           # View Docker logs
pnpm lint                  # Run ESLint across all packages
pnpm lint:fix              # Fix ESLint issues
pnpm schema:fresh          # Reset database schema (via Docker)

# Backend (from apps/backend/)
pnpm dev                   # Start in watch mode
pnpm build                 # Build for production
pnpm start:prod            # Start production server
pnpm migration:create      # Create new migration
pnpm migration:up          # Apply migrations
pnpm migration:down        # Rollback migrations
pnpm schema:fresh          # Reset database schema
pnpm test                  # Run Jest tests

# Frontend (from apps/frontend/)
pnpm dev                   # Start development server (port 3002)
pnpm build                 # Build for production
pnpm start                 # Start production server
pnpm lint                  # Run Next.js linting

# Shared package (from packages/shared/)
pnpm build                 # Build DTOs and types (required first)
pnpm dev                   # Build in watch mode
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

The application currently supports these RSS sources (configured in `apps/backend/src/config/rss-sources.ts`):

- **Bondy Blog**: News and investigation blog (`https://www.bondyblog.fr/feed/`)
- **Arrêt sur Images**: Media analysis (`https://api.arretsurimages.net/api/public/rss/all-content`)
- **Blast**: Investigation media (`https://api.blast-info.fr/rss.xml`)

**RSS Synchronization**:

- Automatic daily sync at midnight via cron job (`@Cron('0 0 * * *')`)
- Manual sync available via API endpoint `/rss`
- Generic RSS feed parser supports standard RSS/XML formats

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

| Variable              | Description           | Default                 |
| --------------------- | --------------------- | ----------------------- |
| `DB_USER`             | PostgreSQL username   | `postgres`              |
| `DB_PASSWORD`         | PostgreSQL password   | `postgres`              |
| `DB_NAME`             | Database name         | `gazette_db`            |
| `DB_PORT`             | Database port         | `5432`                  |
| `FRONTEND_PORT`       | Frontend port         | `3002`                  |
| `BACKEND_PORT`        | Backend port          | `3000`                  |
| `NODE_ENV`            | Environment mode      | `development`           |
| `JWT_SECRET`          | JWT signing secret    | **Required**            |
| `JWT_EXPIRATION`      | JWT expiration time   | `7d`                    |
| `ALLOWED_ORIGINS`     | CORS allowed origins  | `http://localhost:3002` |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL | `http://localhost:3000` |

### Docker Configuration

The backend uses multi-stage Docker builds for optimized production images:

- **Builder stage**: Installs dependencies and builds applications with pnpm
- **Runtime stage**: Minimal Alpine image with only necessary files and PostgreSQL client
- **Development**: Volume mounts for hot reloading (backend only)
- **Frontend**: Runs natively for better development experience with Hot Module Replacement

## 🧪 Testing

```bash
# Run backend tests (Jest)
docker compose exec backend pnpm test

# Run frontend tests (Next.js built-in)
cd apps/frontend && pnpm test

# Run linting across all packages
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 📊 CI/CD

The project includes GitHub Actions workflows for:

- **Automated Testing**: Run tests on every push and pull request
- **Lighthouse CI**: Performance and accessibility audits with temporary public storage
- **Code Quality**: ESLint checks with @antfu/eslint-config
- **Build Verification**: Automated builds for all packages
- **Environment Validation**: Checks for required environment variables

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

- Follow TypeScript best practices with strict type checking
- Use conventional commit messages (enforced by Husky pre-commit hooks)
- Ensure all tests pass (Jest for backend, Next.js for frontend)
- Update documentation as needed
- Follow @antfu/eslint-config code style (auto-fixed with `pnpm lint:fix`)
- Build shared packages first (`packages/shared`) before developing apps
- Use Docker for backend development, native Node.js for frontend

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/adatechschool/gazette/issues)
- **Documentation**: Check the code comments and this README
- **Team**: Contact the development team for urgent matters

## 🔄 Changelog

### Latest Updates

- ✅ Next.js 15 with App Router and Turbopack support
- ✅ Chakra UI v2 with Emotion integration
- ✅ TanStack React Query v5 for state management
- ✅ NestJS 11 with MikroORM 6 and PostgreSQL 15
- ✅ Automated RSS feed synchronization with daily cron jobs
- ✅ JWT authentication with secure cookie handling
- ✅ ESLint with @antfu/eslint-config and Husky pre-commit hooks
- ✅ Docker multi-stage builds for backend services
- ✅ Lighthouse CI integration for performance monitoring
- ✅ Swagger/OpenAPI documentation
- ✅ Full TypeScript coverage with shared DTOs

---

**Built with ❤️ by the Gazette Team**
