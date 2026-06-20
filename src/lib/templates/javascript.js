export default {
  lang: 'JavaScript',
  key: 'javascript',
  version: 'ECMAScript 2022 / Node.js 20 LTS',
  cats: [
    {
      title: '기본',
      items: [
        {
          name: '변수 선언 (let / const)',
          code: `// const: 재할당 불가, let: 재할당 가능
const PI = 3.14159;
let count = 0;
count += 1;
console.log(PI, count);`,
        },
        {
          name: '템플릿 문자열',
          code: `const name = 'Kim';
const age = 30;
console.log(\`이름: \${name}, 나이: \${age}\`);`,
        },
        {
          name: '구조 분해 할당 (배열)',
          code: `// ...rest 는 나머지 요소를 배열로 모음
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]`,
        },
        {
          name: '구조 분해 할당 (객체)',
          code: `const { name, age = 25, ...others } = { name: 'Lee', city: 'Seoul' };
console.log(name);    // 'Lee'
console.log(age);     // 25 (기본값)
console.log(others);  // { city: 'Seoul' }`,
        },
        {
          name: '스프레드 연산자',
          code: `const a = [1, 2, 3];
const b = [0, ...a, 4];       // [0, 1, 2, 3, 4]
const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // { x: 1, y: 2 }`,
        },
        {
          name: '옵셔널 체이닝 (?.) & 널 병합 (??)',
          code: `// ?.  → 중간 값이 null/undefined 이면 undefined 반환 (에러 없음)
// ??  → 왼쪽이 null/undefined 일 때만 오른쪽 값 사용
const user = { profile: { name: 'Park' } };
const city = user?.address?.city ?? '서울';
console.log(city); // '서울'`,
        },
        {
          name: '논리 할당 연산자',
          code: `let a = null;
a ??= '기본값';   // null/undefined일 때만 할당
let b = 0;
b ||= 10;         // falsy일 때 할당
let c = 1;
c &&= c * 2;      // truthy일 때 할당
console.log(a, b, c); // '기본값' 10 2`,
        },
        {
          name: '타입 검사',
          code: `console.log(typeof 42);           // 'number'
console.log(typeof 'hello');      // 'string'
console.log(typeof null);         // 'object' (역사적 버그)
console.log(Array.isArray([]));   // true
console.log(42 instanceof Number); // false (primitive)`,
        },
        {
          name: '단축 평가',
          code: `const val = null;
const result = val || '대체값';    // '대체값'
const user = { name: 'Kim' };
user.greet?.();                    // 메서드 없으면 undefined (에러 없음)`,
        },
      ],
    },
    {
      title: '제어문',
      items: [
        {
          name: 'if / else if / else',
          code: `const score = 85;
if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else {
  console.log('C 이하');
}`,
        },
        {
          name: 'switch',
          code: `const day = 'MON';
switch (day) {
  case 'MON':
  case 'TUE':
    console.log('주초'); break;
  case 'FRI':
    console.log('주말 전'); break;
  default:
    console.log('기타');
}`,
        },
        {
          name: 'for...of (이터러블)',
          code: `const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}`,
        },
        {
          name: 'for...in (객체 키)',
          code: `const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    console.log(\`\${key}: \${obj[key]}\`);
  }
}`,
        },
        {
          name: 'while / do...while',
          code: `let i = 0;
while (i < 3) {
  console.log('while:', i++);
}
let j = 0;
do {
  console.log('do-while:', j++);
} while (j < 3);`,
        },
        {
          name: 'break / continue / 레이블',
          code: `outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    console.log(i, j);
  }
}`,
        },
        {
          name: '삼항 연산자',
          code: `const age = 20;
const status = age >= 18 ? '성인' : '미성년자';
console.log(status); // '성인'`,
        },
        {
          name: '조기 반환 패턴',
          code: `function process(data) {
  if (!data) return null;
  if (typeof data !== 'string') return null;
  return data.trim().toUpperCase();
}
console.log(process('  hello  ')); // 'HELLO'`,
        },
      ],
    },
    {
      title: '함수',
      items: [
        {
          name: '함수 선언 vs 표현식',
          code: `// 선언식 (호이스팅 O)
function greet(name) {
  return \`Hello, \${name}!\`;
}
// 표현식 (호이스팅 X)
const add = function(a, b) { return a + b; };
console.log(greet('Kim'), add(1, 2));`,
        },
        {
          name: '화살표 함수',
          code: `// 매개변수 1개면 괄호 생략 가능, 본문이 식 하나면 return 생략
const double = x => x * 2;
const add = (a, b) => a + b;
const greet = name => \`Hi, \${name}\`;
const noop = () => {};
console.log(double(5), add(2, 3));`,
        },
        {
          name: '기본 매개변수',
          code: `function createUser(name, role = 'user', active = true) {
  return { name, role, active };
}
console.log(createUser('Kim'));
// { name: 'Kim', role: 'user', active: true }`,
        },
        {
          name: '나머지 매개변수 & arguments',
          code: `// ...nums 로 가변 인수를 배열로 받음 (arguments 객체 대신 권장)
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`,
        },
        {
          name: '클로저',
          code: `// 내부 함수가 외부 변수(count)를 계속 기억하는 것이 클로저
function makeCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count,
  };
}
const counter = makeCounter(10);
counter.inc(); counter.inc();
console.log(counter.get()); // 12`,
        },
        {
          name: '커링 (Currying)',
          code: `const curry = fn => {
  const arity = fn.length;
  return function curried(...args) {
    return args.length >= arity
      ? fn(...args)
      : (...more) => curried(...args, ...more);
  };
};
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // 6`,
        },
        {
          name: '메모이제이션',
          code: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
const slow = memoize(n => n * n);
console.log(slow(5)); // 25`,
        },
        {
          name: '제너레이터',
          code: `function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
console.log([...range(0, 10, 2)]); // [0, 2, 4, 6, 8]`,
        },
      ],
    },
    {
      title: '클래스',
      items: [
        {
          name: '기본 클래스',
          code: `// #name 처럼 # 접두사가 붙으면 클래스 외부에서 접근 불가 (진짜 private)
class Animal {
  #name; // private field (ES2022)
  constructor(name) { this.#name = name; }
  speak() { return \`\${this.#name} makes a sound\`; }
  get name() { return this.#name; }
}
const a = new Animal('Dog');
console.log(a.speak());`,
        },
        {
          name: '상속',
          code: `// extends 로 부모 클래스를 상속하고, 메서드를 오버라이드할 수 있음
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
}
const d = new Dog('Rex');
console.log(d.speak()); // 'Rex barks'`,
        },
        {
          name: '정적 메서드 & 프로퍼티',
          code: `// static: 인스턴스 없이 클래스명으로 직접 호출
class MathUtil {
  static PI = 3.14159;
  static circle(r) { return MathUtil.PI * r * r; }
}
console.log(MathUtil.PI);        // 3.14159
console.log(MathUtil.circle(5)); // 78.53...`,
        },
        {
          name: 'getter / setter',
          code: `class Temperature {
  #celsius;
  constructor(c) { this.#celsius = c; }
  get fahrenheit() { return this.#celsius * 9/5 + 32; }
  set fahrenheit(f) { this.#celsius = (f - 32) * 5/9; }
}
const t = new Temperature(0);
console.log(t.fahrenheit); // 32`,
        },
        {
          name: '믹스인 패턴',
          code: `const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
  static deserialize(json) { return Object.assign(new this(), JSON.parse(json)); }
};
class Point { constructor(x, y) { this.x = x; this.y = y; } }
class SerializablePoint extends Serializable(Point) {}
const p = new SerializablePoint(1, 2);
console.log(p.serialize()); // '{"x":1,"y":2}'`,
        },
        {
          name: 'Symbol.iterator 구현',
          code: `// [Symbol.iterator] 를 구현하면 for...of 와 스프레드(...)를 사용할 수 있음
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return { next: () => current <= end
      ? { value: current++, done: false }
      : { done: true } };
  }
}
console.log([...new Range(1, 5)]); // [1, 2, 3, 4, 5]`,
        },
        {
          name: '추상 클래스 패턴',
          code: `class Shape {
  area() { throw new Error('area() must be implemented'); }
  toString() { return \`\${this.constructor.name}: area=\${this.area()}\`; }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}
console.log(new Circle(5).toString());`,
        },
        {
          name: '싱글턴 패턴',
          code: `// 앱 전체에서 단 하나의 인스턴스만 존재하도록 강제
class Config {
  static #instance = null;
  #data = {};
  static getInstance() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }
  set(key, val) { this.#data[key] = val; }
  get(key) { return this.#data[key]; }
}
const cfg = Config.getInstance();
cfg.set('theme', 'dark');`,
        },
      ],
    },
    {
      title: '배열',
      items: [
        {
          name: 'map / filter / reduce',
          code: `const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);       // [2, 4, 6, 8, 10]
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
console.log(doubled, evens, sum);`,
        },
        {
          name: 'find / findIndex / some / every',
          code: `const users = [{ id: 1, name: 'Kim' }, { id: 2, name: 'Lee' }];
const user = users.find(u => u.id === 2);       // { id: 2, name: 'Lee' }
const idx = users.findIndex(u => u.id === 2);   // 1
const hasKim = users.some(u => u.name === 'Kim'); // true
const allHaveName = users.every(u => u.name);     // true`,
        },
        {
          name: 'flat / flatMap',
          code: `const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5]
const sentences = ['hello world', 'foo bar'];
console.log(sentences.flatMap(s => s.split(' ')));
// ['hello', 'world', 'foo', 'bar']`,
        },
        {
          name: 'sort (안정 정렬)',
          code: `// 비교 함수: 음수 → a 앞, 0 → 유지, 양수 → b 앞
const items = [{ name: 'B', order: 2 }, { name: 'A', order: 1 }];
items.sort((a, b) => a.order - b.order);
console.log(items.map(i => i.name)); // ['A', 'B']
// 숫자 배열
[3, 1, 2].sort((a, b) => a - b); // [1, 2, 3]`,
        },
        {
          name: 'Array.from / Array.of',
          code: `// 범위 생성
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
// Set 중복 제거
const unique = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
// 유사 배열 변환
const chars = Array.from('hello'); // ['h','e','l','l','o']`,
        },
        {
          name: 'reduce로 그룹화',
          code: `// ??= : 키가 없으면 빈 배열 초기화 후 push (ES2022 논리 할당)
const people = [
  { name: 'Kim', dept: 'HR' },
  { name: 'Lee', dept: 'IT' },
  { name: 'Park', dept: 'HR' },
];
const byDept = people.reduce((acc, p) => {
  (acc[p.dept] ??= []).push(p);
  return acc;
}, {});
console.log(byDept);`,
        },
        {
          name: 'slice / splice / at',
          code: `const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 3));    // [2, 3] (원본 불변)
console.log(arr.at(-1));         // 5 (음수 인덱스)
const copy = [...arr];
copy.splice(2, 1, 99);           // 인덱스 2에서 1개 제거 후 99 삽입
console.log(copy); // [1, 2, 99, 4, 5]`,
        },
        {
          name: 'includes / indexOf / fill',
          code: `// includes 는 NaN 을 감지하지만 indexOf 는 못함 (비교 방식 차이)
const arr = [1, 2, 3, NaN];
console.log(arr.includes(NaN));  // true  (SameValueZero)
console.log(arr.indexOf(NaN));   // -1    (strict equality)
const zeros = new Array(5).fill(0); // [0,0,0,0,0]`,
        },
        {
          name: 'entries / keys / values',
          code: `const fruits = ['apple', 'banana', 'cherry'];
for (const [i, fruit] of fruits.entries()) {
  console.log(\`\${i}: \${fruit}\`);
}`,
        },
        {
          name: 'findLast / findLastIndex',
          code: `// 배열 끝에서부터 조건에 맞는 요소를 찾음 (Node 20 / ES2023 지원)
const nums = [1, 2, 3, 4, 3, 2];
const lastEven = nums.findLast(n => n % 2 === 0);      // 2
const lastEvenIdx = nums.findLastIndex(n => n % 2 === 0); // 5
console.log(lastEven, lastEvenIdx);`,
        },
      ],
    },
    {
      title: '객체',
      items: [
        {
          name: '단축 프로퍼티 & 계산된 키',
          code: `const x = 1, y = 2;
const point = { x, y }; // { x: 1, y: 2 }
const key = 'dynamic';
const obj = { [key]: 'value', [\`\${key}_2\`]: 'value2' };
console.log(obj); // { dynamic: 'value', dynamic_2: 'value2' }`,
        },
        {
          name: 'Object.entries / keys / values',
          code: `const scores = { math: 90, eng: 85, sci: 92 };
const entries = Object.entries(scores);
// [['math', 90], ['eng', 85], ['sci', 92]]
const avg = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
console.log(avg); // 89`,
        },
        {
          name: 'Object.assign / 스프레드 병합',
          code: `const defaults = { theme: 'light', lang: 'ko', debug: false };
const userPrefs = { theme: 'dark' };
// 얕은 복사 + 덮어쓰기
const config = { ...defaults, ...userPrefs };
console.log(config); // { theme: 'dark', lang: 'ko', debug: false }`,
        },
        {
          name: '깊은 복사 (structuredClone)',
          code: `const original = { a: 1, b: { c: [1, 2, 3] } };
const clone = structuredClone(original);
clone.b.c.push(4);
console.log(original.b.c); // [1, 2, 3] (영향 없음)
console.log(clone.b.c);    // [1, 2, 3, 4]`,
        },
        {
          name: 'Object.freeze / Object.seal',
          code: `const config = Object.freeze({ host: 'localhost', port: 3000 });
config.port = 9999; // 무시됨 (strict 모드에서 TypeError)
console.log(config.port); // 3000

const obj = Object.seal({ x: 1 });
obj.x = 2;    // 변경 가능
obj.y = 3;    // 추가 불가
console.log(obj); // { x: 2 }`,
        },
        {
          name: 'Object.fromEntries',
          code: `const entries = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(entries); // { a: 1, b: 2, c: 3 }

// Map → 객체
const map = new Map([['x', 10], ['y', 20]]);
const fromMap = Object.fromEntries(map);
console.log(fromMap); // { x: 10, y: 20 }`,
        },
        {
          name: 'Map 과 WeakMap',
          code: `const map = new Map();
map.set('key', 'value');
map.set(42, 'number key');
console.log(map.get('key')); // 'value'
console.log(map.size);       // 2
for (const [k, v] of map) console.log(k, v);`,
        },
        {
          name: 'Set 과 WeakSet',
          code: `const set = new Set([1, 2, 2, 3, 3]);
set.add(4);
console.log([...set]);         // [1, 2, 3, 4]
console.log(set.has(2));       // true
set.delete(2);
console.log(set.size);         // 3`,
        },
        {
          name: 'Map 반복 (keys / values / entries)',
          code: `// Map 은 삽입 순서를 보장하며 any 타입을 키로 사용 가능
const scores = new Map([['Alice', 90], ['Bob', 85], ['Carol', 92]]);

// keys / values / entries 모두 이터레이터 반환
for (const [name, score] of scores.entries()) {
  console.log(\`\${name}: \${score}\`);
}
console.log([...scores.keys()]);   // ['Alice', 'Bob', 'Carol']
console.log([...scores.values()]); // [90, 85, 92]`,
        },
        {
          name: 'Set 집합 연산 (합집합 / 교집합 / 차집합)',
          code: `// 스프레드와 filter 를 조합해 집합 연산 구현
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const union        = new Set([...a, ...b]);              // 합집합 {1,2,3,4,5,6}
const intersection = new Set([...a].filter(x => b.has(x))); // 교집합 {3,4}
const difference   = new Set([...a].filter(x => !b.has(x))); // 차집합 {1,2}

console.log([...union], [...intersection], [...difference]);`,
        },
        {
          name: 'Proxy & Reflect',
          code: `const handler = {
  get(target, key) {
    return key in target ? target[key] : \`\${String(key)} 없음\`;
  },
  set(target, key, value) {
    if (typeof value !== 'number') throw new TypeError('number only');
    return Reflect.set(target, key, value);
  },
};
const obj = new Proxy({}, handler);
obj.x = 42;
console.log(obj.x, obj.y); // 42 'y 없음'`,
        },
      ],
    },
    {
      title: '비동기(Promise/async)',
      items: [
        {
          name: 'Promise 기본',
          code: `const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(100)
  .then(() => console.log('done'))
  .catch(err => console.error(err))
  .finally(() => console.log('finally'));`,
        },
        {
          name: 'async / await',
          code: `async function fetchUser(id) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}
// 호출
fetchUser(1).then(user => console.log(user));`,
        },
        {
          name: 'Promise.all (병렬)',
          code: `// 모두 성공해야 결과 반환; 하나라도 실패하면 즉시 reject
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
  ]);
  return { users, posts };
}`,
        },
        {
          name: 'Promise.allSettled',
          code: `// 성공/실패 관계없이 모든 결과를 배열로 반환 (ES모듈 최상위 await 지원)
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error('fail')),
  Promise.resolve(3),
]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log('ok:', r.value);
  else console.log('err:', r.reason.message);
});`,
        },
        {
          name: 'Promise.race / Promise.any',
          code: `const timeout = ms => new Promise((_, reject) =>
  setTimeout(() => reject(new Error('timeout')), ms));

// 먼저 완료되는 것
const result = await Promise.race([fetchData(), timeout(3000)]);

// 첫 번째 성공 (모두 실패 시 AggregateError)
const first = await Promise.any([p1, p2, p3]);`,
        },
        {
          name: 'AbortController (fetch 타임아웃)',
          code: `// AbortController 로 fetch 를 일정 시간 후 취소
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error(\`요청 타임아웃: \${ms}ms\`);
    throw err;
  } finally {
    clearTimeout(timerId);
  }
}`,
        },
        {
          name: 'fetch POST (JSON / FormData)',
          code: `// JSON 바디 전송
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

// 파일 업로드 (FormData)
async function uploadFile(url, file) {
  const form = new FormData();
  form.append('file', file);
  form.append('name', file.name);
  const res = await fetch(url, { method: 'POST', body: form });
  return res.json();
}`,
        },
        {
          name: '순차 async 처리',
          code: `async function processSequentially(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // 순서 보장
    results.push(result);
  }
  return results;
}`,
        },
        {
          name: '재시도 패턴',
          code: `// 실패 시 지연 시간을 늘려가며 재시도 (지수 백오프 방식)
async function retry(fn, times = 3, delay = 1000) {
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === times - 1) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}`,
        },
        {
          name: 'async 이터레이터',
          code: `// async 제너레이터: 비동기 데이터를 페이지 단위로 하나씩 가져옴
async function* paginate(baseUrl) {
  let page = 1;
  while (true) {
    const res = await fetch(\`\${baseUrl}?page=\${page}\`);
    const data = await res.json();
    if (!data.items.length) return;
    yield data.items;
    page++;
  }
}
for await (const items of paginate('/api/data')) {
  console.log(items);
}`,
        },
      ],
    },
    {
      title: '에러 처리',
      items: [
        {
          name: 'try / catch / finally',
          code: `try {
  const data = JSON.parse('invalid json');
} catch (err) {
  if (err instanceof SyntaxError) {
    console.error('JSON 파싱 오류:', err.message);
  } else {
    throw err; // 예상치 못한 에러 재던짐
  }
} finally {
  console.log('항상 실행');
}`,
        },
        {
          name: '커스텀 에러 클래스',
          code: `// Error 를 상속하면 instanceof 로 에러 종류를 구분할 수 있음
class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}
class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} not found\`, 'NOT_FOUND', { resource });
  }
}
throw new NotFoundError('User');`,
        },
        {
          name: '에러 체이닝 (cause)',
          code: `// { cause: err } 로 원인 에러를 보존해 디버깅을 쉽게 함 (ES2022)
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    throw new Error(\`데이터 로드 실패: \${url}\`, { cause: err });
  }
}`,
        },
        {
          name: 'Result 패턴 (예외 없이 반환)',
          code: `// 예외 대신 { ok, value } 객체를 반환해 호출 측이 에러를 직접 처리
const tryParse = (json) => {
  try {
    return { ok: true, value: JSON.parse(json) };
  } catch (err) {
    return { ok: false, error: err };
  }
};
const { ok, value, error } = tryParse('{"x":1}');
if (ok) console.log(value);
else console.error(error.message);`,
        },
        {
          name: '전역 에러 핸들러 (Node.js)',
          code: `process.on('uncaughtException', (err) => {
  console.error('Uncaught:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});`,
        },
        {
          name: '에러 타입 판별',
          code: `function handleError(err) {
  if (err instanceof TypeError) return '타입 오류';
  if (err instanceof RangeError) return '범위 오류';
  if (err instanceof SyntaxError) return '문법 오류';
  if (err instanceof URIError) return 'URI 오류';
  return '알 수 없는 오류';
}`,
        },
        {
          name: '옵셔널 catch 바인딩',
          code: `// ES2019~: 에러 객체가 필요 없을 때 catch(e) 대신 catch {} 사용 가능
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    // 에러 변수 불필요 → 바인딩 생략
    return false;
  }
}
console.log(isValidJSON('{"a":1}')); // true
console.log(isValidJSON('bad'));     // false`,
        },
        {
          name: 'async 에러 래퍼',
          code: `// Express 등에서 async 라우터 에러 처리
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 사용 예
// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUser(req.params.id);
//   res.json(user);
// }));`,
        },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        {
          name: '딥 클론 (JSON / structuredClone)',
          code: `// 단순 객체 (함수·날짜·Map 제외 시)
const clone1 = JSON.parse(JSON.stringify(original));
// 대부분의 경우 (Date, Map, Set, ArrayBuffer 지원)
const clone2 = structuredClone(original);`,
        },
        {
          name: '중복 제거',
          code: `// Set 은 중복을 자동 제거; 스프레드로 다시 배열 변환
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]
// 객체 배열 중복 제거 (id 기준)
const deduped = [...new Map(users.map(u => [u.id, u])).values()];`,
        },
        {
          name: '객체 배열 정렬 (다중 키)',
          code: `// age 같으면 이름 사전순 정렬 (|| 로 2차 정렬 조건 연결)
const people = [
  { name: 'Kim', age: 30 }, { name: 'Lee', age: 25 }, { name: 'Park', age: 30 }
];
people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));`,
        },
        {
          name: '디바운스',
          code: `function debounce(fn, ms) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
const onInput = debounce(e => console.log(e.target.value), 300);`,
        },
        {
          name: '쓰로틀',
          code: `function throttle(fn, ms) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      return fn.apply(this, args);
    }
  };
}
const onScroll = throttle(() => console.log('scroll'), 200);`,
        },
        {
          name: '파이프라인 (compose/pipe)',
          code: `// pipe: 왼쪽→오른쪽 순서로 함수 적용, compose: 오른쪽→왼쪽
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const process = pipe(
  s => s.trim(),
  s => s.toLowerCase(),
  s => s.replace(/\\s+/g, '-'),
);
console.log(process('  Hello World  ')); // 'hello-world'`,
        },
        {
          name: '이벤트 이미터 (간단 구현)',
          code: `// once: 한 번만 실행되고 자동으로 리스너 해제
class EventEmitter {
  #listeners = new Map();
  on(event, fn) { (this.#listeners.get(event) ?? this.#listeners.set(event, new Set()).get(event)).add(fn); return this; }
  off(event, fn) { this.#listeners.get(event)?.delete(fn); return this; }
  emit(event, ...args) { this.#listeners.get(event)?.forEach(fn => fn(...args)); }
  once(event, fn) {
    const wrapper = (...args) => { fn(...args); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }
}`,
        },
        {
          name: '날짜 포매팅 (Intl)',
          code: `const fmt = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
});
console.log(fmt.format(new Date())); // '2024. 01. 15. 오후 03:30'

const relFmt = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
console.log(relFmt.format(-1, 'day')); // '어제'`,
        },
        {
          name: 'Intl.NumberFormat (숫자·통화 포맷)',
          code: `// 숫자를 로케일에 맞게 표시 (통화·단위·퍼센트)
const numFmt = new Intl.NumberFormat('ko-KR');
console.log(numFmt.format(1234567)); // '1,234,567'

const krwFmt = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });
console.log(krwFmt.format(9900)); // '₩9,900'

const pctFmt = new Intl.NumberFormat('ko-KR', { style: 'percent', maximumFractionDigits: 1 });
console.log(pctFmt.format(0.856)); // '85.6%'`,
        },
        {
          name: 'JSON.stringify (replacer & 들여쓰기)',
          code: `const data = { id: 1, name: 'Kim', password: 'secret', score: 99 };

// 특정 키만 직렬화 (배열 replacer)
const safe = JSON.stringify(data, ['id', 'name'], 2);
console.log(safe);
// {
//   "id": 1,
//   "name": "Kim"
// }

// 값 변환 (함수 replacer)
const redacted = JSON.stringify(data, (key, val) =>
  key === 'password' ? undefined : val, 2);`,
        },
        {
          name: '정규식 named groups & matchAll',
          code: `// (?<name>...) 으로 캡처 그룹에 이름 부여
const dateRe = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;
const text = '오늘은 2024-01-15, 내일은 2024-01-16';

// matchAll: 모든 매치를 이터레이터로 반환
for (const m of text.matchAll(dateRe)) {
  const { year, month, day } = m.groups;
  console.log(\`\${year}년 \${month}월 \${day}일\`);
}
// 2024년 01월 15일
// 2024년 01월 16일`,
        },
        {
          name: 'EventTarget / CustomEvent (브라우저)',
          code: `// CustomEvent 로 컴포넌트 간 느슨한 결합 이벤트 통신
const bus = new EventTarget();

// 구독
bus.addEventListener('user:login', (e) => {
  console.log('로그인:', e.detail.username);
});

// 발행 — detail 에 원하는 데이터 포함
bus.dispatchEvent(new CustomEvent('user:login', {
  detail: { username: 'Kim', role: 'admin' },
  bubbles: false,
}));`,
        },
        {
          name: '동적 import() (코드 분할)',
          code: `// import() 는 Promise 반환 → 필요한 시점에만 모듈 로드
async function loadChart() {
  // 사용자가 차트를 열 때만 라이브러리 로드
  const { Chart } = await import('./chart.js');
  return new Chart('#canvas');
}

// 조건부 로드
if (process.env.NODE_ENV === 'development') {
  const { devTools } = await import('./devTools.js');
  devTools.init();
}`,
        },
        {
          name: '로컬스토리지 JSON 래퍼',
          code: `// 용량 초과(QuotaExceededError) 등 예외를 try/catch 로 안전하게 처리
const storage = {
  get(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  remove(key) { localStorage.removeItem(key); },
};`,
        },
      ],
    },
  ],
};
