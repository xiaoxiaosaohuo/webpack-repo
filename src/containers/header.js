import React, { Component } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { is, fromJS } from "immutable"


const { Header } = Layout
class TFZHeader extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user: {
                empname: "游客",
                emmid: "0000"
            },
            showIM: false
        })

    }
    
    componentDidMount() {

        
    }

    componentWillReceiveProps(nextProps) {
        


    }
    

    render() {
        return (
            <Header className="tfzheader">
               <div>手误</div>
            </Header>
        )
    }
}



export default TFZHeader
