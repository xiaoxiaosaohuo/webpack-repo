import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {makeRootReducer} from "./reducerFunc";

import createHistory from 'history/createHashHistory';
export  const history = createHistory()
const configureStore = preloadedState => {
  const store = createStore(
    makeRootReducer(),
    preloadedState,
     applyMiddleware(thunk)
  )

  store.reducers = {};
  return store
}

export default configureStore
