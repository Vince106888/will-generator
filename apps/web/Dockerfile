FROM node:20-bookworm-slim

WORKDIR /app

ENV CI=true

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json

RUN pnpm install --frozen-lockfile --filter web...

COPY apps/web apps/web

EXPOSE 5173

CMD ["pnpm", "-C", "apps/web", "dev:docker"]
