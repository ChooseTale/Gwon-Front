# 1. Build Stage
FROM node:20.15.1-alpine AS builder

# RUN npm install -g yarn


# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./
COPY yarn.lock ./

COPY .npmrc ./
# 의존성 설치
RUN yarn install --frozen-lockfile


# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드

RUN ls -al
RUN yarn build

# 2. Production Stage
FROM node:20.15.1-alpine AS runner

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# standalone 모드의 결과물만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Next.js 애플리케이션 실행
CMD ["node", "server.js"]