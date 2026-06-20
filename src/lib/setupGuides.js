// 언어별 설치·실행 방법 (Windows PowerShell / WSL bash)
// 각 step: { title, powershell, wsl }
export const SETUP_GUIDES = [
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
    ],
  },
]
