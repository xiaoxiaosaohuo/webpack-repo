import React,{PureComponent,Component} from 'react';
import { Row, Col, Tooltip,message} from "antd";

class MyPage extends PureComponent{
    constructor(props){
        super(props);
        
    }
    componentWillMount(){
        console.log("MyPage(willmount)")
    }
    componentDidMount(){
        // sessionStorage.setItem('removeAuth', '哈哈');
        console.log("MyPage(DIDmount)")
    }
   
    
    render(){

        const text = <span>prompt text</span>;

        return(

            <div style={{height:4000,textAlign:"center"}}>

                <Tooltip placement="top" title={text} arrowPointAtCenter={true}>
				  <a >点我</a>
			  </Tooltip>
            </div>



        )
    }
}

export default MyPage;
