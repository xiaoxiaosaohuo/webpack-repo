import React,{PureComponent} from "react";
import Header from "./index";
const {PageTitle} = Header;
class HeaderA extends PureComponent{
    render(){
        const {title,bordered,...restProps} = this.props;
        return(
            <Header bordered={bordered} {...restProps} >

                <PageTitle title={title}></PageTitle>
            </Header>
        )
    }
}

export default HeaderA;
