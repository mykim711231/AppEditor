// Bash 5.x 코드 템플릿
// 주의: 명령치환은 $(...), 변수 ${...} 는 JS 템플릿 충돌 방지로 \${...} 표기, 정규식 백슬래시는 \\
export default {
  lang: 'Bash',
  key: 'bash',
  version: 'Bash 5.x',
  cats: [
    {
      title: '기본',
      items: [
        { name: '출력 / 변수', code: `#!/usr/bin/env bash\nname="kim"          # = 양옆 공백 없음\necho "안녕, $name"\nprintf "%s = %d\\n" "n" 42` },
        { name: '명령 치환', code: `today=$(date +%F)\nfiles=$(ls -1 | wc -l)\necho "오늘=$today, 파일수=$files"` },
        { name: '배열', code: `arr=(a b c)\necho "\${arr[0]}"          # 첫 요소\necho "\${arr[@]}"          # 전체\necho "\${#arr[@]}"         # 개수\narr+=(d)                  # 추가` },
        { name: '연관 배열 (map)', code: `declare -A map\nmap[name]="kim"\nmap[age]=20\necho "\${map[name]}"\nfor k in "\${!map[@]}"; do echo "$k=\${map[$k]}"; done` },
        { name: '산술 연산', code: `n=$((3 + 4))\n((n++))\necho $((n * 2))` },
        { name: '기본값 / 파라미터 확장', code: `name="\${1:-world}"        # 없으면 world\necho "\${name^^}"          # 대문자\necho "\${#name}"           # 길이\necho "\${name/k/K}"        # 치환` },
      ],
    },
    {
      title: '제어문',
      items: [
        { name: 'if / elif / else', code: `if [[ $n -gt 0 ]]; then\n    echo "양수"\nelif [[ $n -eq 0 ]]; then\n    echo "영"\nelse\n    echo "음수"\nfi` },
        { name: '파일 / 문자열 테스트', code: `[[ -f file.txt ]] && echo "파일 존재"\n[[ -d dir ]]      && echo "디렉터리"\n[[ -z $s ]]       && echo "빈 문자열"\n[[ -n $s ]]       && echo "값 있음"` },
        { name: 'case', code: `case "$1" in\n    start) echo "시작" ;;\n    stop)  echo "중지" ;;\n    *)     echo "사용법: $0 {start|stop}" ;;\nesac` },
        { name: 'for', code: `for f in *.txt; do\n    echo "$f"\ndone\n\nfor i in {1..5}; do echo "$i"; done\nfor ((i=0; i<5; i++)); do echo "$i"; done` },
        { name: 'while / until', code: `i=0\nwhile [[ $i -lt 5 ]]; do\n    ((i++))\ndone\n\nuntil [[ $i -eq 0 ]]; do ((i--)); done` },
        { name: '파일 한 줄씩 읽기', code: `while IFS= read -r line; do\n    echo "줄: $line"\ndone < input.txt` },
      ],
    },
    {
      title: '함수',
      items: [
        { name: '함수 정의', code: `greet() {\n    local name="$1"      # 지역 변수\n    echo "안녕, $name"\n}\ngreet "kim"` },
        { name: '반환값 / 종료코드', code: `is_even() {\n    (( $1 % 2 == 0 ))   # 종료코드 0=참\n}\nif is_even 4; then echo "짝수"; fi` },
        { name: '여러 값 받기', code: `minmax() {\n    echo "$1 $2"\n}\nread -r lo hi < <(minmax 3 9)\necho "lo=$lo hi=$hi"` },
      ],
    },
    {
      title: '파일·텍스트',
      items: [
        { name: '읽기 / 쓰기 / 추가', code: `cat file.txt\necho "한 줄" > out.txt      # 덮어쓰기\necho "추가" >> out.txt     # 이어쓰기` },
        { name: 'find', code: `find . -name "*.log" -type f\nfind . -mtime -7 -type f       # 7일 이내\nfind . -name "*.tmp" -delete` },
        { name: 'grep', code: `grep -rn "ERROR" .             # 재귀 + 줄번호\ngrep -i "warn" log.txt         # 대소문자 무시\ngrep -E "\\d{3}-\\d{4}" file     # 확장 정규식` },
        { name: 'sed / awk', code: `sed 's/old/new/g' file.txt              # 치환\nsed -n '1,10p' file.txt                 # 1~10줄\nawk -F',' '{ print $1, $3 }' data.csv   # 컬럼 추출` },
        { name: '파이프 / 리다이렉션', code: `cat access.log | grep 404 | wc -l\ncommand 2>&1 | tee out.log     # stdout+stderr 로그\ncommand 2>/dev/null            # 에러 숨김` },
        { name: 'heredoc', code: `cat <<EOF > config.txt\nname=kim\nport=8080\nEOF` },
      ],
    },
    {
      title: '인자·옵션',
      items: [
        { name: '위치 인자', code: `echo "스크립트: $0"\necho "첫 인자: $1"\necho "전체: $@"\necho "개수: $#"` },
        { name: 'getopts 옵션 파싱', code: `while getopts "f:v" opt; do\n    case $opt in\n        f) file="$OPTARG" ;;\n        v) verbose=1 ;;\n        *) echo "사용법: $0 [-f 파일] [-v]"; exit 1 ;;\n    esac\ndone` },
        { name: '인자 개수 검증', code: `if [[ $# -lt 1 ]]; then\n    echo "사용법: $0 <파일>" >&2\n    exit 1\nfi` },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        { name: '안전 모드 (권장 헤더)', code: `#!/usr/bin/env bash\nset -euo pipefail       # 오류/미정의변수/파이프오류 시 중단` },
        { name: 'trap (정리)', code: `tmp=$(mktemp)\ntrap 'rm -f "$tmp"' EXIT   # 종료 시 임시파일 삭제\necho "data" > "$tmp"` },
        { name: '정규식 매칭', code: `if [[ "$x" =~ ^[0-9]+$ ]]; then\n    echo "숫자"\nfi\n# 캡처 그룹: \${BASH_REMATCH[1]}` },
        { name: '명령 존재 확인', code: `if command -v git >/dev/null 2>&1; then\n    echo "git 설치됨"\nfi` },
        { name: '반복 + 카운트', code: `total=0\nfor f in *.txt; do\n    [[ -e "$f" ]] || continue   # 매칭 없을 때 보호\n    total=$((total + 1))\ndone\necho "처리: $total"` },
        { name: '날짜 / 타임스탬프', code: `date +"%Y-%m-%d %H:%M:%S"\nts=$(date +%s)              # epoch 초\nbackup="bak_$(date +%Y%m%d).tar.gz"` },
      ],
    },
  ],
}
