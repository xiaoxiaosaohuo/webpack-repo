import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import DevTools from '../containers/DevTools'

import {makeRootReducer} from "./reducerFunc";
import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'

export  const history = createHistory()
const routingMiddleware = routerMiddleware(history)

const configureStore = preloadedState => {
  const store = createStore(
    makeRootReducer(),
    preloadedState,
    compose(
      applyMiddleware(thunk,routingMiddleware,logger),
      DevTools.instrument()
    )
  )

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./rootReducer', () => {
  //     const nextRootReducer = require('./rootReducer').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }
  store.reducers = {};
  return store
}

export default configureStore
