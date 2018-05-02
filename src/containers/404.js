import React ,{Component} from 'react';
import {Row,Col} from "antd"
class  NotFound  extends Component{
    componentWillMount(){

    }
  render(){
    return(

		<Row type="flex" justify="center" align="middle" className="notfound">
	   	 <Col  >
	   		<h3>苦海无边，回头是岸，善哉！</h3>
	   	 </Col>
	    </Row>

    )
  }
}

export default  NotFound;
