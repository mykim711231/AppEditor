export default {
  lang: 'TypeScript',
  key: 'typescript',
  version: 'TypeScript 5.4 (stable)',
  cats: [
    {
      title: '기본/타입',
      items: [
        {
          name: '기본 타입 선언',
          code: `const name: string = 'Alice';
const age: number = 30;
const active: boolean = true;
const nothing: null = null;
const undef: undefined = undefined;
const big: bigint = 9007199254740991n;
const sym: symbol = Symbol('id');`,
        },
        {
          name: 'as const 단언',
          code: `const palette = ['red', 'green', 'blue'] as const;
// type: readonly ["red", "green", "blue"]

const config = {
  host: 'localhost',
  port: 3000,
} as const;
// config.host: "localhost" (literal type)`,
        },
        {
          name: 'satisfies 연산자',
          code: `type Color = 'red' | 'green' | 'blue';
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<Color, string | number[]>;

// palette.red is number[] (not string | number[])
const r = palette.red[0]; // OK`,
        },
        {
          name: '타입 별칭',
          code: `type ID = string | number;
type Point = { x: number; y: number };
type Callback = (err: Error | null, result: string) => void;

type TemplateLiteralId = \`user_\${string}\`;
const uid: TemplateLiteralId = 'user_42'; // OK`,
        },
        {
          name: '튜플 타입',
          code: `type Pair = [string, number];
const entry: Pair = ['age', 25];

// 라벨 있는 튜플
type Range = [start: number, end: number];

// 나머지 요소
type StringsAndNumber = [...string[], number];`,
        },
        {
          name: '열거형 (enum)',
          code: `enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

function move(dir: Direction) {
  console.log(dir);
}
move(Direction.Up);`,
        },
        {
          name: 'const enum',
          code: `const enum Status {
  Pending,
  Active,
  Inactive,
}

// const enum 값은 컴파일 시 숫자 리터럴로 직접 치환됩니다 (런타임 객체 없음)
const s: Status = Status.Active; // inlined as 1 at compile time
console.log(s); // 1`,
        },
        {
          name: '배열 & 읽기전용 배열',
          code: `const nums: number[] = [1, 2, 3];
const strs: Array<string> = ['a', 'b'];
const frozen: ReadonlyArray<number> = [1, 2, 3];
// frozen.push(4); // Error`,
        },
        {
          name: 'null 아님 단언 & 옵셔널 체이닝',
          code: `const el = document.getElementById('app')!; // non-null assertion
const len = el?.textContent?.length ?? 0;    // optional chain + nullish coalescing`,
        },
        {
          name: 'enum vs const 객체 비교',
          code: `// enum: 런타임 객체 생성 O, 역방향 매핑(숫자 enum) O, 트리-쉐이킹 어려움
enum Direction { Up = 'UP', Down = 'DOWN' }

// const 객체 + as const: 트리-쉐이킹 가능, 타입과 값 모두 활용 가능 (권장 패턴)
const DIRECTION = { Up: 'UP', Down: 'DOWN' } as const;
type Direction2 = typeof DIRECTION[keyof typeof DIRECTION]; // "UP" | "DOWN"

// 사용법 비교
function move1(d: Direction)  { console.log(d); } // enum 사용
function move2(d: Direction2) { console.log(d); } // const 객체 사용

move1(Direction.Up);    // Direction.Up
move2(DIRECTION.Up);    // "UP"`,
        },
        {
          name: 'readonly 튜플 & 고정 길이 배열',
          code: `// readonly 튜플: 길이와 각 위치의 타입이 고정되고 변경 불가
type RGB = readonly [r: number, g: number, b: number];
const red: RGB = [255, 0, 0];
// red[0] = 128; // Error: readonly

// 함수에서 readonly 튜플 반환 — 구조 분해 시 리터럴 타입 유지
function minMax(arr: number[]): readonly [number, number] {
  return [Math.min(...arr), Math.max(...arr)];
}
const [lo, hi] = minMax([3, 1, 4, 1, 5]); // lo: number, hi: number

// 가변 길이 readonly 튜플
type AtLeastOne<T> = readonly [T, ...T[]];`,
        },
      ],
    },
    {
      title: '제어문',
      items: [
        {
          name: 'if / else if / else',
          code: `function classify(n: number): string {
  if (n < 0) return 'negative';
  else if (n === 0) return 'zero';
  else return 'positive';
}`,
        },
        {
          name: 'switch / case',
          code: `type Shape = 'circle' | 'square' | 'triangle';

function sides(s: Shape): number {
  switch (s) {
    case 'circle':   return 0;
    case 'square':   return 4;
    case 'triangle': return 3;
    default:
      const _: never = s; // 완전 검사
      throw new Error('Unknown shape');
  }
}`,
        },
        {
          name: 'for / for...of / for...in',
          code: `const items = [10, 20, 30];

for (let i = 0; i < items.length; i++) console.log(items[i]);

for (const val of items) console.log(val);  // iterable

const obj = { a: 1, b: 2 };
for (const key in obj) console.log(key, obj[key as keyof typeof obj]);`,
        },
        {
          name: 'while / do...while',
          code: `let n = 1;
while (n < 100) n *= 2;
console.log(n); // 128

let x = 0;
do {
  x++;
} while (x < 5);`,
        },
        {
          name: '삼항 & 널 병합',
          code: `const isAdmin = true;
const role = isAdmin ? 'admin' : 'user';

const input: string | null = null;
const value = input ?? 'default'; // 'default'

// 논리 할당 연산자
let cfg: Record<string, string> = {};
cfg.theme ??= 'dark';
cfg.lang ||= 'ko';`,
        },
        {
          name: 'break / continue / label',
          code: `outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    if (i === 2) break outer;
    console.log(i, j);
  }
}`,
        },
        {
          name: '구조 분해 & 기본값',
          code: `const [first, second = 0, ...rest] = [1, 2, 3, 4];

const { name, age = 18, address: { city } = { city: 'Seoul' } } = {
  name: 'Alice',
  address: { city: 'Busan' },
};`,
        },
        {
          name: '스프레드 연산자',
          code: `const a = [1, 2, 3];
const b = [...a, 4, 5]; // [1, 2, 3, 4, 5]

const base = { x: 1, y: 2 };
const extended = { ...base, z: 3 }; // { x:1, y:2, z:3 }`,
        },
      ],
    },
    {
      title: '함수',
      items: [
        {
          name: '함수 선언 & 화살표 함수',
          code: `function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// 즉시 실행
const result = ((x: number) => x * x)(5); // 25`,
        },
        {
          name: '선택적 & 기본값 매개변수',
          code: `function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? 'Hello'}, \${name}!\`;
}

function createUser(name: string, role = 'user', active = true) {
  return { name, role, active };
}`,
        },
        {
          name: '나머지 매개변수 & 오버로딩',
          code: `function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// 함수 오버로딩
function format(value: string): string;
function format(value: number, decimals?: number): string;
function format(value: string | number, decimals = 2): string {
  return typeof value === 'number' ? value.toFixed(decimals) : value.trim();
}`,
        },
        {
          name: '제네릭 함수',
          code: `function identity<T>(value: T): T {
  return value;
}

function first<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}

const doubled = <T extends number>(x: T) => (x * 2) as T;`,
        },
        {
          name: '함수 타입 & 콜백',
          code: `type Predicate<T> = (value: T) => boolean;
type Transformer<A, B> = (input: A) => B;

function filter<T>(arr: T[], pred: Predicate<T>): T[] {
  return arr.filter(pred);
}

const evens = filter([1, 2, 3, 4], (n) => n % 2 === 0);`,
        },
        {
          name: '클로저 & 메모이제이션',
          code: `// 메모이제이션: 동일한 인수로 반복 호출 시 캐시된 결과를 반환하여 성능 최적화
function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args) as ReturnType<T>);
    return cache.get(key)!;
  }) as T;
}`,
        },
        {
          name: '제너레이터 함수',
          code: `// Generator<YieldType, ReturnType, NextType> 세 개의 타입 인수를 가집니다
function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) yield i;
}

for (const n of range(0, 10, 2)) console.log(n); // 0 2 4 6 8`,
        },
        {
          name: 'void & never 반환',
          code: `function log(msg: string): void {
  console.log(msg);
}

function fail(msg: string): never {
  throw new Error(msg);
}

function assertDefined<T>(val: T | undefined): asserts val is T {
  if (val === undefined) fail('Value is undefined');
}`,
        },
      ],
    },
    {
      title: '클래스',
      items: [
        {
          name: '클래스 기본',
          code: `class Animal {
  readonly name: string;
  protected species: string;
  #id: number; // private field (ES2022)

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
    this.#id = Math.random();
  }

  speak(): string {
    return \`\${this.name} (\${this.species})\`;
  }
}`,
        },
        {
          name: '상속 & 추상 클래스',
          code: `abstract class Shape {
  abstract area(): number;
  toString(): string {
    return \`Area: \${this.area()}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

class Rect extends Shape {
  constructor(private w: number, private h: number) { super(); }
  area(): number { return this.w * this.h; }
}`,
        },
        {
          name: '접근자 (getter / setter)',
          code: `class Temperature {
  private _celsius: number = 0;

  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  set fahrenheit(f: number) {
    this._celsius = (f - 32) * 5 / 9;
  }

  get celsius() { return this._celsius; }
  set celsius(c: number) { this._celsius = c; }
}`,
        },
        {
          name: '정적 멤버 & 싱글톤',
          code: `class AppConfig {
  private static instance: AppConfig;
  private constructor(public readonly env: string) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig(process.env.NODE_ENV ?? 'dev');
    }
    return AppConfig.instance;
  }
}`,
        },
        {
          name: '인터페이스 구현',
          code: `interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Printable {
  print(): void;
}

class Document implements Serializable, Printable {
  constructor(private content: string) {}
  serialize() { return JSON.stringify({ content: this.content }); }
  deserialize(data: string) { this.content = JSON.parse(data).content; }
  print() { console.log(this.content); }
}`,
        },
        {
          name: '매개변수 프로퍼티',
          code: `class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    private label?: string,
  ) {}

  distanceTo(other: Point): number {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}`,
        },
        {
          name: '믹스인 패턴',
          code: `// 생성자 타입: 'new' 키워드로 호출 가능한 클래스(또는 생성자 함수)의 타입
type Constructor<T = object> = new (...args: unknown[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    active = false;
    toggle() { this.active = !this.active; }
  };
}

class User { constructor(public name: string) {} }
const TimestampedUser = Timestamped(Activatable(User));`,
        },
        {
          name: '데코레이터 (stable)',
          code: `// TS 5.0+ standard decorators (experimentalDecorators not required)
// context: 데코레이터가 적용된 메서드의 이름·종류 등 메타데이터를 담은 객체
function log(target: unknown, context: ClassMethodDecoratorContext) {
  return function (this: unknown, ...args: unknown[]) {
    console.log(\`Calling \${String(context.name)}\`);
    return (target as Function).apply(this, args);
  };
}

class Greeter {
  @log
  greet(name: string) { return \`Hello \${name}\`; }
}`,
        },
      ],
    },
    {
      title: '인터페이스/타입',
      items: [
        {
          name: '인터페이스 선언 & 확장',
          code: `interface Animal {
  name: string;
  speak?(): string; // optional
}

interface Dog extends Animal {
  breed: string;
}

// 인터페이스 병합 (선언 병합)
interface Dog {
  fetch(): void;
}`,
        },
        {
          name: '인터페이스 호출 시그니처 & 오버로드',
          code: `// 인터페이스로 함수 타입을 표현할 때 여러 시그니처를 나열하면 오버로드가 됩니다
interface Formatter {
  (value: string): string;
  (value: number, decimals: number): string;
  // 추가 프로퍼티도 함께 선언 가능
  locale: string;
}

// 인터페이스로 생성자(construct signature) 표현
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, h: number, m: number): ClockInterface {
  return new ctor(h, m);
}`,
        },
        {
          name: '인덱스 시그니처',
          code: `interface StringMap {
  [key: string]: string;
}

interface NumberMap {
  [key: string]: number;
  length: number; // must be compatible
}

const env: StringMap = { NODE_ENV: 'production', HOST: 'localhost' };`,
        },
        {
          name: '템플릿 리터럴 타입',
          code: `type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

type CSSProperty = \`--\${string}\`;
const token: CSSProperty = '--primary-color'; // OK`,
        },
        {
          name: '조건부 타입',
          code: `type IsArray<T> = T extends unknown[] ? true : false;

type Flatten<T> = T extends Array<infer Item> ? Item : T;
// Flatten<number[]> => number
// Flatten<string>   => string

// 내장 ReturnType과 동일한 구현 (이름 충돌 방지를 위해 MyReturnType으로 명명)
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;`,
        },
        {
          name: '맵드 타입',
          code: `type Optional<T> = { [K in keyof T]?: T[K] };
type Readonly2<T> = { readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// 키 재매핑 (TS 4.1+): 'as' 절로 키 이름을 변환할 수 있습니다
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
        },
        {
          name: 'infer & 타입 추출',
          code: `// infer: 조건부 타입 내에서 타입을 '추출'하여 새 변수에 바인딩하는 키워드
type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;

type Awaited2<T> = T extends Promise<infer U> ? Awaited2<U> : T;
// Awaited2<Promise<Promise<string>>> => string`,
        },
        {
          name: '판별 유니온 (Discriminated Union)',
          code: `type Success<T> = { status: 'ok'; data: T };
type Failure = { status: 'error'; message: string };
type Result<T> = Success<T> | Failure;

function handle<T>(r: Result<T>) {
  if (r.status === 'ok') {
    console.log(r.data);
  } else {
    console.error(r.message);
  }
}`,
        },
        {
          name: '재귀 타입',
          code: `type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

// T가 객체이면 각 키를 재귀적으로 옵셔널화, 아니면 T 그대로 반환
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;`,
        },
        {
          name: '템플릿 리터럴 + infer 추출',
          code: `// 템플릿 리터럴 안에서 infer로 패턴 매칭하여 부분 문자열을 추출합니다
type GetRouteParam<S extends string> =
  S extends \`\${string}:\${infer Param}/\${string}\` ? Param :
  S extends \`\${string}:\${infer Param}\`           ? Param :
  never;

type P1 = GetRouteParam<'/users/:id/posts'>; // "id"
type P2 = GetRouteParam<'/items/:slug'>;      // "slug"
type P3 = GetRouteParam<'/about'>;            // never

// 이벤트 이름에서 접두사 제거
type StripOn<S extends string> =
  S extends \`on\${infer Rest}\` ? Uncapitalize<Rest> : S;

type Click = StripOn<'onClick'>; // "click"`,
        },
        {
          name: '모듈 보강 (Module Augmentation)',
          code: `// declare module: 외부 라이브러리의 타입 정의를 확장합니다
// 예) express Request에 user 필드 추가
import 'express';

declare module 'express' {
  interface Request {
    user?: { id: string; role: 'admin' | 'member' };
  }
}

// 전역 타입 보강
declare global {
  interface Window {
    __APP_VERSION__: string;
  }
  interface Array<T> {
    // 커스텀 배열 메서드 타입 추가 예시
    last(): T | undefined;
  }
}
export {}; // 파일이 모듈이 되도록 export 필요`,
        },
      ],
    },
    {
      title: '제네릭',
      items: [
        {
          name: '제네릭 인터페이스',
          code: `interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}`,
        },
        {
          name: '제네릭 제약',
          code: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}`,
        },
        {
          name: '제네릭 클래스',
          code: `class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items.at(-1); }
  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.size === 0; }
}`,
        },
        {
          name: '제네릭 기본값',
          code: `interface PaginatedResponse<T = unknown, Meta = { total: number }> {
  items: T[];
  meta: Meta;
  nextCursor?: string;
}

type UserPage = PaginatedResponse<{ id: string; name: string }>;`,
        },
        {
          name: '가변 튜플 타입',
          code: `// 가변 인수 튜플: 스프레드로 튜플 타입을 조합할 수 있습니다
type Prepend<T, Tuple extends unknown[]> = [T, ...Tuple];
type Append<Tuple extends unknown[], T> = [...Tuple, T];

// 매개변수를 [...A]로 쓰면 튜플 타입 추론이 정확해집니다
function concat<A extends unknown[], B extends unknown[]>(
  a: [...A],
  b: [...B],
): [...A, ...B] {
  return [...a, ...b];
}`,
        },
        {
          name: '제네릭 유틸 함수',
          code: `function groupBy<T, K extends PropertyKey>(
  arr: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}`,
        },
        {
          name: '공변 & 반변',
          code: `// 공변: 하위 타입을 상위 타입으로 안전하게 대입 가능 / 반변: 그 반대 방향
// 공변 (Covariant): 생산자 위치 — T를 반환하는 쪽
type Producer<T> = () => T;
// 반변 (Contravariant): 소비자 위치 — T를 인수로 받는 쪽
type Consumer<T> = (value: T) => void;

// 예시용 타입 (실제 코드에서는 별도 정의 필요)
type Animal = { name: string };
type Dog = Animal & { breed: string };

// Producer<Dog>는 Producer<Animal>의 하위 타입 (공변)
const dogProducer: Producer<Dog> = () => ({ name: 'Rex', breed: 'Lab' });
const animalProducer: Producer<Animal> = dogProducer; // OK`,
        },
        {
          name: '고차 타입 함수',
          code: `// 두 함수를 합성: f의 출력이 g의 입력 타입과 일치해야 합니다
function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a) => g(f(a));
}

// 세 함수 합성 오버로드
function pipe3<A, B, C, D>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
): (a: A) => D {
  return (a) => h(g(f(a)));
}

const process = pipe(
  (s: string) => s.trim(),
  (s) => s.toUpperCase(),
);
console.log(process('  hello  ')); // "HELLO"`,
        },
      ],
    },
    {
      title: '유틸리티 타입',
      items: [
        {
          name: 'Partial & Required & Readonly',
          code: `interface Config {
  host: string;
  port?: number;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
type PartialConfig = Partial<Config>;
type FrozenConfig = Readonly<Config>;`,
        },
        {
          name: 'Pick & Omit & Exclude & Extract',
          code: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type Credentials = Pick<User, 'email' | 'password'>;

type T1 = Exclude<string | number | boolean, boolean>; // string | number
type T2 = Extract<string | number | boolean, string | boolean>; // string | boolean`,
        },
        {
          name: 'Record & Parameters & ReturnType',
          code: `type PageMap = Record<string, { title: string; path: string }>;

function add(a: number, b: number) { return a + b; }

type AddParams = Parameters<typeof add>;     // [number, number]
type AddReturn = ReturnType<typeof add>;     // number
type AddThis = ThisParameterType<typeof add>; // unknown`,
        },
        {
          name: 'NonNullable & InstanceType',
          code: `type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

class Counter { count = 0; }
type CounterInstance = InstanceType<typeof Counter>; // Counter`,
        },
        {
          name: 'Awaited & Promise 유틸',
          code: `async function fetchUser() {
  return { id: '1', name: 'Alice' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: string; name: string }

type Lazy<T> = T | Promise<T>;
type Resolved = Awaited<Lazy<string>>; // string`,
        },
        {
          name: 'ConstructorParameters & ThisType',
          code: `class Point {
  constructor(public x: number, public y: number) {}
}

type PointArgs = ConstructorParameters<typeof Point>; // [number, number]

// ThisType for object literals
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};`,
        },
        {
          name: 'Template Literal 유틸',
          code: `type Upper = Uppercase<'hello'>; // "HELLO"
type Lower = Lowercase<'WORLD'>; // "world"
type Cap   = Capitalize<'foo'>;  // "Foo"
type Uncap = Uncapitalize<'Bar'>; // "bar"

type Keys = 'name' | 'age' | 'email';
type Setters = \`set\${Capitalize<Keys>}\`;
// "setName" | "setAge" | "setEmail"`,
        },
        {
          name: 'NoInfer (TS 5.4)',
          code: `// NoInfer: 특정 인수에서 T를 추론하지 못하도록 막아 타입을 안정시킵니다
function createStore<T>(initial: T, fallback: NoInfer<T>): T {
  // initial이 null/undefined일 때 fallback 사용
  return initial ?? fallback;
}

// NoInfer 없이는 fallback이 T 추론에 영향을 줘 타입이 의도치 않게 넓어질 수 있습니다
// T는 initial에서만 추론됩니다
const store = createStore<{ count: number } | null>(null, { count: 0 }); // fallback 사용`,
        },
        {
          name: 'keyof & typeof 연산자',
          code: `// keyof: 객체 타입의 모든 키를 유니온 타입으로 추출합니다
type User = { id: number; name: string; email: string };
type UserKey = keyof User; // "id" | "name" | "email"

// typeof: 값에서 타입을 역으로 추출합니다 (타입 레벨 typeof)
const defaultConfig = { debug: false, timeout: 3000, env: 'dev' };
type Config = typeof defaultConfig; // { debug: boolean; timeout: number; env: string }

// 조합: 런타임 객체에서 키 타입을 동적으로 파생합니다
type ConfigKey = keyof typeof defaultConfig; // "debug" | "timeout" | "env"

function getConfig<K extends keyof typeof defaultConfig>(key: K): (typeof defaultConfig)[K] {
  return defaultConfig[key];
}
const t = getConfig('timeout'); // number`,
        },
        {
          name: '인덱스 접근 타입 (Indexed Access)',
          code: `type User = { id: number; address: { city: string; zip: string } };

// T[K]: 객체 타입의 특정 키 값 타입을 추출합니다
type UserId   = User['id'];              // number
type Address  = User['address'];         // { city: string; zip: string }
type City     = User['address']['city']; // string

// number로 배열 요소 타입 추출
type Items = { name: string; price: number }[];
type Item  = Items[number]; // { name: string; price: number }

// 유니온 키로 여러 필드 타입 추출
type StringFields = User['id' | 'address']; // number | { city: string; zip: string }`,
        },
        {
          name: 'const 타입 매개변수 (TS 5.0)',
          code: `// <const T>: 인수를 as const 없이 리터럴 타입으로 좁혀 추론합니다
function identity<const T>(value: T): T {
  return value;
}

// 일반 제네릭은 string[]로 넓게 추론하지만
// const 타입 매개변수는 readonly ["a", "b", "c"]로 좁게 추론합니다
const arr = identity(['a', 'b', 'c']);
// arr: readonly ["a", "b", "c"]  (as const 없이도 리터럴 타입)

function makeConfig<const T extends Record<string, unknown>>(cfg: T): T {
  return cfg;
}
const cfg = makeConfig({ port: 3000, env: 'prod' });
// cfg.port: 3000 (number literal, not number)`,
        },
        {
          name: '맵드 타입 수식어 (+/- readonly, +/- ?)',
          code: `// +readonly / -readonly: readonly 수식어를 추가하거나 제거합니다
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Immutable<T> = { +readonly [K in keyof T]: T[K] };

// +? / -?: 옵셔널 수식어를 추가하거나 제거합니다
type Concrete<T> = { [K in keyof T]-?: T[K] }; // Required<T>와 동일
type Soft<T>     = { [K in keyof T]+?: T[K] };  // Partial<T>와 동일

interface Frozen { readonly x: number; readonly y: number }
type Editable = Mutable<Frozen>; // { x: number; y: number }

interface Partial2 { a?: string; b?: number }
type Full = Concrete<Partial2>; // { a: string; b: number }`,
        },
      ],
    },
    {
      title: '유니온/내로잉',
      items: [
        {
          name: 'typeof 가드',
          code: `function format(val: string | number | boolean): string {
  if (typeof val === 'string') return val.toUpperCase();
  if (typeof val === 'number') return val.toFixed(2);
  return String(val);
}`,
        },
        {
          name: 'instanceof 가드',
          code: `class Cat { meow() { return 'meow'; } }
class Dog { bark() { return 'woof'; } }

function makeNoise(animal: Cat | Dog): string {
  if (animal instanceof Cat) return animal.meow();
  return animal.bark();
}`,
        },
        {
          name: '판별자 필드 내로잉',
          code: `type Circle  = { kind: 'circle';  radius: number };
type Square  = { kind: 'square';  side: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Square | Triangle;

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle':   return Math.PI * s.radius ** 2;
    case 'square':   return s.side ** 2;
    case 'triangle': return 0.5 * s.base * s.height;
    default:
      // 새 Shape 멤버 추가 시 여기서 컴파일 에러가 발생해 누락을 방지합니다
      const _: never = s;
      throw new Error(\`Unknown shape: \${JSON.stringify(_)}\`);
  }
}`,
        },
        {
          name: '사용자 정의 타입 가드',
          code: `interface Fish { swim(): void }
interface Bird { fly(): void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) pet.swim();
  else pet.fly();
}`,
        },
        {
          name: 'in 연산자 내로잉',
          code: `type Admin = { role: 'admin'; permissions: string[] };
type Member = { role: 'member'; tier: number };

function describe(user: Admin | Member): string {
  if ('permissions' in user) return \`Admin: \${user.permissions.join(', ')}\`;
  return \`Member tier \${user.tier}\`;
}`,
        },
        {
          name: 'Assertion 함수',
          code: `function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new TypeError('Expected string');
}

const x: unknown = 'hello';
assertIsString(x);
console.log(x.toUpperCase()); // x is now string`,
        },
        {
          name: 'never 완전 검사',
          code: `type Color = 'red' | 'green' | 'blue';

function printColor(c: Color): void {
  switch (c) {
    case 'red':   console.log('Red'); break;
    case 'green': console.log('Green'); break;
    case 'blue':  console.log('Blue'); break;
    default:
      const _exhaustive: never = c;
      throw new Error(\`Unhandled color: \${_exhaustive}\`);
  }
}`,
        },
        {
          name: '교차 타입 (Intersection)',
          code: `type Named = { name: string };
type Aged  = { age: number };
type Person = Named & Aged;

function greet(p: Person): string {
  return \`\${p.name} is \${p.age} years old\`;
}

// Extend via intersection
type AdminUser = Person & { permissions: string[] };`,
        },
        {
          name: 'Array.isArray 내로잉 & 다중 가드',
          code: `// Array.isArray: 배열/단일 값 유니온을 내로잉합니다
function normalize<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// 여러 조건을 조합한 복합 타입 가드
function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.length > 0;
}

function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

// 사용 예
const items = normalize('hello'); // string[]
const arr   = normalize([1, 2]);  // number[]`,
        },
      ],
    },
    {
      title: '비동기',
      items: [
        {
          name: 'async / await 기본',
          code: `async function fetchData(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

const data = await fetchData('https://api.example.com/users');`,
        },
        {
          name: 'Promise 조합',
          code: `const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);

// 첫 번째 성공
const fastest = await Promise.race([fetchA(), fetchB()]);

// 모두 완료 (실패 포함)
const results = await Promise.allSettled([fetchA(), fetchB()]);`,
        },
        {
          name: 'async 제너레이터',
          code: `async function* paginate<T>(
  fetcher: (page: number) => Promise<T[]>,
): AsyncGenerator<T> {
  let page = 0;
  while (true) {
    const items = await fetcher(page++);
    if (items.length === 0) break;
    for (const item of items) yield item;
  }
}

for await (const user of paginate(fetchUsersPage)) {
  console.log(user);
}`,
        },
        {
          name: 'AbortController & 타임아웃',
          code: `// AbortController: fetch 요청을 외부에서 취소할 수 있는 웹 표준 API
async function fetchWithTimeout(
  url: string,
  ms = 5000,
): Promise<Response> {
  const controller = new AbortController();
  // ms 후 자동 취소 — finally에서 clearTimeout으로 타이머를 정리합니다
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}`,
        },
        {
          name: '재시도 로직',
          code: `async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === retries - 1) throw err;
      // 지수 백오프: 실패할수록 대기 시간이 2배씩 늘어납니다
      await new Promise(r => setTimeout(r, delay * 2 ** i));
    }
  }
  throw new Error('Unreachable'); // TS 제어 흐름 분석을 위해 필요, 실제로는 실행되지 않습니다
}`,
        },
        {
          name: 'Promise 큐 / 동시성 제한',
          code: `async function pLimit<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
): Promise<T[]> {
  const results: T[] = [];
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}`,
        },
        {
          name: 'async 이터러블',
          code: `async function collect<T>(
  iter: AsyncIterable<T>,
): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iter) result.push(item);
  return result;
}

// ReadableStream을 async iterable처럼 사용 (modern runtimes)
async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  // 빈 스트림 대비 초기값 전달 (초기값 없이 reduce하면 빈 배열에서 오류 발생)
  return new TextDecoder().decode(
    chunks.reduce((a, b) => {
      const c = new Uint8Array(a.length + b.length);
      c.set(a);
      c.set(b, a.length);
      return c;
    }, new Uint8Array(0))
  );
}`,
        },
        {
          name: '타입 안전 Promise 래퍼',
          code: `// 제네릭으로 응답 타입을 강제하는 fetch 래퍼
async function typedFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  return res.json() as Promise<T>;
}

// 사용: 응답 타입을 명시적으로 지정
interface Post { id: number; title: string; body: string }
const post = await typedFetch<Post>('https://jsonplaceholder.typicode.com/posts/1');

// Promise 자체를 타입으로 다루기
type AsyncResult<T> = Promise<{ data: T; timestamp: number }>;

async function wrap<T>(fn: () => Promise<T>): AsyncResult<T> {
  const data = await fn();
  return { data, timestamp: Date.now() };
}`,
        },
      ],
    },
    {
      title: '에러 처리',
      items: [
        {
          name: 'try / catch / finally',
          code: `// 예시용 타입 — 실제 코드에서는 별도 정의 필요
type User = { id: string; name: string };
class NetworkError extends Error {}
class AppError extends Error {
  constructor(msg: string, public readonly cause?: unknown) { super(msg); }
}
declare function fetchUser(id: string): Promise<User>;

async function load(id: string): Promise<User> {
  try {
    const data = await fetchUser(id);
    return data;
  } catch (err) {
    // 특정 에러 종류에 따라 다르게 처리합니다
    if (err instanceof NetworkError) throw new AppError('Network failed', err);
    throw err;
  } finally {
    // 성공/실패 관계없이 항상 실행됩니다
    console.log('cleanup');
  }
}`,
        },
        {
          name: '커스텀 에러 클래스',
          code: `class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    options?: { cause?: unknown },
  ) {
    // ES2022 Error({ cause }) 옵션으로 원인 에러를 체이닝합니다
    super(message, options);
    this.name = 'AppError';
    // 상속 체인 복원: instanceof 검사가 정상 동작하도록 필요합니다
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class ValidationError extends AppError {
  constructor(public readonly field: string, msg: string) {
    super(msg, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// 사용 예: throw new AppError('Not found', 'NOT_FOUND', { cause: originalErr });`,
        },
        {
          name: 'Result 타입 패턴',
          code: `type Ok<T>  = { ok: true;  value: T };
type Err<E> = { ok: false; error: E };
type Result<T, E = Error> = Ok<T> | Err<E>;

function ok<T>(value: T): Ok<T>   { return { ok: true, value }; }
function err<E>(error: E): Err<E> { return { ok: false, error }; }

async function safeParseJson(s: string): Promise<Result<unknown>> {
  try { return ok(JSON.parse(s)); }
  catch (e) { return err(e as Error); }
}`,
        },
        {
          name: 'unknown 에러 처리',
          code: `function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return JSON.stringify(err);
}

function isError(val: unknown): val is Error {
  return val instanceof Error;
}`,
        },
        {
          name: '에러 원인 체이닝 (ES2022)',
          code: `try {
  await connectDB();
} catch (cause) {
  throw new Error('Failed to initialize app', { cause });
}

// 원인 추적
function getRootCause(err: unknown): unknown {
  if (err instanceof Error && err.cause) return getRootCause(err.cause);
  return err;
}`,
        },
        {
          name: 'Zod 스타일 검증 타입',
          code: `type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: { field: string; message: string }[] };

function validateUser(raw: unknown): ValidationResult<{ name: string; age: number }> {
  if (typeof raw !== 'object' || raw === null)
    return { success: false, errors: [{ field: 'root', message: 'Not an object' }] };
  const { name, age } = raw as Record<string, unknown>;
  const errors: { field: string; message: string }[] = [];
  if (typeof name !== 'string') errors.push({ field: 'name', message: 'Must be string' });
  if (typeof age !== 'number')  errors.push({ field: 'age',  message: 'Must be number' });
  if (errors.length) return { success: false, errors };
  return { success: true, data: { name: name as string, age: age as number } };
}`,
        },
        {
          name: '전역 에러 핸들러 (Node)',
          code: `process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});`,
        },
      ],
    },
    {
      title: '자주 쓰는 패턴',
      items: [
        {
          name: '빌더 패턴',
          code: `class QueryBuilder {
  private _table = '';
  private _conditions: string[] = [];
  private _limit?: number;

  table(name: string) { this._table = name; return this; }
  where(cond: string) { this._conditions.push(cond); return this; }
  limit(n: number)    { this._limit = n; return this; }

  build(): string {
    let q = \`SELECT * FROM \${this._table}\`;
    if (this._conditions.length) q += \` WHERE \${this._conditions.join(' AND ')}\`;
    if (this._limit != null) q += \` LIMIT \${this._limit}\`;
    return q;
  }
}`,
        },
        {
          name: '옵저버 패턴 (타입 안전)',
          code: `type EventMap = { click: MouseEvent; change: Event; submit: SubmitEvent };

class TypedEventEmitter<T extends Record<string, unknown>> {
  private listeners = new Map<keyof T, Set<(e: unknown) => void>>();

  on<K extends keyof T>(event: K, fn: (e: T[K]) => void): void {
    (this.listeners.get(event) ?? (this.listeners.set(event, new Set()), this.listeners.get(event)!)).add(fn as (e: unknown) => void);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
}`,
        },
        {
          name: '의존성 주입 (DI)',
          code: `interface Logger { log(msg: string): void }
// 실제 구현에서는 매개변수화된 쿼리(parameterized query)를 사용하세요
interface DB { query(sql: string, params?: unknown[]): Promise<unknown[]> }

class UserService {
  constructor(
    private readonly db: DB,
    private readonly logger: Logger,
  ) {}

  async getUser(id: string) {
    this.logger.log(\`Fetching user \${id}\`);
    // SQL 인젝션 방지를 위해 반드시 파라미터 바인딩을 사용합니다
    return this.db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}`,
        },
        {
          name: '불변 업데이트 (Immer 스타일)',
          code: `function update<T extends object>(base: T, recipe: (draft: T) => void): T {
  const draft = structuredClone(base);
  recipe(draft);
  return Object.freeze(draft) as T;
}

const state = { count: 0, items: ['a'] };
const next = update(state, d => { d.count++; d.items.push('b'); });`,
        },
        {
          name: 'Symbol & 브랜드 타입',
          code: `// 브랜드 타입: 같은 기본 타입(string)이라도 브랜드로 구별하여 실수 방지 (명목적 타이핑 구현)
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type UserId  = Brand<string, 'UserId'>;
type PostId  = Brand<string, 'PostId'>;

const toUserId  = (s: string) => s as UserId;
const toPostId  = (s: string) => s as PostId;

function getUser(id: UserId) { /* ... */ }
// getUser(toPostId('123')); // Error: PostId is not assignable to UserId`,
        },
        {
          name: 'Record 팩토리 & 열거 맵',
          code: `const HTTP_STATUS = {
  OK:        200,
  CREATED:   201,
  NOT_FOUND: 404,
  ERROR:     500,
} as const satisfies Record<string, number>;

type StatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// 200 | 201 | 404 | 500`,
        },
        {
          name: '커링 & 부분 적용',
          code: `function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const add5 = curry(add)(5);
console.log(add5(3)); // 8`,
        },
        {
          name: 'Proxy & 타입 안전 래퍼',
          code: `function readonly<T extends object>(obj: T): Readonly<T> {
  return new Proxy(obj, {
    set() { throw new TypeError('Object is read-only'); },
    deleteProperty() { throw new TypeError('Object is read-only'); },
  });
}

const cfg = readonly({ host: 'localhost', port: 3000 });
// cfg.host = 'x'; // throws at runtime`,
        },
      ],
    },
  ],
};
