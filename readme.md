## 数据类型

number string boolean null undefined void(需要关闭严格模式)

## 安装几个库方便调试

```
npm i ts-node -g
```

```
npm init -y
```

```
npm i @types/node -D
```

## any 类型和 unknown 类型

any 任意类型(可以赋值给所有类型)， unknown 不知道的类型(只能赋值给自身或者 any，无法读取属性和方法编译器会报错，any 不会报错，但是没有类型提醒)，unknown 比 any 安全，在不知道什么类型的情况下优先选择 unknown

类型优先级

1. 顶级类型，any、unknown
2. Object
3. Number String Boolean
4. number string boolean
5. 1 '小满' false
6. never

## Object/object/{}

Object 是所有数据类型的父亲 ， {}相当于 Object

```
const a: Object = 1;
const a1: Object = "a";
const a2: Object = true;
const a3: Object = null;
const a4: Object = { name: "xx" };

```

object 只能包含引用类型

```
/*******基础类型会报错 */
const a: object = 1;
const a1: object = "a";
const a2: object = true;
/*******引用类型不会报错 */
const a3: object = null;
const a4: object = { name: "xx" };
const a5: {} = () => 123;

a5.age = 12;
```

## 接口和对象类型

1. interface 重名会合并
2. 任意 key
3. readonly
4. 继承（就是合并
5. 可选
6. 接口类型必须都要有
7. 定义函数

## 数组

number[]

Array<number>

定义对象数组用接口

二维数组 `number[][]`

数组中存放多种类型就用 any 或者元组

```
const a: [string, number, boolean] = ['1', 1, true]
```

函数剩余参数中

```
function T(...args: string[]) {
  console.log(args);

  const arr: IArguments = arguments;
}

interface A {
  length: number;
  callee: Function;
}
```

## 函数

1. 如何定义一个函数: 普通函数/箭头函数
2. 函数的默认参数，可选参数
3. 参数是一个对象如何定义的 （接口
4. 函数的 this 类型
5. 函数重载如何实现

```
function add(num1: number, num2: number): number {
  return num1 + num2;
}

const sum: (str1: string, str2: string) => string = (
  str1: string,
  str2: string
): string => {
  return str1 + str2;
};

function genName(firstName: string = "x", lastName?: string) {
  return firstName + lastName;
}

interface User {
  age: number;
  name: string;
  getName(this: User, oo: number): void;
}

function getUser(user: User): User {
  return user;
}

// 获取this的类型提示
const user: User = {
  name: "kk",
  age: 19,
  getName(oo) {
    console.log(this.age);
  },
};

console.log(getUser(user));

/**
 * 不输入参数返回所有， 输入一个参数返回数组中有无这个值，输入一个数组需要push进去
 */

const arr = [1, 2, 4];
function genNum(id: number): number[];
function genNum(num: number[]): number[];
function genNum(): number[];
function genNum(num?: number | number[]) {
  if (typeof num === "number") {
    return arr.filter((r) => r === num);
  } else if (Array.isArray(num)) {
    arr.push(...num);
    return arr;
  } else {
    return arr;
  }
}

console.log(genNum(1));
console.log(genNum([1, 2, 3, 4]));
console.log(genNum());

```

## 联合类型和交叉类型

```
interface A {
  name: string;
}

interface B {
  age: number;
}

const c: A | B = {
  name: "1211",
};

const d: A & B = {
  name: "xx",
  age: 1,
};

```

## 内置对象

```
const a: Number = Number(1);

const b: Date = new Date();

const reg: RegExp = new RegExp(/\w/);

const error: Error = new Error();

const xhr: XMLHttpRequest = new XMLHttpRequest();

// Element HTMLElement

const ele = document.querySelector("footer");

// 节点一个可以用 NodeList
const ele1: NodeList = document.querySelectorAll("div");
// 多个不同节点可以用NodeListOf
const ele2: NodeListOf<HTMLDivElement | HTMLElement> =
  document.querySelectorAll("div footer");

let local: Storage = localStorage;
let lo: Location = location;
let promise: Promise<number> = new Promise((r) => r(1));
promise.then((res) => console.log(res));
let cookie: string = document.cookie;

```

## 类

```
interface Options {
  el: string | HTMLElement;
}
interface VueCls {
  options: Options;
  init(): void;
}

interface Vnode {
  tag: string;
  text?: string;
  children?: Vnode[];
}

class Dom {
  // 创建节点的方法
  createElement(el: string) {
    return document.createElement(el);
  }
  // 填充文本的方法
  setText(el: HTMLElement, text: string) {
    el.textContent = text;
  }
  render(data: Vnode) {
    let root = document.createElement(data.tag);
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item) => {
        let children = this.render(item);
        root.appendChild(children);
      });
    } else {
      this.setText(root, data.text);
    }
    return root;
  }
}

class Vue extends Dom implements VueCls {
  options: Options;

  constructor(options: Options) {
    super();
    this.options = options;
    this.init();
  }
  init(): void {
    let data: Vnode = {
      tag: "div",
      children: [
        {
          tag: "section",
          text: "子节点1",
        },
        {
          tag: "section",
          text: "子节点2",
        },
      ],
    };
    let app =
      typeof this.options.el === "string"
        ? document.querySelector(this.options.el)
        : this.options.el;
    console.log(app);

    app.appendChild(this.render(data));
  }
}

new Vue({
  el: "#app",
});

```

静态方法只能调用静态方法

## 抽象类

// 基类
// abstract 所定义的抽象类 不能被实例化(不能 new)
// abstract 所定义的方法 都只能描述 不能进行一个实现
// 派生类需要实现抽象类的所有方法

```
abstract class Vue {
  name: string;
  constructor(name?: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
  abstract init(name: string): void;
}

class React extends Vue {
  constructor() {
    super();
  }
  init(name: string): void {
    console.log(name);
  }
  setName(name: string) {
    this.name = name;
  }
}

const re = new React();
console.log(re.getName());
re.setName("kk");
console.log(re.getName());

```

## 元组类型

```
let ar1: [x: number, y?: string] = [1, "2"];

console.log(typeof ar1[0]);
console.log(ar1["length"]);
```

## 枚举

1. 数字枚举
2. 字符串枚举
3. const 枚举
4. kv 映射

## 类型推断

直接赋值就会自动进行类型推断， 只定义不赋值会自动赋值成 any

类型别名 type

### type 和 interface 的区别

1. interface 可以继承，type 不能
2. type 可以进行联合类型，interface 只能在里面进行联合类型，
3. interface 定义同名的会合并，type 直接报错
4. extends 在 type 中是包含的意思(type num = 1 extends number ? 1: 0，返回 1)左边的值会作为右边类型的子类型

### 顶级类型

unknow any
Object
Number String Boolean
number string boolean
1 'test' false
never

## never

1. 不存在的类型

```
type a = string & number
```

2. 异常

```
function test ():never {
  throw new Error('error')
}
```

3. 死循环

```
function test() : never {
  while(true) {

  }
}
```

4. 联合类型会被忽略

```
type A = void | number | never

```

5. 兜底机制

```
type A = "唱" | "跳" | "rap" | "篮球";

function test(value: A) {
  switch (value) {
    case "唱":
      break;
    case "跳":
      break;
    case "rap":
      break;
    default:
      // 兜底机制
      const error: never = value;
      break;
  }
}
```

## Symbol

```
// 1. symbol的用法
const a1 = Symbol(1);
const a2 = Symbol(1);
console.log(a1, a2);

// console.log(a1 == a2);
// Symbol.for从全局的symbol中找key， 找到就返回，没找到就创建
console.log(Symbol.for("xx") === Symbol.for("xx"));

//symbol的运用，为了防止key同名

const obj = {
  name: "xx",
  [a1]: "aaa",
  [a2]: "bbb",
};

// for in  getOwnPropertyNames 只能获得普通key
for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    const element = obj[key];
    console.log(key);
  }
}
console.log(Object.getOwnPropertyNames(obj));
// 可获得symbol key
console.log(Object.getOwnPropertySymbols(obj));
// 可获得所有key
console.log(Reflect.ownKeys(obj));

```

## 生成器

```
function* gen() {
  yield Promise.resolve("aa");
  yield "bb";
  yield "cc";
  yield "dd";
}

// 返回值有value和done
const man = gen();
console.log(man.next());
console.log(man.next());
console.log(man.next());
console.log(man.next());
console.log(man.next());
```

## map set

```
const s: Set<number> = new Set([1, 1, 2, 3]);
// console.log(s);
const ar: number[] = [1, 2, 3];
const m: Map<number[], string> = new Map();
m.set(ar, "ss");
m.set([34, 5], "gg");
// console.log(m);
// 可迭代
function fn() {
  console.log(arguments);
}
// const nodes: NodeList = document.querySelectorAll("div");

function each(value: any) {
  const it: any = value[Symbol.iterator]();
  let next: any = {
    done: false,
  };
  while (!next.done) {
    next = it.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
}

each(m);

// 迭代器的语法糖 for of
// for (const k of m) {
//   console.log(k[1]);
// }
// for of不能用于对象

// 数组解构的原理也是迭代器

const obj = {
  max: 5,
  current: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.max === this.current) {
          return {
            value: undefined,
            done: true,
          };
        } else {
          this.current++;
          return {
            value: this.current,
            done: false,
          };
        }
      },
    };
  },
};

for (const o of obj) {
  console.log(o);
}
// 可解构
console.log(...obj);
const [r, t] = obj;
console.log(r, t);

```

## 泛型

```
 function add<T>(a: T, b: T): T[] {
  return [a, b];
}
console.log(add(1, 2));

type t<T> = number | string | T;

const b: t<boolean> = false;

interface Data<T> {
  msg: T;
}
//  default type
function ad<T = number, K = number>(a: T, b: K): Array<T | K> {
  return [a, b];
}
ad(1, false);

```

简单封装一个 axios

```
const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(null);
    });
  },
};

type data = {
  message: string;
  code: 200;
};
axios.get<data>("./data.json").then((res) => {
  console.log(res.message);
});

```

## 泛型约束

```
const obj = {
  name: "xx",
  age: 12,
};

// 使用extends进行泛型约束
function add<T extends number>(a: T, b: T) {
  return a + b;
}

// 使用kyeof 提取key的值

type a = keyof typeof obj;

// 写一个函数获取值

function getVal(obj: object, key: a) {
  return obj[key];
}

getVal(obj, "age");

interface Data1 {
  name: string;
  age: number;
  sex: string;
}

type Options<T extends object> = {
  [key in keyof T]?: T[key];
};
type aa = Options<Data1>;

```

## namespace

```
// namespace 需要导出，可以合并简化, 可以嵌套
namespace Test {
  export const a = 1;
}

namespace Test {
  export const add = (a: number, b: number) => a + b;
}

Test.a;

// 应用场景，一个webview可能在不同平台使用

namespace Ios {
  export const fn = () => {};
}

namespace And {
  export const fn = () => {};
}

```

## 模块化

在 es6 之前有

1. commonjs -> nodejs require 导入 export.xxx = function(){} module.exports= xxxx 导出
2. amd -> requirejs defined 定义模块 require 加载
3. cmd -> seajs (国产)
4. umd 融合 commonjs 和 amd
5. esm 模块化规范

## 模块解析

### 导入

```
// 默认导出
export default 1;

// 分别导出

export const a = 1;

// 解构导出

const fn = () => {};
export { fn };

```

### 引入

```
import * as aaa from "./index.ts";

// 动态导入  导入只能在文件头部 如果想按需导入之类的  可以使用动态导入

const a = 1;
if (a > 1) {
  import("./index.ts").then((res) => {
    console.log(res);
  });
}

```

## 声明文件

declare

```
declare module "express" {
  interface App {
    use(path: string, router: any): void;
    listen(port: number, cb?: () => void);
  }
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void;
  }
  interface Express {
    (): App;
    Router(): Router;
  }
  const express: Express;
  export default express;
}

```

## mixin

### 对象混入

```
// 对象混入

interface A {
  name: string;
}

interface B {
  age: number;
}

const a: A = {
  name: "xx",
};

const b: B = {
  age: 10,
};

// 浅拷贝 返回新类型
const c = { ...a, ...b };
// 返回联合类型
const d = Object.assign({}, a, b);
// 深拷贝 node18以上
const copied = structuredClone(a);

```

### 类混入

```
class Logger {
  log(msg: string) {
    console.log(msg);
  }
}

class Html {
  render() {
    console.log("render");
  }
}

class App {
  run() {
    console.log("run");
  }
}

type Constructor<T> = new (...args: any[]) => T;

function pluginMinxins<T extends Constructor<App>>(Base: T) {
  return class extends Base {
    Logger = new Logger();
    Html = new Html();
    constructor(...args: any[]) {
      super(...args);
      this.Logger = new Logger();
      this.Html = new Html();
    }
    run(): void {
      this.Logger.log("mixin logger");
    }
    render() {
      this.Html.render();
    }
  };
}

const mixinCls = pluginMinxins(App);
const app = new mixinCls();
app.render();

```

## 装饰器

```
// 类装饰器ClassDecorator target 构造函数
// 属性装饰器
// 参数装饰器
// 方法装饰器
// 装饰器工厂
// import 'reflect-metadata'
// axios

import "reflect-metadata";

import axios from "axios";
// 类装饰器
const Base: ClassDecorator = (target) => {
  // console.log(target);
  target.prototype.xx = "kk";
  target.prototype.fn = () => {
    // console.log("kkkkk");
  };
};

const DeFactory = (name: string) => {
  const fn: ClassDecorator = (target) => {
    target.prototype.yy = name;
  };
  return fn;
};

//方法装饰器
const Get = (url: string) => {
  const fn: MethodDecorator = (
    target,
    _: any,
    descriptor: PropertyDescriptor
  ) => {
    // console.log(target, key, descriptor);
    const key = Reflect.getMetadata("key", target);
    axios.get(url).then((res: any) => {
      descriptor.value(key ? res.data[key] : res.data);
    });
  };
  return fn;
};

// 参数装饰器
const Result = () => {
  const fn: ParameterDecorator = (target, key, index) => {
    console.log(target, key, index, "===");
    Reflect.defineMetadata("key", "title", target);
  };
  return fn;
};
// 属性装饰器
const Name: PropertyDecorator = (target, key) => {
  console.log(target, key);
};

@DeFactory("xx")
class Http {
  @Name
  xiaoman: string;
  constructor() {
    this.xiaoman = "xxx";
  }
  // ....
  @Get("http://jsonplaceholder.typicode.com/posts/2")
  getList(@Result() data: any) {
    console.log(data);
  }
}
const http = new Http() as any;

```

## webpack+vue3+ts

### webpack 配置

```
const path = require("node:path");
const { Configuration } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {Configuration}
 */
const config = {
  mode: "development",
  entry: "./src/main.ts", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 生成目录
    filename: "[chunkhash].js", // 打包之后的文件
    clean: true,
  },
  // 控制台只
  stats: "errors-only",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
    new CssExtractPlugin(),
  ], // webpack的插件都是class， 都需要new
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader", // 处理ts文件添加loader
        // 支持vue中的ts
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [CssExtractPlugin.loader, "css-loader"], // 从右向左
      },
      {
        test: /\.less/,
        use: [CssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        moment: {
          name: "moment",
          chunks: "all", // 不管异步同步全部拆分
          test: /[\\/]node_modules[\\/]moment[\\/]/,
        },
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2, // 引用次数大于2就会被拆分出来
        },
      },
    },
  },
};

module.exports = config;

```

## 发布订阅模式

```
// 什么是发布订阅模式， 他是设计模式的一种

// 谁在用： vue2, eventBus, $on $emit
// electron ipRenderer ipMain通讯

interface I {
  events: Map<string, Function[]>;
  on: (eventName: string, cb: Function) => void;
  emit: (eventName: string, ...args: any[]) => void;
  off: (eventName: string, fn: Function) => void;
  once: (eventName: string, callback: Function) => void;
}

class Emitter implements I {
  events: Map<string, Function[]>;
  constructor() {
    this.events = new Map();
  }
  on(eventName: string, cb: Function) {
    //判断是不第一次存入
    if (this.events.has(eventName)) {
      const callbackList = this.events.get(eventName);
      callbackList && callbackList.push(cb);
    } else {
      this.events.set(eventName, [cb]);
    }
  }
  emit(eventName: string, ...args: any[]) {
    const callbackList = this.events.get(eventName);
    if (callbackList) {
      callbackList.forEach((fn) => {
        fn(...args);
      });
    }
  }
  off(eventName: string, fn: Function) {
    const callbackList = this.events.get(eventName);
    if (callbackList) {
      callbackList.splice(callbackList.indexOf(fn), 1);
    }
  }
  once(eventName: string, callback: Function) {
    const cb = (...args: any[]) => {
      callback(...args);
      this.off(eventName, cb);
    };
    this.on(eventName, cb);
  }
}

const bus = new Emitter();
const fn = (a: boolean, b: number) => {
  console.log(a, b);
};
// bus.on("message", fn);
// bus.off("message", fn);
bus.once("message", fn);

bus.emit("message", false, 1);
bus.emit("message", false, 1);
bus.emit("message", false, 1);

```

## set map weakmap weakset

```
const s: Set<number> = new Set([1, 1, 2, 2, 3]);
console.log(s);

let obj: any = {
  name: "xx",
};

const m: Map<object, any> = new Map();

m.set(obj, "xxx");
console.log(m);

// weakmap 和map的区别:  weakmap key值只能是引用数据类型
const wm: WeakMap<object, any> = new WeakMap();

let ooo: any = obj;
wm.set(obj, "ggg");

obj = null; // 垃圾回收-1
ooo = null; // 垃圾回收-2
setTimeout(() => {
  console.log(wm.get(obj));
}, 1000);

```

## Proxy/Reflect

```
// const person = {
//   name: "xx",
// };

// person.name; // 取值
// person.name = "yy"; // 赋值

// let personProxy = new Proxy(person, {
//   get() {},
//   set(target, key, value, receiver) {
//     return true;
//   },
//   apply(){},
//   // a in window
//   has(){},
//   // for in
//   ownKeys() {},
//   // new
//   construct(){},
//   //delete
//   defineProperty(){

//   }
// });

// proxy支持对象，数组，函数，set，map

let person = {
  name: "xx",
  age: 29,
};

// person.name 取值方法1
// Reflect.get(person,"name",person) // 取值方法2
// Reflect.set(person, "name","ggg", person)可以设置值

let proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    if (target.age <= 18) {
      // Reflect直接操作对象
      return Reflect.get(target, key, receiver);
    } else {
      return "成年了！";
    }
  },
});

// console.log(proxyPerson.age);

const list: Set<Function> = new Set();
const autoRun = (cb: Function) => {
  if (!list.has(cb)) {
    list.add(cb);
  }
};

const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(params, key, value, receiver) {
      const result = Reflect.set(params, key, value, receiver);
      list.forEach((fn) => fn());
      return result;
    },
  });
};

const p = observable(person);
autoRun(() => {
  console.log("我触发了======");
});
p.age = 12;
p.name = "xx";

```

## 类型守卫

```
// 类型守卫
// 1 类型收缩 | 类型收窄
// 2 类型谓词 | 自定义守卫
// 实现一个函数， 该函数可以传入任意类型
// 但是如果是object就检查里面的属性， 如果里面的属性是number就取两位
// 如果是string就去除左右空格
// 如果是函数就执行

// typeof 有缺陷，不能识别对象， 数组， null,
// instance of

const isObject = (params: any): params is object =>
  Object.prototype.toString.call(params) === "[object Object]";

const isNumber = (params: any): params is number => typeof params === "number";
const isString = (params: any): params is string => typeof params === "string";
const isFunction = (params: any): params is Function =>
  typeof params === "function";

const obj = {
  a: 11.11,
  b: "ss   ",
  c: function () {
    console.log(this);
  },
};

const fn = (data: any) => {
  // 不使用forin 会遍历原型链上的属性
  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (isNumber(val)) {
      data[key] = val.toFixed(2);
    }
    if (isString(val)) {
      data[key] = val.trim();
    }
    if (isFunction(val)) {
      data[key]();
    }
  });
};

fn(obj);
console.log(obj);

```

## 协变/逆变/双向协变

```
// 主类型
interface A {
  name: string;
  age: number;
}
// 子类型
interface B {
  name: string;
  age: number;
  sex: string;
}

let a: A = {
  name: "xx",
  age: 18,
};

let b: B = {
  name: "yy",
  age: 19,
  sex: "female",
};

// 可以把属性少的赋值给属性多的, 协变
a = b;

// b = a;

// 函数

let fn1 = (a: A) => {
  console.log(a);
};

let fn2 = (b: B) => {
  console.log(b);
};
//  协变
fn2 = fn1;

// 双向协变

fn1 = fn2;

```

## 泛型工具

```
interface User {
  address?: string;
  name?: string;
  age?: number;
}

// Partial
// type partialUser = Partial<User>
// 手写Partial
type CustomPartial<T> = {
  [P in keyof T]?: T[P];
};

type userPartial = CustomPartial<User>;

// Required
type CustomRequired<T> = {
  [P in keyof T]-?: T[P];
};

// type RequiredUser = CustomRequired<User>;

// Pick

type CustomPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type userPick = CustomPick<User, "address" | "age">;

// Exclude  用于联合类型

type CustomExclude<T, U> = T extends U ? never : T;

type c = CustomExclude<"a" | "b" | "c", "a">;

// Omit 排除interface中的属性

// 排除k的属性，把剩下的提取出来
type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type OmitType = CustomOmit<User, 'name'>

```

```
// Recorder ReturnType

type K = "a" | "b" | "c";
type V = "唱" | "跳" | "rap";

// 对象的key只能是string number symbol 语法糖

type objKey = keyof any;

type CustomRecord<K extends objKey, T> = {
  [P in K]: T;
};
const obj: CustomRecord<K, V> = {
  a: "唱",
  b: "rap",
  c: "唱",
};

const fn = () => {
  return 1;
};

type CustomReturnType<F extends Function> = F extends (
  ...args: any
) => infer Res
  ? Res
  : never;

type f = CustomReturnType<typeof fn>;

```

## infer

```
// infer 就是推导泛型参数

// infer 声明只能出现在extends子语句中
// infer 后面跟一个变量名
// 获取Promise返回的参数

interface User {
  name: string;
  age: number;
}

type PromiseType = Promise<Promise<User>>;

type GenPromiseType<T> = T extends Promise<infer U> ? GenPromiseType<U> : T;

type I = GenPromiseType<PromiseType>;

// infer协变
// 产生协变会返回联合类型
let obj = {
  name: "xxxx",
  age: 19,
};

type Bar<T> = T extends { name: infer U; age: infer U } ? U : T;

type T = Bar<typeof obj>;

// infer 逆变，返回交叉类型

type FF<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
}
  ? U
  : "xxx";

type KK = FF<{ a: (x: number) => void; b: (y: string) => void }>;



```

```
type Arr = ["a", "b", "c"];
type first<T extends any[]> = T extends [a: infer A, b: infer B, ...any[]]
  ? A
  : [];
type a = first<Arr>;

type pop<T extends any> = T extends [...infer rest, unknown] ? rest : [];

type p = pop<Arr>;

type Unshift<T extends any[]> = T extends [unknown, ...infer rest] ? rest : [];

type u = Unshift<Arr>;

```
