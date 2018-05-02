# header组件


属性 |  描述 | 默认值
---|--- | ---
className | class类名 | ""
bordered | 底边框 | false


## PageTitle

属性 |  描述 | 默认值
---|--- | ---
title | 标题 | "页面标题"

## Breadcrumb

属性 |  描述 | 默认值
---|--- | ---
items | 面包屑数据 | []
separator | 分隔符 | ">"

## HeaderA  只有标题

属性 |  描述 | 默认值
---|--- | ---
title | 标题 | "页面标题"
bordered | 底边框 | false

## HeaderB 带面包屑和返回

属性 |  描述 | 默认值
---|--- | ---
items | 面包屑数据 | []
bordered | 底边框 | false


> items

```
const items = [
    {
        to:"",//路由
        title:"合同详情"
    }
]
```
