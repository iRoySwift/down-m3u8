#!/bin/bash
#--------------------------------------------
# 打包脚本
# author：RoyHsu
#--------------------------------------------
##### 用户配置区 开始 #####
echo "环境检查，当前目录："
pwd
ffmpeg -f concat -safe 0 -i ./src/assets/url.txt -c copy ./src/download/out.mp4
exit 0