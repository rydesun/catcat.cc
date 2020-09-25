# 双猫CC

<a href="https://2cat.cc">
<img src="https://2cat.cc/images/2cats.png" width="208" height="50" /></a>
<br>
<br>

[双猫CC](https://2cat.cc) - 我的博客

## 安装依赖

先安装 hugo, yarn, git 后，然后运行：

```shell
yarn install
```

## 测试

本地运行：

```shell
./scripts/test.sh
```

后面可接`hugo`的参数，例如：

```shell
./scripts/test.sh --bind 192.168.0.2
```

## 编译

```shell
./scripts/build.sh
```

编译结果在`./public`中。

## 字体

将更纱黑体放在目录`./raw/fonts`中：

```text
./raw/fonts/sarasa-ui-sc-regular.ttf
./raw/fonts/sarasa-ui-sc-bold.ttf
```
