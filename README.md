<p align="center">
  <img src="https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp" width="200" height="200" />
</p>

<h1 align="center">KOI-ADMIN🌻</h1>

<p align="center">一款<b>开箱即用</b>的 Vue3 中后台管理系统框架[纯前端]</p>

<p align="center">
  <span>&nbsp;[&nbsp;</span>
  演示
  <a href="http://39.107.143.109/login" target="_blank">点击这里</a>
  <span>&nbsp;]&nbsp;</span>
<p>

## 1、简介

KOI-ADMIN🌻 是一款开源企业级别的中后台管理平台模板，基于 Vue3、Vite、TypeScript、Pinia、Pinia持久化插件、Unocss 和 ElementPlus等前端最新技术栈。相较于其他比较流行的后台管理模板，更加简洁、快捷和容易理解，对萌新小白十分友好。此项目学习成本非常低含有相关代码注释以及大量的案例，非常适合企业级项目、中小型项目、个人项目以及毕业设计。后续将用户、角色、菜单、字典管理和通用管理平台页面依次编写，做到直接对接后端接口即可，使之快速开发。常见的组件有小伙伴提供可提issus会依次封装进去展示。

## 2、特点

- 🎯 使用 Element Plus + Vite + Vue3 + TypeScript + Uncoss + Pinia 等主流技术。
- 🍊 多种布局和丰富的主题适配移动端、IPad和PC端。
- 🐼 内置权限管理页面，进行二次开发可直接对接后端接口即可。
- 🌸 集成登陆、注销及权限验证。
- 🎃 封装按钮和Input框的防抖、限流和背景水印以及左侧无限递归菜单。
- 🍀 集成 `pinia`，vuex 的替代方案，轻量、简单、易用，并且配置pinia持久化插件。
- 😍 二次封装Dialog对话框、Drawer抽屉、Notification通知、Message消息提示和Popconfirm确认框，操作更加方便快捷。
- 🍓 二次封装axios，方便接口更好的统一管理。
- 🌍 集成Echarts图表。
- 🌈 集成 `unocss`，antfu 开源的原子 css 解决方案，非常轻量。
- 🐟 集成多环境配置，dev、测试、生产环境。
- 🌼 集成 `eslint + prettier`，代码约束和格式化统一。
- 🌻 集成 `stylelint`，代码约束scss、less、css规范化。
- 👻 集成 `mock` 接口服务。
- 🏡 集成 `iconify` 图标，支持自定义 svg 图标, 优雅使用icon。

## 3、无需递归路由

众所周知，在实现左侧无限递归路由的时候，后端需要进行树形递归，前端再二次进行递归处理，这样增加了前后端开发难度，如何解决如下？

此项目，前端使用扁平化路由，实现三级及以上页面依旧存在路由缓存效果。

后端提供接口菜单不需要再进行递归，直接根据提供的json格式，进行提供接口[数据如下]，简化后端难度，实现无限递归路由。

```properties
{
  "status": 200,
  "msg": "SUCCESS",
  "data": [
    {
      "menuId": 1,
      "menuName": "系统管理",
      "parentId": 0,
      "menuType": "1",
      "path": "/system",
      "name": "systemPage",
      "component": "",
      "icon": "Tools",
      "isHide": "1",
      "isLink": "",
      "isKeepAlive": "0",
      "isFull": "1",
      "isAffix": "1",
      "redirect": "/system/user"
    },
    {
      "menuId": 11,
      "menuName": "用户管理",
      "parentId": 1,
      "menuType": "2",
      "path": "/system/user",
      "name": "userPage",
      "component": "system/user/index",
      "icon": "UserFilled",
      "isHide": "1",
      "isLink": "",
      "isKeepAlive": "0",
      "isFull": "1",
      "isAffix": "1",
      "redirect": ""
    },
}  
```

## 4、预览

> 预览截图

<table>
  <tr>
    <td><img src="https://i.mji.rip/2023/11/23/7afa129efbd977e90c4243643d92a5e2.png" /></td>
    <td><img src="https://i.mji.rip/2023/11/23/b8118a39f4b594284c19836ded71f38f.png" /></td>
  </tr>
  <tr>
    <td><img src="https://i.mji.rip/2023/11/23/60404f1d026488d753356c58fb374e7b.png" /></td>
    <td><img src="https://i.mji.rip/2023/11/23/e61fd6ab7f71b4604bf905000e8edc37.png" /></td>
  </tr>
  <tr>
    <td><img src="https://i.mji.rip/2023/11/23/015f776f73a1242845846142820fbcf6.png" /></td>
    <td><img src="https://i.mji.rip/2023/11/23/74fb397c09df3ad6900722d1a6ab5412.png" /></td>
  </tr>
  <tr>
    <td><img src="https://i.mji.rip/2023/11/23/548158708b7b6735c3e0dee5a3f4c223.png" /></td>
    <td><img src="https://i.mji.rip/2023/11/23/2bf2ce90924826a2fd972cad814b4429.png" /></td>
  </tr>
</table>

## 5、支持

如果觉得 KOI-ADMIN🌻这个框架不错，或者已经在使用了，希望你可以在 **Github** 或者 **Gitee(码云)** 帮我点个 ⭐ ，这将对我是极大的鼓励。

## 6、快速开始

```properties
# 启动
pnpm run dev
```

## 7、打包发布

```properties
# 构建环境
pnpm build
# 生产环境
pnpm build:prod
```

## 8、源码

<p align="left">
  <span>&nbsp;[&nbsp;</span>
  Gitee仓库
  <a href="https://gitee.com/BigCatHome/koi-ui.git" target="_blank">点击这里</a>
  <span>&nbsp;]&nbsp;</span>
<p>
<p align="left">
  <span>&nbsp;[&nbsp;</span>
  GitHub仓库
  <a href="https://github.com/yuxintao6/koi-ui.git" target="_blank">点击这里</a>
  <span>&nbsp;]&nbsp;</span>
<p>

## 9、入群交流

> 注意：加微信方式时记得添加备注：KOI-UI，支持知识付费。

<table>
    <tr>
        <td><img src="https://i.miji.bid/2023/11/26/db0ea158bd0e90586b3a6636e71417ae.jpeg"/></td>
        <td><img src="https://i.miji.bid/2024/01/22/66e26e5284cd3371f770a06edec5b88d.jpeg"/></td>
    </tr>
</table>
