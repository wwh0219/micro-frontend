# 基于Vue的微前端方案

## 启动
```shell
yarn install 
cd ./packages/root
yarn run serve # 启动入口系统
cd ./packages/sub-tempate 
yarn run serve # 启动子系统
```

## 目录结构
```
.                      
`-- packages           
    |-- root        	//入口系统         
    |   |-- public     
    |   `-- src        
    |       |-- api    
    |       |-- assets 
    |       `-- styles 
    |-- shared          //公用代码
    |   |-- assets     
    |   |-- components 
    |   |-- store      
    |   |-- styles     
    |   |   |-- compone
    |   |   `-- mixins 
    |   `-- utils      
    `-- sub-tempate     //子系统模板
        |-- public     
        `-- src        
            |-- assets 
            `-- styles 
```



## 启动逻辑：

### 从入口项目启动时(root)

 1. 在root/main.ts中调用,registerStoreModule方法给入口系统的store动态注册一个shared模块
 2. 入口系统渲染App.vue,在created钩子中加载子系统的项目列表，这里使用dev-subsysmt-map.js作为开发环境下的模拟数据（生产环境需要在子系统生成manifest.json时将其中的数据提交到服务端更新）
 3. watch this.$route.params.appAlias的变化，发生变化时，获取子系统的manifest.json文件（本地开发环境下配置在vue.config.js webpack-dev-server的配置中，开发环境需要根据打包生成的文件生成json并部署到服务器），再根据文件中的资源，添加相应的标签到页面中以加载资源
 4. 子系统资源加载完成后便会开始运行，首先执行registerSubSystem注册，获取暴露在window下的入口系统实例，将生成子系统实例的方法存进入口系统store，同时父子组件互相订阅mutation更新，同步store.state.shared下的状态
 5. 回到入口系统App.vue中，加载注册子系统完成后便调用createApp方法生成实例，同时销毁上一个实例，到这里子系统注册挂载完成。

### 独立启动时
 1. sub-tempate/src/main.ts中执行registerSubSystem方法,在store中注入公用的shared模块，当判断运行时没有window.ROOT_VM存在时，直接实例化并挂载到dom上

