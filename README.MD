# 基于Vue的前端微服务系统项目
## 启动
```shell
yarn install 
cd ./packages/root
yarn run serve # 启动入口系统
cd ./packages/sub-tempate 
yarn run serve # 启动子系统
```
## 目录结构
·
|-- README.MD
|-- babel.config.js
|-- commitlint.config.js
|-- config.js
|-- jsconfig.json
|-- lerna.json
|-- package.json
|-- packages
|   |-- root
|   |   |-- README.md
|   |   |-- babel.config.js
|   |   |-- config.js
|   |   |-- dev-subsysmt-map.js
|   |   |-- package.json
|   |   |-- public
|   |   |   |-- favicon.ico
|   |   |   `-- index.html
|   |   |-- src
|   |   |   |-- App.vue
|   |   |   |-- api
|   |   |   |   `-- http.ts
|   |   |   |-- assets
|   |   |   |   `-- logo.png
|   |   |   |-- container.vue
|   |   |   |-- main.ts
|   |   |   |-- router.ts
|   |   |   |-- store.ts
|   |   |   `-- styles
|   |   |       |-- import.scss
|   |   |       `-- style.scss
|   |   |-- tsconfig.json
|   |   |-- types.d.ts
|   |   `-- vue.config.js
|   |-- shared
|   |   |-- assets
|   |   |   `-- logo.png
|   |   |-- components
|   |   |   |-- app-header.vue
|   |   |   `-- app-view.vue
|   |   |-- index.ts
|   |   |-- store
|   |   |   `-- index.ts
|   |   |-- styles
|   |   |   |-- classes.scss
|   |   |   |-- components
|   |   |   |   `-- app-header.scss
|   |   |   |-- import.scss
|   |   |   |-- index.scss
|   |   |   |-- lib.scss
|   |   |   |-- mixins
|   |   |   |   |-- _actives.scss
|   |   |   |   |-- _flex.scss
|   |   |   |   |-- _others.scss
|   |   |   |   |-- _screen.scss
|   |   |   |   |-- _scrollbar.scss
|   |   |   |   `-- _scroller.scss
|   |   |   |-- mixins.scss
|   |   |   `-- vars.scss
|   |   `-- utils
|   |       |-- gen-http.ts
|   |       `-- load-resource.ts
|   `-- sub-tempate
|       |-- README.md
|       |-- babel.config.js
|       |-- config.js
|       |-- package.json
|       |-- public
|       |   |-- favicon.ico
|       |   `-- index.html
|       |-- src
|       |   |-- App.vue
|       |   |-- assets
|       |   |   `-- logo.png
|       |   |-- main.ts
|       |   |-- router.ts
|       |   |-- store.ts
|       |   |-- styles
|       |   |   |-- import.scss
|       |   |   `-- style.scss
|       |   `-- views
|       |-- tsconfig.json
|       |-- types.d.ts
|       `-- vue.config.js
|-- postcss.config.js
|-- shims-tsx.d.ts
|-- shims-vue.d.ts
|-- tsconfig.json
|-- types.d.ts
|-- vendor-server.js
|-- vue.config.js
|-- webpack.dll.config.js
`-- yarn.lock