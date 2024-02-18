var Dictionaries;
(function (Dictionaries) {
    Dictionaries["expire"] = "__expire__";
    Dictionaries["permanent"] = "permanent";
})(Dictionaries || (Dictionaries = {}));

class Storage {
    set(key, value, expire = Dictionaries.expire) {
        const data = {
            value,
            [Dictionaries.expire]: expire,
        };
        // 存进去
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            const obj = JSON.parse(value);
            const now = new Date().getTime();
            if (typeof obj[Dictionaries.expire] == "number" &&
                obj[Dictionaries.expire] < now) {
                this.remove(key);
                return {
                    message: `您的${key}已过期`,
                    value: obj.value,
                };
            }
            else {
                return {
                    message: "成功读取",
                    value: obj.value,
                };
            }
        }
        else {
            return {
                message: "值无效",
                value: null,
            };
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}

export { Storage };
