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
