export default {
  lang: 'Java',
  key: 'java',
  version: 'Java 21 (LTS)',
  cats: [
    {
      title: '기본',
      items: [
        {
          name: 'Hello World',
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        },
        {
          name: '변수 선언 (var)',
          code: `// var: 컴파일러가 타입을 추론 (Java 10+, 지역 변수에만 사용 가능)
var name = "Java 21";
var count = 42;
var pi = 3.14;
System.out.println(name + " " + count + " " + pi);`,
        },
        {
          name: '기본 타입',
          code: `// _ 는 숫자 리터럴 가독성을 위한 구분자 (Java 7+)
int    i = 2_147_483_647;        // 약 21억
long   l = 9_223_372_036_854_775_807L;  // L 접미사 필수
double d = 3.141592653589793;
boolean b = true;
char   c = 'A';   // 단일 문자 (작은따옴표)
String s = "text"; // 문자열은 기본 타입이 아닌 클래스`,
        },
        {
          name: '배열 선언 및 초기화',
          code: `int[] nums = {1, 2, 3, 4, 5};
String[] words = new String[3];
words[0] = "foo";
System.out.println(nums.length);          // 5
System.out.println(java.util.Arrays.toString(nums));`,
        },
        {
          name: '텍스트 블록 (Text Block)',
          code: `// """ 텍스트 블록: Java 15+ 정식 기능, 여러 줄 문자열을 그대로 표현
String json = """
        {
            "name": "Alice",
            "age": 30
        }
        """;
System.out.println(json);`,
        },
        {
          name: '형변환',
          code: `int i = 42;
double d = i;              // 묵시적 widening
int back = (int) d;        // 명시적 narrowing
String s = String.valueOf(i);
int parsed = Integer.parseInt("123");`,
        },
        {
          name: '삼항 연산자',
          code: `int x = 10;
String label = (x > 5) ? "big" : "small";
System.out.println(label);  // big`,
        },
        {
          name: '레코드 (Record)',
          code: `record Point(int x, int y) {
    // 컴팩트 생성자
    Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException("음수 불가");
    }
}

var p = new Point(3, 4);
System.out.println(p.x() + ", " + p.y());`,
        },
        {
          name: '봉인 클래스 (Sealed)',
          code: `// permits: 허용된 구현체만 존재할 수 있음
sealed interface Shape permits Circle, Rect {}
record Circle(double radius) implements Shape {}
record Rect(double w, double h) implements Shape {}

// 메서드는 반드시 클래스 안에 있어야 함
static double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rect r   -> r.w() * r.h();
    };
}`,
        },
      ],
    },
    {
      title: '제어문',
      items: [
        {
          name: 'if-else',
          code: `int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
        },
        {
          name: 'switch 식 (Switch Expression)',
          code: `// switch 식: Java 14+ 정식. -> 화살표로 결과값 반환, fall-through 없음
int day = 3;
String name = switch (day) {
    case 1 -> "Mon";
    case 2 -> "Tue";
    case 3 -> "Wed";
    default -> "Other";
};
System.out.println(name);  // Wed`,
        },
        {
          name: 'switch 식 (yield)',
          code: `int val = 2;
int result = switch (val) {
    case 1, 2 -> {
        int tmp = val * 10;
        yield tmp + 1;
    }
    default -> 0;
};
System.out.println(result);  // 21`,
        },
        {
          name: 'for 루프',
          code: `for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");
}
// 0 1 2 3 4`,
        },
        {
          name: 'for-each 루프',
          code: `var list = java.util.List.of("a", "b", "c");
for (String s : list) {
    System.out.println(s);
}`,
        },
        {
          name: 'while / do-while',
          code: `int n = 3;
while (n > 0) { System.out.print(n-- + " "); }
// 3 2 1

int m = 0;
do { System.out.print(m++ + " "); } while (m < 3);
// 0 1 2`,
        },
        {
          name: 'break / continue / label',
          code: `outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer;
        System.out.println(i + "," + j);
    }
}`,
        },
        {
          name: 'instanceof 패턴 매칭',
          code: `// instanceof 패턴: 타입 검사와 변수 바인딩을 한 번에 (Java 16+)
Object obj = "Hello";
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.toUpperCase());  // HELLO
}`,
        },
        {
          name: 'switch 패턴 매칭 (Pattern Matching)',
          code: `// switch 패턴 매칭: Java 21 정식 기능 (JEP 441)
// when 절로 추가 조건(가드) 지정 가능
Object o = 42;
String desc = switch (o) {
    case Integer i when i < 0 -> "negative";
    case Integer i            -> "int: " + i;
    case String  s            -> "str: " + s;
    case null                 -> "null";
    default                   -> "other";
};
System.out.println(desc);  // int: 42`,
        },
      ],
    },
    {
      title: '클래스/구조',
      items: [
        {
          name: '클래스 기본',
          code: `public class Person {
    private final String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String name() { return name; }
    public int age()     { return age; }

    @Override public String toString() {
        return "Person[" + name + ", " + age + "]";
    }
}`,
        },
        {
          name: '상속 (extends)',
          code: `class Animal {
    String sound() { return "..."; }
}

class Dog extends Animal {
    @Override String sound() { return "Woof"; }
}

Animal a = new Dog();
System.out.println(a.sound());  // Woof`,
        },
        {
          name: '정적 팩토리 메서드',
          code: `public class Color {
    private final int r, g, b;
    private Color(int r, int g, int b) { this.r=r; this.g=g; this.b=b; }

    public static Color of(int r, int g, int b) {
        return new Color(r, g, b);
    }
    public static Color red()   { return of(255, 0, 0); }
    public static Color green() { return of(0, 255, 0); }
}`,
        },
        {
          name: '열거형 (Enum)',
          code: `enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass, radius;
    Planet(double mass, double radius) {
        this.mass = mass; this.radius = radius;
    }
    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
}`,
        },
        {
          name: '레코드 상속 패턴',
          code: `sealed interface Expr permits Num, Add {}
record Num(int value)        implements Expr {}
record Add(Expr l, Expr r)   implements Expr {}

// 레코드 패턴 분해(Record Pattern)는 Java 21 정식 기능
static int eval(Expr e) {
    return switch (e) {
        case Num(var v)        -> v;
        case Add(var l, var r) -> eval(l) + eval(r);
    };
}`,
        },
        {
          name: '빌더 패턴',
          code: `public class Request {
    private final String url;
    private final int timeout;

    private Request(Builder b) { url = b.url; timeout = b.timeout; }

    public static class Builder {
        private String url;
        private int timeout = 30;
        public Builder url(String u)      { url = u;      return this; }
        public Builder timeout(int t)     { timeout = t;  return this; }
        public Request build()            { return new Request(this); }
    }
}
// 사용: new Request.Builder().url("https://example.com").build();`,
        },
        {
          name: '싱글톤 (Singleton)',
          code: `public class Config {
    private static final Config INSTANCE = new Config();
    private Config() {}
    public static Config getInstance() { return INSTANCE; }
}`,
        },
        {
          name: '중첩 클래스 / 정적 멤버 클래스',
          code: `public class Outer {
    private int x = 10;

    static class StaticNested {
        void print() { System.out.println("static nested"); }
    }

    class Inner {
        void printOuter() { System.out.println(x); }
    }
}`,
        },
        {
          name: '익명 클래스',
          code: `Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("익명 클래스 실행");
    }
};
r.run();`,
        },
      ],
    },
    {
      title: '인터페이스/제네릭',
      items: [
        {
          name: '인터페이스 & 구현',
          code: `interface Printable {
    void print();
    default String label() { return "Printable"; }
}

class Doc implements Printable {
    @Override public void print() { System.out.println("Doc"); }
}`,
        },
        {
          name: '함수형 인터페이스',
          code: `@FunctionalInterface
interface Transformer<T, R> {
    R transform(T input);
}

Transformer<String, Integer> len = String::length;
System.out.println(len.transform("hello"));  // 5`,
        },
        {
          name: '제네릭 클래스',
          code: `public class Pair<A, B> {
    private final A first;
    private final B second;
    public Pair(A first, B second) { this.first = first; this.second = second; }
    public A first()  { return first; }
    public B second() { return second; }
    public static <X, Y> Pair<X, Y> of(X x, Y y) { return new Pair<>(x, y); }
}`,
        },
        {
          name: '제네릭 메서드',
          code: `// <T extends Comparable<T>>: 비교 가능한 타입만 허용
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// 호출 예시 (main 메서드 내부에서)
// System.out.println(max(3, 7));         // 7
// System.out.println(max("abc", "xyz")); // xyz`,
        },
        {
          name: '와일드카드 (Wildcard)',
          code: `// 상한 경계(? extends): Number 및 하위 타입 읽기 — Producer Extends
static double sum(java.util.List<? extends Number> list) {
    double s = 0;
    for (Number n : list) s += n.doubleValue();
    return s;
}

// 하한 경계(? super): Integer 및 상위 타입에 쓰기 — Consumer Super
static void addInts(java.util.List<? super Integer> list) {
    list.add(1); list.add(2);
}`,
        },
        {
          name: 'Comparable 구현',
          code: `record Student(String name, int grade) implements Comparable<Student> {
    @Override
    public int compareTo(Student o) {
        return Integer.compare(this.grade, o.grade);
    }
}

var s = new java.util.ArrayList<>(java.util.List.of(
    new Student("Bob", 80), new Student("Alice", 90)));
java.util.Collections.sort(s);`,
        },
        {
          name: 'Iterable 구현',
          code: `class Range implements Iterable<Integer> {
    private final int from, to;
    Range(int from, int to) { this.from = from; this.to = to; }

    @Override
    public java.util.Iterator<Integer> iterator() {
        return new java.util.Iterator<>() {
            int cur = from;
            public boolean hasNext() { return cur < to; }
            public Integer next()    { return cur++; }
        };
    }
}`,
        },
        {
          name: '인터페이스 정적/디폴트 메서드',
          code: `interface MathOp {
    int operate(int a, int b);
    default MathOp andThen(MathOp next) {
        return (a, b) -> next.operate(this.operate(a, b), 0);
    }
    static MathOp add() { return (a, b) -> a + b; }
}`,
        },
      ],
    },
    {
      title: '문자열',
      items: [
        {
          name: '문자열 기본 조작',
          code: `String s = "  Hello, Java!  ";
System.out.println(s.trim());              // "Hello, Java!"
System.out.println(s.strip());             // strip: Unicode 공백 포함
System.out.println(s.toLowerCase());
System.out.println(s.contains("Java"));   // true
System.out.println(s.replace("Java", "World"));`,
        },
        {
          name: 'String.format / formatted',
          code: `String name = "Alice";
int age = 30;
String msg = "이름: %s, 나이: %d".formatted(name, age);
System.out.println(msg);

// printf 스타일
System.out.printf("Pi = %.4f%n", Math.PI);`,
        },
        {
          name: 'StringBuilder',
          code: `var sb = new StringBuilder();
for (int i = 1; i <= 5; i++) {
    sb.append(i);
    if (i < 5) sb.append(", ");
}
System.out.println(sb);  // 1, 2, 3, 4, 5`,
        },
        {
          name: '문자열 분리 / 결합',
          code: `String csv = "a,b,c,d";
String[] parts = csv.split(",");
System.out.println(parts.length);  // 4

String joined = String.join(" | ", parts);
System.out.println(joined);  // a | b | c | d`,
        },
        {
          name: '정규식 (Regex)',
          code: `String email = "user@example.com";
boolean valid = email.matches("[\\w.]+@[\\w.]+\\.[a-z]{2,}");
System.out.println(valid);  // true

String cleaned = "abc  def   ghi".replaceAll("\\s+", " ");
System.out.println(cleaned);  // abc def ghi`,
        },
        {
          name: 'chars() / codePoints()',
          code: `long upper = "Hello World"
    .chars()
    .filter(Character::isUpperCase)
    .count();
System.out.println(upper);  // 2`,
        },
        {
          name: '문자열 반복 / 들여쓰기',
          code: `String line = "-".repeat(20);
System.out.println(line);

String indented = "hello\nworld".indent(4);
System.out.print(indented);`,
        },
        {
          name: '문자열 → 숫자 / 숫자 → 문자열',
          code: `int    i = Integer.parseInt("42");
double d = Double.parseDouble("3.14");
long   l = Long.parseLong("9876543210");

String si = Integer.toString(i);
String sd = String.valueOf(d);
String hex = Integer.toHexString(255);  // "ff"`,
        },
        {
          name: 'stripLeading / stripTrailing / isBlank',
          code: `String s = "   hello   ";
System.out.println(s.stripLeading());   // "hello   "
System.out.println(s.stripTrailing());  // "   hello"
System.out.println("   ".isBlank());    // true
System.out.println(s.isBlank());        // false`,
        },
      ],
    },
    {
      title: '컬렉션',
      items: [
        {
          name: 'List (불변/가변)',
          code: `// 불변
var immutable = java.util.List.of(1, 2, 3);

// 가변
var mutable = new java.util.ArrayList<>(immutable);
mutable.add(4);
mutable.remove(Integer.valueOf(2));
System.out.println(mutable);  // [1, 3, 4]`,
        },
        {
          name: 'Map (불변/가변)',
          code: `// 불변
var map = java.util.Map.of("a", 1, "b", 2, "c", 3);

// 가변
var mmap = new java.util.HashMap<>(map);
mmap.put("d", 4);
mmap.putIfAbsent("a", 99);   // 이미 있으므로 무시
System.out.println(mmap.getOrDefault("z", -1));  // -1`,
        },
        {
          name: 'Set',
          code: `var set = new java.util.HashSet<>(java.util.List.of(1, 2, 3, 2, 1));
System.out.println(set.size());   // 3
set.add(4);
set.remove(2);
System.out.println(set.contains(3));  // true`,
        },
        {
          name: 'LinkedHashMap (순서 보존)',
          code: `var lhm = new java.util.LinkedHashMap<String, Integer>();
lhm.put("banana", 3);
lhm.put("apple",  1);
lhm.put("cherry", 2);
lhm.forEach((k, v) -> System.out.println(k + "=" + v));`,
        },
        {
          name: 'TreeMap (정렬)',
          code: `var tm = new java.util.TreeMap<String, Integer>();
tm.put("c", 3); tm.put("a", 1); tm.put("b", 2);
System.out.println(tm.firstKey());  // a
System.out.println(tm.lastKey());   // c
System.out.println(tm.headMap("b")); // {a=1}`,
        },
        {
          name: 'Queue / Deque',
          code: `java.util.Deque<String> deque = new java.util.ArrayDeque<>();
deque.offerFirst("B");
deque.offerFirst("A");
deque.offerLast("C");
System.out.println(deque.pollFirst());  // A
System.out.println(deque.peekLast());   // C`,
        },
        {
          name: 'Collections 유틸',
          code: `var list = new java.util.ArrayList<>(java.util.List.of(3, 1, 4, 1, 5));
java.util.Collections.sort(list);
java.util.Collections.reverse(list);
java.util.Collections.shuffle(list);
int max = java.util.Collections.max(list);
System.out.println(max);`,
        },
        {
          name: 'Map.Entry 순회',
          code: `var scores = java.util.Map.of("Alice", 90, "Bob", 75);
scores.entrySet()
      .stream()
      .sorted(java.util.Map.Entry.<String,Integer>comparingByValue().reversed())
      .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));`,
        },
        {
          name: 'computeIfAbsent / merge',
          code: `var index = new java.util.HashMap<Character, java.util.List<Integer>>();
String s = "hello";
for (int i = 0; i < s.length(); i++) {
    index.computeIfAbsent(s.charAt(i), k -> new java.util.ArrayList<>()).add(i);
}
// merge: 빈도 집계
var freq = new java.util.HashMap<Character, Integer>();
for (char c : s.toCharArray())
    freq.merge(c, 1, Integer::sum);`,
        },
      ],
    },
    {
      title: '스트림(Stream)',
      items: [
        {
          name: '기본 스트림 파이프라인',
          code: `// 스트림: 원본 변경 없이 데이터를 선언적으로 처리
var result = java.util.List.of(1, 2, 3, 4, 5, 6)
    .stream()
    .filter(n -> n % 2 == 0)  // 중간 연산: 짝수만
    .map(n -> n * n)           // 중간 연산: 제곱
    .toList();                 // 최종 연산: 불변 리스트로 수집 (Java 16+)
System.out.println(result);  // [4, 16, 36]`,
        },
        {
          name: 'collect (Collectors)',
          code: `// groupingBy: 첫 글자를 키로 그룹화
var words = java.util.List.of("apple", "banana", "avocado", "blueberry");
var byInitial = words.stream()
    .collect(java.util.stream.Collectors.groupingBy(w -> w.charAt(0)));
System.out.println(byInitial);`,
        },
        {
          name: 'reduce',
          code: `int sum = java.util.stream.IntStream.rangeClosed(1, 10)
    .reduce(0, Integer::sum);
System.out.println(sum);  // 55

var concat = java.util.List.of("a", "b", "c").stream()
    .reduce("", (a, b) -> a + b);
System.out.println(concat);  // abc`,
        },
        {
          name: 'flatMap',
          code: `var sentences = java.util.List.of("hello world", "foo bar");
var allWords = sentences.stream()
    .flatMap(s -> java.util.Arrays.stream(s.split(" ")))
    .toList();
System.out.println(allWords);  // [hello, world, foo, bar]`,
        },
        {
          name: 'sorted / distinct / limit / skip',
          code: `java.util.stream.IntStream.of(5, 3, 1, 4, 1, 2, 3)
    .distinct()
    .sorted()
    .limit(4)
    .forEach(n -> System.out.print(n + " "));
// 1 2 3 4`,
        },
        {
          name: 'anyMatch / allMatch / noneMatch',
          code: `var nums = java.util.List.of(2, 4, 6, 8);
System.out.println(nums.stream().allMatch(n -> n % 2 == 0));  // true
System.out.println(nums.stream().anyMatch(n -> n > 5));       // true
System.out.println(nums.stream().noneMatch(n -> n < 0));      // true`,
        },
        {
          name: 'Collectors.joining / counting / summarizing',
          code: `var words = java.util.List.of("Java", "Stream", "API");

// joining: 구분자, 접두사, 접미사 지정
String joined = words.stream()
    .collect(java.util.stream.Collectors.joining(", ", "[", "]"));
System.out.println(joined);  // [Java, Stream, API]

long count = words.stream()
    .collect(java.util.stream.Collectors.counting());
System.out.println(count);   // 3`,
        },
        {
          name: 'Optional',
          code: `var opt = java.util.List.of(3, 7, 2, 9, 1).stream()
    .filter(n -> n > 5)
    .findFirst();           // Optional<Integer> 반환

opt.ifPresent(v -> System.out.println("found: " + v));  // 값이 있을 때만 실행
int val  = opt.orElse(-1);                  // 없으면 기본값
int val2 = opt.orElseGet(() -> 0);          // 없으면 공급자 호출`,
        },
        {
          name: '병렬 스트림',
          code: `long sum = java.util.stream.LongStream
    .rangeClosed(1, 1_000_000)
    .parallel()
    .sum();
System.out.println(sum);`,
        },
      ],
    },
    {
      title: '파일·IO',
      items: [
        {
          name: '파일 읽기 (Files.readString)',
          code: `// Files.readString: Java 11+, 파일 전체를 문자열로 읽기
java.nio.file.Path path = java.nio.file.Path.of("data.txt");
String content = java.nio.file.Files.readString(path);
System.out.println(content);`,
        },
        {
          name: '파일 쓰기 (Files.writeString)',
          code: `java.nio.file.Path path = java.nio.file.Path.of("output.txt");
java.nio.file.Files.writeString(path, "Hello, file!");

// 추가 모드: APPEND 옵션으로 기존 내용 뒤에 붙이기
java.nio.file.Files.writeString(path, "\nSecond line",
    java.nio.file.StandardOpenOption.APPEND);`,
        },
        {
          name: '라인 단위 읽기 (Files.lines)',
          code: `// try-with-resources: 스트림을 자동으로 닫아 메모리 누수 방지
try (var lines = java.nio.file.Files.lines(java.nio.file.Path.of("data.txt"))) {
    lines.filter(l -> !l.isBlank())
         .map(String::trim)
         .forEach(System.out::println);
}`,
        },
        {
          name: '디렉터리 목록 (Files.list)',
          code: `try (var entries = java.nio.file.Files.list(java.nio.file.Path.of("."))) {
    entries.filter(java.nio.file.Files::isRegularFile)
           .map(java.nio.file.Path::getFileName)
           .forEach(System.out::println);
}`,
        },
        {
          name: 'BufferedReader / BufferedWriter',
          code: `// Files.newBufferedReader/Writer: NIO 기반 편리한 팩토리 메서드
try (var br = java.nio.file.Files.newBufferedReader(java.nio.file.Path.of("in.txt"));
     var bw = java.nio.file.Files.newBufferedWriter(java.nio.file.Path.of("out.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line.toUpperCase());
        bw.newLine();
    }
}`,
        },
        {
          name: 'Path 조작',
          code: `java.nio.file.Path p = java.nio.file.Path.of("/home/user/docs/report.pdf");
System.out.println(p.getFileName());   // report.pdf
System.out.println(p.getParent());     // /home/user/docs
System.out.println(p.getRoot());       // /

// resolve: 경로 합치기, relativize: 상대 경로 계산
java.nio.file.Path resolved = java.nio.file.Path.of("/tmp").resolve("sub/file.txt");
java.nio.file.Path relative = java.nio.file.Path.of("/a/b")
    .relativize(java.nio.file.Path.of("/a/b/c/d"));`,
        },
        {
          name: '임시 파일 / 파일 복사 삭제',
          code: `java.nio.file.Path tmp = java.nio.file.Files.createTempFile("prefix-", ".txt");
java.nio.file.Files.writeString(tmp, "temp content");

java.nio.file.Path copy = tmp.resolveSibling("copy.txt");
// REPLACE_EXISTING: 대상 파일이 이미 있으면 덮어쓰기
java.nio.file.Files.copy(tmp, copy,
    java.nio.file.StandardCopyOption.REPLACE_EXISTING);

java.nio.file.Files.delete(tmp);
System.out.println(java.nio.file.Files.exists(tmp));  // false`,
        },
        {
          name: 'Properties 파일 읽기',
          code: `var props = new java.util.Properties();
try (var is = java.nio.file.Files.newInputStream(
        java.nio.file.Path.of("app.properties"))) {
    props.load(is);
}
// getProperty(key, defaultValue): 없으면 기본값 반환
String host = props.getProperty("host", "localhost");
int port = Integer.parseInt(props.getProperty("port", "8080"));`,
        },
      ],
    },
    {
      title: '날짜·시간',
      items: [
        {
          name: '현재 날짜/시간',
          code: `// java.time: Java 8+ 날짜/시간 API (불변 객체)
java.time.LocalDate date = java.time.LocalDate.now();
java.time.LocalTime time = java.time.LocalTime.now();
java.time.LocalDateTime dt = java.time.LocalDateTime.now();
// ZonedDateTime: 타임존 포함 날짜/시간
java.time.ZonedDateTime zdt = java.time.ZonedDateTime.now(
    java.time.ZoneId.of("Asia/Seoul"));

System.out.println(date);  // 예: 2024-06-20
System.out.println(time);  // 예: 14:30:00.123`,
        },
        {
          name: '날짜 생성 및 조작',
          code: `// LocalDate는 불변 — plus/minus/with 메서드는 새 객체 반환
java.time.LocalDate d = java.time.LocalDate.of(2024, 1, 1);
java.time.LocalDate nextWeek  = d.plusWeeks(1);
java.time.LocalDate lastMonth = d.minusMonths(1);
java.time.LocalDate firstDay  = d.withDayOfMonth(1);
int daysInMonth = d.lengthOfMonth();
System.out.println(d.getDayOfWeek());  // MONDAY`,
        },
        {
          name: '날짜 비교',
          code: `java.time.LocalDate a = java.time.LocalDate.of(2024, 3, 15);
java.time.LocalDate b = java.time.LocalDate.of(2024, 6, 20);

System.out.println(a.isBefore(b));  // true
System.out.println(a.isAfter(b));   // false

// ChronoUnit.DAYS.between: 두 날짜 사이의 일수
long days = java.time.temporal.ChronoUnit.DAYS.between(a, b);
System.out.println(days);  // 97`,
        },
        {
          name: 'DateTimeFormatter',
          code: `java.time.LocalDateTime dt = java.time.LocalDateTime.of(2024, 6, 20, 14, 30);
// ofPattern: 사용자 정의 포맷 (yyyy=연, MM=월, dd=일, HH=24시, mm=분)
java.time.format.DateTimeFormatter fmt =
    java.time.format.DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
String s = dt.format(fmt);
System.out.println(s);  // 2024/06/20 14:30

java.time.LocalDateTime parsed = java.time.LocalDateTime.parse(s, fmt);`,
        },
        {
          name: 'Period / Duration',
          code: `// Period: 날짜 차이 (년/월/일), Duration: 시간 차이 (시/분/초)
java.time.Period p = java.time.Period.between(
    java.time.LocalDate.of(2020, 1, 1), java.time.LocalDate.now());
System.out.println(p.getYears() + "년 " + p.getMonths() + "개월");

java.time.Duration d = java.time.Duration.between(
    java.time.LocalTime.of(9, 0), java.time.LocalTime.of(17, 30));
System.out.println(d.toHours() + "시간 " + d.toMinutesPart() + "분");`,
        },
        {
          name: 'Instant & 타임존 변환',
          code: `// Instant: UTC 기준 타임스탬프 (에포크 시간)
java.time.Instant now = java.time.Instant.now();
System.out.println(now.toEpochMilli());

java.time.ZonedDateTime seoulTime = now.atZone(java.time.ZoneId.of("Asia/Seoul"));
// withZoneSameInstant: 같은 순간을 다른 타임존으로 변환
java.time.ZonedDateTime nyTime =
    seoulTime.withZoneSameInstant(java.time.ZoneId.of("America/New_York"));
System.out.println(nyTime);`,
        },
        {
          name: 'YearMonth / MonthDay',
          code: `java.time.YearMonth ym = java.time.YearMonth.of(2024, 2);
System.out.println(ym.lengthOfMonth());  // 29 (윤년)
System.out.println(ym.isLeapYear());     // true

// MonthDay: 연도 없는 날짜 (생일 등 매년 반복되는 날)
java.time.MonthDay birthday = java.time.MonthDay.of(6, 20);
System.out.println(birthday.atYear(2024));  // 2024-06-20`,
        },
        {
          name: 'Clock (테스트용 고정 시계)',
          code: `// Clock.fixed: 항상 같은 시각 반환 → 테스트에서 시간 고정에 사용
java.time.Clock fixed = java.time.Clock.fixed(
    java.time.Instant.parse("2024-01-01T00:00:00Z"),
    java.time.ZoneOffset.UTC);

java.time.LocalDate d = java.time.LocalDate.now(fixed);
System.out.println(d);  // 2024-01-01`,
        },
      ],
    },
    {
      title: '예외처리',
      items: [
        {
          name: 'try-catch-finally',
          code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.err.println("산술 오류: " + e.getMessage());
} catch (Exception e) {
    System.err.println("기타 오류: " + e);
} finally {
    System.out.println("항상 실행");
}`,
        },
        {
          name: '멀티 catch',
          code: `// | 로 여러 예외를 하나의 catch에서 처리
try {
    String s = null;
    s.length();                // NullPointerException
    int n = Integer.parseInt("abc");  // NumberFormatException
} catch (NumberFormatException | NullPointerException e) {
    System.err.println("입력 오류: " + e.getClass().getSimpleName());
}`,
        },
        {
          name: 'try-with-resources',
          code: `// try-with-resources: AutoCloseable 자원을 자동 닫기 (Java 7+)
try (var is = new java.io.FileInputStream("data.bin");
     var bis = new java.io.BufferedInputStream(is)) {
    byte[] buf = bis.readAllBytes();
    System.out.println("읽음: " + buf.length + " bytes");
} catch (java.io.IOException e) {
    e.printStackTrace();
}`,
        },
        {
          name: '사용자 정의 예외',
          code: `public class AppException extends RuntimeException {
    private final int code;
    public AppException(int code, String message) {
        super(message);
        this.code = code;
    }
    public int code() { return code; }
}

// 사용 예시 (메서드 내부에서 throw)
static void findResource(int id) {
    if (id != 1) throw new AppException(404, "리소스를 찾을 수 없음");
}`,
        },
        {
          name: '예외 연쇄 (Chaining)',
          code: `// 저수준 예외를 원인(cause)으로 포함해 고수준 예외로 감싸기
try {
    java.nio.file.Files.readString(java.nio.file.Path.of("missing.txt"));
} catch (java.io.IOException cause) {
    throw new RuntimeException("설정 파일 로드 실패", cause);
}`,
        },
        {
          name: '예외 무시 (suppress)',
          code: `// 변환 실패 시 기본값을 반환하는 안전한 파싱 메서드
static int safeParseInt(String s, int fallback) {
    try {
        return Integer.parseInt(s);
    } catch (NumberFormatException ignored) {
        // 의도적으로 무시 — 기본값 반환
        return fallback;
    }
}`,
        },
        {
          name: 'Checked vs Unchecked',
          code: `// Checked: 컴파일러가 처리 강제 (IOException 등)
static void readFile(String path) throws java.io.IOException {
    java.nio.file.Files.readString(java.nio.file.Path.of(path));
}

// Unchecked (RuntimeException 하위): 처리 선택 사항
static void validate(String s) {
    if (s == null) throw new IllegalArgumentException("null 불가");
}`,
        },
        {
          name: 'Result 패턴 (Optional 활용)',
          code: `// 예외 대신 Optional로 실패를 표현하는 패턴
static java.util.Optional<Integer> safeParse(String s) {
    try {
        return java.util.Optional.of(Integer.parseInt(s));
    } catch (NumberFormatException e) {
        return java.util.Optional.empty();
    }
}

// 호출 예시 (main 메서드 내부에서)
// safeParse("42").ifPresent(v -> System.out.println("값: " + v));
// int val = safeParse("bad").orElse(0);`,
        },
      ],
    },
    {
      title: '동시성',
      items: [
        {
          name: '스레드 생성 및 실행',
          code: `// 플랫폼 스레드 생성 후 시작
Thread t1 = new Thread(() -> System.out.println("thread 1"));
t1.start();

// 가상 스레드: Java 21 정식 기능
Thread t2 = Thread.ofVirtual().start(() -> System.out.println("virtual thread"));

try {
    t1.join();  // t1 종료 대기
    t2.join();  // t2 종료 대기
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
        },
        {
          name: 'ExecutorService',
          code: `// 스레드 풀: 4개 스레드로 8개 작업 처리
var executor = java.util.concurrent.Executors.newFixedThreadPool(4);
for (int i = 0; i < 8; i++) {
    final int id = i;
    executor.submit(() -> System.out.println("task " + id));
}
executor.shutdown();
try {
    // 최대 5초 대기; false 반환 시 타임아웃 초과
    boolean done = executor.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS);
    if (!done) System.err.println("작업이 제한 시간 내에 완료되지 않았습니다");
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
        },
        {
          name: 'CompletableFuture',
          code: `// 비동기 파이프라인: 공급 → 변환 → 소비 → 예외 처리
static String fetchData()       { return "raw"; }
static String process(String s) { return s.toUpperCase(); }

java.util.concurrent.CompletableFuture
    .supplyAsync(() -> fetchData())       // 별도 스레드에서 실행
    .thenApply(data -> process(data))     // 결과 변환
    .thenAccept(result -> System.out.println("결과: " + result))
    .exceptionally(ex -> { ex.printStackTrace(); return null; });`,
        },
        {
          name: 'CompletableFuture 조합',
          code: `// thenCombine: 두 비동기 작업이 모두 완료되면 결합
var f1 = java.util.concurrent.CompletableFuture.supplyAsync(() -> "Hello");
var f2 = java.util.concurrent.CompletableFuture.supplyAsync(() -> "World");

var combined = f1.thenCombine(f2, (a, b) -> a + " " + b);
System.out.println(combined.join());  // Hello World`,
        },
        {
          name: 'synchronized / volatile',
          code: `public class Counter {
    // synchronized가 가시성 보장 → volatile 불필요
    private int count = 0;

    public synchronized void increment() { count++; }
    public synchronized int get()        { return count; }
}`,
        },
        {
          name: 'AtomicInteger',
          code: `// AtomicInteger: lock 없이 스레드 안전한 정수 연산
var counter = new java.util.concurrent.atomic.AtomicInteger(0);
int prev = counter.getAndIncrement();   // 증가 전 값 반환
int next = counter.incrementAndGet();   // 증가 후 값 반환
// CAS(Compare-And-Swap): next와 같으면 0으로 변경
boolean updated = counter.compareAndSet(next, 0);`,
        },
        {
          name: '가상 스레드 (Virtual Thread)',
          code: `// 가상 스레드: Java 21 정식 기능 (JEP 444)
// 수천~수백만 개를 가볍게 생성 가능; I/O 블로킹에 유리
try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 1000; i++) {
        final int id = i;
        // Callable 람다: checked 예외(InterruptedException) 선언 허용
        executor.submit(() -> {
            Thread.sleep(10);
            System.out.println("vt-" + id);
            return null;
        });
    }
} // try-with-resources: executor.close() 자동 호출 (모든 작업 완료 대기)`,
        },
        {
          name: 'ReentrantLock',
          code: `// ReentrantLock: synchronized보다 세밀한 잠금 제어
var lock = new java.util.concurrent.locks.ReentrantLock();
lock.lock();
try {
    // 임계 구역: 한 번에 하나의 스레드만 진입
    System.out.println("lock 보유 중");
} finally {
    lock.unlock();  // 반드시 finally에서 해제
}`,
        },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        {
          name: '람다 & 메서드 참조',
          code: `var list = new java.util.ArrayList<>(java.util.List.of("banana", "apple", "cherry"));

// 람다: 익명 함수
list.sort((a, b) -> a.compareTo(b));

// 메서드 참조: 람다를 더 간결하게
list.sort(String::compareTo);
list.forEach(System.out::println);`,
        },
        {
          name: '불변 리스트 → 가변 변환',
          code: `var immutable = java.util.List.of(3, 1, 4, 1, 5);

// 가변 복사본
var mutable = new java.util.ArrayList<>(immutable);
java.util.Collections.sort(mutable);
System.out.println(mutable);  // [1, 1, 3, 4, 5]`,
        },
        {
          name: '빈도 집계 (groupingBy counting)',
          code: `var words = java.util.List.of("apple", "banana", "apple", "cherry", "banana", "apple");
// groupingBy + counting: 단어별 등장 횟수 집계
var freq = words.stream()
    .collect(java.util.stream.Collectors.groupingBy(
        w -> w, java.util.stream.Collectors.counting()));
freq.entrySet().stream()
    .sorted(java.util.Map.Entry.<String, Long>comparingByValue().reversed())
    .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));`,
        },
        {
          name: '딥 카피 패턴 (레코드)',
          code: `record Config(String host, int port, java.util.List<String> tags) {
    Config withPort(int newPort) {
        return new Config(host, newPort, java.util.List.copyOf(tags));
    }
}

var cfg = new Config("localhost", 8080, java.util.List.of("dev", "local"));
var updated = cfg.withPort(9090);`,
        },
        {
          name: '전략 패턴 (Strategy)',
          code: `@FunctionalInterface
interface SortStrategy<T> {
    java.util.List<T> sort(java.util.List<T> items);
}

SortStrategy<Integer> ascending  = list -> list.stream().sorted().toList();
SortStrategy<Integer> descending = list -> list.stream().sorted(java.util.Comparator.reverseOrder()).toList();

var nums = java.util.List.of(3, 1, 4, 1, 5);
System.out.println(ascending.sort(nums));`,
        },
        {
          name: '옵저버 패턴',
          code: `interface Observer { void update(String event); }

class EventBus {
    private final java.util.List<Observer> listeners = new java.util.ArrayList<>();
    void subscribe(Observer o) { listeners.add(o); }
    void publish(String event) { listeners.forEach(o -> o.update(event)); }
}

var bus = new EventBus();
bus.subscribe(e -> System.out.println("A received: " + e));
bus.publish("click");`,
        },
        {
          name: '재귀 + 메모이제이션',
          code: `// computeIfAbsent 내에서 재귀 호출 시 NPE 위험 → 직접 put 사용
static java.util.Map<Integer, Long> memo = new java.util.HashMap<>();

static long fib(int n) {
    if (n <= 1) return n;
    Long cached = memo.get(n);
    if (cached != null) return cached;
    long result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);
    return result;
}

// 호출 예시
// System.out.println(fib(50));  // 12586269025`,
        },
        {
          name: 'DTO → Map 변환 (Stream)',
          code: `record User(String name, int age, String role) {}

var users = java.util.List.of(
    new User("Alice", 30, "admin"),
    new User("Bob",   25, "user"));

var byRole = users.stream()
    .collect(java.util.stream.Collectors.groupingBy(User::role));
byRole.forEach((role, list) -> System.out.println(role + ": " + list));`,
        },
        {
          name: '단순 HTTP GET (Java 11+)',
          code: `var client = java.net.http.HttpClient.newHttpClient();
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://api.example.com/data"))
    .GET()
    .build();

// send()는 IOException, InterruptedException(checked) 발생 가능
try {
    java.net.http.HttpResponse<String> resp = client.send(
        request, java.net.http.HttpResponse.BodyHandlers.ofString());
    System.out.println(resp.statusCode());
    System.out.println(resp.body());
} catch (java.io.IOException | InterruptedException e) {
    e.printStackTrace();
}`,
        },
      ],
    },
  ],
};
