import { Dictionaries } from "../enum";

export type Key = string;

export type expire = Dictionaries.expire | number;

export interface Data<T> {
  value: T;
  [Dictionaries.expire]: Dictionaries.permanent | number;
}

export interface Result<T> {
  message: string;
  value: T | null;
}

export interface StorageCls {
  get<T>(key: Key): Result<T | null>;
  set<T>(key: Key, value: T, expire: expire): void;
  remove(key: Key): void;
  clear(): void;
}
