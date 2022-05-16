// m3u8文件
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

// 页面中下载方法 模板下载URL
function downloadUrl(url) {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe.onload = function () {
    setTimeout(() => {
      document.body.removeChild(iframe);
    });
  };
}

function down() {
  for (let i = 0; i < 570; i++) {
    let url = `https://www.taopianplay.com/taopian/84e2601a-c8ef-41e9-815a-453247f2e518/09e075a8-2f53-49d9-bb94-aae2cd0e1c73/2895/c1d366df-ebc5-4b83-a708-9819b99d4801/SD/${i}.ts`;
    downloadUrl(url);
  }
}

/**
 * 获取视频数据
 * @param {*} uri
 * @param {*} encoding
 * @returns
 */
function getVideoData(url, encoding) {
  return new Promise((resolve, reject) => {
    let request = http;
    if (/^https:\/\//.test(url)) request = https;
    let req = request.get(url, function (res) {
      let result = "";
      encoding && res.setEncoding(encoding);
      res.on("data", function (d) {
        result += d;
      });
      res.on("end", function () {
        resolve(result);
      });
      res.on("error", function (e) {
        reject(e);
      });
    });
    req.end();
  });
}

/**
 * 保存文件
 * @param {*} fileName
 * @param {*} fileData
 * @returns
 */
function saveFileToPath(fileFullName, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileFullName, fileData, "binary", function (err) {
      if (err) {
        console.log("savefileToPath error:", err);
      }
      resolve("已下载");
    });
  });
}

/**
 * 下载视频
 * @param {*} video
 * @returns
 */
function downloadVideo(video) {
  return new Promise(async (resolve, reject) => {
    // 判断视频文件是否已经下载
    if (!fs.existsSync(`${video.fileFullName}`)) {
      await getVideoData(video.url, "binary").then((fileData) => {
        saveFileToPath(video.fileFullName, fileData).then((res) => {
          resolve(`${res}: ${video.filename}`);
        });
      });
    } else {
      reject(`视频文件已存在：${video.filename}`);
    }
  });
}

module.exports = downloadVideo;
