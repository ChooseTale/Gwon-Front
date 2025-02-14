# 1. Build Stage
FROM node:20.15.1 AS builder

# RUN npm install -g yarn


# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./
COPY yarn.lock ./

COPY .npmrc ./

RUN echo "npmrc: $(cat .npmrc)"
# 의존성 설치
ENV NODE_ENV=production

RUN yarn install --production=true


# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN yarn build

# Next.js 애플리케이션 실행
CMD ["yarn", "start"]