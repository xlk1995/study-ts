import * as aaa from "./index.ts";

// 动态导入

const a = 1;
if (a > 1) {
  import("./index.ts").then((res) => {
    console.log(res);
  });
}
