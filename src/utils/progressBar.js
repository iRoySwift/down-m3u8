var log = require("single-line-log").stdout;
const strformat = require("str-format").format;
const clicolor = require("cli-color");

function ProgressBar(description, bar_length) {
  // 两个基本参数
  this.description = description || "Progress"; // 命令行开头信息
  this.length = bar_length || 25; //进度条的长度 默认25
  // 刷新进度条图案、文字的方法
  this.render = function (opts) {
    var percentage = (opts.completed / opts.total).toFixed(4);
    var cell_num = Math.floor(percentage * this.length);
    // 拼接黑色条
    var cell = "";
    for (var i = 0; i < cell_num; i++) {
      cell += "█";
    }
    // 拼接灰色条
    var empty = "";
    for (var i = 0; i < this.length - cell_num; i++) {
      empty += "░";
    }

    var percent = (100 * percentage).toFixed(2);
    /**
     * 使用cli-color进行包装美化。
     */
    this.description = clicolor.blue.bold(this.description);
    cell = clicolor.green.bgBlack.bold(cell);
    opts.completed = clicolor.yellow.bold(opts.completed);
    opts.total = clicolor.blue.bold(opts.total);
    opts.status =
      percent == 100.0
        ? clicolor.green.bold(opts.status)
        : clicolor.red.bold(opts.status);

    // 拼接最终文本
    var cmdtext = strformat("<{}:{}%> {}{}  [ {}/{} `{}`]", [
      this.description,
      percent,
      cell,
      empty,
      opts.completed,
      opts.total,
      opts.status,
    ]);
    log.clear();
    log(cmdtext);
  };
}

module.exports = ProgressBar;
