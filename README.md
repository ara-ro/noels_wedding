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

## 하객 사진 (구글 폼 업로드 + Drive 갤러리)

사진 업로드는 구글 폼(`https://forms.gle/iqB4PHHsvufic4mb6`)으로 받고, 업로드된 사진은 그 폼의 응답이 쌓이는
Drive 폴더에서 Drive API(읽기 전용)로 불러와 보여줍니다.

1. [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트를 만들고 **Google Drive API**를 활성화합니다.
2. API 키를 발급하고, HTTP 리퍼러를 배포 도메인으로 제한합니다.
3. 구글 폼의 파일 업로드 응답이 저장되는 Drive 폴더 ID를 확인합니다 (폼 응답 탭에서 연결된 Drive 폴더).
4. 해당 폴더를 **"링크가 있는 모든 사람 - 뷰어"** 로 공개 공유합니다 (API 키만으로는 비공개 폴더를 읽을 수 없습니다).
5. `.env.example`을 참고해 `.env.local`을 만듭니다 (커밋되지 않음).

## GitHub Pages 배포 설정

1. 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
2. Settings → Secrets and variables → Actions에 아래 2개 secret을 등록합니다 (`.env.example`과 동일한 이름):
   - `VITE_GOOGLE_DRIVE_API_KEY`
   - `VITE_GOOGLE_DRIVE_FOLDER_ID`
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드·배포합니다.
4. 배포 주소: `https://ara-ro.github.io/noels_wedding/`

## 남은 작업

PLAN.md 10.2 "사용자가 준비해주셔야 하는 것" 체크리스트를 참고하세요 (이름/날짜/장소/사진/계좌/지도·카카오 API 키 등).
`src/config/weddingInfo.ts`, `src/config/senderProfiles.ts`의 `TODO` 주석이 실제 값으로 채워야 할 지점입니다.
