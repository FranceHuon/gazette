FROM node:20-alpine AS builder

RUN apk add --no-cache postgresql-client netcat-openbsd

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier les fichiers de configuration du workspace
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copier les packages
COPY packages/shared ./packages/shared
COPY apps/backend ./apps/backend

# Installer les dépendances et construire
RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_backend build

# Étape 2: Runtime minimal
FROM node:20-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier les fichiers de configuration
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-lock.yaml /app/package.json ./

# Copier le package partagé
COPY --from=builder /app/packages/shared ./packages/shared

# Copier le backend
COPY --from=builder /app/apps/backend ./apps/backend

# Copier les node_modules nécessaires
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules

# Copier les binaires nécessaires
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin
COPY --from=builder /app/apps/backend/node_modules/.bin ./apps/backend/node_modules/.bin

WORKDIR /app/apps/backend

# S'assurer que le fichier entrypoint.sh est exécutable
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
