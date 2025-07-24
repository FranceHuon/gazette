FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les fichiers de configuration du workspace
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copier les packages
COPY packages/shared ./packages/shared
COPY apps/frontend ./apps/frontend

# Installer les dépendances et construire
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_frontend build

# Étape 2: Runtime minimal
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les fichiers de configuration
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-lock.yaml /app/package.json ./

# Copier le package partagé
COPY --from=builder /app/packages/shared ./packages/shared

# Copier le frontend
COPY --from=builder /app/apps/frontend ./apps/frontend

# Copier les node_modules nécessaires
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules

WORKDIR /app/apps/frontend

ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3002

# Par défaut, on lance en dev
CMD ["pnpm", "--filter", "gazette_frontend", "exec", "next", "dev", "--hostname", "0.0.0.0", "--port", "3002"]
