import React,{Component} from 'react';
import { Modal, Button } from 'antd';

class ErrorComponent extends Component{
    componentWillMount(){
        console.log("清理缓存")
        this.info();

    }
    info = ()=> {
        Modal.info({
            title: '友情提示',
            okText:"确定",
            content: (
                <div>
                    <p>页面开小差了！</p>
                    <p>请手动刷新页面（按F5或者CTL+F5）或者清理浏览器缓存</p>
                </div>
            ),
            onOk() {},
        });
    }
    render(){
        return null;
    }
}

export default ErrorComponent
