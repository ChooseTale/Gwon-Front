# ChooseTale: 인터랙티브 텍스트 기반 게임 플랫폼

ChooseTale은 사용자가 직접 텍스트 기반의 인터랙티브 게임을 만들고 공유할 수 있는 웹 플랫폼입니다. 다양한 선택지를 통해 이야기를 진행하는 방식으로, 사용자의 선택에 따라 서로 다른 결말로 이어지는 게임을 즐길 수 있습니다.

## 주요 기능

### 게임 제작 🎮

- 직관적인 노드 기반 에디터
- 텍스트 및 이미지 콘텐츠 지원
- 다양한 선택지 설정 가능
- AI 기반 스토리 생성 도우미

### 게임 플레이 🎯

- 모바일 최적화 인터페이스
- 진행 상황 자동 저장
- 다양한 엔딩 추적 시스템

### 사용자 경험 👥

- 소셜 로그인 지원
- 게임 검색 및 추천 시스템
- PWA 지원으로 앱처럼 설치 가능

## 페이지 소개

### 로그인 페이지
![스크린샷 2025-05-06 오후 7 07 38](https://github.com/user-attachments/assets/f104f67d-deed-42da-82a4-ee2b22e6cb03)



### 메인 페이지
![메인 페이지](https://github.com/user-attachments/assets/287e3adb-d348-4a67-9262-2a10821809cd)



### 게임 제작 페이지
![빌더 트리](https://github.com/user-attachments/assets/a8ad70eb-2b45-48a0-bd9a-46019847c861)

![빌더페이지](https://github.com/user-attachments/assets/f7eba852-17c2-41b9-8406-eebfe7782295)

### 게임 플레이 페이지
![게임 플레이 화면](https://github.com/user-attachments/assets/e6e250fa-708b-4e27-869a-eaea74b77f1a)

### 마이페이지
![유저 페이지](https://github.com/user-attachments/assets/27ae7c82-3154-4ed7-970c-888d103dfca5)



## 사용 기술

### 프론트엔드

- **Next.js 15**: App Router, Server Components 활용
- **React 19**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성 확보
- **TailwindCSS**: 반응형 디자인 구현
- **Zustand**: 전역 상태 관리

### PWA 지원

- **next-pwa**: 프로그레시브 웹 앱 구현
- 오프라인 지원 및 홈 화면 설치 기능

### UI/UX

- **@xyflow/react (React Flow)**: 노드 기반 에디터 구현
- **Sonner**: 토스트 알림 구현
- **react-zoom-pan-pinch**: 이미지 확대/축소 기능

### 기타 라이브러리

- **cookies-next**: 쿠키 관리
- **next-auth**: 인증 시스템 구현
- **socket.io-client**: 실시간 통신
- **browser-image-compression**: 이미지 최적화

## 설치 및 실행 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/choosetale.git

# 디렉토리 이동
cd choosetale

# 종속성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

## PWA 설치 방법

1. Chrome, Edge 등의 브라우저에서 사이트 접속
2. 주소창 우측의 설치 버튼 클릭 또는
3. 페이지 우측 하단의 '앱 설치하기' 버튼 클릭

---
