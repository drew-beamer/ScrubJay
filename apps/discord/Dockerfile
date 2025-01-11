FROM node:22-alpine AS base

ARG DATABASE_URL=/etc/dbs/scrubjay/scrubjay.db
ENV DATABASE_URL=${DATABASE_URL}

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install turbo --global

COPY . .
RUN turbo prune scrubjay-discord-bot --docker


FROM base AS installer

RUN apk update
RUN apk add --no-cache sqlite libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .

RUN npm run build
RUN npm prune --omit=dev --omit=optional && npm install drizzle-kit --save-dev

FROM base AS runner
WORKDIR /app

RUN apk add --no-cache sqlite

RUN addgroup -g 1001 -S app
RUN adduser -u 1001 -S app -G app

# Create the database directory with proper permissions
RUN mkdir -p /etc/dbs/scrubjay && \
    chown -R app:app /etc/dbs/scrubjay

COPY --from=installer --chown=app:app /app/node_modules/ ./node_modules/
COPY --from=installer --chown=app:app /app/package.json ./package.json
COPY --from=installer --chown=app:app /app/apps/discord/dist/ ./dist/

COPY --from=installer --chown=app:app /app/apps/discord/drizzle.config.ts ./drizzle.config.ts
COPY --from=installer --chown=app:app /app/apps/discord/src/utils/database/ ./src/utils/database

USER app

CMD ["sh", "-c", "npx drizzle-kit migrate && node dist/index.js"]
