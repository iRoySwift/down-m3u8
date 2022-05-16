const ProgressBar = require("./progressBar");

var pb = new ProgressBar("下载进度", 72);
var num = 0,
  total = 100;
function downloading() {
  if (num < total) {
    pb.render({ completed: num, total: total, status: "下载中..." });
    num++;
    setTimeout(function () {
      downloading();
    }, 20);
  } else {
    pb.render({ completed: num, total: total, status: "下载完毕." });
    process.exit(0);
  }
}

downloading();
