import React, {Component}from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter} from 'react-router-redux'
import Routes from './routes';
import configureStore,{history} from '../stores/configureStore';
import { hot } from 'react-hot-loader'
export const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} >
              <Routes ></Routes>
        </ConnectedRouter>
      </Provider>
    );
  }
}
if (process.env.NODE_ENV !== 'production') {
  Root = hot(module)(Root);
}
export default Root;