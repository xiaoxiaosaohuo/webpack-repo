import React,{PureComponent} from "react";
import Back from "../back";
import Breadcrumb from "./breadcrumb";
import Header from "./index";
import styles from "./style.css";
class HeaderB extends PureComponent{
    render(){
        const {bordered,items,restProps,onClickBack} = this.props;
        return(
            <Header bordered={bordered} className={styles.headerFlex} {...restProps}>
                <Back onClickBack={onClickBack} ></Back>
                <Breadcrumb items={items}></Breadcrumb>
            </Header>
        )
    }
}

export default HeaderB;
