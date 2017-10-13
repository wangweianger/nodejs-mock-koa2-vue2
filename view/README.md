# vue组件化开发-示例  vue2.0

>  * 使用知识点：
>  * vue.js           轻量级mvvm框架
>  * webpack          前端自动话打包工具
>  * vue-router       vue路由
>  * vue-loader       vue组件化开发插件
>  * vuex             前端状态管理 类式于flux 和 radux
>  * babel            es6转译工具，用最前言的javascript做前端开发


## 目录结构

```
- vue-loader/
  + package.json //npm配置文件
  + index.html //入口html
  - node_modules //npm加载的模块
  - build //webpack 配置文件
    + webpack.base.config.js //基本配置
    + webpack.dev.config.js //开发环境
    + webpack.product.config.js //生产环境
  - src //开发资源目录
    - assets //一些资源
      + css  
      + js
      + img
    - components //vue组件
      + home.vue 
      + index.vue
      + user.vue
      + userDetails.vue
  -vuex  //状态等管理
    -actions  
      +indexActions.js
      ...
    -modles
      +indexModles.js
      ...
    +getters.js
    +mutation-types.js
    +store.js
    + app.vue //布局文件
    + main.js  //入口文件
    + filter.js //vue的过滤器
    + router.js //vue路由插件

```

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
```

3.运行开发环境

```
npm run dev 
```

```
浏览器中访问：localhost:8000
```


4.打包生产文件

```
npm run build
``` 

##大致说明

```
webpack : 前端模块化打包工具
vue.js  : vue.js  清量级的mvvm的框架
babel   : 项目使用babel编译 可用最新的es6编写我们的javascript （当然用es5写也是一样的）
vue-loader ：模块化的开发vue插件
vue-router ：vue的路由插件
vuex  :  一个专门为 Vue.js 应用设计的状态管理架构
```





### 本地自动上传代码说明

**------------------- **webpack 方式 集成环境发布配置   以后台cms为例子** -----------------------------**
### 1.安装本地依赖  
  http-push-webpack-plugin    
  underscore
  cross-env


### 2.webpack.product.config.js  新增http-push代码 代码如下

```
var HttpPushWebpackPlugin = require('http-push-webpack-plugin');  //http-push

// webpack http-push 上传
if(process.env.HTTP_PUSH === 'http-push' ){
    config.plugins = (config.plugins || []).concat([
        new HttpPushWebpackPlugin({
            receiver: 'http://xxx.com/receiver', // 服务端文件上传接口
            token: 'webpack', // 验证token
            to: '../../html/wangwei', // 注意这个是指的是测试机器的路径，而非本地机器
        }),
    ])
};

```
### 3.新增package.json  script运行脚本 脚本如下：

```
"http-push": "cross-env HTTP_PUSH=http-push webpack -p --progress --hide-modules --colors --config build/webpack.product.config.js",

```
/*------------------------------------------------------------------------------------------*/




**------------------- **FIS3方式 集成环境发布配置   以后台cms为例子** -----------------------------**
### 1.开发根目录（package.js同级目录新增文件） fis-conf.js


### 2.项目安装依赖：
 
    "fis3" , //全局安装  
    "fis3-deploy-http-push": "^2.0.6"  //项目依赖安装


### 3.配置package.js  新增启动项   “dist":"fis3 release dist"


### 4.配置fis-confi.js  代码如下：

```
fis.media('qa').match('dist/test/**', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://xxx.com/receiver',
    to: '../../html/wangwei', // 注意这个是指的是测试机器的路径，而非本地机器
    data: {
      base: 'dist/test'
    }
  })
});

```
 **演示图文：** 
![输入图片说明](http://git.oschina.net/uploads/images/2017/0320/172324_5885af35_818875.png "在这里输入图片标题")

/*------------------------------------------------------------------------------------------*/


