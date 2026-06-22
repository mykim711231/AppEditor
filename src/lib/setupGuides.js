// 언어별 설치·실행 방법 (Windows PowerShell / WSL bash)
// 각 step: { title, powershell, wsl }
export const SETUP_GUIDES = [
  {
    lang: 'winget 설치',
    key: 'winget',
    version: 'Windows 패키지 관리자 (Windows 10/11)',
    steps: [
      {
        title: '설치 여부 확인',
        powershell: `winget --version\n# 명령을 찾을 수 없으면 아래 방법으로 설치`,
        wsl: `# winget은 Windows 전용입니다\n# WSL에서는 apt, snap 등 Linux 패키지 관리자를 사용하세요`,
      },
      {
        title: 'Microsoft Store로 설치 (권장)',
        powershell: `# 아래 명령 실행 → Store가 열리면 [설치] 클릭\nStart-Process "ms-windows-store://pdp/?ProductId=9NBLGGH4NNS1"`,
        wsl: `# winget은 Windows 전용입니다`,
      },
      {
        title: 'PowerShell로 직접 설치 (Store 없을 때)',
        powershell: `$pkg = "https://github.com/microsoft/winget-cli/releases/latest/download/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle"\nInvoke-WebRequest -Uri $pkg -OutFile winget.msixbundle\nAdd-AppxPackage winget.msixbundle\nRemove-Item winget.msixbundle`,
        wsl: `# winget은 Windows 전용입니다`,
      },
      {
        title: '설치 후 버전 확인 (터미널 재시작 필요)',
        powershell: `winget --version`,
        wsl: `# winget은 Windows 전용입니다`,
      },
      {
        title: 'VSCode 설치 (winget)',
        powershell: `winget install -e --id Microsoft.VisualStudioCode`,
        wsl: `# Windows에서 VSCode 설치 후 WSL 터미널에서 "code ." 로 실행 가능\n# Remote - WSL 확장이 자동 설치됨`,
      },
    ],
  },
  {
    lang: 'Node.js 설치',
    key: 'nodejs',
    version: 'Node.js 20 LTS',
    steps: [
      {
        title: '설치 여부 확인',
        powershell: `node --version\nnpm --version\n# 오류 시 아래 방법으로 설치`,
        wsl: `node --version && npm --version`,
      },
      {
        title: 'winget으로 설치 (winget 있을 때)',
        powershell: `winget install -e --id OpenJS.NodeJS.LTS`,
        wsl: `# WSL에서는 아래 nvm 방법 권장`,
      },
      {
        title: 'MSI로 직접 설치 (winget 없을 때)',
        powershell: `# 공식 다운로드 페이지 열기\nStart-Process "https://nodejs.org/en/download/"\n# LTS (권장) → Windows Installer (.msi) 64-bit 선택 후 실행`,
        wsl: `# WSL에서는 해당 없음 — 아래 nvm 방법 사용`,
      },
      {
        title: 'nvm-windows로 설치 (버전 관리 필요 시)',
        powershell: `# 1. https://github.com/coreybutler/nvm-windows/releases 에서\n#    nvm-setup.exe 다운로드 후 실행\n# 2. 새 PowerShell 열고:\nnvm install 20\nnvm use 20`,
        wsl: `# nvm (WSL/Linux 버전 관리자)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash\nsource ~/.bashrc\nnvm install 20\nnvm use 20`,
      },
      {
        title: '설치 후 버전 확인 (터미널 재시작 필요)',
        powershell: `node --version\nnpm --version`,
        wsl: `node --version && npm --version`,
      },
      {
        title: 'VSCode 확장팩 설치 (JS/TS 개발)',
        powershell: `code --install-extension esbenp.prettier-vscode\ncode --install-extension dbaeumer.vscode-eslint`,
        wsl: `code --install-extension esbenp.prettier-vscode\ncode --install-extension dbaeumer.vscode-eslint\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
    ],
  },
  {
    lang: 'Python',
    key: 'python',
    version: 'Python 3.12',
    steps: [
      {
        title: '설치',
        powershell: `winget install -e --id Python.Python.3.12`,
        wsl: `sudo apt update\nsudo apt install -y python3 python3-pip python3-venv`,
      },
      { title: '버전 확인', powershell: `python --version`, wsl: `python3 --version` },
      {
        title: '가상환경 생성·활성화',
        powershell: `python -m venv venv\n.\\venv\\Scripts\\Activate.ps1`,
        wsl: `python3 -m venv venv\nsource venv/bin/activate`,
      },
      { title: '패키지 설치', powershell: `pip install requests`, wsl: `pip3 install requests` },
      { title: '실행', powershell: `python app.py`, wsl: `python3 app.py` },
      { title: 'REPL (대화형)', powershell: `python`, wsl: `python3` },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# Python 확장 (Pylance·Debugger 포함)\ncode --install-extension ms-python.python\n# Jupyter 노트북 지원\ncode --install-extension ms-toolsai.jupyter`,
        wsl: `code --install-extension ms-python.python\ncode --install-extension ms-toolsai.jupyter\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Python: Select Interpreter       — 가상환경·버전 선택\n# Python: Run Python File in Terminal — 현재 파일 실행\n# Python: Create Terminal           — venv 활성화된 터미널 열기\n# Jupyter: Create New Notebook      — 노트북 생성`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Python: Select Interpreter       — 가상환경·버전 선택\n# Python: Run Python File in Terminal — 현재 파일 실행\n# Python: Create Terminal           — venv 활성화된 터미널 열기\n# Remote-WSL: New WSL Window        — WSL 창 열기`,
      },
    ],
  },
  {
    lang: 'Java',
    key: 'java',
    version: 'Java 21 (LTS, Temurin)',
    steps: [
      {
        title: '설치 (JDK 21)',
        powershell: `winget install -e --id EclipseAdoptium.Temurin.21.JDK`,
        wsl: `sudo apt update\nsudo apt install -y openjdk-21-jdk`,
      },
      { title: '버전 확인', powershell: `java -version`, wsl: `java -version` },
      {
        title: '컴파일 + 실행',
        powershell: `javac Main.java\njava Main`,
        wsl: `javac Main.java\njava Main`,
      },
      {
        title: '단일 파일 실행 (11+)',
        powershell: `java Main.java`,
        wsl: `java Main.java`,
      },
      {
        title: 'JShell (REPL)',
        powershell: `jshell`,
        wsl: `jshell`,
      },
      {
        title: 'Maven 프로젝트 실행',
        powershell: `mvn compile exec:java "-Dexec.mainClass=com.example.Main"`,
        wsl: `mvn compile exec:java -Dexec.mainClass=com.example.Main`,
      },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# Extension Pack for Java (Language Support·Debugger·Maven·Test Runner 포함)\ncode --install-extension vscjava.vscode-java-pack`,
        wsl: `code --install-extension vscjava.vscode-java-pack\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Java: Create Java Project         — 새 프로젝트 생성\n# Java: Run                         — 현재 파일 실행\n# Java: Debug                       — 디버그 시작\n# Java: Clean Language Server Workspace — LS 캐시 초기화`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Java: Create Java Project         — 새 프로젝트 생성\n# Java: Run                         — 현재 파일 실행\n# Java: Debug                       — 디버그 시작\n# Java: Clean Language Server Workspace — LS 캐시 초기화`,
      },
    ],
  },
  {
    lang: 'JavaScript (Node.js)',
    key: 'javascript',
    version: 'Node.js 20 LTS',
    steps: [
      {
        title: '설치 (Node LTS)',
        powershell: `winget install -e --id OpenJS.NodeJS.LTS`,
        wsl: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt install -y nodejs`,
      },
      { title: '버전 확인', powershell: `node --version; npm --version`, wsl: `node --version && npm --version` },
      { title: '실행', powershell: `node app.js`, wsl: `node app.js` },
      {
        title: '프로젝트 초기화 + 패키지',
        powershell: `npm init -y\nnpm install axios`,
        wsl: `npm init -y\nnpm install axios`,
      },
      { title: 'npm 스크립트 실행', powershell: `npm run dev`, wsl: `npm run dev` },
      { title: 'REPL', powershell: `node`, wsl: `node` },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# Prettier (코드 포맷터)\ncode --install-extension esbenp.prettier-vscode\n# ESLint (코드 품질 검사)\ncode --install-extension dbaeumer.vscode-eslint`,
        wsl: `code --install-extension esbenp.prettier-vscode\ncode --install-extension dbaeumer.vscode-eslint\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Format Document                   — Prettier로 파일 포맷\n# ESLint: Fix all Auto-fixable Problems — ESLint 자동 수정\n# npm: Run Script                   — package.json 스크립트 실행`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Format Document                   — Prettier로 파일 포맷\n# ESLint: Fix all Auto-fixable Problems — ESLint 자동 수정\n# npm: Run Script                   — package.json 스크립트 실행`,
      },
    ],
  },
  {
    lang: 'TypeScript',
    key: 'typescript',
    version: 'TypeScript 5.4 (Node 20 필요)',
    steps: [
      {
        title: '설치 (전역 tsc/tsx)',
        powershell: `npm install -g typescript tsx`,
        wsl: `sudo npm install -g typescript tsx`,
      },
      { title: '버전 확인', powershell: `tsc --version`, wsl: `tsc --version` },
      {
        title: '컴파일 후 실행',
        powershell: `tsc app.ts\nnode app.js`,
        wsl: `tsc app.ts\nnode app.js`,
      },
      { title: '바로 실행 (tsx)', powershell: `tsx app.ts`, wsl: `tsx app.ts` },
      {
        title: 'tsconfig 생성',
        powershell: `tsc --init`,
        wsl: `tsc --init`,
      },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# TypeScript Nightly (최신 언어 서비스)\ncode --install-extension ms-vscode.vscode-typescript-next\n# Prettier\ncode --install-extension esbenp.prettier-vscode`,
        wsl: `code --install-extension ms-vscode.vscode-typescript-next\ncode --install-extension esbenp.prettier-vscode\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# TypeScript: Restart TS Server     — TS 서버 재시작 (오류 초기화)\n# TypeScript: Select TypeScript Version — 프로젝트 내 tsc 버전 선택\n# TypeScript: Go to Source Definition — 타입 정의 대신 구현 코드로 이동\n# Format Document                   — Prettier로 파일 포맷`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# TypeScript: Restart TS Server     — TS 서버 재시작 (오류 초기화)\n# TypeScript: Select TypeScript Version — 프로젝트 내 tsc 버전 선택\n# TypeScript: Go to Source Definition — 타입 정의 대신 구현 코드로 이동\n# Format Document                   — Prettier로 파일 포맷`,
      },
    ],
  },
  {
    lang: 'C# (.NET)',
    key: 'csharp',
    version: '.NET 8 (LTS)',
    steps: [
      {
        title: '설치 (.NET 8 SDK)',
        powershell: `winget install -e --id Microsoft.DotNet.SDK.8`,
        wsl: `sudo apt update\nsudo apt install -y dotnet-sdk-8.0`,
      },
      { title: '버전 확인', powershell: `dotnet --version`, wsl: `dotnet --version` },
      {
        title: '콘솔 프로젝트 생성',
        powershell: `dotnet new console -o MyApp\ncd MyApp`,
        wsl: `dotnet new console -o MyApp\ncd MyApp`,
      },
      { title: '실행', powershell: `dotnet run`, wsl: `dotnet run` },
      { title: '패키지 추가', powershell: `dotnet add package Newtonsoft.Json`, wsl: `dotnet add package Newtonsoft.Json` },
      { title: '릴리스 빌드', powershell: `dotnet build -c Release`, wsl: `dotnet build -c Release` },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# C# Dev Kit (언어 서비스·Debugger·Test Explorer 포함)\ncode --install-extension ms-dotnettools.csdevkit`,
        wsl: `code --install-extension ms-dotnettools.csdevkit\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# .NET: Generate Assets for Build and Debug — launch.json·tasks.json 생성\n# .NET: New Project                  — 새 프로젝트 생성\n# C#: Restart Language Server        — 언어 서버 재시작\n# NuGet: Add Package                 — NuGet 패키지 추가`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# .NET: Generate Assets for Build and Debug — launch.json·tasks.json 생성\n# .NET: New Project                  — 새 프로젝트 생성\n# C#: Restart Language Server        — 언어 서버 재시작\n# NuGet: Add Package                 — NuGet 패키지 추가`,
      },
    ],
  },
  {
    lang: 'Go',
    key: 'go',
    version: 'Go 1.22',
    steps: [
      {
        title: '설치',
        powershell: `winget install -e --id GoLang.Go`,
        wsl: `sudo apt update\nsudo apt install -y golang-go\n# 또는 공식 최신: https://go.dev/dl/`,
      },
      { title: '버전 확인', powershell: `go version`, wsl: `go version` },
      {
        title: '모듈 초기화',
        powershell: `go mod init example.com/myapp`,
        wsl: `go mod init example.com/myapp`,
      },
      { title: '실행', powershell: `go run main.go`, wsl: `go run main.go` },
      { title: '빌드', powershell: `go build -o app.exe`, wsl: `go build -o app` },
      { title: '패키지 추가', powershell: `go get github.com/google/uuid`, wsl: `go get github.com/google/uuid` },
      {
        title: 'VSCode 확장팩 설치',
        powershell: `# Go 공식 확장 (gopls·Delve Debugger·테스트 탐색기 포함)\ncode --install-extension golang.go`,
        wsl: `code --install-extension golang.go\n# WSL 원격 개발\ncode --install-extension ms-vscode-remote.remote-wsl`,
      },
      {
        title: 'Shift+Ctrl+P 주요 명령',
        powershell: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Go: Install/Update Tools          — gopls·dlv 등 필수 도구 설치 (첫 설치 후 반드시 실행)\n# Go: Add Import                    — 패키지 import 자동 추가\n# Go: Test Function At Cursor       — 커서 위치 테스트 함수 실행\n# Go: Generate Interface Stubs      — 인터페이스 구현 스텁 생성`,
        wsl: `# Shift+Ctrl+P 를 누른 뒤 아래 명령 입력:\n#\n# Go: Install/Update Tools          — gopls·dlv 등 필수 도구 설치 (첫 설치 후 반드시 실행)\n# Go: Add Import                    — 패키지 import 자동 추가\n# Go: Test Function At Cursor       — 커서 위치 테스트 함수 실행\n# Go: Generate Interface Stubs      — 인터페이스 구현 스텁 생성`,
      },
    ],
  },
]
