# 双猫CC

[双猫CC](https://catcat.cc) - 我的博客

## 依赖

1. 需要 submodule

```shell
git submodule update --init --recursive
```

2. 安装 hugo, yarn, git，然后运行

```shell
yarn install
```

## 测试

本地运行：

```shell
./tools/test.sh
```

后面可接`hugo`的参数，例如：

```shell
./tools/test.sh --bind 192.168.0.2
```

## 编译

```shell
./tools/build.sh
```

编译结果在`./public`中。

## 额外字体

将更纱黑体放在目录`./raw/fonts`中：

```text
./raw/fonts/sarasa-ui-sc-regular.ttf
./raw/fonts/sarasa-ui-sc-bold.ttf
```
