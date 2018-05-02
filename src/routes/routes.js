import React, { Component } from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from '../containers/App'

import Bundle from '../containers/bundle'

const routes = [
    {
        path: '/',
        exact: true,
        component: Bundle(() => import(
            /* webpackChunkName: "home" */
            '../containers/home')),
        isAuth: () => true,
    },
    {
        exact: true,
        path: '/myPage',
        component: Bundle(
            () => import(
                /* webpackChunkName: "myPage" */
                '../containers/myPage')
        ),
        isAuth: () => true
    },
    {
        path: '/unAuthenticated',
        isAuth: () => true,
        exact: true,
        component: Bundle(
            () => import(
                /* webpackChunkName: "unAuthenticated" */
                '../containers/unAuthenticated')
        )
    },
    {
        exact: true,
        path: '*',
        component: Bundle(
            () => import(
                /* webpackChunkName: "404" */
                '../containers/404')
        ),
        isAuth: () => true
    },
]

export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props => {
        return <route.component {...props} routes={route.routes} />
    }} />
)
class Routes extends Component {
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {

        return (
            <App >
                <Switch key="sss">
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </App>

        )
    }
}


export default Routes
