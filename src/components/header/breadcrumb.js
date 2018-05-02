import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom';
import styles from "./style.css";

const renderItem =  (items,separator)=>{
    const len = items.length;
    return(
        Array.isArray(items)&&items.map((item,index)=>{
            return <span key={index}>
                {index<len-1&&<Link to={item.to}>{item.title}</Link>}
                {index===len-1&&<a className={styles.title}>{item.title}</a>}
                <span className={styles.misBreadseparator}>
                    {separator}
                </span>
            </span>
        })
    )
}
class Breadcrumb extends PureComponent{
    render(){
        const {items,separator}= this.props;
        return (
            <div className={styles.misBread}>
                {renderItem(items,separator)}
            </div>
        )
    }
}
Breadcrumb.defaultProps={
    separator:">",
    items:[]
}
export default Breadcrumb;
