// 언어별 코드 템플릿 (Oracle 템플릿과 동일 UX: 보기 + 삽입 + 복사)
// 핵심 3개(Python/Java/JavaScript) + 많이 쓰는 3개(TypeScript/C#/Go)
export const CODE_TEMPLATES = [
  {
    lang: 'Python',
    key: 'python',
    version: 'Python 3.12 (stable)',
    cats: [
      {
        title: '기본',
        items: [
          { name: '출력 / 입력', code: `print("Hello")\nname = input("이름: ")` },
          { name: 'f-string', code: `name, age = "kim", 20\nprint(f"{name} ({age}세)")\nprint(f"{3.14159:.2f}")` },
          { name: '리스트 / 튜플 / 셋', code: `nums = [1, 2, 3]\npair = (1, 2)\nuniq = {1, 2, 3}` },
          { name: '딕셔너리', code: `user = {"id": 1, "name": "kim"}\nuser["age"] = 20\nfor k, v in user.items():\n    print(k, v)` },
          { name: '컴프리헨션 (list/dict)', code: `squares = [x * x for x in range(10) if x % 2 == 0]\nlookup = {k: v for k, v in pairs}` },
          { name: '슬라이싱', code: `s = "abcdef"\nprint(s[1:4])   # bcd\nprint(s[::-1])  # 뒤집기` },
          { name: 'enumerate / zip', code: `for i, name in enumerate(names, start=1):\n    print(i, name)\nfor a, b in zip(list1, list2):\n    print(a, b)` },
          { name: '언패킹', code: `a, b, *rest = [1, 2, 3, 4]\nmerged = {**d1, **d2}` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / elif / else', code: `if x > 0:\n    print("양수")\nelif x == 0:\n    print("영")\nelse:\n    print("음수")` },
          { name: '삼항 / 조건식', code: `label = "짝수" if n % 2 == 0 else "홀수"` },
          { name: 'for / for-else', code: `for item in items:\n    if item == target:\n        break\nelse:\n    print("못 찾음")` },
          { name: 'while', code: `while condition:\n    do_something()\n    if stop:\n        break` },
          { name: 'match (3.10+)', code: `match command.split():\n    case ["go", dir]:\n        move(dir)\n    case ["quit"]:\n        exit()\n    case _:\n        print("unknown")` },
          { name: 'try / except / finally', code: `try:\n    risky()\nexcept (ValueError, KeyError) as e:\n    print(e)\nelse:\n    print("성공")\nfinally:\n    cleanup()` },
          { name: 'with (컨텍스트)', code: `with open("f.txt") as f, open("o.txt", "w") as o:\n    o.write(f.read())` },
        ],
      },
      {
        title: '함수 / 클래스',
        items: [
          { name: 'def 함수 (타입힌트)', code: `def add(a: int, b: int = 0) -> int:\n    return a + b` },
          { name: '*args / **kwargs', code: `def f(*args, **kwargs):\n    print(args, kwargs)` },
          { name: 'lambda / 정렬', code: `users.sort(key=lambda u: u["age"], reverse=True)` },
          { name: 'class', code: `class User:\n    def __init__(self, name: str):\n        self.name = name\n\n    def __str__(self):\n        return f"User({self.name})"` },
          { name: 'dataclass', code: `from dataclasses import dataclass, field\n\n@dataclass\nclass Point:\n    x: int = 0\n    y: int = 0\n    tags: list = field(default_factory=list)` },
          { name: '상속 / super', code: `class Animal:\n    def speak(self): ...\n\nclass Dog(Animal):\n    def speak(self):\n        return "멍멍"` },
          { name: 'property', code: `class C:\n    @property\n    def value(self):\n        return self._v\n    @value.setter\n    def value(self, v):\n        self._v = v` },
          { name: '제너레이터 (yield)', code: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1` },
          { name: '데코레이터', code: `import functools\n\ndef logged(fn):\n    @functools.wraps(fn)\n    def wrapper(*a, **k):\n        print("call", fn.__name__)\n        return fn(*a, **k)\n    return wrapper` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: '파일 읽기 / 쓰기', code: `with open("file.txt", "r", encoding="utf-8") as f:\n    text = f.read()\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write(text)` },
          { name: 'JSON', code: `import json\ndata = json.loads('{"a": 1}')\ntext = json.dumps(data, ensure_ascii=False, indent=2)` },
          { name: 'CSV', code: `import csv\nwith open("data.csv", newline="", encoding="utf-8") as f:\n    for row in csv.DictReader(f):\n        print(row)` },
          { name: '정규식 (re)', code: `import re\nm = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)\nif m:\n    print(m.group(1))` },
          { name: 'datetime', code: `from datetime import datetime, timedelta\nnow = datetime.now()\ntomorrow = now + timedelta(days=1)\nprint(now.strftime("%Y-%m-%d %H:%M"))` },
          { name: 'logging', code: `import logging\nlogging.basicConfig(level=logging.INFO)\nlog = logging.getLogger(__name__)\nlog.info("시작")` },
          { name: 'argparse (CLI)', code: `import argparse\np = argparse.ArgumentParser()\np.add_argument("--name", required=True)\nargs = p.parse_args()` },
          { name: 'main 가드', code: `def main():\n    pass\n\nif __name__ == "__main__":\n    main()` },
        ],
      },
    ],
  },
  {
    lang: 'Java',
    key: 'java',
    version: 'Java 21 (LTS)',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'main / 출력', code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}` },
          { name: 'List / Set / Map', code: `List<String> list = new ArrayList<>();\nSet<Integer> set = new HashSet<>();\nMap<String, Integer> map = new HashMap<>();` },
          { name: 'var / 불변 컬렉션', code: `var names = List.of("a", "b", "c");\nvar conf = Map.of("k1", 1, "k2", 2);` },
          { name: '배열', code: `int[] arr = {1, 2, 3};\nint[][] grid = new int[3][3];\nArrays.sort(arr);` },
          { name: '문자열 처리', code: `String s = "a,b,c";\nString[] parts = s.split(",");\nString joined = String.join("-", parts);` },
          { name: 'Scanner 입력', code: `Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nString line = sc.nextLine();` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) {\n    System.out.println("양수");\n} else {\n    System.out.println("0 이하");\n}` },
          { name: 'switch (식)', code: `String result = switch (day) {\n    case 1, 7 -> "주말";\n    default -> "평일";\n};` },
          { name: 'for / enhanced for', code: `for (int i = 0; i < n; i++) { }\nfor (String s : list) {\n    System.out.println(s);\n}` },
          { name: 'while / do-while', code: `while (cond) { }\ndo {\n    work();\n} while (cond);` },
          { name: 'try / catch / finally', code: `try {\n    risky();\n} catch (IOException e) {\n    e.printStackTrace();\n} finally {\n    cleanup();\n}` },
          { name: 'try-with-resources', code: `try (var br = Files.newBufferedReader(path)) {\n    return br.readLine();\n}` },
        ],
      },
      {
        title: '클래스 / 구조',
        items: [
          { name: 'class (생성자/게터)', code: `public class User {\n    private final String name;\n    public User(String name) { this.name = name; }\n    public String getName() { return name; }\n}` },
          { name: 'record', code: `public record Point(int x, int y) {\n    public int sum() { return x + y; }\n}` },
          { name: 'interface (default)', code: `public interface Repo<T> {\n    Optional<T> findById(long id);\n    default boolean exists(long id) { return findById(id).isPresent(); }\n}` },
          { name: 'enum (필드/메서드)', code: `public enum Status {\n    ACTIVE("활성"), INACTIVE("비활성");\n    private final String label;\n    Status(String l) { this.label = l; }\n    public String label() { return label; }\n}` },
          { name: '추상 클래스 / 상속', code: `abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double r;\n    double area() { return Math.PI * r * r; }\n}` },
          { name: '제네릭 메서드', code: `static <T> T firstOr(List<T> list, T def) {\n    return list.isEmpty() ? def : list.get(0);\n}` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'Stream (filter/map/collect)', code: `var result = list.stream()\n    .filter(s -> s.length() > 3)\n    .map(String::toUpperCase)\n    .toList();` },
          { name: 'Stream (group/sum)', code: `Map<String, Long> byType = items.stream()\n    .collect(Collectors.groupingBy(Item::type, Collectors.counting()));` },
          { name: '파일 읽기 / 쓰기', code: `String text = Files.readString(Path.of("file.txt"));\nFiles.writeString(Path.of("out.txt"), text);` },
          { name: 'Optional', code: `Optional<User> u = repo.findById(1);\nString name = u.map(User::getName).orElse("없음");` },
          { name: '예외 정의 / throw', code: `class NotFoundException extends RuntimeException {\n    NotFoundException(String m) { super(m); }\n}\nthrow new NotFoundException("user");` },
          { name: 'record 직렬화 (Jackson)', code: `var mapper = new ObjectMapper();\nString json = mapper.writeValueAsString(user);\nUser u = mapper.readValue(json, User.class);` },
        ],
      },
    ],
  },
  {
    lang: 'JavaScript',
    key: 'javascript',
    version: 'ECMAScript 2022 / Node.js 20 LTS',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'console / 변수', code: `const name = "world";\nlet count = 0;\nconsole.log(\`Hello, \${name}\`);` },
          { name: '구조 분해', code: `const { id, name } = user;\nconst [first, ...rest] = arr;` },
          { name: '배열 / 객체', code: `const nums = [1, 2, 3];\nconst user = { id: 1, name: "kim" };\nconst merged = { ...user, age: 20 };` },
          { name: '스프레드 / 기본값', code: `const copy = [...nums];\nfunction f(a, b = 10) { return a + b; }` },
          { name: 'Map / Set', code: `const m = new Map([["a", 1]]);\nconst s = new Set([1, 2, 2, 3]); // {1,2,3}` },
          { name: '옵셔널 체이닝 / ??', code: `const city = user?.address?.city ?? "미상";` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) {\n  console.log("양수");\n} else {\n  console.log("0 이하");\n}` },
          { name: '삼항 / 단축평가', code: `const label = n % 2 ? "홀수" : "짝수";\nconst v = input || "기본값";` },
          { name: 'switch', code: `switch (type) {\n  case "a":\n    break;\n  default:\n    break;\n}` },
          { name: 'for...of / entries', code: `for (const item of items) console.log(item);\nfor (const [i, v] of items.entries()) console.log(i, v);` },
          { name: 'while', code: `let i = 0;\nwhile (i < n) {\n  i++;\n}` },
          { name: 'try / catch', code: `try {\n  risky();\n} catch (e) {\n  console.error(e);\n} finally {\n  cleanup();\n}` },
        ],
      },
      {
        title: '함수 / 클래스',
        items: [
          { name: '함수 / 화살표', code: `function add(a, b) { return a + b; }\nconst mul = (a, b) => a * b;` },
          { name: 'async / await', code: `async function load() {\n  try {\n    const res = await fetch(url);\n    return await res.json();\n  } catch (e) {\n    console.error(e);\n  }\n}` },
          { name: 'class (상속)', code: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return "..."; }\n}\nclass Dog extends Animal {\n  speak() { return "멍멍"; }\n}` },
          { name: '클로저', code: `function counter() {\n  let n = 0;\n  return () => ++n;\n}\nconst next = counter();` },
          { name: '제너레이터', code: `function* range(n) {\n  for (let i = 0; i < n; i++) yield i;\n}` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'fetch (GET/POST)', code: `const res = await fetch("/api", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(data),\n});\nconst json = await res.json();` },
          { name: 'map / filter / reduce', code: `const total = items\n  .filter((x) => x.active)\n  .map((x) => x.price)\n  .reduce((a, b) => a + b, 0);` },
          { name: 'Promise.all', code: `const [a, b] = await Promise.all([fetchA(), fetchB()]);` },
          { name: '배열 정렬 / 그룹', code: `arr.sort((a, b) => a.age - b.age);\nconst grouped = arr.reduce((acc, x) => {\n  (acc[x.type] ??= []).push(x);\n  return acc;\n}, {});` },
          { name: 'localStorage', code: `localStorage.setItem("key", JSON.stringify(obj));\nconst obj = JSON.parse(localStorage.getItem("key") ?? "{}");` },
          { name: 'DOM 이벤트', code: `document.querySelector("#btn")\n  .addEventListener("click", (e) => {\n    e.preventDefault();\n  });` },
        ],
      },
    ],
  },
  {
    lang: 'TypeScript',
    key: 'typescript',
    version: 'TypeScript 5.4 (stable)',
    cats: [
      {
        title: '기본 / 타입',
        items: [
          { name: 'interface / type', code: `interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\ntype ID = string | number;` },
          { name: 'enum / const 객체', code: `enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }\nconst Color = { Red: "red", Blue: "blue" } as const;` },
          { name: '제네릭', code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}` },
          { name: '배열 / 튜플 타입', code: `const nums: number[] = [1, 2, 3];\nconst pair: [string, number] = ["a", 1];` },
          { name: '함수 타입 / 콜백', code: `type Handler = (e: Event) => void;\nconst onClick: Handler = (e) => {};` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / 타입 가드', code: `if (typeof x === "string") {\n  console.log(x.toUpperCase());\n}` },
          { name: 'switch (never 체크)', code: `switch (shape.kind) {\n  case "circle": return Math.PI * shape.r ** 2;\n  case "square": return shape.size ** 2;\n  default: {\n    const _ex: never = shape;\n    return _ex;\n  }\n}` },
          { name: 'for...of', code: `for (const item of items) {\n  console.log(item);\n}` },
          { name: 'try / catch (unknown)', code: `try {\n  risky();\n} catch (e: unknown) {\n  if (e instanceof Error) console.error(e.message);\n}` },
        ],
      },
      {
        title: '함수 / 클래스',
        items: [
          { name: '타입 함수', code: `const add = (a: number, b: number): number => a + b;` },
          { name: 'class (접근제어자)', code: `class User {\n  constructor(\n    private readonly name: string,\n    public age = 0,\n  ) {}\n  greet(): string { return \`Hi, \${this.name}\`; }\n}` },
          { name: '제네릭 클래스', code: `class Box<T> {\n  constructor(private value: T) {}\n  get(): T { return this.value; }\n}` },
          { name: 'overload', code: `function len(x: string): number;\nfunction len(x: any[]): number;\nfunction len(x: any): number { return x.length; }` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: '유니온 좁히기', code: `type Shape =\n  | { kind: "circle"; r: number }\n  | { kind: "square"; size: number };` },
          { name: '유틸리티 타입', code: `type PartialUser = Partial<User>;\ntype UserName = Pick<User, "name">;\ntype ReadonlyUser = Readonly<User>;` },
          { name: '타입 지정 fetch', code: `async function getUser(id: number): Promise<User> {\n  const res = await fetch(\`/users/\${id}\`);\n  if (!res.ok) throw new Error(String(res.status));\n  return (await res.json()) as User;\n}` },
          { name: 'Record / 매핑', code: `const counts: Record<string, number> = {};\ntype Flags = Record<"a" | "b", boolean>;` },
        ],
      },
    ],
  },
  {
    lang: 'C#',
    key: 'csharp',
    version: 'C# 12 / .NET 8 (LTS)',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'Main / 출력', code: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello");\n    }\n}` },
          { name: 'List / Dictionary', code: `var list = new List<string>();\nvar map = new Dictionary<string, int>();\nmap["a"] = 1;` },
          { name: '문자열 보간', code: `var name = "world";\nConsole.WriteLine($"Hello, {name}");` },
          { name: '배열 / 컬렉션 초기화', code: `int[] arr = { 1, 2, 3 };\nvar nums = new List<int> { 1, 2, 3 };` },
          { name: 'null 처리 (?. ??)', code: `var city = user?.Address?.City ?? "미상";` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) Console.WriteLine("양수");\nelse Console.WriteLine("0 이하");` },
          { name: 'switch 식', code: `var label = status switch {\n    1 => "활성",\n    2 => "비활성",\n    _ => "알수없음",\n};` },
          { name: 'for / foreach', code: `for (int i = 0; i < n; i++) { }\nforeach (var item in items) Console.WriteLine(item);` },
          { name: 'while', code: `while (cond) {\n    Work();\n}` },
          { name: 'try / catch', code: `try {\n    Risky();\n} catch (Exception ex) {\n    Console.WriteLine(ex.Message);\n} finally {\n    Cleanup();\n}` },
          { name: 'using (자원 해제)', code: `using var reader = new StreamReader("f.txt");\nstring text = reader.ReadToEnd();` },
        ],
      },
      {
        title: '클래스 / 구조',
        items: [
          { name: 'class / 프로퍼티', code: `public class User {\n    public string Name { get; set; } = "";\n    public int Age { get; init; }\n}` },
          { name: 'record', code: `public record Point(int X, int Y);` },
          { name: 'interface', code: `public interface IRepository<T> {\n    T? FindById(long id);\n}` },
          { name: 'enum', code: `public enum Status { Active, Inactive, Pending }` },
          { name: '상속 / override', code: `public abstract class Shape { public abstract double Area(); }\npublic class Circle : Shape {\n    public double R;\n    public override double Area() => Math.PI * R * R;\n}` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'LINQ', code: `var result = items\n    .Where(x => x.Active)\n    .OrderBy(x => x.Name)\n    .Select(x => x.Name)\n    .ToList();` },
          { name: 'async / await', code: `async Task<string> LoadAsync() {\n    using var http = new HttpClient();\n    return await http.GetStringAsync(url);\n}` },
          { name: '파일 IO', code: `await File.WriteAllTextAsync("out.txt", text);\nstring s = await File.ReadAllTextAsync("in.txt");` },
          { name: 'JSON (System.Text.Json)', code: `var json = JsonSerializer.Serialize(user);\nvar u = JsonSerializer.Deserialize<User>(json);` },
        ],
      },
    ],
  },
  {
    lang: 'Go',
    key: 'go',
    version: 'Go 1.22 (stable)',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'main / 출력', code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello")\n}` },
          { name: '변수 / 상수', code: `name := "world"\nvar count int = 0\nconst Pi = 3.14` },
          { name: '슬라이스', code: `nums := []int{1, 2, 3}\nnums = append(nums, 4)\nsub := nums[1:3]` },
          { name: '맵', code: `m := map[string]int{"a": 1}\nm["b"] = 2\nif v, ok := m["a"]; ok {\n    fmt.Println(v)\n}` },
          { name: '문자열 / 변환', code: `import "strconv"\nn, _ := strconv.Atoi("42")\ns := strconv.Itoa(42)` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if (초기문)', code: `if v, err := doWork(); err != nil {\n    return err\n} else {\n    fmt.Println(v)\n}` },
          { name: 'switch', code: `switch day {\ncase 1, 7:\n    fmt.Println("주말")\ndefault:\n    fmt.Println("평일")\n}` },
          { name: 'for / range', code: `for i, v := range items {\n    fmt.Println(i, v)\n}\nfor i := 0; i < n; i++ { }` },
          { name: '에러 처리', code: `result, err := doWork()\nif err != nil {\n    return fmt.Errorf("work failed: %w", err)\n}` },
        ],
      },
      {
        title: '함수 / 구조체',
        items: [
          { name: 'func (다중 반환)', code: `func divmod(a, b int) (int, int) {\n    return a / b, a % b\n}` },
          { name: 'struct / method', code: `type User struct {\n    Name string\n    Age  int\n}\nfunc (u User) Greet() string {\n    return "Hi, " + u.Name\n}` },
          { name: 'interface', code: `type Repository interface {\n    FindById(id int64) (*User, error)\n}` },
          { name: 'goroutine / channel', code: `ch := make(chan int)\ngo func() { ch <- compute() }()\nresult := <-ch` },
          { name: 'defer', code: `f, err := os.Open("file.txt")\nif err != nil { return err }\ndefer f.Close()` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'JSON', code: `b, _ := json.Marshal(user)\nvar u User\njson.Unmarshal(b, &u)` },
          { name: '파일 읽기', code: `data, err := os.ReadFile("file.txt")\nif err != nil { return err }\nfmt.Println(string(data))` },
          { name: 'HTTP 서버', code: `http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, "Hello")\n})\nhttp.ListenAndServe(":8080", nil)` },
          { name: 'HTTP 클라이언트', code: `resp, err := http.Get(url)\nif err != nil { return err }\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)` },
          { name: 'sync.WaitGroup', code: `var wg sync.WaitGroup\nfor _, t := range tasks {\n    wg.Add(1)\n    go func(t Task) {\n        defer wg.Done()\n        t.Run()\n    }(t)\n}\nwg.Wait()` },
        ],
      },
    ],
  },
]
