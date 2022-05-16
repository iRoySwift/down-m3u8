const fs = require("fs");

const { readFile, writeFile } = require("./utils/file");
const downloadVideo = require("./utils/downVideo");
const { resolve } = require("./utils/path");
const ProgressBar = require("./utils/progressBar");

// 写ffmpeg 文件格式
let writeFileOption = {
  content: "",
  filename: resolve("assets/url.txt"),
  filepath: resolve("download"),
};

let config = {
  // m3u8 文件位置
  m3u8: resolve("assets/url.m3u8"),
  // 视频格式
  format: ".ts",
  dest: resolve("download"),
  //视频地址域名
  http: "https://www.taopianplay.com/taopian/84e2601a-c8ef-41e9-815a-453247f2e518/09e075a8-2f53-49d9-bb94-aae2cd0e1c73/2895/c1d366df-ebc5-4b83-a708-9819b99d4801/SD/",
};

var pb = new ProgressBar("下载进度", 72);

function run() {
  // 创建dest文件夹
  if (!fs.existsSync(`${config.dest}`)) {
    fs.mkdirSync(config.dest);
  }
  // 读取下载的文件
  let files = fs.readdirSync(config.dest);
  // 读取m3u文件
  readFile(config.m3u8, config.format, function (source) {
    // 初始化一个进度条长度50的ProgressBar
    writeFileOption.content = source;
    // 写ffmpeg 文件格式
    writeFile(writeFileOption);
    source.forEach(async (url, i) => {
      const reg = new RegExp(`[(?<=\/)]*[\\w\\d]*${config.format}$`);
      const filename = url.match(reg);
      const videoConfig = {
        url: `${config.http}${url}`,
        filename,
        fileFullName: `${config.dest}/${filename}`,
      };
      await downloadVideo(videoConfig)
        .then((res) => {
          files = fs.readdirSync(config.dest);
          // 更新进度条
          if (files.length == source.length) {
            pb.render({
              completed: files.length,
              total: source.length,
              status: "下载完成",
            });
            process.exit(0);
          } else {
            pb.render({
              completed: files.length,
              total: source.length,
              status: "下载中...",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

run();
