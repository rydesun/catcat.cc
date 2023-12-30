#!/bin/sh

# 目前没有任何非编译目标的文件值得保留
rm -r public/*

hugo

# 并没有用上的来自主题的文件
rm -r public/assets

# 输出差异
(cd public && git status -s)
