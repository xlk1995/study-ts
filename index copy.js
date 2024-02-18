"use strict";
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.height = screen.availHeight;
canvas.width = screen.availWidth;
var str = "dfdsafasfasf";
var arr = Array(Math.ceil(canvas.width / 10)).fill(0);
console.log(arr);
var rain = function () {
    ctx.fillStyle = "rgba(0,0,0,0.01)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00f";
    arr.forEach(function (item, index) {
        ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, item + 10);
        arr[index] =
            item > canvas.height || item > 10000 * Math.random() ? 0 : item + 10;
    });
};
setInterval(rain, 100);
