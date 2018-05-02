import React from 'react'

import { LocaleProvider,Layout, Menu, Icon,BackTop } from 'antd'
import DevTools from './DevTools'
// import {TransitionGroup,CSSTransition} from 'react-transition-group';
import "../styles/global.css"
import  "../styles/layout.css"
import TFZHeader from "./header"
const { SubMenu,Item } = Menu
const { Content, Sider } = Layout
import zhCN from 'antd/lib/locale-provider/zh_CN';



const TFZLayout  = (props)=>{

    // const {pathname} = props.location
    // 子路由不添加过渡效果

    // const keyName = pathname.split("/")
    // // console.log(keyName)
    // const isauth = keyName[1]=="settingAuth";
    //权限页面过渡卡顿临时解决方案
    return(
        <LocaleProvider locale={zhCN}>
            <Layout className="tfzLayout">
                <TFZHeader/>

                <Layout>
                    <Sider width={70} style={{ background: '#404040' }}>
                    </Sider>
                    <Layout style={{ background:"#fff" }} className= "scrollTarget">

                        <Content className="main-content" >
                            {props.children}
                        </Content>


                        <BackTop visibilityHeight ={30} target={()=>document.querySelector(".scrollTarget")}/>
                    </Layout>
                </Layout>


                   
            </Layout>
        </LocaleProvider>
    )
}

export default TFZLayout
