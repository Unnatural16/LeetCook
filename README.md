# leetcook

## 介绍

LeetCook是我在自学前端过程中检验自己能力并综合学习的第一个项目，灵感来源于LeetCode，功能还算齐全，大体能用。
为什么选择LeetCode进行模仿？因为这个网站在学习编程入门的过程中用得最多，写着很熟悉，整体布局比较简单，适合新手。
各位无聊的话不妨来玩一玩，当然因为网站可能还是会有安全问题，注册账号时就不要用自己常用的账户名和密码啦。

[仓库源码](https://github.com/Unnatural16/LeetCook)，[点此访问](http://leetcook.limshung.site/)

## 技术栈

* Vue全家桶
  * vue
  * vuex
  * vue-router
* 组件库iview
* 代码编辑器ace-editior
* 以及更多axios等常见库

:::tip
使用iview是因为发现他的UI风格与LeetCode很相，还原度更高
:::

## 项目运行

```shell
yarn
yarn serve
yarn build
```

或者

```shell
npm install
npm run serve
npm run build
```

## 功能

* []主页
* []题目页
* []题目搜索，分类，查找
* []竞赛页、电子书页和App下载页(仅外观)
* []登录、注册
* []权限控制
* []算法题、测试、提交
* []评论、题解收藏和点赞
* [x]更多的题目
* [x]每日一题
* [x]完善仅有外观的页面

## 后端交互

将与后端交互的API统一放在了Common.js中，并用async函数封装。后端涉及到安全因素暂不开源.

## 部分截图

![截图1](http://image.limshung.site/pics/leetcook.limshung.site_problem_0_record.png)
![截图2](http://image.limshung.site/pics/leetcook.limshung.site_problem_0.png)
![截图3](http://image.limshung.site/pics/leetcook.limshung.site_home%20(1).png)
![截图3](http://image.limshung.site/pics/leetcook.limshung.site_home.png)

## Project setup

```shell
yarn install
```

### Compiles and hot-reloads for development

```shell
yarn serve
```

### Compiles and minifies for production

```shell
yarn build
```

### Run your unit tests

```shell
yarn test:unit
```

### Lints and fixes files

```shell
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
