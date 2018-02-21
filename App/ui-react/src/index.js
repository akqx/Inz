import React from 'react';
import {render} from 'react-dom';
import Routes from './Routes';
import { browserHistory} from 'react-router'
import './css/restpages.css';
import './css/styles.css';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers/rootReducer'
import setAuth from './Auth/setAuth.js'
import { setCurrentUser } from './Login/loginActions.js';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.token){
setAuth(localStorage.token);
store.dispatch(setCurrentUser(localStorage.token));
}


render(
<Provider store={store}>
	<Routes history={browserHistory}/>
</Provider>, document.getElementById('root'));



