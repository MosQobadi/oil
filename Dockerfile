# Stage 1: install dependencies
FROM docker-mirror.liara.ir/node:22-slim AS deps

WORKDIR /app

RUN npm install -g pnpm@8 --registry=https://package-mirror.liara.ir/repository/npm/

RUN echo "registry=https://package-mirror.liara.ir/repository/npm/" > /root/.npmrc && \
    echo "fetch-retries=2" >> /root/.npmrc && \
    echo "fetch-retry-mintimeout=5000" >> /root/.npmrc && \
    echo "fetch-retry-maxtimeout=30000" >> /root/.npmrc

COPY package.json ./

RUN pnpm install


# Stage 2: build
FROM docker-mirror.liara.ir/node:22-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@8 --registry=https://package-mirror.liara.ir/repository/npm/

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm prisma generate && pnpm build


# Stage 3: production
FROM docker-mirror.liara.ir/node:22-slim AS runner

WORKDIR /app

RUN sed -i \
    's|deb.debian.org/debian-security|linux-mirror.liara.ir/repository/debian-security/|g; s|deb.debian.org/debian|linux-mirror.liara.ir/repository/debian/|g' \
    /etc/apt/sources.list.d/debian.sources && \
    apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NPM_CONFIG_REGISTRY=https://package-mirror.liara.ir/repository/npm/

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
