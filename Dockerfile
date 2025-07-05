# Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app

# Устанавливаем pnpm напрямую
RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

# Сборка приложения
FROM node:20.11-alpine as builder
WORKDIR /app

RUN npm install -g pnpm

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm run build:production

# Финальный запуск
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production

RUN npm install -g pnpm

COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["pnpm", "start"]
