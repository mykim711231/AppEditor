export default {
  lang: 'C#',
  key: 'csharp',
  version: 'C# 12 / .NET 8 (LTS)',
  cats: [
    {
      title: '기본',
      items: [
        { name: '콘솔 출력', code: `string name = "World"; // 출력할 이름
Console.WriteLine($"Hello, {name}!");` },
        { name: '변수 선언', code: `int age = 30;         // 정수
string name = "Alice"; // 문자열
bool isActive = true;  // 불리언
double pi = 3.14159;   // 실수` },
        { name: 'var 추론', code: `var message = "Hello";          // string으로 추론
var count = 42;                 // int로 추론
var items = new List<string>(); // List<string>으로 추론` },
        { name: '상수', code: `const int MaxRetries = 3;           // 변경 불가 상수
const string DefaultName = "Unknown";` },
        { name: '탑레벨 구문', code: `// Program.cs - no class/Main needed (using System은 암묵적으로 포함됨)
Console.WriteLine("Top-level statements");
var result = Add(2, 3);
Console.WriteLine(result);

int Add(int a, int b) => a + b;` },
        { name: '튜플', code: `var point = (X: 10, Y: 20);
Console.WriteLine(point.X); // 10

(string Name, int Age) person = ("Bob", 25);
var (name, age) = person; // 분해 할당` },
        { name: 'null 처리', code: `string? value = null;
string display = value ?? "default"; // null이면 "default"
int length = value?.Length ?? 0;     // null-조건 연산자
value ??= "fallback";                // null일 때만 대입` },
        { name: '범위·인덱스', code: `var arr = new[] { 1, 2, 3, 4, 5 };
var last = arr[^1];          // 5
var slice = arr[1..3];       // [2, 3]
var tail = arr[^2..];        // [4, 5]` },
        { name: '컬렉션 식', code: `// C# 12 collection expressions
int[] numbers = [1, 2, 3, 4, 5];
List<string> names = ["Alice", "Bob"];
int[] merged = [..numbers, 6, 7];` },
      ],
    },
    {
      title: '제어문',
      items: [
        { name: 'if / else', code: `int score = 85;
if (score >= 90)
    Console.WriteLine("A");
else if (score >= 80)
    Console.WriteLine("B");
else
    Console.WriteLine("C");` },
        { name: 'switch 식', code: `int score = 85; // 점수 선언
string grade = score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _     => "F",   // 나머지는 F
};` },
        { name: 'switch 패턴', code: `object obj = 42;
string result = obj switch
{
    int n when n > 0 => $"양수: {n}",
    int n            => $"음수/0: {n}",
    string s         => $"문자열: {s}",
    null             => "null",
    _                => "기타",
};` },
        { name: 'for / foreach', code: `for (int i = 0; i < 5; i++)
    Console.WriteLine(i);

foreach (var item in new[] { "a", "b", "c" })
    Console.WriteLine(item);` },
        { name: 'while / do-while', code: `int n = 0;
while (n < 3) { Console.WriteLine(n); n++; } // 조건 먼저 확인

do { Console.WriteLine(n); n--; } while (n > 0); // 최소 1회 실행` },
        { name: 'break / continue', code: `foreach (var i in Enumerable.Range(0, 10))
{
    if (i == 5) break;        // 루프 완전 종료
    if (i % 2 == 0) continue; // 짝수 건너뜀
    Console.WriteLine(i);     // 홀수만 출력: 1, 3
}` },
        { name: '삼항 연산자', code: `int x = 7;
string msg = x > 0 ? "양수" : "비양수";` },
        { name: 'is 패턴 매칭', code: `object val = "hello";
if (val is string s && s.Length > 3)
    Console.WriteLine(s.ToUpper());

if (val is not null)
    Console.WriteLine("not null");` },
        { name: '가드 패턴', code: `static string Classify(int n) => n switch
{
    0           => "zero",
    < 0         => "negative",
    > 0 and < 10 => "small positive",
    _           => "large",
};` },
      ],
    },
    {
      title: '클래스/구조',
      items: [
        { name: '레코드', code: `record Person(string Name, int Age); // 불변 데이터 타입

var p1 = new Person("Alice", 30);
var p2 = p1 with { Age = 31 }; // 일부만 변경한 복사본 생성
Console.WriteLine(p1 == new Person("Alice", 30)); // true (값 기반 비교)` },
        { name: '기본 생성자 (C# 12)', code: `// C# 12: 클래스도 기본 생성자 지원
class Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
    public double Distance => Math.Sqrt(X * X + Y * Y);
}` },
        { name: '프로퍼티 / init', code: `class Config
{
    public string Host { get; init; } = "localhost"; // 초기화 후 변경 불가
    public int Port { get; init; } = 8080;
}

var cfg = new Config { Host = "example.com", Port = 443 };` },
        { name: '정적 클래스', code: `static class MathHelper
{
    public static double Square(double x) => x * x;
    public static double Cube(double x) => x * x * x;
}` },
        { name: '상속', code: `abstract class Shape
{
    public abstract double Area();
    public override string ToString() => $"Area={Area():F2}";
}

class Circle(double radius) : Shape
{
    public override double Area() => Math.PI * radius * radius;
}` },
        { name: '구조체', code: `struct Vector2(float x, float y)
{
    public float X { get; } = x;
    public float Y { get; } = y;
    public static Vector2 operator +(Vector2 a, Vector2 b)
        => new(a.X + b.X, a.Y + b.Y);
}` },
        { name: '확장 메서드', code: `static class StringExtensions
{
    public static string Truncate(this string s, int max)
        => s.Length <= max ? s : s[..max] + "...";
}

string text = "Hello World";
Console.WriteLine(text.Truncate(5)); // "Hello..."` },
        { name: '연산자 오버로드', code: `record Money(decimal Amount, string Currency)
{
    public static Money operator +(Money a, Money b)
    {
        if (a.Currency != b.Currency) throw new InvalidOperationException();
        return a with { Amount = a.Amount + b.Amount };
    }
}` },
        { name: '중첩 클래스', code: `class Outer
{
    private int _value = 10;

    class Inner
    {
        // 내부 클래스는 외부 클래스의 private 멤버에 접근 가능
        public void Show(Outer o) => Console.WriteLine(o._value);
    }
}` },
      ],
    },
    {
      title: '인터페이스/제네릭',
      items: [
        { name: '인터페이스 정의', code: `interface IRepository<T>
{
    T? GetById(int id);
    IEnumerable<T> GetAll();
    void Save(T entity);
    void Delete(int id);
}` },
        { name: '인터페이스 구현', code: `class UserRepository : IRepository<User>
{
    private readonly List<User> _users = [];

    public User? GetById(int id) => _users.FirstOrDefault(u => u.Id == id);
    public IEnumerable<User> GetAll() => _users;
    public void Save(User user) => _users.Add(user);
    public void Delete(int id) => _users.RemoveAll(u => u.Id == id);
}` },
        { name: '제네릭 메서드', code: `static T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 7));       // 7
Console.WriteLine(Max("abc", "xyz")); // xyz` },
        { name: '제네릭 제약', code: `static void Print<T>(T item) where T : notnull
    => Console.WriteLine(item.ToString());

static T Create<T>() where T : new()
    => new T();` },
        { name: 'default 인터페이스 멤버', code: `interface ILogger
{
    void Log(string message);
    void LogError(string message) => Log($"ERROR: {message}");
    void LogInfo(string message)  => Log($"INFO: {message}");
}` },
        { name: 'IDisposable / using', code: `class Resource : IDisposable
{
    public void Use() => Console.WriteLine("using resource");
    public void Dispose() => Console.WriteLine("disposed");
}

using var res = new Resource(); // 스코프 종료 시 자동 Dispose
res.Use();` },
        { name: 'IEnumerable 구현', code: `class NumberRange(int start, int end) : IEnumerable<int>
{
    public IEnumerator<int> GetEnumerator()
    {
        for (int i = start; i <= end; i++) yield return i; // 지연 실행
    }
    // 비제네릭 IEnumerable 명시적 구현 (필수)
    System.Collections.IEnumerator
        System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
}` },
        { name: '공변/반변', code: `// IEnumerable<out T> - covariant
IEnumerable<string> strings = new List<string>();
IEnumerable<object> objects = strings; // OK

// Action<in T> - contravariant
Action<object> logObj = Console.WriteLine;
Action<string> logStr = logObj; // OK` },
      ],
    },
    {
      title: '문자열',
      items: [
        { name: '문자열 보간', code: `string name = "World";
int year = 2024;
Console.WriteLine($"Hello, {name}! Year: {year}");
Console.WriteLine($"Pi = {Math.PI:F4}");` },
        { name: '원시 문자열 리터럴', code: `string json = """
    {
        "name": "Alice",
        "age": 30
    }
    """;` },
        { name: 'StringBuilder', code: `// System.Text은 암묵적으로 포함됨
var sb = new StringBuilder();
sb.Append("Hello");
sb.Append(", ");
sb.AppendLine("World!");
sb.Insert(0, "Prefix: ");
Console.WriteLine(sb.ToString());` },
        { name: '문자열 메서드', code: `string s = "  Hello, World!  ";
Console.WriteLine(s.Trim());
Console.WriteLine(s.ToUpper());
Console.WriteLine(s.Replace("World", "C#"));
Console.WriteLine(s.Contains("Hello"));
Console.WriteLine(s.Split(',')[0].Trim());` },
        { name: 'Span<char> 분석', code: `string input = "2024-06-15";
ReadOnlySpan<char> span = input.AsSpan(); // 힙 할당 없이 문자열 슬라이싱
int year  = int.Parse(span[..4]);  // "2024"
int month = int.Parse(span[5..7]); // "06"
int day   = int.Parse(span[8..]);  // "15"` },
        { name: '정규식', code: `using System.Text.RegularExpressions;

// 한국 휴대폰 번호 패턴: 000-0000-0000
var pattern = new Regex(@"\d{3}-\d{4}-\d{4}");
string text = "전화: 010-1234-5678";
var match = pattern.Match(text);
if (match.Success) Console.WriteLine(match.Value); // 010-1234-5678` },
        { name: '문자열 결합', code: `var words = new[] { "one", "two", "three" };
string joined = string.Join(", ", words);   // "one, two, three"
string concat = string.Concat(words);       // "onetwothree"` },
        { name: '형식 지정', code: `decimal price = 1234567.89m;
Console.WriteLine(price.ToString("C"));       // $1,234,567.89
Console.WriteLine(price.ToString("N2"));      // 1,234,567.89
Console.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));` },
        { name: 'char 처리', code: `string s = "Hello123";
int digits  = s.Count(char.IsDigit);
int letters = s.Count(char.IsLetter);
string upper = new(s.Select(char.ToUpper).ToArray());` },
      ],
    },
    {
      title: '컬렉션',
      items: [
        { name: 'List<T>', code: `var list = new List<int> { 1, 2, 3 };
list.Add(4);
list.AddRange([5, 6]);
list.Remove(1);
list.Sort();
Console.WriteLine(list.Count);` },
        { name: 'Dictionary<K,V>', code: `var dict = new Dictionary<string, int>
{
    ["apple"] = 1,
    ["banana"] = 2,
};
dict["cherry"] = 3;
if (dict.TryGetValue("apple", out int val))
    Console.WriteLine(val);` },
        { name: 'HashSet<T>', code: `var set1 = new HashSet<int> { 1, 2, 3, 4 };
var set2 = new HashSet<int> { 3, 4, 5, 6 };

// 각 연산은 set1을 직접 변경(제자리 수정)
var a = new HashSet<int>(set1); a.IntersectWith(set2); // 교집합: {3, 4}
var b = new HashSet<int>(set1); b.UnionWith(set2);     // 합집합: {1,2,3,4,5,6}
var c = new HashSet<int>(set1); c.ExceptWith(set2);    // 차집합: {1, 2}` },
        { name: 'Queue / Stack', code: `var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
string item = queue.Dequeue();

var stack = new Stack<int>();
stack.Push(1); stack.Push(2);
int top = stack.Pop();` },
        { name: 'ImmutableList', code: `using System.Collections.Immutable;

var original = ImmutableList.Create(1, 2, 3);
var added    = original.Add(4);    // 새 리스트 반환, original 불변
var removed  = added.Remove(1);    // 마찬가지로 새 리스트 반환
// original은 여전히 {1, 2, 3}` },
        { name: 'SortedDictionary', code: `var sorted = new SortedDictionary<string, int>
{
    ["banana"] = 2,
    ["apple"]  = 1,
    ["cherry"] = 3,
};
foreach (var (k, v) in sorted)
    Console.WriteLine($"{k}: {v}");` },
        { name: 'Span<T> 슬라이스', code: `int[] data = [10, 20, 30, 40, 50];
Span<int> span = data.AsSpan();
Span<int> mid  = span[1..4]; // [20, 30, 40]
mid[0] = 99;  // modifies original` },
        { name: '배열 조작', code: `int[] arr = [5, 3, 1, 4, 2];
Array.Sort(arr);
int idx = Array.BinarySearch(arr, 3);
int[] copy = arr[..];           // full copy
Array.Reverse(copy);` },
        { name: 'PriorityQueue', code: `var pq = new PriorityQueue<string, int>();
pq.Enqueue("low",    3);
pq.Enqueue("high",   1);
pq.Enqueue("medium", 2);
while (pq.TryDequeue(out string? item, out _))
    Console.WriteLine(item);` },
      ],
    },
    {
      title: 'LINQ',
      items: [
        { name: '기본 쿼리', code: `var numbers = Enumerable.Range(1, 10); // 1~10
var evens = numbers
    .Where(n => n % 2 == 0)  // 짝수만 필터
    .Select(n => n * n)       // 제곱으로 변환
    .ToList();                // 즉시 평가` },
        { name: '집계', code: `var data = new[] { 3, 1, 4, 1, 5, 9, 2, 6 };
int    sum  = data.Sum();
double avg  = data.Average();
int    max  = data.Max();
int    min  = data.Min();
int    cnt  = data.Count(n => n > 3);` },
        { name: 'GroupBy', code: `var words = new[] { "apple", "ant", "banana", "bear", "cherry" };
var groups = words
    .GroupBy(w => w[0])
    .Select(g => new { Letter = g.Key, Words = g.ToList() });

foreach (var g in groups)
    Console.WriteLine($"{g.Letter}: {string.Join(", ", g.Words)}");` },
        { name: 'Join', code: `var orders = new[] { (Id: 1, UserId: 10), (Id: 2, UserId: 20) };
var users  = new[] { (Id: 10, Name: "Alice"), (Id: 20, Name: "Bob") };

var result = orders.Join(users,
    o => o.UserId,
    u => u.Id,
    (o, u) => $"Order {o.Id} by {u.Name}");` },
        { name: 'OrderBy / ThenBy', code: `var people = new[] {
    (Name: "Alice", Age: 30),
    (Name: "Bob",   Age: 25),
    (Name: "Alice", Age: 25),
};
var sorted = people
    .OrderBy(p => p.Name)
    .ThenBy(p => p.Age);` },
        { name: 'Distinct / Except / Intersect', code: `var a = new[] { 1, 2, 3, 4, 5 };
var b = new[] { 3, 4, 5, 6, 7 };
var unique    = a.Distinct();
var onlyInA   = a.Except(b);
var inBoth    = a.Intersect(b);
var allUnique = a.Union(b);` },
        { name: 'SelectMany', code: `var departments = new[] {
    new { Name = "Dev",  Employees = new[] { "Alice", "Bob" } },
    new { Name = "HR",   Employees = new[] { "Charlie" } },
};
var allEmployees = departments.SelectMany(d => d.Employees);` },
        { name: 'First / Single / Any / All', code: `var items = new[] { 2, 4, 6, 8 };
bool anyOdd  = items.Any(n => n % 2 != 0);   // false
bool allEven = items.All(n => n % 2 == 0);   // true
int  first   = items.First(n => n > 4);       // 6
int  found   = items.FirstOrDefault(n => n > 10); // 0 (int 기본값, null 아님)` },
        { name: 'ToDictionary / ToLookup', code: `record Product(int Id, string Name, string Category);
var products = new List<Product>
{
    new(1, "Apple",  "Fruit"),
    new(2, "Banana", "Fruit"),
    new(3, "Carrot", "Veggie"),
};
var byId     = products.ToDictionary(p => p.Id);
var byCategory = products.ToLookup(p => p.Category);` },
      ],
    },
    {
      title: '파일·IO',
      items: [
        { name: '파일 읽기', code: `// 전체 텍스트
string text = await File.ReadAllTextAsync("data.txt");

// 줄 단위
string[] lines = await File.ReadAllLinesAsync("data.txt");

// 스트리밍
await foreach (string line in File.ReadLinesAsync("data.txt"))
    Console.WriteLine(line);` },
        { name: '파일 쓰기', code: `await File.WriteAllTextAsync("output.txt", "Hello, World!");
await File.AppendAllTextAsync("log.txt", $"{DateTime.Now}: event\n");
await File.WriteAllLinesAsync("lines.txt", new[] { "line1", "line2" });` },
        { name: 'StreamReader / Writer', code: `await using var reader = new StreamReader("input.txt");
await using var writer = new StreamWriter("output.txt");

string? line;
while ((line = await reader.ReadLineAsync()) != null)
    await writer.WriteLineAsync(line.ToUpper());` },
        { name: 'Path 조작', code: `string path = @"C:\Users\Alice\Documents\file.txt";
Console.WriteLine(Path.GetFileName(path));       // file.txt
Console.WriteLine(Path.GetExtension(path));      // .txt
Console.WriteLine(Path.GetDirectoryName(path));  // C:\Users\Alice\Documents
string newPath = Path.Combine("folder", "sub", "file.txt");` },
        { name: 'Directory 조작', code: `Directory.CreateDirectory("myFolder/sub");
bool exists = Directory.Exists("myFolder");
string[] files = Directory.GetFiles(".", "*.cs", SearchOption.AllDirectories);
Directory.Delete("myFolder", recursive: true);` },
        { name: 'JSON 직렬화', code: `using System.Text.Json;

record User(string Name, int Age);
var user = new User("Alice", 30);

string json = JsonSerializer.Serialize(user,
    new JsonSerializerOptions { WriteIndented = true });
var loaded = JsonSerializer.Deserialize<User>(json);` },
        { name: 'FileInfo / DirectoryInfo', code: `var fi = new FileInfo("data.txt");
Console.WriteLine(fi.Length);
Console.WriteLine(fi.LastWriteTime);
fi.CopyTo("backup.txt", overwrite: true);

var di = new DirectoryInfo(".");
foreach (var f in di.GetFiles("*.cs"))
    Console.WriteLine(f.Name);` },
        { name: 'MemoryStream', code: `using var ms = new MemoryStream();
// leaveOpen: true — writer 종료 후에도 ms를 닫지 않음
await using var writer = new StreamWriter(ms, System.Text.Encoding.UTF8, bufferSize: -1, leaveOpen: true);
await writer.WriteAsync("data");
await writer.FlushAsync();
ms.Position = 0; // 처음부터 읽기 위해 위치 초기화
await using var reader = new StreamReader(ms);
string content = await reader.ReadToEndAsync();` },
      ],
    },
    {
      title: '비동기',
      items: [
        { name: 'async / await 기본', code: `using System.Net.Http;

async Task<string> FetchDataAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}

string data = await FetchDataAsync("https://api.example.com/data");` },
        { name: 'Task.WhenAll', code: `async Task<int[]> FetchAllAsync()
{
    var t1 = Task.Run(() => Compute(1));
    var t2 = Task.Run(() => Compute(2));
    var t3 = Task.Run(() => Compute(3));
    return await Task.WhenAll(t1, t2, t3);
}` },
        { name: 'CancellationToken', code: `async Task LongRunningAsync(CancellationToken ct)
{
    for (int i = 0; i < 100; i++)
    {
        ct.ThrowIfCancellationRequested();
        await Task.Delay(100, ct);
    }
}

using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
await LongRunningAsync(cts.Token);` },
        { name: 'IAsyncEnumerable', code: `async IAsyncEnumerable<int> GenerateAsync(
    [System.Runtime.CompilerServices.EnumeratorCancellation]
    CancellationToken ct = default)
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(100, ct);
        yield return i;
    }
}

await foreach (var item in GenerateAsync())
    Console.WriteLine(item);` },
        { name: 'ValueTask', code: `// ValueTask: 동기 경로가 많을 때 Task보다 할당 비용 절감
static ValueTask<int> GetCachedOrFetchAsync(int id)
{
    if (_cache.TryGetValue(id, out int val))
        return ValueTask.FromResult(val); // 캐시 히트 — 할당 없음

    return new ValueTask<int>(FetchFromDbAsync(id)); // 캐시 미스 — 비동기
}` },
        { name: 'Parallel.ForEachAsync', code: `var urls = new[] { "url1", "url2", "url3" };
await Parallel.ForEachAsync(urls,
    new ParallelOptions { MaxDegreeOfParallelism = 4 },
    async (url, ct) =>
    {
        var data = await DownloadAsync(url, ct);
        Process(data);
    });` },
        { name: 'Task.WhenAny / 타임아웃', code: `async Task<string?> WithTimeoutAsync(Task<string> task, int ms)
{
    var timeout = Task.Delay(ms);
    var winner  = await Task.WhenAny(task, timeout); // 먼저 완료된 것 반환
    return winner == task ? await task : null; // 타임아웃이면 null
}` },
        { name: 'Channel', code: `using System.Threading.Channels;

var ch = Channel.CreateBounded<int>(capacity: 100);

_ = Task.Run(async () => {
    for (int i = 0; i < 10; i++)
        await ch.Writer.WriteAsync(i);
    ch.Writer.Complete();
});

await foreach (var item in ch.Reader.ReadAllAsync())
    Console.WriteLine(item);` },
        { name: 'SemaphoreSlim 제한', code: `var sem = new SemaphoreSlim(3); // max 3 concurrent

async Task ThrottledWorkAsync(int id)
{
    await sem.WaitAsync();
    try { await DoWorkAsync(id); }
    finally { sem.Release(); }
}` },
      ],
    },
    {
      title: '예외처리',
      items: [
        { name: 'try / catch / finally', code: `try
{
    int result = Divide(10, 0);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"오류: {ex.Message}");
}
catch (Exception ex) when (ex is ArgumentException or InvalidOperationException)
{
    Console.WriteLine($"입력 오류: {ex.Message}");
}
finally
{
    Console.WriteLine("항상 실행");
}` },
        { name: '사용자 정의 예외', code: `class ValidationException(string field, string message)
    : Exception($"Validation failed for '{field}': {message}")
{
    public string Field { get; } = field;
}

throw new ValidationException("Email", "Invalid format");` },
        { name: '예외 필터', code: `using System.Net;
using System.Net.Http;

try { await CallServiceAsync(); }
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("리소스 없음");
}
catch (HttpRequestException ex) when ((int?)ex.StatusCode >= 500)
{
    Console.WriteLine("서버 오류");
}` },
        { name: 'Result 패턴', code: `// 예외 대신 성공/실패를 값으로 표현하는 패턴
record Result<T>(T? Value, string? Error)
{
    public bool IsSuccess => Error is null;
    public static Result<T> Ok(T value)    => new(value, null);
    public static Result<T> Fail(string error) => new(default, error);
}

var result = TryParse("123");
if (result.IsSuccess)
    Console.WriteLine(result.Value);` },
        { name: 'AggregateException', code: `// await Task.WhenAll은 첫 번째 예외만 직접 throw함
// 모든 예외를 보려면 Task를 await 없이 .Wait() 또는 .Exception 사용
var t1 = Task.FromException(new IOException("io error"));
var t2 = Task.FromException(new TimeoutException("timeout"));
var all = Task.WhenAll(t1, t2);
try { await all; }
catch
{
    // all.Exception에 모든 예외가 담김
    foreach (var inner in all.Exception!.InnerExceptions)
        Console.WriteLine(inner.Message);
}` },
        { name: 'ObjectDisposedException 방지', code: `class SafeResource : IDisposable
{
    private bool _disposed;

    public void Use()
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        // ... actual work
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        // cleanup
    }
}` },
        { name: 'OperationCanceledException', code: `async Task RunAsync(CancellationToken ct)
{
    try
    {
        await Task.Delay(5000, ct);
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine("작업이 취소되었습니다.");
        throw; // re-throw to propagate
    }
}` },
        { name: '예외 로깅 패턴', code: `using Microsoft.Extensions.Logging;

static async Task<T?> SafeExecuteAsync<T>(
    Func<Task<T>> action,
    ILogger logger)
{
    try { return await action(); }
    catch (Exception ex)
    {
        logger.LogError(ex, "Operation failed");
        return default;
    }
}` },
      ],
    },
  ],
}
