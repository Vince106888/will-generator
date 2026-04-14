FROM node:20-bookworm-slim

WORKDIR /app

ENV CI=true

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY prisma prisma

RUN pnpm install --frozen-lockfile --filter api...

COPY apps/api apps/api

RUN pnpm -C apps/api db:generate && pnpm -C apps/api build

EXPOSE 4000

CMD ["pnpm", "-C", "apps/api", "start"]
