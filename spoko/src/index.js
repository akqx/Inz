import App from './App';
import Bootstrap from 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import WebFont from 'webfontloader';
import './css/styles.css';
import './css/restpages.css';
import Calculator from "./Calculator";
import CaloriesTabels from "./CaloriesTabels";
import MenuBar from "./MenuBar";
import SignUp from "./SignUp";
import Login from "./Login";
WebFont.load({
  google: {
    families: ['Quicksand', 'Open Sans Condensed:300','Roboto Condensed','Roboto Slab']
  }
});


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/Kalkulatory" component={Calculator}/>
		<Route path="/Kalorycznosc" component={CaloriesTabels}/>
		<Route path="/Rejestracja" component={SignUp}/>
		<Route path="/Logowanie" component={Login}/>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
