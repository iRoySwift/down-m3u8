const fs = require("fs");
const path = require("path");

const { resolve } = require("./path");

function readFile(filePath, fileFormat, callback) {
  const reg = new RegExp(`\.${fileFormat}$`);
  const source = fs.readFileSync(filePath, "utf-8");
  var arr = source.split("\n");
  arr = arr.filter((item) => {
    return item.match(reg);
  });
  if (arr.length > 0) {
    callback(arr);
  } else {
    throw new Error("没有资源！");
  }
}

/**
 * ffmpeg 合并 文件目录 增量添加文件内容
 * @content 合并文件数组
 * @filename 文件存放地址
 */
function writeFile({ content, filename, filepath }) {
  try {
    const data = fs.writeFileSync(filename, "");
    content.forEach((item) => {
      const data = fs.appendFileSync(
        filename,
        `file "${filepath}\\${item}"\r\n`,
        (err) => {
          console.log(err);
        }
      );
    });
    //文件写入成功。
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readFile,
  writeFile,
};
