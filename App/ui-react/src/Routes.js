import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './App';
import Bootstrap from 'bootstrap';
import Calculator from "./Calculator";
import CaloriesTabels from "./CaloriesTabels";
import Login from "./Login";
import SignUp from "./SignUp";
import MenuBar from "./MenuBar";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Quicksand', 'Open Sans Condensed:300','Roboto Condensed','Roboto Slab']
  }
});

const Routes = props => (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/Kalkulatory" component={Calculator}/>
		<Route path="/Kalorycznosc" component={CaloriesTabels}/>
		<Route path="/Rejestracja" component={SignUp}/>
		<Route path="/Logowanie" component={Login}/>
	</Router>
);

export default Routes;