# 项目介绍

1. 基于 Node.js 和 MongoDB 的用于显示和管理电影数据的项目
2. 源于慕课网课程《node+mongodb 建站攻略（一期）》 `http://www.imooc.com/learn/75`

## 如何使用

1. 安装 Node.js
2. 项目根目录 `npm install`
3. 项目根目录 `bower install`
4. 安装 MongoDB：`https://www.mongodb.com/download-center` 并启动 mongod.exe
5. 项目根目录 `node app.js`
6. 打开浏览器访问
### 访问地址
1. 首页 `http://localhost:8000`
2. 电影列表页 `http://localhost:8000/admin/list`
3. 电影录入页 `http://localhost:8000/admin/movie`


## 目录介绍

1. `views/`：项目视图（模板）。
2. `public/`：网站根目录（共有目录），静态资源文件。
3. `models/`：Mongoose 生成的模型。
4. `schemas/`：Mongoose 生成的模式。
5. `public/libs/`：Bower 依赖安装目录。

