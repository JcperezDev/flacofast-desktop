FROM node:20-alpine AS deps

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY . .
RUN pnpm run build
RUN pnpm run server:build

FROM node:20-alpine AS runner

RUN corepack enable
WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/server/dist ./server/dist

EXPOSE 3000

CMD ["node", "server/dist/index.js"]
