# plop-template

基于 vue3.x 的文件模板脚手架配置，包含 component，store 和 view 文件配置

## 使用手册

项目配置是基于脚手架工具 [plop](https://plopjs.com/documentation/#getting-started)

我们可以在现有的 vue3 项目中使用当前模板, 如果没有项目可以通过[vue-cli](https://cli.vuejs.org/zh/)创建一个

1. 本地安装 `plop`

```
npm install --save-dev plop
```

2. 在项目根目录中添加 plopfile.js 文件

```javascript
// plopfile.js
/* eslint-disable @typescript-eslint/no-var-requires */
const viewGenerator = require("./plop-templates/view/prompt.js");
const componentGenerator = require("./plop-templates/component/prompt.js");
const storeGenerator = require("./plop-templates/store/prompt.js");
module.exports = (plop) => {
  plop.setGenerator("view", viewGenerator);
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("store", storeGenerator);
};
```

3. 添加项目中的 plop-templates 文件夹到项目根目录
4. 在 package.json 中增加命令

```json
// package.json
"scripts": {
    ...
    "generate": "plop"
}
```

## 命令指南

执行 `npm run generate`, 就可以在终端中进行输入和选择，plop 工具会自动帮你创建新的文件。

要了解更多 api 和脚手架用法，可以访问 [plop 官网](https://plopjs.com/documentation/#getting-started)
