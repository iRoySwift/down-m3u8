var fs = require("fs");
var PATH = "C:/Users/Administrator/Desktop/sss";

function walk(path, callback) {
  var files = fs.readdirSync(path);
  files.forEach(function (file) {
    if (fs.statSync(path + "/" + file).isFile()) {
      callback(path, file);
    }
  });
}

// 修改文件名称
function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err;
    }
  });
}

walk(PATH, function (path, fileName) {
  console.log(path, fileName);
  // 获取编码 顺序
  var code = fileName.match(/^(v.f100230_)(\d+)(\.ts)$/)[2];
  var oldPath = path + "/" + fileName, // 源文件路径
    newPath = path + "/" + code.padStart(4, 0) + fileName; // 新路径

  rename(oldPath, newPath);
});
