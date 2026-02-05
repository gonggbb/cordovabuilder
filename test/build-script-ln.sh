#!/bin/bash
# File Name:apk-automatic-v2
# Version:V1.0
# Author:gamesg
# Organization:github.com/gonggbb
# Desc: 构建脚本初始化入口
#############################################
ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short
ln -sf /dev/stdout nohup.log
exec /bin/bash