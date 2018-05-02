
import React from 'react';
import classnames from 'classnames/bind';
import styles from "./style.css";
const cx = classnames.bind(styles);
class Header extends React.Component {
  constructor (props) {
    super(props);

  }
  render () {
      const { className, children,bordered, ...others } = this.props;
      const hasBorder = bordered?true:false
      const divClass = cx(className,"header",{bordered:hasBorder});
    return (
      <div  className={divClass} {...others}>
          {children}
      </div>
    )
  }
}
//标题
const PageTitle = ({title})=>{
    return (
        <h2 >{title}</h2>
    )
}
PageTitle.defaultProps={
    title:"页面标题"
}
Header.PageTitle = PageTitle;



export default Header;
