declare function add<T>(a: T, b: T): T[];
type t<T> = number | string | T;
declare const b: t<boolean>;
interface Data<T> {
    msg: T;
}
declare function ad<T = number, K = number>(a: T, b: K): Array<T | K>;
