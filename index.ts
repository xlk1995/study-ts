type Arr = ["a", "b", "c"];
type first<T extends any[]> = T extends [a: infer A, b: infer B, ...any[]]
  ? A
  : [];
type a = first<Arr>;

type pop<T extends any> = T extends [...infer rest, unknown] ? rest : [];

type p = pop<Arr>;

type Unshift<T extends any[]> = T extends [unknown, ...infer rest] ? rest : [];

type u = Unshift<Arr>;
