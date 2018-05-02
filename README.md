

## start


```bash
$ git clone https://github.com/jinxin479/webpack-repo.git
$ cd webpack-repo
$ npm install                   # 安装依赖
$ npm start                     # 运行
```
the routes config in **routes.js**
```
const routes = [
    {
        path: '/',
        exact: true,
        component: Bundle(() => import(
            /* webpackChunkName: "home" */
            '../containers/home')),
        isAuth: () => true,
    },
    //you can  uncomment   the following  code 
    <!--{-->
    <!--    exact: true,-->
    <!--    path: '/myPage',-->
    <!--    component: Bundle(-->
    <!--        () => import(-->
    <!--            /* webpackChunkName: "myPage" */-->
    <!--            '../containers/myPage')-->
    <!--    ),-->
    <!--    isAuth: () => true-->
    <!--},-->
    {
        path: '/unAuthenticated',
        isAuth: () => true,
        exact: true,
        component: Bundle(
            () => import(
                /* webpackChunkName: "unAuthenticated" */
                '../containers/unAuthenticated')
        )
    },
    {
        exact: true,
        path: '*',
        component: Bundle(
            () => import(
                /* webpackChunkName: "404" */
                '../containers/404')
        ),
        isAuth: () => true
    },
]

```

1.the first time you run 
```
npm run deploy:prod

````
2. after step 1 finised ,please uncomment  the codes in routes.js 
3. then run  
```
npm run deploy:prod
```

4. see the name of chunks.you will find many chunks's name has changed,compared with the results in step 1.


I think this a not correct!