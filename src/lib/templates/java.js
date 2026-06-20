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
          code: `import java.util.Arrays;

int[] nums = {1, 2, 3, 4, 5};
String[] words = new String[3];
words[0] = "foo";
System.out.println(nums.length);          // 5
System.out.println(Arrays.toString(nums));`,
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
        {
          name: '레코드 패턴 중첩 분해 (Record Pattern)',
          code: `// Java 21 정식 기능(JEP 440): 레코드를 switch 안에서 바로 분해
record Point(int x, int y) {}
record Line(Point start, Point end) {}

// 중첩 레코드도 한 번에 분해, when 가드로 추가 조건
static String describe(Object obj) {
    return switch (obj) {
        case Line(Point(int x1, int y1), Point(int x2, int y2))
            when x1 == x2 -> "수직선 x=" + x1;
        case Line(Point(var x1, var y1), Point(var x2, var y2)) ->
            "사선 (" + x1 + "," + y1 + ")→(" + x2 + "," + y2 + ")";
        case Point(var x, var y) -> "점 (" + x + "," + y + ")";
        default -> "기타";
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
          code: `import java.util.List;

var list = List.of("a", "b", "c");
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
        {
          name: 'enum 추상 메서드 (상수별 동작 정의)',
          code: `// 각 상수가 추상 메서드를 다르게 구현 → 상수별 다형성
enum Operation {
    PLUS("+") {
        @Override public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        @Override public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        @Override public double apply(double x, double y) { return x * y; }
    };

    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }

    // 각 상수가 반드시 구현해야 하는 추상 메서드
    public abstract double apply(double x, double y);

    @Override public String toString() { return symbol; }
}

// 사용 예시
for (Operation op : Operation.values()) {
    System.out.printf("3 %s 2 = %.1f%n", op, op.apply(3, 2));
}`,
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
          code: `import java.util.List;

// 상한 경계(? extends): Number 및 하위 타입 읽기 — Producer Extends
static double sum(List<? extends Number> list) {
    double s = 0;
    for (Number n : list) s += n.doubleValue();
    return s;
}

// 하한 경계(? super): Integer 및 상위 타입에 쓰기 — Consumer Super
static void addInts(List<? super Integer> list) {
    list.add(1); list.add(2);
}`,
        },
        {
          name: 'Comparable 구현',
          code: `import java.util.*;

record Student(String name, int grade) implements Comparable<Student> {
    @Override
    public int compareTo(Student o) {
        return Integer.compare(this.grade, o.grade);
    }
}

var s = new ArrayList<>(List.of(
    new Student("Bob", 80), new Student("Alice", 90)));
Collections.sort(s);`,
        },
        {
          name: 'Iterable 구현',
          code: `import java.util.Iterator;

class Range implements Iterable<Integer> {
    private final int from, to;
    Range(int from, int to) { this.from = from; this.to = to; }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
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
        {
          name: 'String.lines() / repeat()',
          code: `// lines(): 줄 구분자(\\n, \\r\\n 등)로 분리한 스트림 반환 (Java 11+)
String text = "첫째 줄\\n둘째 줄\\n셋째 줄";
long lineCount = text.lines().count();
System.out.println(lineCount);  // 3

text.lines()
    .map(String::strip)
    .filter(l -> !l.isBlank())
    .forEach(System.out::println);

// repeat(): 문자열을 n번 반복 (Java 11+)
String sep = "=".repeat(30);
System.out.println(sep);  // ==============================`,
        },
      ],
    },
    {
      title: '컬렉션',
      items: [
        {
          name: 'List (불변/가변)',
          code: `import java.util.*;

// 불변
var immutable = List.of(1, 2, 3);

// 가변
var mutable = new ArrayList<>(immutable);
mutable.add(4);
mutable.remove(Integer.valueOf(2));
System.out.println(mutable);  // [1, 3, 4]`,
        },
        {
          name: 'Map (불변/가변)',
          code: `import java.util.*;

// 불변
var map = Map.of("a", 1, "b", 2, "c", 3);

// 가변
var mmap = new HashMap<>(map);
mmap.put("d", 4);
mmap.putIfAbsent("a", 99);   // 이미 있으므로 무시
System.out.println(mmap.getOrDefault("z", -1));  // -1`,
        },
        {
          name: 'Set',
          code: `import java.util.*;

var set = new HashSet<>(List.of(1, 2, 3, 2, 1));
System.out.println(set.size());   // 3
set.add(4);
set.remove(2);
System.out.println(set.contains(3));  // true`,
        },
        {
          name: 'LinkedHashMap (순서 보존)',
          code: `import java.util.LinkedHashMap;

var lhm = new LinkedHashMap<String, Integer>();
lhm.put("banana", 3);
lhm.put("apple",  1);
lhm.put("cherry", 2);
lhm.forEach((k, v) -> System.out.println(k + "=" + v));`,
        },
        {
          name: 'TreeMap (정렬)',
          code: `import java.util.TreeMap;

var tm = new TreeMap<String, Integer>();
tm.put("c", 3); tm.put("a", 1); tm.put("b", 2);
System.out.println(tm.firstKey());  // a
System.out.println(tm.lastKey());   // c
System.out.println(tm.headMap("b")); // {a=1}`,
        },
        {
          name: 'Queue / Deque',
          code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<String> deque = new ArrayDeque<>();
deque.offerFirst("B");
deque.offerFirst("A");
deque.offerLast("C");
System.out.println(deque.pollFirst());  // A
System.out.println(deque.peekLast());   // C`,
        },
        {
          name: 'Collections 유틸',
          code: `import java.util.*;

var list = new ArrayList<>(List.of(3, 1, 4, 1, 5));
Collections.sort(list);
Collections.reverse(list);
Collections.shuffle(list);
int max = Collections.max(list);
System.out.println(max);`,
        },
        {
          name: 'Comparator 다중 정렬 (thenComparing)',
          code: `import java.util.Comparator;
import java.util.List;

record Employee(String dept, String name, int salary) {}

var employees = List.of(
    new Employee("Dev",  "Charlie", 5000),
    new Employee("Dev",  "Alice",   7000),
    new Employee("HR",   "Bob",     4000),
    new Employee("Dev",  "Alice",   6000));

// 1차: 부서명 오름차순, 2차: 이름 오름차순, 3차: 급여 내림차순
var sorted = employees.stream()
    .sorted(Comparator.comparing(Employee::dept)
        .thenComparing(Employee::name)
        .thenComparing(Comparator.comparingInt(Employee::salary).reversed()))
    .toList();
sorted.forEach(System.out::println);`,
        },
        {
          name: 'Map.Entry 순회',
          code: `import java.util.*;

var scores = Map.of("Alice", 90, "Bob", 75);
scores.entrySet()
      .stream()
      .sorted(Map.Entry.<String,Integer>comparingByValue().reversed())
      .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));`,
        },
        {
          name: 'computeIfAbsent / merge',
          code: `import java.util.*;

var index = new HashMap<Character, List<Integer>>();
String s = "hello";
for (int i = 0; i < s.length(); i++) {
    index.computeIfAbsent(s.charAt(i), k -> new ArrayList<>()).add(i);
}
// merge: 빈도 집계
var freq = new HashMap<Character, Integer>();
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
          code: `import java.util.List;

// 스트림: 원본 변경 없이 데이터를 선언적으로 처리
var result = List.of(1, 2, 3, 4, 5, 6)
    .stream()
    .filter(n -> n % 2 == 0)  // 중간 연산: 짝수만
    .map(n -> n * n)           // 중간 연산: 제곱
    .toList();                 // 최종 연산: 불변 리스트로 수집 (Java 16+)
System.out.println(result);  // [4, 16, 36]`,
        },
        {
          name: 'collect (Collectors)',
          code: `import java.util.List;
import java.util.stream.Collectors;

// groupingBy: 첫 글자를 키로 그룹화
var words = List.of("apple", "banana", "avocado", "blueberry");
var byInitial = words.stream()
    .collect(Collectors.groupingBy(w -> w.charAt(0)));
System.out.println(byInitial);`,
        },
        {
          name: 'reduce',
          code: `import java.util.List;
import java.util.stream.IntStream;

int sum = IntStream.rangeClosed(1, 10)
    .reduce(0, Integer::sum);
System.out.println(sum);  // 55

var concat = List.of("a", "b", "c").stream()
    .reduce("", (a, b) -> a + b);
System.out.println(concat);  // abc`,
        },
        {
          name: 'flatMap',
          code: `import java.util.Arrays;
import java.util.List;

var sentences = List.of("hello world", "foo bar");
var allWords = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .toList();
System.out.println(allWords);  // [hello, world, foo, bar]`,
        },
        {
          name: 'sorted / distinct / limit / skip',
          code: `import java.util.stream.IntStream;

IntStream.of(5, 3, 1, 4, 1, 2, 3)
    .distinct()
    .sorted()
    .limit(4)
    .forEach(n -> System.out.print(n + " "));
// 1 2 3 4`,
        },
        {
          name: 'anyMatch / allMatch / noneMatch',
          code: `import java.util.List;

var nums = List.of(2, 4, 6, 8);
System.out.println(nums.stream().allMatch(n -> n % 2 == 0));  // true
System.out.println(nums.stream().anyMatch(n -> n > 5));       // true
System.out.println(nums.stream().noneMatch(n -> n < 0));      // true`,
        },
        {
          name: 'Collectors.joining / counting / summarizing',
          code: `import java.util.List;
import java.util.stream.Collectors;

var words = List.of("Java", "Stream", "API");

// joining: 구분자, 접두사, 접미사 지정
String joined = words.stream()
    .collect(Collectors.joining(", ", "[", "]"));
System.out.println(joined);  // [Java, Stream, API]

long count = words.stream()
    .collect(Collectors.counting());
System.out.println(count);   // 3`,
        },
        {
          name: 'Collectors.partitioningBy / toMap',
          code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

var nums = List.of(1, 2, 3, 4, 5, 6);

// partitioningBy: true/false 두 그룹으로 분류
Map<Boolean, List<Integer>> parts = nums.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));
System.out.println(parts.get(true));   // [2, 4, 6]
System.out.println(parts.get(false));  // [1, 3, 5]

// toMap: 스트림 요소를 Map으로 변환 (키 중복 시 예외)
record Item(String name, int price) {}
var items = List.of(new Item("apple", 100), new Item("banana", 200));
Map<String, Integer> priceMap = items.stream()
    .collect(Collectors.toMap(Item::name, Item::price));
System.out.println(priceMap);  // {apple=100, banana=200}`,
        },
        {
          name: 'Collectors.teeing',
          code: `import java.util.List;
import java.util.stream.Collectors;

var nums = List.of(1, 2, 3, 4, 5);

// teeing: 두 컬렉터를 동시에 실행해 결과를 합산 (Java 12+)
record Stats(long count, int sum) {}
Stats stats = nums.stream()
    .collect(Collectors.teeing(
        Collectors.counting(),               // 첫 번째 컬렉터
        Collectors.summingInt(n -> n),       // 두 번째 컬렉터
        Stats::new                           // 결과 병합 함수
    ));
System.out.println(stats.count() + "개, 합계=" + stats.sum());  // 5개, 합계=15`,
        },
        {
          name: 'Optional',
          code: `import java.util.List;

var opt = List.of(3, 7, 2, 9, 1).stream()
    .filter(n -> n > 5)
    .findFirst();           // Optional<Integer> 반환

opt.ifPresent(v -> System.out.println("found: " + v));  // 값이 있을 때만 실행
int val  = opt.orElse(-1);                  // 없으면 기본값
int val2 = opt.orElseGet(() -> 0);          // 없으면 공급자 호출`,
        },
        {
          name: 'Optional 체이닝 / orElseThrow',
          code: `import java.util.Optional;

// map: 값이 있으면 변환, 없으면 빈 Optional 유지
// filter: 조건을 불만족하면 빈 Optional로 변환
Optional<String> result = Optional.of("  hello  ")
    .map(String::strip)              // 공백 제거
    .filter(s -> !s.isEmpty())       // 비어 있으면 empty
    .map(String::toUpperCase);       // 대문자 변환

// orElseThrow: 값이 없으면 예외 (NoSuchElementException 또는 커스텀)
String val = result.orElseThrow(() -> new IllegalStateException("값 없음"));
System.out.println(val);  // HELLO

// or: 비어 있을 때 다른 Optional로 대체 (Java 9+)
Optional<String> fallback = Optional.<String>empty()
    .or(() -> Optional.of("기본값"));`,
        },
        {
          name: '병렬 스트림',
          code: `import java.util.stream.LongStream;

long sum = LongStream
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
          code: `import java.nio.file.*;

// Files.readString: Java 11+, 파일 전체를 문자열로 읽기
Path path = Path.of("data.txt");
String content = Files.readString(path);
System.out.println(content);`,
        },
        {
          name: '파일 쓰기 (Files.writeString)',
          code: `import java.nio.file.*;

Path path = Path.of("output.txt");
Files.writeString(path, "Hello, file!");

// 추가 모드: APPEND 옵션으로 기존 내용 뒤에 붙이기
Files.writeString(path, "\nSecond line", StandardOpenOption.APPEND);`,
        },
        {
          name: '라인 단위 읽기 (Files.lines)',
          code: `import java.nio.file.*;

// try-with-resources: 스트림을 자동으로 닫아 메모리 누수 방지
try (var lines = Files.lines(Path.of("data.txt"))) {
    lines.filter(l -> !l.isBlank())
         .map(String::trim)
         .forEach(System.out::println);
}`,
        },
        {
          name: '디렉터리 목록 (Files.list)',
          code: `import java.nio.file.*;

try (var entries = Files.list(Path.of("."))) {
    entries.filter(Files::isRegularFile)
           .map(Path::getFileName)
           .forEach(System.out::println);
}`,
        },
        {
          name: 'BufferedReader / BufferedWriter',
          code: `import java.nio.file.*;

// Files.newBufferedReader/Writer: NIO 기반 편리한 팩토리 메서드
try (var br = Files.newBufferedReader(Path.of("in.txt"));
     var bw = Files.newBufferedWriter(Path.of("out.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line.toUpperCase());
        bw.newLine();
    }
}`,
        },
        {
          name: 'Path 조작',
          code: `import java.nio.file.*;

Path p = Path.of("/home/user/docs/report.pdf");
System.out.println(p.getFileName());   // report.pdf
System.out.println(p.getParent());     // /home/user/docs
System.out.println(p.getRoot());       // /

// resolve: 경로 합치기, relativize: 상대 경로 계산
Path resolved = Path.of("/tmp").resolve("sub/file.txt");
Path relative = Path.of("/a/b").relativize(Path.of("/a/b/c/d"));`,
        },
        {
          name: '임시 파일 / 파일 복사 삭제',
          code: `import java.nio.file.*;

Path tmp = Files.createTempFile("prefix-", ".txt");
Files.writeString(tmp, "temp content");

Path copy = tmp.resolveSibling("copy.txt");
// REPLACE_EXISTING: 대상 파일이 이미 있으면 덮어쓰기
Files.copy(tmp, copy, StandardCopyOption.REPLACE_EXISTING);

Files.delete(tmp);
System.out.println(Files.exists(tmp));  // false`,
        },
        {
          name: 'Files.walk (디렉터리 재귀 탐색)',
          code: `import java.io.IOException;
import java.nio.file.*;

// Files.walk: 지정 경로 아래 모든 파일/폴더를 재귀적으로 스트림으로 반환
// maxDepth 생략 시 전체 깊이 탐색
try (var stream = Files.walk(Path.of("."), 3)) {
    // .java 파일만 필터링
    stream.filter(p -> p.toString().endsWith(".java"))
          .forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}

// Files.find: 조건을 BiPredicate로 직접 지정 (성능 우수)
try (var found = Files.find(Path.of("."), 5,
        (p, attr) -> attr.isRegularFile() && p.toString().endsWith(".class"))) {
    found.forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}`,
        },
        {
          name: 'Properties 파일 읽기',
          code: `import java.nio.file.*;
import java.util.Properties;

var props = new Properties();
try (var is = Files.newInputStream(Path.of("app.properties"))) {
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
          code: `import java.time.*;

// java.time: Java 8+ 날짜/시간 API (불변 객체)
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.now();
LocalDateTime dt = LocalDateTime.now();
// ZonedDateTime: 타임존 포함 날짜/시간
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

System.out.println(date);  // 예: 2024-06-20
System.out.println(time);  // 예: 14:30:00.123`,
        },
        {
          name: '날짜 생성 및 조작',
          code: `import java.time.LocalDate;

// LocalDate는 불변 — plus/minus/with 메서드는 새 객체 반환
LocalDate d = LocalDate.of(2024, 1, 1);
LocalDate nextWeek  = d.plusWeeks(1);
LocalDate lastMonth = d.minusMonths(1);
LocalDate firstDay  = d.withDayOfMonth(1);
int daysInMonth = d.lengthOfMonth();
System.out.println(d.getDayOfWeek());  // MONDAY`,
        },
        {
          name: '날짜 비교',
          code: `import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

LocalDate a = LocalDate.of(2024, 3, 15);
LocalDate b = LocalDate.of(2024, 6, 20);

System.out.println(a.isBefore(b));  // true
System.out.println(a.isAfter(b));   // false

// ChronoUnit.DAYS.between: 두 날짜 사이의 일수
long days = ChronoUnit.DAYS.between(a, b);
System.out.println(days);  // 97`,
        },
        {
          name: 'DateTimeFormatter',
          code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

LocalDateTime dt = LocalDateTime.of(2024, 6, 20, 14, 30);
// ofPattern: 사용자 정의 포맷 (yyyy=연, MM=월, dd=일, HH=24시, mm=분)
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
String s = dt.format(fmt);
System.out.println(s);  // 2024/06/20 14:30

LocalDateTime parsed = LocalDateTime.parse(s, fmt);`,
        },
        {
          name: 'Period / Duration',
          code: `import java.time.*;

// Period: 날짜 차이 (년/월/일), Duration: 시간 차이 (시/분/초)
Period p = Period.between(LocalDate.of(2020, 1, 1), LocalDate.now());
System.out.println(p.getYears() + "년 " + p.getMonths() + "개월");

Duration d = Duration.between(LocalTime.of(9, 0), LocalTime.of(17, 30));
System.out.println(d.toHours() + "시간 " + d.toMinutesPart() + "분");`,
        },
        {
          name: 'Instant & 타임존 변환',
          code: `import java.time.*;

// Instant: UTC 기준 타임스탬프 (에포크 시간)
Instant now = Instant.now();
System.out.println(now.toEpochMilli());

ZonedDateTime seoulTime = now.atZone(ZoneId.of("Asia/Seoul"));
// withZoneSameInstant: 같은 순간을 다른 타임존으로 변환
ZonedDateTime nyTime = seoulTime.withZoneSameInstant(ZoneId.of("America/New_York"));
System.out.println(nyTime);`,
        },
        {
          name: 'YearMonth / MonthDay',
          code: `import java.time.*;

YearMonth ym = YearMonth.of(2024, 2);
System.out.println(ym.lengthOfMonth());  // 29 (윤년)
System.out.println(ym.isLeapYear());     // true

// MonthDay: 연도 없는 날짜 (생일 등 매년 반복되는 날)
MonthDay birthday = MonthDay.of(6, 20);
System.out.println(birthday.atYear(2024));  // 2024-06-20`,
        },
        {
          name: 'Clock (테스트용 고정 시계)',
          code: `import java.time.*;

// Clock.fixed: 항상 같은 시각 반환 → 테스트에서 시간 고정에 사용
Clock fixed = Clock.fixed(
    Instant.parse("2024-01-01T00:00:00Z"),
    ZoneOffset.UTC);

LocalDate d = LocalDate.now(fixed);
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
          code: `import java.io.*;

// try-with-resources: AutoCloseable 자원을 자동 닫기 (Java 7+)
try (var is = new FileInputStream("data.bin");
     var bis = new BufferedInputStream(is)) {
    byte[] buf = bis.readAllBytes();
    System.out.println("읽음: " + buf.length + " bytes");
} catch (IOException e) {
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
          code: `import java.io.IOException;
import java.nio.file.*;

// 저수준 예외를 원인(cause)으로 포함해 고수준 예외로 감싸기
try {
    Files.readString(Path.of("missing.txt"));
} catch (IOException cause) {
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
          code: `import java.io.IOException;
import java.nio.file.*;

// Checked: 컴파일러가 처리 강제 (IOException 등)
static void readFile(String path) throws IOException {
    Files.readString(Path.of(path));
}

// Unchecked (RuntimeException 하위): 처리 선택 사항
static void validate(String s) {
    if (s == null) throw new IllegalArgumentException("null 불가");
}`,
        },
        {
          name: 'Result 패턴 (Optional 활용)',
          code: `import java.util.Optional;

// 예외 대신 Optional로 실패를 표현하는 패턴
static Optional<Integer> safeParse(String s) {
    try {
        return Optional.of(Integer.parseInt(s));
    } catch (NumberFormatException e) {
        return Optional.empty();
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
          code: `import java.util.concurrent.*;

// 스레드 풀: 4개 스레드로 8개 작업 처리
var executor = Executors.newFixedThreadPool(4);
for (int i = 0; i < 8; i++) {
    final int id = i;
    executor.submit(() -> System.out.println("task " + id));
}
executor.shutdown();
try {
    // 최대 5초 대기; false 반환 시 타임아웃 초과
    boolean done = executor.awaitTermination(5, TimeUnit.SECONDS);
    if (!done) System.err.println("작업이 제한 시간 내에 완료되지 않았습니다");
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
        },
        {
          name: 'CompletableFuture',
          code: `import java.util.concurrent.CompletableFuture;

// 비동기 파이프라인: 공급 → 변환 → 소비 → 예외 처리
static String fetchData()       { return "raw"; }
static String process(String s) { return s.toUpperCase(); }

CompletableFuture
    .supplyAsync(() -> fetchData())       // 별도 스레드에서 실행
    .thenApply(data -> process(data))     // 결과 변환
    .thenAccept(result -> System.out.println("결과: " + result))
    .exceptionally(ex -> { ex.printStackTrace(); return null; });`,
        },
        {
          name: 'CompletableFuture 조합',
          code: `import java.util.concurrent.CompletableFuture;

// thenCombine: 두 비동기 작업이 모두 완료되면 결합
var f1 = CompletableFuture.supplyAsync(() -> "Hello");
var f2 = CompletableFuture.supplyAsync(() -> "World");

var combined = f1.thenCombine(f2, (a, b) -> a + " " + b);
System.out.println(combined.join());  // Hello World`,
        },
        {
          name: 'CompletableFuture thenCompose (비동기 체이닝)',
          code: `import java.util.concurrent.CompletableFuture;

// thenApply : 결과를 동기적으로 변환 (T → U)
// thenCompose: 결과로 새 CompletableFuture 반환 (flatMap 역할, 중첩 방지)
static CompletableFuture<String> fetchUser(int id) {
    return CompletableFuture.supplyAsync(() -> "User#" + id);
}
static CompletableFuture<String> fetchProfile(String user) {
    return CompletableFuture.supplyAsync(() -> user + " 프로필");
}

// thenCompose로 체이닝: CompletableFuture<CompletableFuture<T>> 중첩 없이 평탄화
String profile = fetchUser(42)
    .thenCompose(user -> fetchProfile(user))  // 순차 비동기 호출
    .join();
System.out.println(profile);  // User#42 프로필`,
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
          code: `import java.util.concurrent.atomic.AtomicInteger;

// AtomicInteger: lock 없이 스레드 안전한 정수 연산
var counter = new AtomicInteger(0);
int prev = counter.getAndIncrement();   // 증가 전 값 반환
int next = counter.incrementAndGet();   // 증가 후 값 반환
// CAS(Compare-And-Swap): next와 같으면 0으로 변경
boolean updated = counter.compareAndSet(next, 0);`,
        },
        {
          name: '가상 스레드 (Virtual Thread)',
          code: `import java.util.concurrent.Executors;

// 가상 스레드: Java 21 정식 기능 (JEP 444)
// 수천~수백만 개를 가볍게 생성 가능; I/O 블로킹에 유리
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
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
          code: `import java.util.concurrent.locks.ReentrantLock;

// ReentrantLock: synchronized보다 세밀한 잠금 제어
var lock = new ReentrantLock();
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
          code: `import java.util.*;

var list = new ArrayList<>(List.of("banana", "apple", "cherry"));

// 람다: 익명 함수
list.sort((a, b) -> a.compareTo(b));

// 메서드 참조: 람다를 더 간결하게
list.sort(String::compareTo);
list.forEach(System.out::println);`,
        },
        {
          name: '불변 리스트 → 가변 변환',
          code: `import java.util.*;

var immutable = List.of(3, 1, 4, 1, 5);

// 가변 복사본
var mutable = new ArrayList<>(immutable);
Collections.sort(mutable);
System.out.println(mutable);  // [1, 1, 3, 4, 5]`,
        },
        {
          name: '빈도 집계 (groupingBy counting)',
          code: `import java.util.*;
import java.util.stream.Collectors;

var words = List.of("apple", "banana", "apple", "cherry", "banana", "apple");
// groupingBy + counting: 단어별 등장 횟수 집계
var freq = words.stream()
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
freq.entrySet().stream()
    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
    .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));`,
        },
        {
          name: '딥 카피 패턴 (레코드)',
          code: `import java.util.List;

record Config(String host, int port, List<String> tags) {
    Config withPort(int newPort) {
        return new Config(host, newPort, List.copyOf(tags));
    }
}

var cfg = new Config("localhost", 8080, List.of("dev", "local"));
var updated = cfg.withPort(9090);`,
        },
        {
          name: '전략 패턴 (Strategy)',
          code: `import java.util.*;

@FunctionalInterface
interface SortStrategy<T> {
    List<T> sort(List<T> items);
}

SortStrategy<Integer> ascending  = list -> list.stream().sorted().toList();
SortStrategy<Integer> descending = list -> list.stream().sorted(Comparator.reverseOrder()).toList();

var nums = List.of(3, 1, 4, 1, 5);
System.out.println(ascending.sort(nums));`,
        },
        {
          name: '옵저버 패턴',
          code: `import java.util.*;

interface Observer { void update(String event); }

class EventBus {
    private final List<Observer> listeners = new ArrayList<>();
    void subscribe(Observer o) { listeners.add(o); }
    void publish(String event) { listeners.forEach(o -> o.update(event)); }
}

var bus = new EventBus();
bus.subscribe(e -> System.out.println("A received: " + e));
bus.publish("click");`,
        },
        {
          name: '재귀 + 메모이제이션',
          code: `import java.util.*;

// computeIfAbsent 내에서 재귀 호출 시 NPE 위험 → 직접 put 사용
static Map<Integer, Long> memo = new HashMap<>();

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
          code: `import java.util.*;
import java.util.stream.Collectors;

record User(String name, int age, String role) {}

var users = List.of(
    new User("Alice", 30, "admin"),
    new User("Bob",   25, "user"));

var byRole = users.stream()
    .collect(Collectors.groupingBy(User::role));
byRole.forEach((role, list) -> System.out.println(role + ": " + list));`,
        },
        {
          name: 'var + enhanced for (지역 변수 타입 추론)',
          code: `import java.util.List;
import java.util.Map;

// var는 지역 변수에만 사용 가능 — 컴파일 타임에 타입 확정
var names = List.of("Alice", "Bob", "Charlie");

// enhanced for 에서 var 사용: 요소 타입을 반복해 쓰지 않아도 됨
for (var name : names) {
    System.out.println(name.toUpperCase());  // String 메서드 자동완성 가능
}

// Map.Entry 순회에서도 간결하게
var scores = Map.of("Alice", 95, "Bob", 80);
for (var entry : scores.entrySet()) {
    System.out.println(entry.getKey() + " → " + entry.getValue());
}`,
        },
        {
          name: '단순 HTTP GET (Java 11+)',
          code: `import java.io.IOException;
import java.net.URI;
import java.net.http.*;

var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .GET()
    .build();

// send()는 IOException, InterruptedException(checked) 발생 가능
try {
    HttpResponse<String> resp = client.send(
        request, HttpResponse.BodyHandlers.ofString());
    System.out.println(resp.statusCode());
    System.out.println(resp.body());
} catch (IOException | InterruptedException e) {
    e.printStackTrace();
}`,
        },
      ],
    },
    {
      title: '테스트 (JUnit 5)',
      items: [
        {
          name: 'JUnit5 기본 테스트',
          code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    // @BeforeEach: 각 테스트 메서드 실행 전 호출 (setUp)
    @BeforeEach
    void setUp() { /* 테스트 픽스처 초기화 */ }

    @Test
    @DisplayName("두 수의 합이 올바른지 검증")
    void testAdd() {
        int result = 2 + 3;
        assertEquals(5, result, "2+3은 5여야 합니다");
    }

    @Test
    void testNull() {
        assertNull(null);               // null 검증
        assertNotNull("text");          // non-null 검증
        assertTrue(3 > 1);             // 조건이 true인지
        assertFalse("".length() > 0);  // 조건이 false인지
    }

    // 예외가 발생해야 하는 경우 검증
    @Test
    void testException() {
        assertThrows(ArithmeticException.class, () -> {
            int x = 1 / 0;
        });
    }
}`,
        },
        {
          name: 'JUnit5 파라미터 테스트',
          code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;
import static org.junit.jupiter.api.Assertions.*;

class ParamTest {

    // @ValueSource: 단순 값 목록으로 반복 테스트
    @ParameterizedTest
    @ValueSource(strings = {"hello", "world", "java"})
    void testNotBlank(String s) {
        assertFalse(s.isBlank());
    }

    // @CsvSource: 쉼표로 구분된 여러 인수 전달
    @ParameterizedTest
    @CsvSource({
        "2, 3, 5",
        "0, 0, 0",
        "-1, 1, 0"
    })
    void testAdd(int a, int b, int expected) {
        assertEquals(expected, a + b);
    }

    // @NullAndEmptySource: null 과 빈 문자열 자동 주입
    @ParameterizedTest
    @NullAndEmptySource
    void testBlankOrNull(String s) {
        assertTrue(s == null || s.isBlank());
    }
}`,
        },
        {
          name: 'JUnit5 중첩 테스트 & 생명주기',
          code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class LifecycleTest {

    // @BeforeAll: 클래스 당 1회 (static)
    @BeforeAll
    static void initAll() { System.out.println("전체 시작"); }

    // @AfterAll: 클래스 당 1회 (static)
    @AfterAll
    static void tearDownAll() { System.out.println("전체 종료"); }

    @Test @Order(1)
    @DisplayName("먼저 실행")
    void first() { assertTrue(true); }

    @Test @Order(2)
    void second() { assertEquals(4, 2 * 2); }

    // @Nested: 관련 테스트를 논리적으로 그룹화
    @Nested
    @DisplayName("음수 케이스")
    class NegativeTests {
        @Test
        void negativeTimesNegative() {
            assertTrue((-1) * (-1) > 0);
        }
    }
}`,
        },
      ],
    },
  ],
};
