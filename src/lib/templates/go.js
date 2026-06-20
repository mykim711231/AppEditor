export default {
  lang: 'Go',
  key: 'go',
  version: 'Go 1.22 (stable)',
  cats: [
    {
      title: '기본',
      items: [
        {
          name: 'Hello World',
          code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
        },
        {
          name: '변수 선언',
          code: `import "fmt"

// 명시적 타입
var name string = "Go"
var count int = 42

// 단축 선언
version := 1.22
isStable := true

fmt.Println(name, count, version, isStable)`,
        },
        {
          name: '상수',
          code: `const Pi = 3.14159

const (
    StatusOK    = 200
    StatusNotFound = 404
)

// iota 열거형
type Direction int
const (
    North Direction = iota
    East
    South
    West
)`,
        },
        {
          name: '기본 타입',
          code: `import "fmt"

var i int = 10
var f float64 = 3.14
var b bool = true
var s string = "hello"
var r rune = '한'   // int32
var by byte = 0xFF // uint8

// 타입 변환
f2 := float64(i)
i2 := int(f)
fmt.Println(i, f, b, s, r, by, f2, i2)`,
        },
        {
          name: '포인터',
          code: `import "fmt"

x := 42
p := &x         // &: 주소 연산자 → 포인터 취득
fmt.Println(*p) // *: 역참조(dereference) → 42

*p = 100        // 포인터가 가리키는 값을 직접 수정
fmt.Println(x)  // 100 (x도 변경됨)

// new: 제로값으로 초기화된 포인터 반환
q := new(int)
*q = 7
fmt.Println(*q)`,
        },
        {
          name: 'fmt 출력 형식',
          code: `import "fmt"

name := "Gopher"
age := 3

fmt.Printf("이름: %s, 나이: %d\\n", name, age)
fmt.Printf("타입: %T, 값: %v\\n", age, age)
fmt.Printf("2진수: %b, 16진수: %x\\n", 255, 255)

s := fmt.Sprintf("Hello, %s!", name)
fmt.Println(s)`,
        },
        {
          name: '제로값',
          code: `import "fmt"

var i int       // 0
var f float64   // 0.0
var b bool      // false
var s string    // ""
var p *int      // nil
var sl []int    // nil
var m map[string]int // nil

fmt.Println(i, f, b, s, p, sl, m)`,
        },
        {
          name: 'time 포맷 / 파싱',
          code: `import (
    "fmt"
    "time"
)

func main() {
    now := time.Now()

    // Go의 기준 시각: 2006-01-02 15:04:05 (Mon Jan 2 15:04:05 MST 2006)
    fmt.Println(now.Format("2006-01-02 15:04:05"))         // 날짜+시각
    fmt.Println(now.Format("2006/01/02"))                   // 날짜만
    fmt.Println(now.Format(time.RFC3339))                   // ISO 8601

    // 문자열 → time.Time 파싱
    t, err := time.Parse("2006-01-02", "2024-03-15")
    if err != nil {
        fmt.Println("파싱 오류:", err)
        return
    }
    fmt.Println(t.Year(), t.Month(), t.Day()) // 2024 March 15

    // 시간 연산
    tomorrow := now.Add(24 * time.Hour)
    fmt.Println(tomorrow.Format("2006-01-02"))
    fmt.Println(now.Before(tomorrow)) // true
}`,
        },
        {
          name: 'os.Args / flag 패키지',
          code: `import (
    "flag"
    "fmt"
    "os"
)

func main() {
    // os.Args: 실행 파일 포함 전체 인자 슬라이스
    fmt.Println("프로그램:", os.Args[0])

    // flag: 명명된 플래그 파싱
    name := flag.String("name", "World", "인사할 이름")   // 포인터 반환
    count := flag.Int("count", 1, "반복 횟수")
    verbose := flag.Bool("v", false, "상세 출력")

    flag.Parse() // os.Args[1:]에서 플래그 파싱

    // *name처럼 역참조해서 사용
    for range *count {
        fmt.Printf("Hello, %s!\\n", *name)
    }
    if *verbose {
        fmt.Println("남은 인자:", flag.Args()) // 플래그 이후 나머지
    }
}`,
        },
        {
          name: '멀티 반환값',
          code: `import "fmt"

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Printf("%.4f\\n", result)
}`,
        },
      ],
    },
    {
      title: '제어문',
      items: [
        {
          name: 'if / else if / else',
          code: `import "fmt"

score := 75

if score >= 90 {
    fmt.Println("A")
} else if score >= 80 {
    fmt.Println("B")
} else if score >= 70 {
    fmt.Println("C")
} else {
    fmt.Println("F")
}`,
        },
        {
          name: 'if 초기화문',
          code: `import (
    "fmt"
    "strconv"
)

if v, err := strconv.Atoi("42"); err == nil {
    fmt.Println("parsed:", v)
} else {
    fmt.Println("error:", err)
}
// v, err는 블록 밖에서 접근 불가`,
        },
        {
          name: 'for 기본 / while 형태',
          code: `import "fmt"

// C 스타일
for i := 0; i < 5; i++ {
    fmt.Print(i, " ")
}

// while 형태
n := 1
for n < 32 {
    n *= 2
}
fmt.Println(n)

// 무한 루프
for {
    break
}`,
        },
        {
          name: 'range (슬라이스/맵)',
          code: `import "fmt"

nums := []int{10, 20, 30}
for i, v := range nums {
    fmt.Printf("[%d]=%d\\n", i, v)
}

m := map[string]int{"a": 1, "b": 2}
for k, v := range m {
    fmt.Printf("%s=%d\\n", k, v)
}

// 인덱스만
for i := range nums {
    fmt.Println(i)
}`,
        },
        {
          name: 'range over int (Go 1.22)',
          code: `import "fmt"

// Go 1.22: 정수에 직접 range
for i := range 5 {
    fmt.Print(i, " ") // 0 1 2 3 4
}
fmt.Println()

// 슬라이스 인덱스 대체
for i := range 10 {
    if i%2 == 0 {
        fmt.Print(i, " ")
    }
}`,
        },
        {
          name: 'switch',
          code: `import "fmt"

day := "Mon"

switch day {
case "Mon", "Tue", "Wed", "Thu", "Fri":
    fmt.Println("평일")
case "Sat", "Sun":
    fmt.Println("주말")
default:
    fmt.Println("알 수 없음")
}

// 표현식 없는 switch (if-else 대체)
x := 42
switch {
case x < 0:
    fmt.Println("음수")
case x == 0:
    fmt.Println("영")
default:
    fmt.Println("양수")
}`,
        },
        {
          name: 'break / continue / label',
          code: `import "fmt"

outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if i == 1 && j == 1 {
            break outer
        }
        fmt.Printf("(%d,%d) ", i, j)
    }
}

for i := range 10 {
    if i%2 == 0 {
        continue
    }
    fmt.Print(i, " ") // 1 3 5 7 9
}`,
        },
        {
          name: 'defer',
          code: `import "fmt"

func main() {
    defer fmt.Println("마지막 실행") // 함수 종료 시 호출

    for i := range 3 {
        defer fmt.Println(i) // LIFO: 2 1 0
    }
    fmt.Println("함수 본문")
}`,
        },
        {
          name: 'defer + recover (패닉 복구)',
          code: `import "fmt"

func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered: %v", r)
        }
    }()
    return a / b, nil
}

func main() {
    v, err := safeDiv(10, 0)
    fmt.Println(v, err)
}`,
        },
      ],
    },
    {
      title: '함수',
      items: [
        {
          name: '기본 함수',
          code: `import "fmt"

func add(a, b int) int {
    return a + b
}

// 같은 타입 매개변수 축약
func mul(a, b int) int { return a * b }

func main() {
    fmt.Println(add(3, 4))
    fmt.Println(mul(3, 4))
}`,
        },
        {
          name: '이름 있는 반환값',
          code: `func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, v := range nums[1:] {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return // naked return
}`,
        },
        {
          name: '가변 인자 (variadic)',
          code: `import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3))        // 6
    s := []int{4, 5, 6}
    fmt.Println(sum(s...))           // 15
}`,
        },
        {
          name: '일급 함수 / 함수 타입',
          code: `import "fmt"

func apply(nums []int, f func(int) int) []int {
    result := make([]int, len(nums))
    for i, v := range nums {
        result[i] = f(v)
    }
    return result
}

func main() {
    double := func(x int) int { return x * 2 }
    fmt.Println(apply([]int{1, 2, 3}, double)) // [2 4 6]
}`,
        },
        {
          name: '클로저',
          code: `import "fmt"

func counter(start int) func() int {
    n := start // 클로저가 캡처하는 변수 (호출 간 상태 유지)
    return func() int {
        v := n
        n++ // 외부 변수 n을 수정
        return v
    }
}

func main() {
    c := counter(10)
    fmt.Println(c(), c(), c()) // 10 11 12
}`,
        },
        {
          name: '즉시 실행 함수 (IIFE)',
          code: `import "fmt"

result := func(x, y int) int {
    return x + y
}(3, 7)

fmt.Println(result) // 10

// 초기화 블록 패턴
config := func() map[string]string {
    m := make(map[string]string)
    m["env"] = "production"
    m["port"] = "8080"
    return m
}()
_ = config`,
        },
        {
          name: '함수형 옵션 패턴',
          code: `type Server struct {
    host string
    port int
}

type Option func(*Server)

func WithHost(h string) Option { return func(s *Server) { s.host = h } }
func WithPort(p int) Option    { return func(s *Server) { s.port = p } }

func NewServer(opts ...Option) *Server {
    s := &Server{host: "localhost", port: 8080}
    for _, o := range opts {
        o(s)
    }
    return s
}`,
        },
        {
          name: 'init 함수',
          code: `import "fmt"

// init은 패키지 로드 시 자동 실행; main 이전, import 순서대로
var ready bool

func init() {
    ready = true
    fmt.Println("패키지 초기화")
}

func main() {
    fmt.Println("main 시작, ready:", ready)
}`,
        },
      ],
    },
    {
      title: '구조체/메서드',
      items: [
        {
          name: '구조체 정의 및 생성',
          code: `import "fmt"

type Point struct {
    X, Y float64
}

func main() {
    p1 := Point{X: 1.0, Y: 2.0}
    p2 := Point{3.0, 4.0}     // 순서 기반
    p3 := &Point{X: 5.0}      // 포인터

    fmt.Println(p1, p2, *p3)
    fmt.Println(p1.X, p1.Y)
}`,
        },
        {
          name: '메서드 (값/포인터 리시버)',
          code: `import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

// 값 리시버: 읽기 전용
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

// 포인터 리시버: 변경 가능
func (c *Circle) Scale(factor float64) {
    c.Radius *= factor
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("%.2f\\n", c.Area())
    c.Scale(2)
    fmt.Println(c.Radius) // 10
}`,
        },
        {
          name: '구조체 태그 (JSON)',
          code: `import (
    "encoding/json"
    "fmt"
)

type User struct {
    ID       int    \`json:"id"\`              // JSON 키 이름 지정
    Name     string \`json:"name"\`
    Email    string \`json:"email,omitempty"\` // 빈 값이면 필드 생략
    Password string \`json:"-"\`              // JSON에서 완전히 제외
}

func main() {
    u := User{ID: 1, Name: "Alice"}
    b, _ := json.Marshal(u)
    fmt.Println(string(b))
    // {"id":1,"name":"Alice"}
}`,
        },
        {
          name: 'JSON 인코딩/디코딩 (구조체·맵)',
          code: `import (
    "encoding/json"
    "fmt"
)

type Article struct {
    Title  string   \`json:"title"\`
    Tags   []string \`json:"tags"\`
    Views  int      \`json:"views"\`
}

func main() {
    // 구조체 → JSON
    a := Article{Title: "Go 입문", Tags: []string{"go", "tutorial"}, Views: 100}
    b, _ := json.Marshal(a)
    fmt.Println(string(b))

    // JSON → 구조체 (역직렬화)
    var a2 Article
    json.Unmarshal(b, &a2)
    fmt.Println(a2.Title, a2.Tags)

    // JSON → map (스키마 미정 시)
    var m map[string]any
    json.Unmarshal(b, &m)
    fmt.Println(m["title"], m["views"])

    // 들여쓰기 출력
    pretty, _ := json.MarshalIndent(a, "", "  ")
    fmt.Println(string(pretty))
}`,
        },
        {
          name: '임베딩 (구성)',
          code: `import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " speaks"
}

type Dog struct {
    Animal          // 임베딩
    Breed string
}

func main() {
    d := Dog{Animal: Animal{"Rex"}, Breed: "Husky"}
    fmt.Println(d.Speak()) // Rex speaks (프로모션)
    fmt.Println(d.Name)    // Rex
}`,
        },
        {
          name: '생성자 함수 (New 패턴)',
          code: `import (
    "fmt"
    "time"
)

type Config struct {
    Host    string
    Port    int
    Timeout time.Duration
}

func NewConfig(host string, port int) *Config {
    return &Config{
        Host:    host,
        Port:    port,
        Timeout: 30 * time.Second,
    }
}

func main() {
    cfg := NewConfig("localhost", 5432)
    fmt.Println(cfg.Host, cfg.Port)
}`,
        },
        {
          name: 'Stringer 인터페이스 구현',
          code: `import "fmt"

type Point struct {
    X, Y int
}

func (p Point) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func main() {
    p := Point{3, 4}
    fmt.Println(p)        // (3, 4)
    fmt.Printf("%v\\n", p) // (3, 4)
}`,
        },
        {
          name: '익명 구조체',
          code: `import "fmt"

// 임시 데이터 구조
person := struct {
    Name string
    Age  int
}{"Bob", 30}

fmt.Println(person.Name, person.Age)

// 테이블 기반 테스트에 유용
tests := []struct {
    input    int
    expected int
}{
    {1, 1},
    {2, 4},
    {3, 9},
}
_ = tests`,
        },
        {
          name: '메서드 표현식',
          code: `import "fmt"

type Adder struct{ Base int }

func (a Adder) Add(x int) int { return a.Base + x }

func main() {
    a := Adder{Base: 10}

    // 메서드 값
    addFn := a.Add
    fmt.Println(addFn(5)) // 15

    // 메서드 표현식
    expr := Adder.Add
    fmt.Println(expr(a, 5)) // 15
}`,
        },
      ],
    },
    {
      title: '인터페이스',
      items: [
        {
          name: '인터페이스 정의 및 구현',
          code: `import "fmt"

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Rect struct{ W, H float64 }

func (r Rect) Area() float64      { return r.W * r.H }
func (r Rect) Perimeter() float64 { return 2 * (r.W + r.H) }

func printShape(s Shape) {
    fmt.Printf("넓이=%.2f, 둘레=%.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    printShape(Rect{3, 4})
}`,
        },
        {
          name: '빈 인터페이스 / any',
          code: `import "fmt"

func describe(i any) {
    fmt.Printf("타입: %T, 값: %v\\n", i, i)
}

func main() {
    describe(42)
    describe("hello")
    describe(true)
    describe([]int{1, 2, 3})
}`,
        },
        {
          name: '타입 어서션',
          code: `import "fmt"

var i any = "hello"

// 안전한 어서션
s, ok := i.(string)
if ok {
    fmt.Println("문자열:", s)
}

// 직접 어서션 (실패 시 panic)
s2 := i.(string)
fmt.Println(s2)`,
        },
        {
          name: '타입 스위치',
          code: `import "fmt"

func typeCheck(i any) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("정수: %d", v)
    case string:
        return fmt.Sprintf("문자열: %q", v)
    case bool:
        return fmt.Sprintf("불리언: %t", v)
    case []int:
        return fmt.Sprintf("int 슬라이스 len=%d", len(v))
    default:
        return fmt.Sprintf("알 수 없는 타입: %T", v)
    }
}`,
        },
        {
          name: '인터페이스 합성',
          code: `type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// 합성
type ReadWriter interface {
    Reader
    Writer
}

// 표준 라이브러리의 io.ReadWriter와 동일한 패턴`,
        },
        {
          name: 'error 인터페이스',
          code: `import "fmt"

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation: %s - %s", e.Field, e.Message)
}

func validate(name string) error {
    if name == "" {
        return &ValidationError{Field: "name", Message: "required"}
    }
    return nil
}`,
        },
        {
          name: '인터페이스 nil 함정',
          code: `import "fmt"

type MyError struct{ msg string }
func (e *MyError) Error() string { return e.msg }

// 잘못된 패턴: 인터페이스에 담긴 nil 포인터
func bad() error {
    var err *MyError // nil *MyError (타입 정보는 있음)
    return err       // 인터페이스 = (타입=*MyError, 값=nil) → nil 아님!
}

// 올바른 패턴: 진짜 nil error 반환
func good() error {
    return nil // 인터페이스 = (타입=nil, 값=nil) → nil
}

func main() {
    fmt.Println(bad() == nil)  // false (함정!)
    fmt.Println(good() == nil) // true
}`,
        },
        {
          name: '함수형 인터페이스 (http.Handler)',
          code: `import (
    "fmt"
    "net/http"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request)

func (f HandlerFunc) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    f(w, r)
}

// 일반 함수를 Handler 인터페이스로 변환
func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello!")
}

var h http.Handler = http.HandlerFunc(hello)`,
        },
      ],
    },
    {
      title: '에러처리',
      items: [
        {
          name: '에러 반환 기본',
          code: `import (
    "log"
    "os"
)

func openFile(path string) (*os.File, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    return f, nil
}

func main() {
    f, err := openFile("test.txt")
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()
}`,
        },
        {
          name: 'fmt.Errorf %w (에러 래핑)',
          code: `import (
    "errors"
    "fmt"
    "os"
)

func readConfig(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("readConfig %q: %w", path, err)
    }
    return data, nil
}

func main() {
    _, err := readConfig("config.json")
    if errors.Is(err, os.ErrNotExist) {
        fmt.Println("파일 없음")
    }
}`,
        },
        {
          name: 'errors.Is / errors.As',
          code: `import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

type DBError struct {
    Code int
    Msg  string
}
func (e *DBError) Error() string { return e.Msg }

func query() error {
    return fmt.Errorf("query failed: %w", &DBError{Code: 404, Msg: "row not found"})
}

func main() {
    err := query()
    var dbErr *DBError
    if errors.As(err, &dbErr) {
        fmt.Println("DB 에러 코드:", dbErr.Code)
    }
}`,
        },
        {
          name: '커스텀 에러 타입',
          code: `import "fmt"

type AppError struct {
    Code    int
    Message string
    Err     error
}

func (e *AppError) Error() string {
    if e.Err != nil {
        return fmt.Sprintf("[%d] %s: %v", e.Code, e.Message, e.Err)
    }
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error { return e.Err }`,
        },
        {
          name: 'sentinel 에러',
          code: `import (
    "errors"
    "fmt"
)

var (
    ErrNotFound   = errors.New("not found")
    ErrPermission = errors.New("permission denied")
    ErrTimeout    = errors.New("timeout")
)

// 반환 타입을 string으로 단순화 (User 타입 불필요)
func findUser(id int) (string, error) {
    if id <= 0 {
        // ErrNotFound를 래핑해 체인 가능하게 함
        return "", fmt.Errorf("findUser: %w", ErrNotFound)
    }
    return "Alice", nil
}

func main() {
    _, err := findUser(-1)
    fmt.Println(errors.Is(err, ErrNotFound)) // true
}`,
        },
        {
          name: 'panic / recover',
          code: `import (
    "fmt"
    "strconv"
)

func mustParse(s string) int {
    v, err := strconv.Atoi(s)
    if err != nil {
        panic(fmt.Sprintf("mustParse: invalid int %q", s))
    }
    return v
}

func safeMustParse(s string) (v int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("%v", r)
        }
    }()
    return mustParse(s), nil
}`,
        },
        {
          name: '에러 체인 순회',
          code: `import (
    "errors"
    "fmt"
)

func main() {
    err1 := errors.New("root cause")
    err2 := fmt.Errorf("layer 2: %w", err1)
    err3 := fmt.Errorf("layer 3: %w", err2)

    // errors.Is는 체인 전체를 검색함
    fmt.Println(errors.Is(err3, err1)) // true

    // Unwrap으로 체인 직접 순회
    for e := err3; e != nil; e = errors.Unwrap(e) {
        fmt.Println(e)
    }
}`,
        },
        {
          name: 'log/slog 구조화 로깅',
          code: `import (
    "fmt"
    "log/slog" // Go 1.21+: 구조화 로깅 표준 패키지
)

func process(id int) error {
    slog.Info("처리 시작", "id", id)

    if id < 0 {
        err := fmt.Errorf("invalid id: %d", id)
        slog.Error("처리 실패", "id", id, "error", err)
        return err
    }

    slog.Info("처리 완료", "id", id)
    return nil
}`,
        },
      ],
    },
    {
      title: '동시성(goroutine/channel)',
      items: [
        {
          name: 'goroutine 기본',
          code: `import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    for i := range 5 {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Println("goroutine", n)
        }(i)
    }

    wg.Wait()
    fmt.Println("모두 완료")
}`,
        },
        {
          name: 'channel 기본',
          code: `import "fmt"

func sum(nums []int, ch chan<- int) {
    total := 0
    for _, v := range nums {
        total += v
    }
    ch <- total
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6}
    ch := make(chan int)

    go sum(nums[:3], ch)
    go sum(nums[3:], ch)

    a, b := <-ch, <-ch
    fmt.Println(a + b) // 21
}`,
        },
        {
          name: 'buffered channel',
          code: `import "fmt"

ch := make(chan int, 3) // 버퍼 크기 3: 수신자 없이도 3개까지 전송 가능

ch <- 1
ch <- 2
ch <- 3
// ch <- 4 // 블로킹: 버퍼가 가득 찼으므로 수신자가 읽을 때까지 대기

fmt.Println(<-ch)             // 1 (FIFO)
fmt.Println(len(ch), cap(ch)) // 2 3

// close 후 range로 남은 값 모두 수신
close(ch)
for v := range ch {
    fmt.Println(v) // 2, 3
}`,
        },
        {
          name: 'select',
          code: `import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { time.Sleep(1 * time.Second); ch1 <- "one" }()
    go func() { time.Sleep(2 * time.Second); ch2 <- "two" }()

    for range 2 {
        select {
        case msg := <-ch1:
            fmt.Println("ch1:", msg)
        case msg := <-ch2:
            fmt.Println("ch2:", msg)
        }
    }
}`,
        },
        {
          name: 'context 취소',
          code: `import (
    "context"
    "fmt"
    "time"
)

func doWork(ctx context.Context) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        default:
            // 작업 수행
            time.Sleep(100 * time.Millisecond)
            fmt.Println("working...")
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer cancel()
    fmt.Println(doWork(ctx))
}`,
        },
        {
          name: 'sync.Mutex',
          code: `import "sync"

type SafeCounter struct {
    mu sync.Mutex    // 뮤텍스: 동시에 하나의 goroutine만 접근 허용
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()         // 잠금
    defer c.mu.Unlock() // 함수 종료 시 반드시 해제
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}`,
        },
        {
          name: 'sync.Once',
          code: `import (
    "fmt"
    "sync"
)

type Singleton struct{ data string }

var (
    instance *Singleton
    once     sync.Once // 함수가 딱 한 번만 실행되도록 보장
)

func GetInstance() *Singleton {
    once.Do(func() {
        // 여러 goroutine이 동시에 호출해도 이 블록은 최초 1회만 실행
        instance = &Singleton{data: "initialized"}
        fmt.Println("초기화 실행")
    })
    return instance
}`,
        },
        {
          name: 'sync.RWMutex (읽기/쓰기 잠금)',
          code: `import (
    "fmt"
    "sync"
)

// RWMutex: 읽기는 동시에 허용, 쓰기는 배타적으로 잠금
type RWCounter struct {
    mu    sync.RWMutex
    count int
}

func (c *RWCounter) Inc() {
    c.mu.Lock()         // 쓰기 잠금 (읽기/쓰기 모두 차단)
    defer c.mu.Unlock()
    c.count++
}

func (c *RWCounter) Value() int {
    c.mu.RLock()         // 읽기 잠금 (다른 읽기는 허용)
    defer c.mu.RUnlock()
    return c.count
}

func main() {
    c := &RWCounter{}
    c.Inc()
    fmt.Println(c.Value()) // 1
}`,
        },
        {
          name: 'sync/atomic (원자적 연산)',
          code: `import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64 // atomic 연산 대상은 64비트 정렬 필요

    var wg sync.WaitGroup
    for range 1000 {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1) // 원자적 증가 (뮤텍스 없이 안전)
        }()
    }
    wg.Wait()

    fmt.Println(atomic.LoadInt64(&counter)) // 1000
}`,
        },
        {
          name: '워커 풀 (Worker Pool)',
          code: `import (
    "fmt"
    "sync"
)

func workerPool(jobs <-chan int, results chan<- int, numWorkers int) {
    var wg sync.WaitGroup
    for range numWorkers {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs { // jobs 채널이 닫히면 루프 종료
                results <- j * j  // 작업 처리: 제곱 계산
            }
        }()
    }
    // 모든 워커 완료 후 결과 채널 닫기
    go func() { wg.Wait(); close(results) }()
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan int, 10)

    workerPool(jobs, results, 3)

    for i := 1; i <= 5; i++ { jobs <- i }
    close(jobs)

    for r := range results {
        fmt.Println(r)
    }
}`,
        },
        {
          name: 'context.WithCancel',
          code: `import (
    "context"
    "fmt"
    "time"
)

func generate(ctx context.Context) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        n := 0
        for {
            select {
            case <-ctx.Done(): // cancel() 호출 시 종료
                fmt.Println("생성기 종료:", ctx.Err())
                return
            case ch <- n:
                n++
                time.Sleep(100 * time.Millisecond)
            }
        }
    }()
    return ch
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel() // 리소스 누수 방지: 반드시 defer

    for v := range generate(ctx) {
        fmt.Println(v)
        if v == 3 {
            cancel() // 취소 신호 전송
        }
    }
}`,
        },
        {
          name: 'errgroup (동시 에러 처리)',
          code: `import (
    "context"
    "fmt"
    "net/http"
    "golang.org/x/sync/errgroup" // go get golang.org/x/sync
)

func fetchAll(urls []string) error {
    g, ctx := errgroup.WithContext(context.Background())

    for _, url := range urls {
        // Go 1.22+: 루프 변수가 반복마다 새로 생성되므로 url := url 불필요
        g.Go(func() error {
            req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
            if err != nil {
                return fmt.Errorf("request %s: %w", url, err)
            }
            resp, err := http.DefaultClient.Do(req)
            if err != nil {
                return err
            }
            defer resp.Body.Close()
            return nil
        })
    }
    return g.Wait()
}`,
        },
        {
          name: 'fan-out / fan-in 패턴',
          code: `import "sync"

func fanOut(in <-chan int, n int) []<-chan int {
    outs := make([]<-chan int, n)
    for i := range n {
        out := make(chan int)
        outs[i] = out
        go func() {
            defer close(out)
            for v := range in {
                out <- v * v
            }
        }()
    }
    return outs
}

func merge(cs ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    for _, c := range cs {
        wg.Add(1)
        go func(ch <-chan int) {
            defer wg.Done()
            for v := range ch { out <- v }
        }(c)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}`,
        },
      ],
    },
    {
      title: '컬렉션(slice/map)',
      items: [
        {
          name: '슬라이스 기본',
          code: `import "fmt"

// 선언
var s []int                     // nil 슬라이스 (len=0, cap=0)
s2 := []int{1, 2, 3}           // 리터럴 초기화
s3 := make([]int, 5)            // len=5, cap=5 (제로값으로 채움)
s4 := make([]int, 0, 10)        // len=0, cap=10 (사전 할당으로 재할당 방지)

_ = s; _ = s3; _ = s4

// append: 용량 초과 시 자동으로 새 배열 할당
s2 = append(s2, 4, 5)
s2 = append(s2, []int{6, 7}...) // 슬라이스 전개

fmt.Println(s2, len(s2), cap(s2))`,
        },
        {
          name: '슬라이스 조작',
          code: `import "fmt"

s := []int{1, 2, 3, 4, 5}

// 슬라이싱
fmt.Println(s[1:3])  // [2 3]
fmt.Println(s[:2])   // [1 2]
fmt.Println(s[3:])   // [4 5]

// 복사
dst := make([]int, len(s))
copy(dst, s)

// 요소 삭제 (인덱스 i)
i := 2
s = append(s[:i], s[i+1:]...)
fmt.Println(s) // [1 2 4 5]`,
        },
        {
          name: 'slices 패키지 (Go 1.21+)',
          code: `import (
    "fmt"
    "slices"
)

nums := []int{3, 1, 4, 1, 5, 9, 2, 6}

slices.Sort(nums)
fmt.Println(nums) // [1 1 2 3 4 5 6 9]

// BinarySearch는 (인덱스, 찾았는지여부) 반환
idx, found := slices.BinarySearch(nums, 5)
fmt.Println(idx, found) // 5 true

fmt.Println(slices.Contains(nums, 4)) // true
fmt.Println(slices.Max(nums))         // 9
fmt.Println(slices.Min(nums))         // 1`,
        },
        {
          name: '맵 기본',
          code: `import "fmt"

// 선언 및 초기화
m := map[string]int{
    "apple":  5,
    "banana": 3,
    "cherry": 8,
}

// 읽기 / 존재 확인
v, ok := m["apple"]
fmt.Println(v, ok)    // 5 true

// 삭제
delete(m, "banana")

// 순회
for k, v := range m {
    fmt.Printf("%s: %d\\n", k, v)
}`,
        },
        {
          name: 'maps 패키지 (Go 1.21+)',
          code: `import (
    "fmt"
    "maps"
    "slices"
)

m := map[string]int{"a": 1, "b": 2, "c": 3}

// 키 슬라이스 정렬 (맵 순회는 순서 미보장)
keys := maps.Keys(m) // []string
slices.Sort(keys)
fmt.Println(keys) // [a b c]

// 복사
m2 := maps.Clone(m)

// 조건부 삭제
maps.DeleteFunc(m2, func(k string, v int) bool {
    return v < 2
})
fmt.Println(m2) // map[b:2 c:3]`,
        },
        {
          name: '집합 (set) 패턴',
          code: `import "fmt"

// map[T]struct{} 로 집합 구현 (struct{}는 0바이트 → 메모리 절약)
type Set[T comparable] map[T]struct{}

func (s Set[T]) Add(v T)      { s[v] = struct{}{} }
func (s Set[T]) Has(v T) bool { _, ok := s[v]; return ok }
func (s Set[T]) Del(v T)      { delete(s, v) }

func main() {
    s := make(Set[string])
    s.Add("go")
    s.Add("rust")
    fmt.Println(s.Has("go"))   // true
    fmt.Println(s.Has("java")) // false
}`,
        },
        {
          name: 'sort.Slice / sort.SliceStable',
          code: `import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 30},
    }

    // 나이 오름차순, 같으면 이름 오름차순
    sort.SliceStable(people, func(i, j int) bool {
        if people[i].Age != people[j].Age {
            return people[i].Age < people[j].Age
        }
        return people[i].Name < people[j].Name
    })

    for _, p := range people {
        fmt.Printf("%s(%d)\\n", p.Name, p.Age)
    }
}`,
        },
        {
          name: 'slices.Index / slices.Compact (Go 1.21+)',
          code: `import (
    "fmt"
    "slices"
)

func main() {
    nums := []int{1, 2, 2, 3, 3, 3, 4}

    // Compact: 인접한 중복 제거 (정렬된 슬라이스에서 유일값 추출)
    unique := slices.Compact(nums)
    fmt.Println(unique) // [1 2 3 4]

    // Index: 첫 번째로 일치하는 인덱스 반환 (없으면 -1)
    idx := slices.Index(unique, 3)
    fmt.Println(idx) // 2

    // Reverse: 제자리 역순
    slices.Reverse(unique)
    fmt.Println(unique) // [4 3 2 1]
}`,
        },
        {
          name: '슬라이스 필터/맵/리듀스',
          code: `import "fmt"

func Filter[T any](s []T, f func(T) bool) []T {
    var out []T
    for _, v := range s {
        if f(v) {
            out = append(out, v)
        }
    }
    return out
}

func Map[T, U any](s []T, f func(T) U) []U {
    out := make([]U, len(s))
    for i, v := range s {
        out[i] = f(v)
    }
    return out
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6}
    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    doubled := Map(evens, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [4 8 12]
}`,
        },
        {
          name: '2D 슬라이스 (행렬)',
          code: `import "fmt"

rows, cols := 3, 4
matrix := make([][]int, rows)
for i := range matrix {
    matrix[i] = make([]int, cols)
}

// 값 설정
for i := range rows {
    for j := range cols {
        matrix[i][j] = i*cols + j
    }
}

for _, row := range matrix {
    fmt.Println(row)
}`,
        },
      ],
    },
    {
      title: '문자열',
      items: [
        {
          name: '문자열 기본',
          code: `import "fmt"

s := "Hello, 세계"

fmt.Println(len(s))           // 바이트 수
fmt.Println(len([]rune(s)))   // 문자 수 (유니코드)

// 바이트 순회
for i := 0; i < len(s); i++ {
    fmt.Printf("%x ", s[i])
}

// 유니코드 순회
for i, r := range s {
    fmt.Printf("%d:%c ", i, r)
}`,
        },
        {
          name: 'strings 패키지',
          code: `import (
    "fmt"
    "strings"
)

s := "  Hello, Go World!  "

fmt.Println(strings.TrimSpace(s))
fmt.Println(strings.ToUpper(s))
fmt.Println(strings.Contains(s, "Go"))
fmt.Println(strings.HasPrefix(s, "  Hello"))
fmt.Println(strings.Replace(s, "Go", "Golang", 1))
fmt.Println(strings.Split("a,b,c", ",")) // [a b c]
fmt.Println(strings.Join([]string{"x", "y"}, "-")) // x-y
fmt.Println(strings.Count(s, "l")) // 3`,
        },
        {
          name: 'strings.Builder (효율적 연결)',
          code: `import (
    "fmt"
    "strings"
)

var sb strings.Builder

for i := range 5 {
    fmt.Fprintf(&sb, "item%d", i)
    if i < 4 {
        sb.WriteString(", ")
    }
}

result := sb.String()
fmt.Println(result)
// item0, item1, item2, item3, item4`,
        },
        {
          name: 'strconv',
          code: `import (
    "fmt"
    "strconv"
)

// 정수 변환
n, err := strconv.Atoi("42")
fmt.Println(n, err)           // 42 <nil>

s := strconv.Itoa(100)
fmt.Println(s)                // "100"

// float 변환
f, _ := strconv.ParseFloat("3.14", 64)
fmt.Println(f)

// bool 변환
b, _ := strconv.ParseBool("true")
fmt.Println(b)`,
        },
        {
          name: 'bufio.Scanner (stdin 한 줄씩 읽기)',
          code: `import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin) // 표준 입력에서 줄 단위 스캔

    fmt.Println("입력하세요 (빈 줄로 종료):")
    for scanner.Scan() {         // Scan()은 한 줄 읽고 true 반환; EOF면 false
        line := scanner.Text()   // 현재 줄 문자열 (개행 제외)
        if strings.TrimSpace(line) == "" {
            break
        }
        fmt.Println("입력:", line)
    }

    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "읽기 오류:", err)
    }
}`,
        },
        {
          name: '정규표현식',
          code: `import (
    "fmt"
    "regexp"
)

// 백틱 원시 문자열 사용 → 이스케이프 없이 패턴 작성 가능
re := regexp.MustCompile(\`\\d+\`) // 숫자 1개 이상

fmt.Println(re.MatchString("abc123"))              // true
fmt.Println(re.FindString("abc123def456"))         // "123" (첫 번째 매치)
fmt.Println(re.FindAllString("abc123def456", -1))  // [123 456] (전체)

// 치환
re2 := regexp.MustCompile(\`\\s+\`) // 공백 1개 이상
result := re2.ReplaceAllString("hello   world", " ")
fmt.Println(result) // "hello world"`,
        },
        {
          name: 'Unicode / rune 처리',
          code: `import (
    "fmt"
    "unicode"
)

s := "Hello, 世界! 123"

for _, r := range s {
    switch {
    case unicode.IsLetter(r):
        fmt.Printf("%c:문자 ", r)
    case unicode.IsDigit(r):
        fmt.Printf("%c:숫자 ", r)
    case unicode.IsSpace(r):
        fmt.Printf("_:공백 ")
    }
}`,
        },
        {
          name: '문자열 포맷팅',
          code: `import "fmt"

type Point struct{ X, Y int }
p := Point{3, 4}

fmt.Printf("%v\\n",  p) // {3 4}
fmt.Printf("%+v\\n", p) // {X:3 Y:4}
fmt.Printf("%#v\\n", p) // main.Point{X:3, Y:4}
fmt.Printf("%T\\n",  p) // main.Point

// 너비/정렬
fmt.Printf("%10d\\n", 42)   //         42
fmt.Printf("%-10d|\\n", 42) // 42        |
fmt.Printf("%010d\\n", 42)  // 0000000042`,
        },
        {
          name: 'text/template',
          code: `import (
    "os"
    "text/template"
)

// 백틱 원시 문자열로 템플릿 가독성 향상
const tmpl = \`이름: {{.Name}}, 나이: {{.Age}}
{{if .Active}}활성{{else}}비활성{{end}}\`

t := template.Must(template.New("t").Parse(tmpl))

data := struct {
    Name   string
    Age    int
    Active bool
}{"Alice", 30, true}

t.Execute(os.Stdout, data)`,
        },
      ],
    },
    {
      title: '제네릭',
      items: [
        {
          name: '제네릭 함수',
          code: `import (
    "fmt"
    "strconv"
)

func Map[T, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    strs := Map(nums, strconv.Itoa)
    fmt.Println(strs) // [1 2 3 4 5]
}`,
        },
        {
          name: '타입 제약 (constraints)',
          code: `import (
    "cmp"
    "fmt"
)

func Min[T cmp.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

func Max[T cmp.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Min(3, 5))       // 3
    fmt.Println(Min(3.14, 2.71)) // 2.71
    fmt.Println(Min("b", "a"))   // a
}`,
        },
        {
          name: '제네릭 구조체',
          code: `type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T)       { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 {
        return zero, false
    }
    v := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return v, true
}
func (s *Stack[T]) Len() int { return len(s.items) }`,
        },
        {
          name: '유니온 타입 제약',
          code: `import "fmt"

// ~int: int를 기반 타입으로 하는 모든 타입 포함 (예: type MyInt int)
type Number interface {
    ~int | ~int32 | ~int64 | ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T // 제네릭 제로값
    for _, v := range nums {
        total += v
    }
    return total
}

func main() {
    fmt.Println(Sum([]int{1, 2, 3}))           // 6
    fmt.Println(Sum([]float64{1.1, 2.2, 3.3})) // 6.6
}`,
        },
        {
          name: '제네릭 Result 타입',
          code: `// Rust의 Result<T, E>와 유사한 패턴
type Result[T any] struct {
    value T
    err   error
}

func Ok[T any](v T) Result[T]     { return Result[T]{value: v} }
func Err[T any](e error) Result[T] { return Result[T]{err: e} }

func (r Result[T]) Unwrap() (T, error) { return r.value, r.err }
func (r Result[T]) IsOk() bool         { return r.err == nil }`,
        },
        {
          name: '제네릭 캐시 (sync.Map 래퍼)',
          code: `import "sync"

// sync.Map: goroutine-safe 맵 (읽기 많고 쓰기 적을 때 유리)
type Cache[K comparable, V any] struct {
    m sync.Map
}

func (c *Cache[K, V]) Set(k K, v V) { c.m.Store(k, v) }
func (c *Cache[K, V]) Get(k K) (V, bool) {
    v, ok := c.m.Load(k)
    if !ok {
        var zero V // 제네릭 제로값 반환
        return zero, false
    }
    return v.(V), true // any → V 타입 단언
}

func (c *Cache[K, V]) Delete(k K) { c.m.Delete(k) }`,
        },
        {
          name: 'Reduce 제네릭',
          code: `import "fmt"

func Reduce[T, U any](s []T, init U, f func(U, T) U) U {
    acc := init
    for _, v := range s {
        acc = f(acc, v)
    }
    return acc
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    sum := Reduce(nums, 0, func(acc, v int) int { return acc + v })
    fmt.Println(sum) // 15

    words := []string{"Go", "is", "great"}
    sentence := Reduce(words, "", func(acc, v string) string {
        if acc == "" { return v }
        return acc + " " + v
    })
    fmt.Println(sentence)
}`,
        },
        {
          name: '제네릭 Ptr 헬퍼',
          code: `import "fmt"

// 리터럴 값의 포인터를 반환하는 유틸
func Ptr[T any](v T) *T { return &v }

func main() {
    p := Ptr(42)
    fmt.Println(*p) // 42

    s := Ptr("hello")
    fmt.Println(*s) // hello

    // JSON에서 선택적 필드에 유용
    type Cfg struct{ Debug *bool }
    cfg := Cfg{Debug: Ptr(true)}
    fmt.Println(*cfg.Debug)
}`,
        },
      ],
    },
    {
      title: '테스트',
      items: [
        {
          name: '테이블 기반 테스트 (testing.T)',
          code: `package main

import "testing"

func Add(a, b int) int { return a + b }

// 파일명: add_test.go  →  go test ./...
func TestAdd(t *testing.T) {
    // 테이블: 여러 케이스를 하나의 함수로 관리
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"양수+양수", 1, 2, 3},
        {"음수+양수", -1, 1, 0},
        {"제로", 0, 0, 0},
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) { // 서브테스트: -run=TestAdd/양수 로 개별 실행 가능
            got := Add(tc.a, tc.b)
            if got != tc.expected {
                t.Errorf("Add(%d,%d) = %d; want %d", tc.a, tc.b, got, tc.expected)
            }
        })
    }
}`,
        },
        {
          name: '벤치마크 (testing.B)',
          code: `package main

import (
    "strings"
    "testing"
)

// 파일명: xxx_test.go  →  go test -bench=. -benchmem
func BenchmarkBuilder(b *testing.B) {
    // b.N: 벤치마크 프레임워크가 자동으로 조정하는 반복 횟수
    for range b.N {
        var sb strings.Builder
        for i := range 100 {
            sb.WriteString("x")
            _ = i
        }
        _ = sb.String()
    }
}

func BenchmarkConcat(b *testing.B) {
    for range b.N {
        s := ""
        for range 100 {
            s += "x" // 매번 새 문자열 할당 → 느림
        }
        _ = s
    }
}`,
        },
      ],
    },
    {
      title: 'HTTP',
      items: [
        {
          name: 'HTTP 클라이언트 (타임아웃)',
          code: `import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

func fetchJSON(url string, out any) error {
    // 타임아웃 있는 클라이언트: http.DefaultClient 직접 사용 금지
    client := &http.Client{Timeout: 10 * time.Second}

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return fmt.Errorf("요청 생성: %w", err)
    }

    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("요청 실행: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("HTTP %d", resp.StatusCode)
    }
    return json.NewDecoder(resp.Body).Decode(out) // 스트리밍 디코드
}`,
        },
        {
          name: 'HTTP 서버 (ServeMux)',
          code: `import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

// Go 1.22: ServeMux가 메서드·경로변수 지원
func main() {
    mux := http.NewServeMux()

    // GET /hello/{name}: 경로 변수 추출
    mux.HandleFunc("GET /hello/{name}", func(w http.ResponseWriter, r *http.Request) {
        name := r.PathValue("name") // Go 1.22 신규 메서드
        fmt.Fprintf(w, "Hello, %s!", name)
    })

    // POST /api/echo: JSON 에코
    mux.HandleFunc("POST /api/echo", func(w http.ResponseWriter, r *http.Request) {
        var body map[string]any
        if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(body)
    })

    log.Println("서버 시작 :8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}`,
        },
      ],
    },
  ],
}
