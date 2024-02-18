import { json } from "stream/consumers";
import { Dictionaries } from "./src/enum";
import { Data, Key, Result, expire } from "./src/type";
import { StorageCls } from "./src/type";

export class Storage implements StorageCls {
  set<T>(key: Key, value: T, expire: expire = Dictionaries.expire) {
    const data = {
      value,
      [Dictionaries.expire]: expire,
    };
    // 存进去
    localStorage.setItem(key, JSON.stringify(data));
  }
  get<T>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key);
    if (value) {
      const obj: Data<T> = JSON.parse(value);
      const now = new Date().getTime();
      if (
        typeof obj[Dictionaries.expire] == "number" &&
        obj[Dictionaries.expire] < now
      ) {
        this.remove(key);
        return {
          message: `您的${key}已过期`,
          value: obj.value,
        };
      } else {
        return {
          message: "成功读取",
          value: obj.value,
        };
      }
    } else {
      return {
        message: "值无效",
        value: null,
      };
    }
  }
  remove(key: Key): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
