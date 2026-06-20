# 📱 모바일 코드 에디터 (AppEditor)

> 앱스토어·개발자 계정·API 키 없이 **아이폰 8**과 **삼성 갤럭시 태블릿**에서
> 코드 작성, 괄호 확인, 멀티 AI 문의를 하나로 사용하는 **PWA 코드 에디터**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

한국어 UI 전용 · 완전 무료 운영 · 오프라인 편집 지원

---

## ✨ 주요 기능

### 코드 편집기 (CodeMirror 6)
- 80개+ 언어 신택스 하이라이팅 (확장자로 자동 감지)
- 괄호 매칭·강조, 자동완성, 줄 번호, 코드 폴딩
- 찾기·바꾸기(정규식), 실행취소/다시실행
- 다크/라이트 테마, 폰트 선택(Fira Code / JetBrains Mono / Source Code Pro / 시스템)

### 파일·폴더 관리
- 파일/폴더 생성·삭제·이름변경(인라인)
- 드래그 앤 드롭으로 순서 변경 (dnd-kit)
- 여러 파일 탭 열기, 편집 시 **자동 저장** (IndexedDB)

### 멀티 AI 웹챗 연동 (API 키 불필요)
- Claude / ChatGPT / Gemini / Qwen / Kimi / DeepSeek / Grok / Perplexity / Le Chat 기본 제공
- 코드+질문을 **클립보드 자동 복사** 후 해당 AI 사이트를 새 탭으로 오픈
- 질문 범위 선택(선택 코드 / 전체 코드), AI 추가·삭제(길게 누르기)·순서 변경

### 부가 기능
- 코드 스니펫 저장·삽입·관리 (localStorage)
- AI 질문 히스토리 검색·삭제 (IndexedDB)
- 메뉴 숨김(👁 집중 모드), 스와이프로 AI 패널 토글, 단축키(Cmd+B / Esc)
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

### 배포 (Vercel)
1. https://vercel.com 에서 이 저장소를 Import
2. 프레임워크 자동 감지(Vite) — 빌드 명령 `npm run build`, 출력 `dist`
3. Deploy → 자동 HTTPS PWA 배포 완료

> SPA 라우팅은 [vercel.json](./vercel.json) 의 rewrite로 처리됩니다.

### Google Drive 연동(선택)
[.env.example](./.env.example) 를 `.env`로 복사하고 `VITE_GOOGLE_CLIENT_ID`를
발급받아 입력하면 활성화됩니다. 미설정 시 브라우저 내부(IndexedDB)·로컬 폴더 저장만 사용됩니다.

---

## 📂 프로젝트 구조

```
src/
├── App.jsx              레이아웃·단축키·스와이프
├── store.js            zustand 전역 상태 (파일/탭/설정/AI/스니펫)
├── lib/
│   ├── db.js           IndexedDB (파일·히스토리)
│   ├── ai.js           AI 목록·클립보드 전송
│   ├── languages.js    확장자→언어 자동 감지
│   └── id.js           UID 생성
└── components/
    ├── TopBar.jsx  Tabs.jsx  Editor.jsx
    ├── FileExplorer.jsx  AIBar.jsx
    └── Settings.jsx  Snippets.jsx  History.jsx  Modal.jsx
```

---

## 📋 제약 사항
- 아이폰 Safari는 로컬 폴더 저장 미지원 → IndexedDB 또는 Google Drive 사용
- AI 연동은 각 사이트에 브라우저로 1회 로그인 필요, 오프라인에서는 편집기만 동작

---

## 📄 라이선스
[MIT](./LICENSE) © 2026 mykim711231
