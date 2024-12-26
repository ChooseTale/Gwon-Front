# 1. Build Stage
FROM node:20.15.1 AS builder

RUN npm install -g pnpm


# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

COPY .npmrc ./

# 의존성 설치
RUN pnpm install

# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN pnpm run build

# 2. Production Stage
FROM node:20.15.1

# 작업 디렉토리 설정
WORKDIR /app

RUN npm install -g pnpm

COPY .npmrc ./

# 빌드된 파일 복사
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next

# 프로덕션 의존성 설치
RUN pnpm install --production

# Next.js 애플리케이션 실행
CMD ["pnpm", "start"]