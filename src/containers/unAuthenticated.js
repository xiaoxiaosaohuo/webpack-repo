import React ,{Component} from 'react';
import {Row,Col} from "antd"
import { Link } from 'react-router-dom';
class UnAuthenticated  extends Component{
  render(){
    return(

		<Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
	   	 <Col>
             <Row type="flex" justify="center" align="middle" >
                 <Col>
   		           <h2>对不起，您没有访问该页面权限，请联系管理员！</h2>

                  </Col>
            </Row>
            <Row type="flex" justify="center" align="middle" >
                <Col>
                  <h3><Link to="/"> 返回首页</Link></h3>

                 </Col>
           </Row>
	   	 </Col>

	    </Row>

    )
  }
}

export default UnAuthenticated;
