const canvas = document.querySelector("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");

canvas.height = screen.availHeight;
canvas.width = screen.availWidth;

let str: string = "dfdsafasfasf";

let arr = Array(Math.ceil(canvas.width / 10)).fill(0);
console.log(arr);

const rain = () => {
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00f";
  arr.forEach((item, index) => {
    ctx.fillText(
      str[Math.floor(Math.random() * str.length)],
      index * 10,
      item + 10
    );
    arr[index] =
      item > canvas.height || item > 10000 * Math.random() ? 0 : item + 10;
  });
};

setInterval(rain, 100);
