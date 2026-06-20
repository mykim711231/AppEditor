// PowerShell 7.x 코드 템플릿
// 주의: 백틱(line-continuation) 미사용, 경로는 / 사용(파워셸 허용), 정규식 백슬래시는 \\ 로 표기
export default {
  lang: 'PowerShell',
  key: 'powershell',
  version: 'PowerShell 7.x',
  cats: [
    {
      title: '기본',
      items: [
        { name: '출력 / 변수', code: `# 변수는 $ 로 시작\n$name = "kim"\nWrite-Host "안녕, $name"\nWrite-Output "값: $($1 + 2)"` },
        { name: '타입 지정', code: `[int]$n = 5\n[string]$s = "abc"\n[datetime]$d = Get-Date` },
        { name: '배열', code: `$arr = @(1, 2, 3)\n$arr += 4            # 추가\n$arr[0]              # 첫 요소\n$arr.Count          # 개수` },
        { name: '해시테이블', code: `$map = @{ name = "kim"; age = 20 }\n$map["name"]\n$map.age\n$map.Keys` },
        { name: '문자열 보간', code: `$a = 3; $b = 4\nWrite-Host "이름: $name, 합: $($a + $b)"\n# 변수 뒤 글자 구분: \${name}_suffix` },
        { name: '주석 / 여러 줄 문자열', code: `# 한 줄 주석\n<#\n  여러 줄 주석\n#>\n$text = @"\n여러 줄\n문자열(here-string)\n"@` },
      ],
    },
    {
      title: '제어문',
      items: [
        { name: 'if / elseif / else', code: `if ($x -gt 0) {\n    Write-Host "양수"\n} elseif ($x -eq 0) {\n    Write-Host "영"\n} else {\n    Write-Host "음수"\n}` },
        { name: '비교 연산자', code: `# -eq -ne -gt -ge -lt -le -like -match -contains\nif ($name -like "k*") { }\nif ($list -contains "a") { }` },
        { name: 'switch', code: `switch ($value) {\n    1 { "하나" }\n    2 { "둘" }\n    default { "기타" }\n}` },
        { name: 'foreach', code: `foreach ($item in $list) {\n    Write-Host $item\n}` },
        { name: 'for / while', code: `for ($i = 0; $i -lt 5; $i++) { $i }\n\n$i = 0\nwhile ($i -lt 5) { $i++ }` },
        { name: 'try / catch / finally', code: `try {\n    Get-Item "C:/none.txt" -ErrorAction Stop\n} catch {\n    Write-Host "오류: $($_.Exception.Message)"\n} finally {\n    Write-Host "정리"\n}` },
      ],
    },
    {
      title: '함수',
      items: [
        { name: '함수 기본', code: `function Add-Numbers {\n    param([int]$a, [int]$b)\n    return $a + $b\n}\nAdd-Numbers -a 3 -b 4` },
        { name: '고급 함수 (필수 매개변수)', code: `function Get-User {\n    param(\n        [Parameter(Mandatory)][string]$Id,\n        [int]$Limit = 10\n    )\n    "Id=$Id, Limit=$Limit"\n}` },
        { name: '파이프라인 입력', code: `function Double-It {\n    process { $_ * 2 }   # 파이프 입력은 $_\n}\n1, 2, 3 | Double-It` },
        { name: '스플래팅 (인자 묶음)', code: `$params = @{\n    Path        = "C:/logs"\n    Filter      = "*.log"\n    Recurse     = $true\n}\nGet-ChildItem @params` },
      ],
    },
    {
      title: '파일·시스템',
      items: [
        { name: '파일 읽기', code: `$lines = Get-Content "./data.txt"          # 줄 배열\n$text  = Get-Content "./data.txt" -Raw     # 통째로\n$head  = Get-Content "./data.txt" -TotalCount 5` },
        { name: '파일 쓰기 / 추가', code: `"첫 줄" | Set-Content "./out.txt" -Encoding UTF8\n"추가 줄" | Add-Content "./out.txt" -Encoding UTF8` },
        { name: '디렉터리 탐색', code: `# 재귀로 .txt 찾기\nGet-ChildItem -Path "." -Filter "*.txt" -Recurse |\n    Select-Object FullName, Length` },
        { name: '경로 존재 확인', code: `if (Test-Path "./data.txt") { "존재" }\nTest-Path "C:/Windows" -PathType Container   # 폴더\nNew-Item -ItemType Directory -Path "./new" -Force` },
        { name: '복사 / 이동 / 삭제', code: `Copy-Item "./a.txt" "./b.txt"\nMove-Item "./a.txt" "./bak/a.txt"\nRemove-Item "./tmp" -Recurse -Force` },
        { name: '환경 변수', code: `$env:PATH\n$env:USERPROFILE\n$env:MY_VAR = "value"   # 현재 세션에 설정` },
      ],
    },
    {
      title: '객체·파이프라인',
      items: [
        { name: 'Where / Select / Sort', code: `Get-Process |\n    Where-Object { $_.WorkingSet -gt 100MB } |\n    Sort-Object WorkingSet -Descending |\n    Select-Object Name, Id -First 5` },
        { name: 'ForEach-Object', code: `1..5 | ForEach-Object { $_ * $_ }\n# 별칭: 1..5 | % { $_ * $_ }` },
        { name: 'Group / Measure', code: `Get-ChildItem |\n    Group-Object Extension |\n    Select-Object Name, Count\n\n1..10 | Measure-Object -Sum -Average` },
        { name: '계산된 속성', code: `Get-Process | Select-Object Name,\n    @{ Name = "MB"; Expression = { [math]::Round($_.WorkingSet / 1MB, 1) } }` },
        { name: 'JSON 변환', code: `$obj = Get-Content "./data.json" -Raw | ConvertFrom-Json\n$obj.name\n$obj | ConvertTo-Json -Depth 5 | Set-Content "./out.json"` },
        { name: 'CSV 처리', code: `$users = Import-Csv "./users.csv" -Encoding UTF8\n$users | Where-Object { $_.Age -gt 20 } |\n    Export-Csv "./adults.csv" -NoTypeInformation -Encoding UTF8` },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        { name: '정규식 매칭', code: `if ($text -match "(\\d{3})-(\\d{4})") {\n    $matches[1]   # 첫 그룹\n}\n$clean = $text -replace "\\s+", " "` },
        { name: 'REST API 호출', code: `$res = Invoke-RestMethod -Uri "https://api.example.com/users" -Method Get\n$res | ForEach-Object { $_.name }` },
        { name: '날짜 포맷', code: `Get-Date -Format "yyyy-MM-dd HH:mm:ss"\n(Get-Date).AddDays(7)\n(Get-Date) - (Get-Date "2026-01-01")` },
        { name: '오류 처리 옵션', code: `# 중단시키려면 -ErrorAction Stop + try/catch\n$ErrorActionPreference = "Stop"\nGet-Item "./none" -ErrorAction SilentlyContinue` },
        { name: '스크립트 매개변수', code: `param(\n    [Parameter(Mandatory)][string]$InputPath,\n    [switch]$DryRun\n)\nif ($DryRun) { "미리보기 모드" }\n# 실행: pwsh ./script.ps1 -InputPath ./data -DryRun` },
      ],
    },
  ],
}
