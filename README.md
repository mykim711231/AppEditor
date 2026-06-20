# 📱 모바일 코드 에디터 (AppEditor)

> 앱스토어·개발자 계정·API 키 없이 **아이폰 8**과 **삼성 갤럭시 태블릿**에서
> 코드 작성, 괄호 확인, 멀티 AI 문의를 하나로 사용하는 **PWA 코드 에디터**.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

한국어 UI 전용 · 완전 무료 운영 · 오프라인 편집 지원

---

## ✨ 주요 기능

### 코드 편집기 (CodeMirror 6)
- 80개+ 언어 신택스 하이라이팅 (확장자로 자동 감지)
- 괄호 매칭·강조, 자동완성, 줄 번호, 코드 폴딩
- 찾기·바꾸기(정규식), 실행취소/다시실행
- 다크/라이트 테마, 폰트 선택(Fira Code / JetBrains Mono / Source Code Pro / **D2Coding** / 시스템)
- 마크다운(.md) 미리보기(📖 토글, GFM·표 지원)

### 파일·폴더 관리
- 파일/폴더 생성·삭제·이름변경(인라인)
- 드래그 앤 드롭으로 순서 변경 (dnd-kit)
- 여러 파일 탭 열기, 편집 시 **자동 저장** (IndexedDB)

### 멀티 AI 웹챗 연동 (API 키 불필요)
- Claude / ChatGPT / Gemini / Qwen / Kimi / DeepSeek / Grok / Perplexity / Le Chat 기본 제공
- 코드+질문을 **클립보드 자동 복사** 후 AI를 **앱 우선(안드로이드 intent)·없으면 브라우저**로 오픈
- 질문 **멀티라인 입력**, 범위 선택(선택 코드 / 전체 코드), AI 추가·삭제·드래그 순서 변경

### GitHub 연동 (백엔드 없이, 개인 토큰)
- 메뉴 → 🐙 GitHub 연동: PAT + `owner/repo` + 브랜치 입력
- **⬇ 불러오기(pull)**: 저장소 텍스트 파일을 에디터로 로드
- **⬆ 커밋·푸시(push)**: 현재 파일을 git data API로 커밋/푸시 (추가·수정 반영)
- 토큰은 이 기기 localStorage에만 저장 (공용 기기 주의)

### 부가 기능
- AI 질문 히스토리 검색·삭제 (IndexedDB)
- 좌상단 툴바(≡ 메뉴 / ▭ 사이드 토글 / 🔍 검색), 전체 파일 검색(이름+내용)
- 메뉴 숨김(👁 집중 모드), 스와이프로 AI 패널 토글, 단축키(Cmd+B 사이드 / Cmd+P 검색 / Esc 집중)
- 반응형 레이아웃 (아이폰 단일 컬럼 ↔ 태블릿 분할), Samsung DeX·S Pen 대응

### PWA
- 홈 화면 설치, 오프라인 편집, manifest 아이콘·스플래시

---

## 🛠 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| 코어 | React 18, Vite, Tailwind CSS |
| 에디터 | CodeMirror 6, @codemirror/language-data |
| 저장 | IndexedDB(idb), File System Access API, localStorage |
| DnD | @dnd-kit |
| AI | Clipboard API, window.open() |
| PWA | vite-plugin-pwa (Service Worker, manifest) |
| 상태 | zustand |
| 호스팅 | Vercel |

---

## 🚀 시작하기

```bash
npm install        # 의존성 설치
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # 프로덕션 빌드 (dist/)
npm run preview    # 빌드 결과 미리보기
npm run icons      # SVG로부터 PWA 아이콘(PNG) 재생성
```

### 배포 (GitHub Pages — git push 자동 배포)
`main` 브랜치에 push 하면 [GitHub Actions 워크플로](./.github/workflows/deploy.yml)가
빌드 후 GitHub Pages 로 자동 배포합니다. 별도 외부 서비스 불필요.

- 배포 주소: **https://mykim711231.github.io/AppEditor/**
- Pages 소스: 저장소 Settings → Pages → Source = **GitHub Actions** (최초 1회, gh CLI로 설정됨)
- 빌드 경로(base)는 `/AppEditor/`. 사용자 도메인/루트 배포 시 `BASE=/ npm run build` 로 변경 가능.

### Google Drive 연동(선택) — 앱 안에서 설정
앱 우상단 **⚙️ 설정 → ☁️ Google Drive 연동**에서 직접 구성합니다 (코드/.env 수정 불필요).

1. [Google Cloud Console](https://console.cloud.google.com/)에서 **OAuth 클라이언트 ID**(웹 애플리케이션) 생성
2. **승인된 JavaScript 원본**: `https://mykim711231.github.io` (로컬 `http://localhost:5173`)
3. **승인된 리다이렉트 URI**: `https://mykim711231.github.io/AppEditor/` ← 설치형 앱(standalone) 로그인에 필수
4. **Google Drive API** 사용 설정
5. 발급된 클라이언트 ID를 설정 화면에 입력 → **Google 계정 연결** → **지금 백업 / 복원**

- API 키 불필요 (브라우저 OAuth 토큰만 사용), 접근 범위 `drive.file`(앱이 만든 파일만)
- 일반 브라우저는 팝업 로그인, **설치형 앱은 전체 페이지 리다이렉트 로그인**(팝업 차단 회피)
- 백업은 Drive에 `appeditor-backup.json` 1개로 저장(파일·AI 목록 포함)
- "편집 시 자동 백업" 켜면 저장 위치가 Google Drive일 때 변경분을 자동 업로드

---

## 📂 프로젝트 구조

```
src/
├── App.jsx              레이아웃·단축키·스와이프
├── store.js            zustand 전역 상태 (파일/탭/설정/AI)
├── lib/
│   ├── db.js           IndexedDB (파일·히스토리)
│   ├── ai.js           AI 목록·클립보드 전송
│   ├── gdrive.js       Google Drive (OAuth·백업/복원)
│   ├── github.js       GitHub pull/push
│   ├── languages.js    확장자→언어 자동 감지
│   └── id.js           UID 생성
└── components/
    ├── TopBar.jsx  Tabs.jsx  Editor.jsx  MarkdownView.jsx
    ├── FileExplorer.jsx  AISelector.jsx  QuestionBar.jsx
    ├── SearchModal.jsx  GitHubModal.jsx  DialogHost.jsx
    └── Settings.jsx  History.jsx  Modal.jsx  ui/TextInput.jsx
```

---

## 📋 제약 사항
- 아이폰 Safari는 로컬 폴더 저장 미지원 → IndexedDB 또는 Google Drive 사용
- AI 연동은 각 사이트에 브라우저로 1회 로그인 필요, 오프라인에서는 편집기만 동작

---

## 📄 라이선스
[Apache License 2.0](./LICENSE) © 2026 mykim711231
