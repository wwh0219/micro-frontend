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



