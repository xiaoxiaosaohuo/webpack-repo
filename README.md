# mis-new项目结构及简介
## 需求配置
* node `^8.0.0`
* npm `^5.0.0`

## 开始


```bash
$ git clone http://git.hualala.com/inward/mis-web-react.git
$ cd mis-web-react
$ npm install                   # 安装依赖
$ npm start                     # 运行
```


npm 命令详解

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|服务启动在3000端口，代码热替换开启。|
|`compile`|编译程序到dist目录下（默认目录~/dist）。|
|`dev`|与`npm start`相同, 但是启动nodemon守护进程。|
|`dev:no-debug`|与`npm run dev` 但是禁用devtool（开发工具）。|
|`test`|开启Karma测试并生成覆盖率报告。|
|`test:dev`|开启Karma测试并监听改变随时重新测试，但是生成覆盖率报告。|
|`deploy`|启动代码检查，测试，如果成功，编译到dist目录下。|
|`deploy:dev`|与`deploy`相同，但是`NODE_ENV`值为"development"。|
|`deploy:prod`|与`deploy`相同，但是`NODE_ENV`值为"production"。|
|`lint`|检查所有.js文件是否规范。|
|`lint:fix`|检查所有.js文件是否规范并修复它们。 |

## 项目目录


```
.
├── bin                      # 启动脚本
├── build                    # 所有打包配置项
│   └── webpack              # webpack的指定环境配置文件
├── config                   # 项目配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 布局UI组件
│   ├── containers           # 全局容器组件
│   ├── feature              # 功能模块
│   ├── static               # 静态文件(不要到处imported源文件)
│   ├── styles               # 程序样式
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── rootReducers.js      # 根reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── route.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
└── tests                    # 单元测试
```

## 样式

所有的css都支持会被预处理。只要被引入，都会经过[PostCSS](https://github.com/postcss/postcss)压缩，加前缀。在生产环境下会提取到一个css文件下。

由于使用antd 框架，改变原有样式，需要覆盖其样式，需要在class优先级上高于已有的。另外在本项目中，各功能模块的样式使用css-module,需要覆盖的css,global.css中修改。



##feautre文件夹下，按照功能组织，
1. components是UI组件，
2. container是容器组件，
3. module中是action actionCreators,reducers.


## 更新日志：
于2017年2月17日升级到webpack2
2017年9月升级到react-router v4,
优化打包体积

# 注意
如果git pull 下来后，package.json文件发生了修改，最好npm install一下。可能安装了新的依赖或者跟新了依赖。

# 公共组件简单介绍
# 异步加载(asyncComponent)
## usage

```
    Loadable({
      loader: () => import(
            /* webpackChunkName: "home" */
            '../containers/home'),
      reducerLoader:reducerLoader,
      delay:300
    })
    以上注释部分是webpack打包后的chunkname
    reducerLoader 异步加载reducer，
    delay 延迟时间

```

# 图像上传
## API

属性 | 描述 |默认值
---|---|---
url | 初始默认值，string| 无
maxNum | 最大数量 | 0 无限制
maxSize | 文件的最大大小 M |5M
onChange | 回调 ,(参数，file，fileList)
fileExt | 文件后缀 array |['image/jpeg', 'image/jpg', 'image/png']
tips | 上传文字提示 |上传照片
action | 上传路径| '/file/upload'



## usage
```
import ImgUpload from "../../../components/upload/imgUpload";
<ImgUpload
    url={url}
    onChange = {onImgChange}
    tips="上传图像"
    max={1}

    >
</ImgUpload>

onImgChange  = ({file,fileList}) =>{

    //callback()

}
```


# 文件上传
参考图像上传，差不多
# 拖拽
详情看components下draggable-resizble的readme
# 头部
详情看components下header的readme
# 返回
返回按钮带标题，点击返回自动返回上一页
HeaderB自带返回
# 悬浮窗
详情查看合同审核的审核页面悬浮窗
## API

属性 | 描述
---|---
title | 标题
footer | 页脚
modalWidth |宽度
top |按钮距离顶部距离
right |按钮距离右边距离
modalTop | 窗体距离顶部距离
modalRight | 窗体距离顶部距离



# item
用于详情页各字段的布局
详情查看item组件的readme
# 打印(print)
给需要打印的div或者其他标签加class  'print-content'
打印样式，自己到组件中添加
# 表格导出(tableExport)

参见tableExport组件readme
# tablink
路由tab页的导航标签

属性 | 描述 |默认值
---|--- | ---
links | 导航链接 array| 无
num | 徽标数字提示 | wu


```
const links = [
    {
        path:"/expense",
        isActive:true, //默认路由
        title:"待认领",
    },
    {
        path:"/expense/waitingCheckTable",
        isBadge:true, //显示徽标
        title:"待审核",
    },
    ]
```




# 标题（title)
用于详情页标题的布局,头部大标题
详情查看title组件的readme
# 滚动通知


## usage

```
import ScrollNotice from "../components/scrollNotice";
const data = [{
  'name': '公告',
  'content': '双十一开始啦！',
  'link': 'https://www.tmall.com/',
}, {
  'name': '公告',
  'content': '双十一结束啦！',
}, {
  'name': '公告',
  'content': '双十二开始啦！',
  'link': 'https://www.koubei.com/',
}, {
  'name': '公告',
  'content': '双十二结束啦！',
}];

<ScrollNotice dataSource={data}  duration={3} />
```
## 参数
- dataSource 数据源 array 具体格式见例子
- closable 布尔值
- onClose 关闭回调
- speed 速度 数值
- vertical 是否垂直滚动
- duration 持续时间
- style
- className

# 照片查看器

详见photoViewer

# 可编辑输入框
## usage
```
import EditInput from "../components/editable/enhancedInput";

<EditInput
    check  = {this.validate}
    value={10}
    >

</EditInput>

```
参数
- check 验证函数，返回布尔值
- value 初始值
- placeholder
- type input类型 "text,textarea,number"
- step 步长
- min 最小值
- max 最大值
- format 格式化函数
- onKeyDown
- spellCheck 布尔值
- required 布尔值
- disabled 布尔值
- onMount 挂载回调
- onChange 改变回调
- onBlur 失焦回调
- style 样式

# pureCom(防止重复渲染组件)
只针对父级组件属性或状态变化，防止子组件没有必要的重复渲染
```
const TableList = pureCom({WrappedComponent:ClaimTableList})
```
