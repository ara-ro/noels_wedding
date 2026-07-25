# 모바일 청첩장

개발 배경과 의사결정 근거는 [PLAN.md](./PLAN.md)를 참고하세요.

## 로컬 개발

```bash
npm install
npm run dev
```

`http://localhost:5173/noels_wedding/` 에서 확인할 수 있습니다.

발신자별 분기는 `?to=` 쿼리 파라미터로 테스트합니다:

```
http://localhost:5173/noels_wedding/?to=parent-bride
```

가능한 값: `groom`, `bride`, `parent-groom`, `parent-bride`, `family` (없으면 기본값)

## Firebase 설정 (하객 사진 업로드용)

1. [Firebase 콘솔](https://console.firebase.google.com)에서 프로젝트를 생성하고 Blaze(종량제) 플랜으로 전환합니다 (PLAN.md 9.2).
2. Firestore와 Storage를 활성화합니다.
3. 이 저장소의 `firestore.rules`, `storage.rules`를 콘솔의 보안 규칙에 붙여넣거나, Firebase CLI로 배포합니다:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
4. 프로젝트 설정에서 웹 앱을 추가해 config 값을 확인하고, `.env.example`을 참고해 `.env.local`을 만듭니다 (커밋되지 않음).
5. 예산 알림(Budget Alert)을 설정합니다 (기본안: 10,000원/20,000원, PLAN.md 9.2).

## GitHub Pages 배포 설정

1. 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
2. Settings → Secrets and variables → Actions에 아래 6개 secret을 등록합니다 (`.env.example`과 동일한 이름):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드·배포합니다.
4. 배포 주소: `https://ara-ro.github.io/noels_wedding/`

## 남은 작업

PLAN.md 10.2 "사용자가 준비해주셔야 하는 것" 체크리스트를 참고하세요 (이름/날짜/장소/사진/계좌/지도·카카오 API 키 등).
`src/config/weddingInfo.ts`, `src/config/senderProfiles.ts`의 `TODO` 주석이 실제 값으로 채워야 할 지점입니다.
