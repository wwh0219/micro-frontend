# 基于Vue的前端微服务系统项目
## 启动
```shell
yarn install 
yarn serve:dll # 启动存放dll静态文件资源的服务器
cd ./packages/root
yarn run serve # 启动入口系统
cd ./packages/sub-tempate 
yarn run serve # 启动子系统
```