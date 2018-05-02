import React ,{PureComponent} from "react";
import { connect } from 'react-redux';
import { notification } from 'antd';
import { withRouter } from 'react-router';
import classnames from 'classnames/bind';
import  styles from "../components/style.css"
let cn = classnames.bind(styles);

 const fetchTips = (url,query) =>{
    return fetch(url,{
        method:'POST',
        mode: 'cors',
        credentials: 'include',
        headers:{
            "Content-Type":'application/json',
            "X-Requested-With":"XMLHttpRequest"
        },
        body:JSON.stringify(query)
    }).then(response =>{
        return response.json();
    })
}
 const restfulFetchTips = (url,query) =>{
    let queryUrl = url ;
    for(let i in query){
        if(i!="query"){
            queryUrl+="/"+query[i]
        }else{
            queryUrl+="?"+query[i]
        }
    }
    return fetch(queryUrl,{
        method:'POST',
        mode: 'cors',
        credentials: 'include',
        headers:{
            "Content-Type":'application/json',
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(response =>{
        return response.json();
    })
}


const checkAuth = (data, rightCode) => {
    if(data){
        const hasAuth = data.some(item => {
            return item === rightCode
        })
        return hasAuth;
    }else{
        return false
    }
}

class Tip extends PureComponent {
    state={
        active:false
    }
    onMouseOver = () =>{
        this.setState(prevState => ({
        active: !prevState.active
    }));
    }
    onMouseEnter = () =>{
        this.setState({
            active: true
        });
    }
    onMouseLeave = () =>{
        this.setState({
            active: false
        });
    }
    handleClick = ()=>{
        const {linkTo} = this.props.data;
        this.props.history.push(linkTo);
        this.props.handleFilter(linkTo)
    }
    render(){
        const {active} = this.state;
        const {data} = this.props;
        return(
            <li onClick={this.handleClick} onMouseEnter = {this.onMouseEnter} onMouseLeave = {this.onMouseLeave} className={cn({[`${styles.active}`]:active})} >

                    <p className={styles.tipsFlex}><span className={styles.tipsTitle}>{data.title}</span><span className={styles.tipsTitle2}><span className={styles.tipsColor}>{`${data.len}条`}</span>待处理</span></p>

            </li>
        )
    }
}


class Content extends PureComponent{
    constructor(props){
        super(props);
    }
    state = {
        data:this.props.data
    }
    handleFilter = (linked)=>{

        this.setState(prevState =>({
            data:prevState.data.filter((item,index)=>{
                return item.linkTo!=linked
            })
        }))
    }
    componentDidUpdate(){
        //消息点击完之后就关闭弹窗
        const {data} = this.state
        if(data.length<=0){
            notification.destroy()
        }


    }

    render(){
        const {data} = this.state;
        const {history} = this.props;
        return(
            <div className={styles.borderTop}>
                <ul>
                    {
                    data.map((item,index)=>{
                        return <Tip data = {item} key={index} handleFilter = {this.handleFilter} history={history}></Tip>
                    })
                    }
                </ul>
            </div>

        )
    }
}


class BottomTips extends PureComponent{
    componentWillReceiveProps(nextProps){
        //轮询获取信息然后弹窗
        //判断权限

        const {authData} = nextProps;
        const aa = [
            {
                title:"商户审核",
                type:0,
                linkTo:"/checkMerchant/waitingCheckTable",
                url:"/basic/check/checkShopAccount/myTaskList",
                query:{empID:localStorage.getItem("empID"),pageSize:1,pageNum:1,taskType:2},
                authority:checkAuth(authData,"partner_management.yemianquanxian.shopCheck.page")
            },
            {
                title:"合同审核",
                type:1,
                linkTo:"/settingContract/waitingCheckTable",
                url:"sales/order/queryProductTransferOrderMaster",
                query:{taskType:"2",pageNo:1,pageSize:1},
                authority:checkAuth(authData,"sale.yemianquanxian.contract.check")
            },
            {
                title:"收款审核",
                type:1,
                linkTo:"/receipt/waitingCheck",
                url:"sales/order/queryProductTransferOrderPayDetail",
                query:{taskType:"2",pageNo:1,pageSize:1},
                authority:checkAuth(authData,"finance.yemianquanxian.collectCheck.page")
            },
            {
                title:"开票审核",
                type:1,
                linkTo:"/invoice/waitingInvoices",
                url:"sales/order/queryProductTransferOrderInvoice",
                query:{taskType:"2",pageNo:1,pageSize:1},
                authority:checkAuth(authData,"finance.yemianquanxian.createInvoice.page")

            },
            {
                title:"开票失败",
                type:1,
                linkTo:"/invoice/checkList",
                url:"sales/order/queryProductTransferOrderInvoice",
                query:{taskType:"0",pageNo:1,pageSize:1,invoiceOpenStatus:"3"},
                authority:checkAuth(authData,"finance.kaipiaoshenhe.queryInvoiceFailBottomBox")

            },
            {
                title:"退款失败",
                type:1,
                linkTo:"/refundsCheck/checkedList",
                url:"sales/order/queryProductTransferOrderPayDetailForRefund",
                query:{taskType:"0",pageNo:1,pageSize:1,payStatus:"6"},
                authority:checkAuth(authData,"finance.tuikuanshenhe.query")

            },
            // {
            //     title:"发票作废失败",
            //     type:1,
            //     linkTo:"/refundsCheck/checkedList",
            //     url:"sales/order/queryProductTransferOrderPayDetailForRefund",
            //     query:{taskType:"0",pageNo:1,pageSize:1,openInvoceStatus:"6"},
            //     authority:checkAuth(authData,"finance.tuikuanshenhe.query")
            //
            // }
        ]
        async function resolveAfterGetAllTips() {

            const fetchArray = aa.filter(item =>{
                return item.authority
            })
            const resultArray = fetchArray.map(item =>{
                if(item.type=="0"){
                    return restfulFetchTips(item.url,item.query)
                }else{
                    return fetchTips (item.url,item.query)
                }
            })

            let b = await Promise.all(resultArray)
            let c = b.map((item,index)=>{
                return {
                    title:fetchArray[index]["title"],
                    linkTo:fetchArray[index]["linkTo"],
                    len:item.totalSize||0
                }
            })
            return c
        }
        // 进入系统时请求
        setTimeout(()=>{
            resolveAfterGetAllTips(10).then(v => {
                let data = v.filter((item,index)=>{
                    return item.len!=0
                })
                notification.destroy()
                if(data.length>0){
                    notification.open({
                        placement:"bottomRight",
                        duration:null,
                        message: '提示',
                        description: <Content data={data} history={this.props.history}></Content>
                  });
                }

            });
        },15000)

        setInterval(()=>{
            resolveAfterGetAllTips(10).then(v => {
                let data = v.filter((item,index)=>{
                    return item.len!=0
                })
                notification.destroy()
                if(data.length>0){
                    notification.open({
                        placement:"bottomRight",
                        duration:null,
                        message: '提示',
                        description: <Content data={data} history={this.props.history}></Content>
                  });
                }

            });

        },600000)


    }
    render() {
      return null;
    }
}


const mapStateToProps = state => ({
	 authData:state.user.empAuthData.btnRights,
})

export default withRouter(connect(mapStateToProps, null)(BottomTips))
