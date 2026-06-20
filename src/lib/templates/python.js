export default {
  lang: 'Python',
  key: 'python',
  version: 'Python 3.12 (stable)',
  cats: [
    {
      title: '기본',
      items: [
        { name: '출력', code: `print("Hello, World!")` },
        { name: '변수 선언', code: `name = "Alice"
age = 30
pi = 3.14
is_active = True
print(name, age, pi, is_active)` },
        { name: 'f-string', code: `name = "Alice"
age = 30
print(f"이름: {name}, 나이: {age}")
print(f"내년 나이: {age + 1}")` },
        { name: '여러 값 입력', code: `name = input("이름을 입력하세요: ")
print(f"안녕하세요, {name}!")` },
        { name: '타입 확인', code: `x = 42
y = 3.14
z = "hello"
print(type(x))  # <class 'int'>
print(type(y))  # <class 'float'>
print(type(z))  # <class 'str'>` },
        { name: '타입 변환', code: `s = "123"
n = int(s)
f = float(s)
back = str(n)
print(n + 1, f + 0.5, back + "!")` },
        { name: '다중 할당', code: `a, b, c = 1, 2, 3
x = y = z = 0
a, b = b, a  # swap
print(a, b, c)` },
        { name: '주석', code: `# 한 줄 주석

"""
여러 줄 주석(독스트링)
함수나 클래스 설명에 사용
"""

x = 10  # 인라인 주석` },
        { name: '언패킹', code: `first, *rest = [1, 2, 3, 4, 5]  # *rest 가 나머지를 리스트로 받음
*init, last = [1, 2, 3, 4, 5]
print(first, rest)   # 1 [2, 3, 4, 5]
print(init, last)    # [1, 2, 3, 4] 5` },
      ],
    },
    {
      title: '제어문',
      items: [
        { name: 'if / elif / else', code: `score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(grade)` },
        { name: '삼항 연산', code: `x = 10
result = "양수" if x > 0 else "음수 또는 0"
print(result)` },
        { name: 'for 루프', code: `fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

for i in range(5):
    print(i, end=" ")` },
        { name: 'while 루프', code: `count = 0
while count < 5:
    print(count)
    count += 1` },
        { name: 'break / continue', code: `for i in range(10):
    if i == 3:
        continue  # 3 건너뜀
    if i == 7:
        break     # 7에서 종료
    print(i, end=" ")` },
        { name: 'enumerate', code: `items = ["a", "b", "c"]
for idx, val in enumerate(items, start=1):
    print(f"{idx}: {val}")` },
        { name: 'zip', code: `names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")` },
        { name: 'match (3.10+)', code: `status = 404
match status:
    case 200:
        msg = "OK"
    case 404:
        msg = "Not Found"
    case 500:
        msg = "Server Error"
    case _:
        msg = "Unknown"
print(msg)` },
        { name: 'for-else', code: `for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:  # break 없이 루프가 끝났을 때만 실행
        print(f"{n} 는 소수")` },
      ],
    },
    {
      title: '함수',
      items: [
        { name: '기본 함수', code: `def greet(name):
    """인사 메시지를 반환합니다."""
    return f"안녕하세요, {name}!"

print(greet("Alice"))` },
        { name: '기본값 매개변수', code: `def power(base, exp=2):
    return base ** exp

print(power(3))     # 9
print(power(2, 10)) # 1024` },
        { name: '*args / **kwargs', code: `def total(*args):
    return sum(args)

def show(**kwargs):
    for k, v in kwargs.items():
        print(f"{k} = {v}")

print(total(1, 2, 3, 4))
show(name="Alice", age=30)` },
        { name: '람다', code: `square = lambda x: x ** 2
add = lambda a, b: a + b

nums = [3, 1, 4, 1, 5]
nums.sort(key=lambda x: -x)
print(nums)` },
        { name: '여러 값 반환', code: `def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo, hi)  # 1 9` },
        { name: '타입 힌트', code: `def add(a: int, b: int) -> int:
    return a + b

def greet(name: str, loud: bool = False) -> str:
    msg = f"Hello, {name}"
    return msg.upper() if loud else msg` },
        { name: 'Optional / Union (typing)', code: `from typing import Optional, Union

# Optional[X] 는 X | None 과 동일 (3.10+ 에서는 X | None 권장)
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)  # 없으면 None 반환

def process(value: Union[int, str]) -> str:
    # 3.10+ 에서는 int | str 로 쓸 수 있음
    return str(value).upper()

print(find_user(1))   # Alice
print(find_user(99))  # None
print(process(42))    # 42` },
        { name: 'TypedDict', code: `from typing import TypedDict

# 딕셔너리에 키·타입을 명시해 IDE 자동완성 및 타입 검사에 활용
class Movie(TypedDict):
    title: str
    year: int
    rating: float

m: Movie = {"title": "Inception", "year": 2010, "rating": 8.8}
print(m["title"], m["year"])` },
        { name: 'Protocol (구조적 서브타이핑)', code: `from typing import Protocol

# ABC 상속 없이 메서드 시그니처만으로 타입 호환 여부 판단
class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:
    def draw(self) -> None:
        print("원 그리기")

class Square:
    def draw(self) -> None:
        print("사각형 그리기")

def render(shape: Drawable) -> None:
    shape.draw()

render(Circle())   # 원 그리기
render(Square())   # 사각형 그리기` },
        { name: '타입 별칭 (3.12)', code: `# 3.12+ 에서는 type 키워드로 타입 별칭을 명확하게 선언
type Vector = list[float]
type Matrix = list[Vector]

def dot(a: Vector, b: Vector) -> float:
    return sum(x * y for x, y in zip(a, b))

v1: Vector = [1.0, 2.0, 3.0]
v2: Vector = [4.0, 5.0, 6.0]
print(dot(v1, v2))  # 32.0` },
        { name: '제너레이터 표현식', code: `# 리스트 컴프리헨션과 유사하지만 () 사용 → 지연 평가(lazy evaluation)
total = sum(x**2 for x in range(1_000_000))  # 메모리에 리스트를 만들지 않음
print(total)

# 파이프라인처럼 연결 가능
lines = ["  hello  ", "  world  ", "  python  "]
stripped = (line.strip() for line in lines)
upper = (s.upper() for s in stripped)
print(list(upper))  # ['HELLO', 'WORLD', 'PYTHON']` },
        { name: '제너레이터', code: `def fibonacci():
    a, b = 0, 1
    while True:
        yield a  # 값을 하나씩 내보내고 일시 정지
        a, b = b, a + b

gen = fibonacci()
for _ in range(8):
    print(next(gen), end=" ")` },
        { name: '데코레이터', code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow():
    time.sleep(0.1)

slow()` },
        { name: '클로저', code: `def make_counter(start=0):
    count = [start]  # 리스트로 감싸야 내부 함수에서 값을 변경할 수 있음
    def counter():
        count[0] += 1
        return count[0]
    return counter

c = make_counter()
print(c(), c(), c())  # 1 2 3` },
      ],
    },
    {
      title: '클래스/객체',
      items: [
        { name: '기본 클래스', code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name}: 왈왈!"

dog = Dog("Max", "Labrador")
print(dog.bark())` },
        { name: '상속', code: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        raise NotImplementedError  # 서브클래스에서 반드시 구현해야 함

class Cat(Animal):
    def speak(self):
        return f"{self.name}: 야옹"

c = Cat("Nabi")
print(c.speak())` },
        { name: 'dataclass', code: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
    label: str = "P"  # 기본값이 있는 필드

    def distance(self):
        return (self.x**2 + self.y**2) ** 0.5

p = Point(3, 4)
print(p, p.distance())` },
        { name: '프로퍼티', code: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("반지름은 양수여야 합니다")
        self._radius = value

c = Circle(5)
c.radius = 10
print(c.radius)` },
        { name: '__repr__ / __str__', code: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v = Vector(1, 2) + Vector(3, 4)
print(v)  # Vector(4, 6)` },
        { name: '클래스 메서드 / 정적 메서드', code: `class MathUtils:
    PI = 3.14159

    @classmethod
    def circle_area(cls, r):
        return cls.PI * r * r

    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathUtils.circle_area(5))
print(MathUtils.is_even(4))` },
        { name: 'ABC (추상 클래스)', code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        ...

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

r = Rectangle(4, 5)
print(r.area())  # 20` },
        { name: 'Enum', code: `from enum import Enum, auto

class Direction(Enum):
    NORTH = auto()  # auto()가 순서대로 값을 자동 할당
    SOUTH = auto()
    EAST  = auto()
    WEST  = auto()

d = Direction.NORTH
print(d)          # Direction.NORTH
print(d.name)     # NORTH
print(d.value)    # 1
print(d is Direction.NORTH)  # True

for item in Direction:
    print(item.name, item.value)` },
        { name: 'dataclass __post_init__ / frozen', code: `from dataclasses import dataclass, field

@dataclass(frozen=True)  # frozen=True → 불변(immutable), 해시 가능
class Point:
    x: float
    y: float

    def distance_from_origin(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

@dataclass
class User:
    name: str
    tags: list[str] = field(default_factory=list)  # 가변 기본값은 field() 사용
    _full: str = field(init=False, repr=False)  # 생성자 인수 아님

    def __post_init__(self):
        # 인스턴스 생성 직후 자동 호출 — 유효성 검사나 파생 필드 계산에 사용
        self._full = self.name.strip().title()

u = User("  alice  ", tags=["admin"])
print(u._full)  # Alice
p = Point(3, 4)
print(p.distance_from_origin())  # 5.0` },
        { name: '__slots__', code: `class Point:
    __slots__ = ("x", "y")  # 허용된 속성만 사용 → 메모리 절약

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
print(p.x, p.y)` },
      ],
    },
    {
      title: '문자열',
      items: [
        { name: '문자열 메서드', code: `s = "  Hello, World!  "
print(s.strip())
print(s.lower())
print(s.upper())
print(s.replace("World", "Python"))
print("hello" in s.lower())` },
        { name: '분리 / 결합', code: `csv = "a,b,c,d"
parts = csv.split(",")
print(parts)          # ['a', 'b', 'c', 'd']
print("-".join(parts))  # a-b-c-d` },
        { name: '문자열 포매팅', code: `name, score = "Alice", 95.5
print(f"{name}: {score:.1f}점")
print("{}: {:.1f}점".format(name, score))
print("%-10s %6.2f" % (name, score))` },
        { name: '슬라이싱', code: `s = "Python"
print(s[0])    # P
print(s[-1])   # n
print(s[1:4])  # yth
print(s[::-1]) # nohtyP` },
        { name: '문자열 검색', code: `s = "hello world hello"
print(s.find("world"))      # 6
print(s.count("hello"))     # 2
print(s.startswith("hello"))# True
print(s.endswith("hello"))  # True` },
        { name: '멀티라인 문자열', code: `text = """첫 번째 줄
두 번째 줄
세 번째 줄"""
for line in text.splitlines():
    print(line.strip())` },
        { name: 'strip / pad', code: `s = "hello"
print(s.center(11, "-"))  # ---hello---
print(s.ljust(10, "."))   # hello.....
print(s.rjust(10, "."))   # .....hello
print(s.zfill(8))         # 000hello` },
        { name: '문자 검사', code: `print("abc".isalpha())   # True
print("123".isdigit())   # True
print("abc123".isalnum())# True
print("  ".isspace())    # True
print("Hello".istitle()) # True` },
        { name: '텍스트 치환 (translate)', code: `table = str.maketrans("aeiou", "AEIOU")
s = "hello world"
print(s.translate(table))  # hEllO wOrld` },
      ],
    },
    {
      title: '자료구조',
      items: [
        { name: '리스트 기본', code: `nums = [3, 1, 4, 1, 5, 9]
nums.append(2)
nums.insert(0, 0)
nums.remove(1)  # 첫 번째 1 제거
print(sorted(nums))
print(nums[::-1])` },
        { name: '리스트 컴프리헨션', code: `squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i*j for j in range(1,4)] for i in range(1,4)]
print(squares)
print(evens)` },
        { name: '고급 컴프리헨션 (중첩/조건)', code: `# 중첩 루프: 2차원 리스트 평탄화
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [val for row in matrix for val in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# if-else 표현식을 각 요소에 적용
labeled = ["짝" if x % 2 == 0 else "홀" for x in range(6)]
print(labeled)  # ['짝', '홀', '짝', '홀', '짝', '홀']

# 세트 컴프리헨션 — 중복 제거
words = ["hi", "hello", "hi", "hey"]
unique_first = {w[0] for w in words}
print(unique_first)  # {'h'}` },
        { name: '슬라이스 step', code: `s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(s[::2])    # [0, 2, 4, 6, 8]  — 짝수 인덱스
print(s[1::2])   # [1, 3, 5, 7, 9]  — 홀수 인덱스
print(s[::-1])   # 역순
print(s[2:8:3])  # [2, 5]           — 2~7 범위에서 3 간격

text = "abcdefgh"
print(text[::2])  # aceg
print(text[::-1]) # hgfedcba` },
        { name: '딕셔너리 기본', code: `person = {"name": "Alice", "age": 30}
person["city"] = "Seoul"
print(person.get("phone", "없음"))

for key, val in person.items():
    print(f"{key}: {val}")` },
        { name: '딕셔너리 컴프리헨션', code: `words = ["apple", "banana", "cherry"]
lengths = {w: len(w) for w in words}
print(lengths)

inverted = {v: k for k, v in lengths.items()}
print(inverted)` },
        { name: '세트', code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)  # 합집합
print(a & b)  # 교집합
print(a - b)  # 차집합
print(a ^ b)  # 대칭 차집합` },
        { name: '튜플', code: `from collections import namedtuple

point = (3, 4)
x, y = point
print(f"x={x}, y={y}")

# named tuple
Color = namedtuple("Color", ["r", "g", "b"])
red = Color(255, 0, 0)
print(red.r, red.g, red.b)` },
        { name: 'defaultdict / Counter', code: `from collections import defaultdict, Counter

dd = defaultdict(list)  # 키가 없을 때 자동으로 빈 리스트 생성
dd["fruits"].append("apple")
dd["fruits"].append("banana")

text = "hello world hello python"
cnt = Counter(text.split())
print(cnt.most_common(2))` },
        { name: 'deque', code: `from collections import deque

dq = deque([1, 2, 3])
dq.appendleft(0)
dq.append(4)
dq.popleft()
print(dq)` },
        { name: 'Counter most_common', code: `from collections import Counter

text = "the quick brown fox jumps over the lazy dog"
cnt = Counter(text.split())

# 가장 많이 등장한 단어 Top 3
print(cnt.most_common(3))  # [('the', 2), ...]

# Counter 산술 연산
a = Counter("apple")
b = Counter("pineapple")
print(a + b)  # 합산
print(b - a)  # 차집합 (양수인 것만)
print(a & b)  # 교집합 (최솟값)` },
        { name: '딕셔너리 정렬', code: `scores = {"Alice": 85, "Carol": 92, "Bob": 78}

# 값 기준 내림차순 정렬 → 새 딕셔너리
sorted_by_score = dict(sorted(scores.items(), key=lambda kv: kv[1], reverse=True))
print(sorted_by_score)  # {'Carol': 92, 'Alice': 85, 'Bob': 78}

# 키 기준 정렬
sorted_by_name = dict(sorted(scores.items()))
print(sorted_by_name)` },
        { name: 'heapq', code: `import heapq

nums = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(nums)  # 리스트를 최소 힙으로 변환 (제자리)
print(heapq.heappop(nums))  # 1
print(heapq.nlargest(3, nums))` },
      ],
    },
    {
      title: '파일·IO',
      items: [
        { name: '파일 읽기', code: `with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)` },
        { name: '줄 단위 읽기', code: `with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())` },
        { name: '파일 쓰기', code: `lines = ["첫 번째 줄\\n", "두 번째 줄\\n", "세 번째 줄\\n"]
with open("output.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)` },
        { name: 'JSON 읽기/쓰기', code: `import json

data = {"name": "Alice", "scores": [90, 85, 92]}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded)` },
        { name: 'CSV 읽기/쓰기', code: `import csv

rows = [["name", "age"], ["Alice", 30], ["Bob", 25]]
with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

with open("data.csv", "r", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row)` },
        { name: 'pathlib 파일 처리', code: `from pathlib import Path

base = Path(__file__).parent  # 현재 스크립트 폴더
data_dir = base / "data"      # / 연산자로 경로 결합
data_dir.mkdir(parents=True, exist_ok=True)  # 중간 폴더도 자동 생성

out = data_dir / "result.txt"
out.write_text("저장 완료", encoding="utf-8")
print(out.read_text(encoding="utf-8"))

# 파일 목록 순회
for p in data_dir.iterdir():
    print(p.name, p.suffix, p.stat().st_size)

print(out.exists())   # True
out.unlink()          # 파일 삭제` },
        { name: 'os 경로 처리', code: `import os

base = os.path.dirname(__file__)
full = os.path.join(base, "data", "file.txt")
print(os.path.exists(full))
print(os.path.splitext("photo.jpg"))  # ('photo', '.jpg')` },
        { name: 'subprocess 실행', code: `import subprocess

# 명령 실행 후 결과 캡처 (shell=False 권장 — 보안상 안전)
result = subprocess.run(
    ["python", "--version"],
    capture_output=True,   # stdout/stderr 캡처
    text=True,             # 바이트 대신 문자열로 반환
    check=True,            # 비정상 종료 시 CalledProcessError 발생
)
print(result.stdout.strip())

# 셸 파이프가 필요한 경우만 shell=True 사용
out = subprocess.check_output("echo hello", shell=True, text=True)
print(out.strip())` },
        { name: '환경변수 (os.environ)', code: `import os

# 환경변수 읽기 — 없으면 기본값 반환
db_url = os.environ.get("DATABASE_URL", "sqlite:///local.db")
debug = os.environ.get("DEBUG", "false").lower() == "true"
print(db_url, debug)

# 환경변수 설정 (현재 프로세스 내에서만 유효)
os.environ["MY_TOKEN"] = "secret123"

# 환경변수 목록 순회
for key, val in os.environ.items():
    if key.startswith("MY_"):
        print(f"{key}={val}")` },
        { name: 'sqlite3 with', code: `import sqlite3

# with 블록 안에서 예외 발생 시 자동 rollback, 정상 종료 시 commit
with sqlite3.connect("app.db") as conn:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age  INTEGER
        )
    """)
    conn.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 30))
    conn.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Bob", 25))

    for row in conn.execute("SELECT * FROM users ORDER BY age"):
        print(row)` },
        { name: 'logging 파일 핸들러', code: `import logging

# 루트 로거 대신 모듈 단위 로거 사용 권장
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# 콘솔 핸들러
ch = logging.StreamHandler()
ch.setLevel(logging.WARNING)

# 파일 핸들러 (UTF-8, 매일 로테이션하려면 TimedRotatingFileHandler 사용)
fh = logging.FileHandler("app.log", encoding="utf-8")
fh.setLevel(logging.DEBUG)

fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
ch.setFormatter(fmt)
fh.setFormatter(fmt)

logger.addHandler(ch)
logger.addHandler(fh)

logger.debug("디버그 메시지 — 파일에만 기록")
logger.warning("경고 메시지 — 콘솔·파일 모두 기록")` },
        { name: '임시 파일', code: `import tempfile

with tempfile.NamedTemporaryFile(mode="w", suffix=".txt",
                                 delete=False,
                                 encoding="utf-8") as f:
    f.write("임시 데이터")
    print(f.name)` },
      ],
    },
    {
      title: '날짜·시간',
      items: [
        { name: '현재 시각', code: `from datetime import datetime

now = datetime.now()
print(now)
print(now.strftime("%Y-%m-%d %H:%M:%S"))
print(now.year, now.month, now.day)` },
        { name: '날짜 생성 / 비교', code: `from datetime import date

d1 = date(2024, 1, 1)
d2 = date.today()
print(d2 - d1)        # timedelta
print(d2 > d1)` },
        { name: 'timedelta', code: `from datetime import datetime, timedelta

now = datetime.now()
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)
print(tomorrow.strftime("%Y-%m-%d"))
print(last_week.strftime("%Y-%m-%d"))` },
        { name: '문자열 파싱', code: `from datetime import datetime

s = "2024-06-15 14:30:00"
dt = datetime.strptime(s, "%Y-%m-%d %H:%M:%S")
print(dt.weekday())  # 0=월, 6=일
print(dt.isoformat())` },
        { name: 'UTC / 타임존', code: `from datetime import datetime, timezone, timedelta

utc_now = datetime.now(timezone.utc)  # 타임존 인식 datetime (권장)
kst = timezone(timedelta(hours=9))
kst_now = utc_now.astimezone(kst)
print(utc_now.isoformat())
print(kst_now.isoformat())` },
        { name: '실행 시간 측정', code: `import time

start = time.perf_counter()
total = sum(range(1_000_000))
elapsed = time.perf_counter() - start
print(f"결과: {total}, 소요: {elapsed:.4f}s")` },
        { name: '달력 유틸', code: `import calendar

cal = calendar.monthcalendar(2024, 6)
for week in cal:
    print(week)
print(calendar.isleap(2024))  # True` },
      ],
    },
    {
      title: '예외처리',
      items: [
        { name: '기본 try/except', code: `try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"오류: {e}")
finally:
    print("항상 실행됨")` },
        { name: '여러 예외 처리', code: `def safe_parse(s):
    try:
        return int(s)
    except (ValueError, TypeError) as e:
        print(f"변환 실패: {e}")
        return None

print(safe_parse("42"))
print(safe_parse("abc"))` },
        { name: '사용자 정의 예외', code: `class AppError(Exception):
    def __init__(self, msg, code=0):
        super().__init__(msg)
        self.code = code

try:
    raise AppError("잘못된 입력", code=400)
except AppError as e:
    print(f"[{e.code}] {e}")` },
        { name: 'else 절', code: `try:
    n = int("123")
except ValueError:
    print("숫자가 아닙니다")
else:
    print(f"변환 성공: {n}")
finally:
    print("완료")` },
        { name: 'raise from', code: `def load(path):
    try:
        with open(path) as f:
            return f.read()
    except OSError as e:
        raise RuntimeError(f"파일 로드 실패: {path}") from e  # 원인 예외를 연결

try:
    load("nonexistent.txt")
except RuntimeError as e:
    print(e)` },
        { name: 'contextlib suppress', code: `import os
from contextlib import suppress

with suppress(FileNotFoundError):
    os.remove("nonexistent.txt")
print("오류 없이 계속 실행")` },
        { name: 'warnings', code: `import warnings

def old_function():
    warnings.warn("이 함수는 deprecated 됩니다",
                  DeprecationWarning, stacklevel=2)
    return 42

with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    old_function()` },
        { name: 'ExceptionGroup (3.11+)', code: `try:
    raise ExceptionGroup("여러 오류", [
        ValueError("잘못된 값"),
        TypeError("잘못된 타입"),
    ])
except* ValueError as eg:
    print("ValueError:", eg.exceptions)
except* TypeError as eg:
    print("TypeError:", eg.exceptions)` },
      ],
    },
    {
      title: '동시성/비동기',
      items: [
        { name: 'asyncio 기본', code: `import asyncio

async def greet(name, delay):
    await asyncio.sleep(delay)  # 이 시간 동안 다른 코루틴이 실행됨
    print(f"안녕하세요, {name}!")

async def main():
    await asyncio.gather(  # 여러 코루틴을 동시에 실행
        greet("Alice", 1),
        greet("Bob", 0.5),
    )

asyncio.run(main())` },
        { name: 'async/await HTTP', code: `import asyncio
import urllib.request

async def fetch(url):
    loop = asyncio.get_running_loop()  # 실행 중인 루프를 가져옴 (3.10+ 권장)
    response = await loop.run_in_executor(
        None, urllib.request.urlopen, url
    )
    return response.read().decode()[:100]

async def main():
    data = await fetch("https://httpbin.org/get")
    print(data)

asyncio.run(main())` },
        { name: 'asyncio Queue', code: `import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)
        await asyncio.sleep(0.1)
    await queue.put(None)

async def consumer(queue):
    while (item := await queue.get()) is not None:
        print(f"처리: {item}")

async def main():
    q = asyncio.Queue()
    await asyncio.gather(producer(q), consumer(q))

asyncio.run(main())` },
        { name: 'ThreadPoolExecutor', code: `from concurrent.futures import ThreadPoolExecutor
import time

def slow_task(n):
    time.sleep(0.5)
    return n * n

with ThreadPoolExecutor(max_workers=4) as exe:
    futures = [exe.submit(slow_task, i) for i in range(8)]
    results = [f.result() for f in futures]
print(results)` },
        { name: 'ProcessPoolExecutor', code: `from concurrent.futures import ProcessPoolExecutor

def cpu_task(n):
    return sum(i*i for i in range(n))

if __name__ == "__main__":
    with ProcessPoolExecutor() as exe:
        results = list(exe.map(cpu_task, [10**5]*4))
    print(results)` },
        { name: 'asyncio.timeout (3.11+)', code: `import asyncio

async def slow():
    await asyncio.sleep(5)

async def main():
    try:
        async with asyncio.timeout(1.0):
            await slow()
    except TimeoutError:
        print("시간 초과!")

asyncio.run(main())` },
        { name: 'async generator', code: `import asyncio

async def arange(n):
    for i in range(n):
        await asyncio.sleep(0.05)
        yield i

async def main():
    async for val in arange(5):
        print(val)

asyncio.run(main())` },
        { name: 'async with / async for', code: `import asyncio

# async with — 비동기 컨텍스트 매니저 (DB 연결, 파일, HTTP 세션 등에 사용)
class AsyncResource:
    async def __aenter__(self):
        print("리소스 열기")
        return self

    async def __aexit__(self, *args):
        print("리소스 닫기")

    async def fetch(self):
        await asyncio.sleep(0.1)
        return "데이터"

# async for — 비동기 이터러블 순회
class AsyncCounter:
    def __init__(self, n):
        self.n = n
        self.i = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.i >= self.n:
            raise StopAsyncIteration
        self.i += 1
        await asyncio.sleep(0.05)
        return self.i

async def main():
    async with AsyncResource() as r:
        data = await r.fetch()
        print(data)

    async for val in AsyncCounter(3):
        print(val)  # 1, 2, 3

asyncio.run(main())` },
        { name: 'asyncio.TaskGroup (3.11+)', code: `import asyncio

async def task(name, delay):
    await asyncio.sleep(delay)
    return f"{name} 완료"

async def main():
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(task("A", 1))
        t2 = tg.create_task(task("B", 0.5))
    print(t1.result(), t2.result())

asyncio.run(main())` },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        { name: 'map / filter / reduce', code: `from functools import reduce

nums = range(1, 11)
squares = list(map(lambda x: x**2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))
total = reduce(lambda a, b: a + b, nums)
print(squares)
print(evens)
print(total)` },
        { name: '딕셔너리 병합', code: `a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

merged = {**a, **b}      # b가 우선
merged2 = a | b          # 3.9+
print(merged)
print(merged2)` },
        { name: '이터레이터 도구', code: `import itertools
from itertools import combinations

# 무한 카운터
counter = itertools.count(10, 2)
print([next(counter) for _ in range(5)])

# 조합
print(list(combinations("ABC", 2)))` },
        { name: 'functools.lru_cache', code: `from functools import lru_cache

@lru_cache(maxsize=None)  # 결과를 캐시해 중복 계산을 방지
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print([fib(i) for i in range(10)])
print(fib.cache_info())` },
        { name: '컨텍스트 매니저 직접 구현', code: `import time
from contextlib import contextmanager

@contextmanager
def timer(label=""):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label} {elapsed:.4f}s")

with timer("작업"):
    total = sum(range(10**6))` },
        { name: '싱글톤 패턴', code: `class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)  # 최초 1회만 인스턴스 생성
        return cls._instance

a = Singleton()
b = Singleton()
print(a is b)  # True` },
        { name: '플랫 리스트', code: `import itertools

nested = [[1, 2], [3, 4], [5, 6]]
flat = list(itertools.chain.from_iterable(nested))
print(flat)  # [1, 2, 3, 4, 5, 6]

flat2 = [x for sub in nested for x in sub]
print(flat2)` },
        { name: '파이프라인 패턴', code: `from functools import reduce

def pipeline(*funcs):
    def apply(value):
        return reduce(lambda v, f: f(v), funcs, value)
    return apply

process = pipeline(
    str.strip,
    str.lower,
    lambda s: s.replace(" ", "_"),
)
print(process("  Hello World  "))  # hello_world` },
        { name: 'unittest 기본', code: `import unittest

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_integers(self):
        self.assertEqual(add(1, 2), 3)

    def test_floats(self):
        self.assertAlmostEqual(add(0.1, 0.2), 0.3, places=5)

    def test_strings(self):
        self.assertEqual(add("hello", " world"), "hello world")

    def test_negative(self):
        self.assertLess(add(-5, 3), 0)

    def setUp(self):
        # 각 테스트 메서드 실행 전 호출
        self.data = [1, 2, 3]

if __name__ == "__main__":
    unittest.main()` },
        { name: 'walrus 연산자 (:=)', code: `import re

text = "Phone: 010-1234-5678"
if m := re.search(r"\\d{3}-\\d{4}-\\d{4}", text):
    print(f"전화번호: {m.group()}")

nums = [1, 5, 3, 8, 2]
if (n := max(nums)) > 7:
    print(f"최대값 {n}이 7보다 큽니다")` },
      ],
    },
  ],
}
