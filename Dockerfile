# Stage 1: install all dependencies
FROM node:22-slim AS deps
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm@9
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: build
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm@9

# prisma.config.ts calls env("DATABASE_URL") at generate time — must be set before generate
# Pass with: docker build --build-arg DATABASE_URL=postgresql://...
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source (node_modules excluded via .dockerignore)
COPY . .

# Generate Prisma client for Linux
RUN pnpm prisma:generate

RUN pnpm build

# Stage 3: minimal production image using Next.js standalone output
FROM node:22-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# standalone contains server.js + only the node_modules it needs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
