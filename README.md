# 双猫CC

[双猫CC](https://catcat.cc) - rydesun的博客

## 安装

因为 `assets/css/` 内的 SCSS 文件使用了 dart-sass 的特性，
在 `layouts/partials/style.html` 中也指定了编译器为 dart-sass，
所以需要用包管理器安装 dart-sass，取代 hugo 内置的 libsass

```bash
sudo pacman -S dart-sass
```

## 项目结构

文章和一些静态资源放在 `private/` 目录中，比如文章放在 `private/content/` 目录。
然后在 hugo.toml 中设置 hugo 的目录挂载功能，就能将 `private/` 下的目录挂载进项目。
([Union file system](https://gohugo.io/getting-started/directory-structure/#union-file-system))

`layouts/partials/*.html` 只用来覆盖主题相应的文件。如果是新增的 partial，
则放入 `layouts/partials/extend`。

## 定制备忘录

`layouts/partials/style.html` 导致 CSS 的加载方式发生变化。
以及自定义的 iconfont.js 取代了主题内置的iconfont。

`layouts/partials/head-extra.html` 加载 JS 脚本，
没有使用主题的 custom-js.html。
