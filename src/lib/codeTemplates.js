// 언어별 코드 템플릿 (Oracle 템플릿과 동일 UX: 보기 + 삽입 + 복사)
// 핵심 3개(Python/Java/JavaScript) + 많이 쓰는 3개(TypeScript/C#/Go)
export const CODE_TEMPLATES = [
  {
    lang: 'Python',
    key: 'python',
    cats: [
      {
        title: '기본',
        items: [
          { name: '출력 / 입력', code: `print("Hello")\nname = input("이름: ")` },
          { name: 'f-string', code: `name = "world"\nprint(f"Hello, {name}!")` },
          { name: '리스트 / 딕셔너리', code: `nums = [1, 2, 3]\nuser = {"id": 1, "name": "kim"}` },
          { name: '리스트 컴프리헨션', code: `squares = [x * x for x in range(10) if x % 2 == 0]` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / elif / else', code: `if x > 0:\n    print("양수")\nelif x == 0:\n    print("영")\nelse:\n    print("음수")` },
          { name: 'for', code: `for i, item in enumerate(items):\n    print(i, item)` },
          { name: 'while', code: `while condition:\n    do_something()` },
          { name: 'match (3.10+)', code: `match command:\n    case "start":\n        start()\n    case "stop":\n        stop()\n    case _:\n        print("unknown")` },
          { name: 'try / except', code: `try:\n    risky()\nexcept ValueError as e:\n    print(e)\nfinally:\n    cleanup()` },
        ],
      },
      {
        title: '함수 / 클래스',
        items: [
          { name: 'def 함수', code: `def add(a: int, b: int) -> int:\n    return a + b` },
          { name: 'class', code: `class User:\n    def __init__(self, name: str):\n        self.name = name\n\n    def greet(self) -> str:\n        return f"Hi, {self.name}"` },
          { name: 'dataclass', code: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int` },
          { name: 'lambda / map / filter', code: `nums = [1, 2, 3, 4]\nevens = list(filter(lambda n: n % 2 == 0, nums))` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: '파일 읽기 / 쓰기', code: `with open("file.txt", "r", encoding="utf-8") as f:\n    text = f.read()\n\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write(text)` },
          { name: 'JSON', code: `import json\n\ndata = json.loads('{"a": 1}')\ntext = json.dumps(data, ensure_ascii=False, indent=2)` },
          { name: 'main 가드', code: `def main():\n    pass\n\nif __name__ == "__main__":\n    main()` },
        ],
      },
    ],
  },
  {
    lang: 'Java',
    key: 'java',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'main / 출력', code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}` },
          { name: 'List / Map', code: `List<String> list = new ArrayList<>();\nMap<String, Integer> map = new HashMap<>();` },
          { name: 'var (지역 변수)', code: `var names = List.of("a", "b", "c");` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) {\n    System.out.println("양수");\n} else {\n    System.out.println("0 이하");\n}` },
          { name: 'switch (식)', code: `String result = switch (day) {\n    case 1, 7 -> "주말";\n    default -> "평일";\n};` },
          { name: 'for / enhanced for', code: `for (int i = 0; i < n; i++) { }\nfor (String s : list) { System.out.println(s); }` },
          { name: 'try / catch', code: `try {\n    risky();\n} catch (Exception e) {\n    e.printStackTrace();\n} finally {\n    cleanup();\n}` },
        ],
      },
      {
        title: '클래스',
        items: [
          { name: 'class', code: `public class User {\n    private final String name;\n    public User(String name) { this.name = name; }\n    public String getName() { return name; }\n}` },
          { name: 'record', code: `public record Point(int x, int y) {}` },
          { name: 'interface', code: `public interface Repository<T> {\n    Optional<T> findById(long id);\n}` },
          { name: 'enum', code: `public enum Status { ACTIVE, INACTIVE, PENDING }` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'Stream API', code: `var result = list.stream()\n    .filter(s -> s.length() > 3)\n    .map(String::toUpperCase)\n    .toList();` },
          { name: '파일 읽기', code: `String text = Files.readString(Path.of("file.txt"));` },
          { name: 'Optional', code: `Optional<User> user = repo.findById(1);\nuser.ifPresent(u -> System.out.println(u.getName()));` },
        ],
      },
    ],
  },
  {
    lang: 'JavaScript',
    key: 'javascript',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'console.log / 변수', code: `const name = "world";\nlet count = 0;\nconsole.log(\`Hello, \${name}\`);` },
          { name: '구조 분해', code: `const { id, name } = user;\nconst [first, ...rest] = arr;` },
          { name: '배열 / 객체', code: `const nums = [1, 2, 3];\nconst user = { id: 1, name: "kim" };` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) {\n  console.log("양수");\n} else {\n  console.log("0 이하");\n}` },
          { name: 'switch', code: `switch (type) {\n  case "a":\n    break;\n  default:\n    break;\n}` },
          { name: 'for...of / forEach', code: `for (const item of items) console.log(item);\nitems.forEach((item, i) => console.log(i, item));` },
          { name: 'try / catch', code: `try {\n  risky();\n} catch (e) {\n  console.error(e);\n}` },
        ],
      },
      {
        title: '함수',
        items: [
          { name: '화살표 함수', code: `const add = (a, b) => a + b;` },
          { name: 'async / await', code: `async function load() {\n  const res = await fetch(url);\n  return res.json();\n}` },
          { name: 'class', code: `class User {\n  constructor(name) { this.name = name; }\n  greet() { return \`Hi, \${this.name}\`; }\n}` },
        ],
      },
      {
        title: '자주 쓰는 패턴',
        items: [
          { name: 'fetch (GET)', code: `const res = await fetch("/api/data");\nif (!res.ok) throw new Error(res.status);\nconst data = await res.json();` },
          { name: 'map / filter / reduce', code: `const total = items\n  .filter((x) => x.active)\n  .map((x) => x.price)\n  .reduce((a, b) => a + b, 0);` },
          { name: 'Promise.all', code: `const [a, b] = await Promise.all([fetchA(), fetchB()]);` },
        ],
      },
    ],
  },
  {
    lang: 'TypeScript',
    key: 'typescript',
    cats: [
      {
        title: '타입',
        items: [
          { name: 'interface / type', code: `interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\n\ntype ID = string | number;` },
          { name: 'enum', code: `enum Status {\n  Active = "ACTIVE",\n  Inactive = "INACTIVE",\n}` },
          { name: '제네릭', code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}` },
        ],
      },
      {
        title: '함수 / 클래스',
        items: [
          { name: '타입 함수', code: `const add = (a: number, b: number): number => a + b;` },
          { name: 'class (접근제어자)', code: `class User {\n  constructor(private readonly name: string) {}\n  greet(): string { return \`Hi, \${this.name}\`; }\n}` },
        ],
      },
      {
        title: '패턴',
        items: [
          { name: '유니온 좁히기', code: `function area(s: Circle | Square) {\n  if (s.kind === "circle") return Math.PI * s.r ** 2;\n  return s.size ** 2;\n}` },
          { name: '유틸리티 타입', code: `type PartialUser = Partial<User>;\ntype UserName = Pick<User, "name">;` },
          { name: '타입 지정 fetch', code: `async function getUser(id: number): Promise<User> {\n  const res = await fetch(\`/users/\${id}\`);\n  return res.json() as Promise<User>;\n}` },
        ],
      },
    ],
  },
  {
    lang: 'C#',
    key: 'csharp',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'Main / 출력', code: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello");\n    }\n}` },
          { name: 'List / Dictionary', code: `var list = new List<string>();\nvar map = new Dictionary<string, int>();` },
          { name: '문자열 보간', code: `var name = "world";\nConsole.WriteLine($"Hello, {name}");` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if / else', code: `if (x > 0) Console.WriteLine("양수");\nelse Console.WriteLine("0 이하");` },
          { name: 'switch 식', code: `var label = status switch {\n    1 => "활성",\n    2 => "비활성",\n    _ => "알수없음"\n};` },
          { name: 'foreach', code: `foreach (var item in items) Console.WriteLine(item);` },
          { name: 'try / catch', code: `try {\n    Risky();\n} catch (Exception ex) {\n    Console.WriteLine(ex.Message);\n}` },
        ],
      },
      {
        title: '클래스',
        items: [
          { name: 'class / 프로퍼티', code: `public class User {\n    public string Name { get; set; }\n    public int Age { get; set; }\n}` },
          { name: 'record', code: `public record Point(int X, int Y);` },
          { name: 'interface', code: `public interface IRepository<T> {\n    T? FindById(long id);\n}` },
        ],
      },
      {
        title: '패턴',
        items: [
          { name: 'LINQ', code: `var result = items\n    .Where(x => x.Active)\n    .Select(x => x.Name)\n    .ToList();` },
          { name: 'async / await', code: `async Task<string> LoadAsync() {\n    using var http = new HttpClient();\n    return await http.GetStringAsync(url);\n}` },
        ],
      },
    ],
  },
  {
    lang: 'Go',
    key: 'go',
    cats: [
      {
        title: '기본',
        items: [
          { name: 'main / 출력', code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello")\n}` },
          { name: '변수 / 슬라이스 / 맵', code: `name := "world"\nnums := []int{1, 2, 3}\nm := map[string]int{"a": 1}` },
        ],
      },
      {
        title: '제어문',
        items: [
          { name: 'if', code: `if x > 0 {\n    fmt.Println("양수")\n} else {\n    fmt.Println("0 이하")\n}` },
          { name: 'switch', code: `switch day {\ncase 1, 7:\n    fmt.Println("주말")\ndefault:\n    fmt.Println("평일")\n}` },
          { name: 'for / range', code: `for i, v := range items {\n    fmt.Println(i, v)\n}` },
          { name: '에러 처리', code: `result, err := doWork()\nif err != nil {\n    return fmt.Errorf("work failed: %w", err)\n}` },
        ],
      },
      {
        title: '함수 / 구조체',
        items: [
          { name: 'func', code: `func add(a, b int) int {\n    return a + b\n}` },
          { name: 'struct / method', code: `type User struct {\n    Name string\n}\n\nfunc (u User) Greet() string {\n    return "Hi, " + u.Name\n}` },
          { name: 'interface', code: `type Repository interface {\n    FindById(id int64) (*User, error)\n}` },
          { name: 'goroutine / defer', code: `defer file.Close()\ngo func() {\n    process()\n}()` },
        ],
      },
      {
        title: '패턴',
        items: [
          { name: 'JSON', code: `b, _ := json.Marshal(user)\nvar u User\njson.Unmarshal(b, &u)` },
          { name: 'HTTP 서버', code: `http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, "Hello")\n})\nhttp.ListenAndServe(":8080", nil)` },
        ],
      },
    ],
  },
]
