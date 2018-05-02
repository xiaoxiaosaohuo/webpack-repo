import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
// import im from '../components/im/modules/reducers';

import {store} from '../routes/Root';

const initialState = {
    location: null,
    history:{
        pathname:'',
        search:'',
    }
} 
const routerReducer = (state = initialState, { type, payload } = {})=> {
    if (type === LOCATION_CHANGE) {
        const prevLocation = state.location;
        return Object.assign({}, state, { location: payload, history:  {...state.history,...prevLocation} });
    }
    return state;
}
export const makeRootReducer = (reducers) =>{
    return combineReducers({
        routing: routerReducer,
        ...reducers
    })
}

export function injectReducer(name,reducers) {
  store.reducers[name] = reducers;
  //可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
  store.replaceReducer(makeRootReducer(store.reducers));
}
