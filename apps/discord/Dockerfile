# Base Stage
FROM node:22-alpine AS base

# Set database path with a default
ARG DATABASE_URL=/etc/dbs/scrubjay/scrubjay.db
ENV DATABASE_URL=${DATABASE_URL}

RUN apk add --no-cache libc6-compat sqlite

# ----------------------------------------

# Builder Stage
FROM base AS builder

WORKDIR /app

# Install turbo globally for build efficiency
RUN npm install turbo --global

# Copy source code for pruning
COPY package*.json .
COPY . .

# Prune the project for production build
RUN turbo prune scrubjay-discord-bot --docker

# ----------------------------------------

# Installer Stage
FROM base AS installer

WORKDIR /app

# Copy pruned package.json and lock file, then install dependencies
COPY --from=builder /app/out/json/ .
RUN npm install

# Copy the rest of the pruned app and build
COPY --from=builder /app/out/full/ .
RUN npm run build

# Remove development dependencies for a lean production image
RUN npm prune --production

# ----------------------------------------

# Runner Stage
FROM base AS runner

WORKDIR /app

# Create and set permissions for the database directory
RUN mkdir -p /etc/dbs/scrubjay && \
    chown -R 1001:1001 /etc/dbs/scrubjay

# Copy necessary files for runtime
COPY --from=installer --chown=1001:1001 /app/node_modules/ ./node_modules/
COPY --from=installer --chown=1001:1001 /app/package.json ./package.json
COPY --from=installer --chown=1001:1001 /app/apps/discord/dist/ ./dist/
COPY --from=installer --chown=1001:1001 /app/apps/discord/drizzle.config.ts ./drizzle.config.ts
COPY --from=installer --chown=1001:1001 /app/apps/discord/src/utils/database/ ./src/utils/database

# Switch to non-root user
USER 1001

# Command to run migrations and start the app
CMD ["sh", "-c", "npx drizzle-kit migrate && node dist/index.js"]