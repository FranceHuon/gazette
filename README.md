# 📰 Gazette - RSS News Aggregator

A modern RSS feed aggregator with user authentication and content management.

## ✨ Key Features

- 📰 Automatic RSS feed aggregation
- 🔐 Secure user authentication
- ⭐ Personal library management
- 📋 News source subscriptions

## 📋 Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 10.12.4+](https://pnpm.io/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Quick Start

### 1. Clone the project

```bash
git clone https://github.com/FranceHuon/gazette
cd gazette
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Build shared packages

```bash
cd packages/shared && pnpm build && cd ../..
```

### 4. Configure environment

Create a `.env` file in the root directory

````

### 5. Start services

```bash
# Start backend and database
docker compose up --build -d

# Apply migrations
docker compose exec backend pnpm migration:up

# Seed database (first time only)
docker compose exec backend pnpm seeder:run
````

### 6. Start frontend

```bash
# In a new terminal
cd apps/frontend
pnpm dev
```

### 7. Access the application

- **Application**: http://localhost:3002
- **API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api
- **Database Admin**: http://localhost:8080 (Adminer)

## 🛠️ Useful Commands

### Development

```bash
# Stop services
docker compose down

# View logs
docker compose logs -f

# Reset database
docker compose exec backend pnpm schema:fresh
```

> **Note**: This project is developed as part of the curriculum at [Ada Tech School](https://adatechschool.fr/) with Myriam LE NAHELEC, Oriane DA SILVA and Eline LONGEPÉE
