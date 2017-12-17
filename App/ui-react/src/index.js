import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import registerServiceWorker from './registerServiceWorker';
import './css/restpages.css';
import './css/styles.css';


ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
registerServiceWorker();


