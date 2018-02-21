import React from 'react';
import {Router ,Route , browserHistory} from 'react-router'

import AddTopic from './Forum/AddTopic';
import AddRecipe from './Recipes/AddRecipe';
import AuthComponent from './Auth/AuthComponent.js';
import BMI from './Calculator/BMImain';
import Calculator from "./Calculator/Calculator";
import CaloriesList from "./Calories/CaloriesList";
import CaloriesTabels from "./Calories/CaloriesTabels";
import EditNote from './Forum/EditNote';
import EditComment from './Forum/EditComment'
import EditProduct from './Calories/EditProduct'
import Energy from './Calculator/Energymain';
import ForgotPassword from './Login/ForgotPassword';
import Forum from "./Forum/Forum";
import ForumNote from "./Forum/ForumNote";
import Login from "./Login/Login";
import MainPage from "./Main/MainPage";
import MenuBar from "./Main/MenuBar";
import Note from "./Forum/Note";
import Recipes from './Recipes/Recipes';
import RecipeInfo from './Recipes/RecipeInfo';
import RecipeCategory from './Recipes/RecipeCategory'
import RecipeNumber from './Recipes/RecipeNumber'
import SignUp from "./SignUp/SignUp";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Quicksand', 'Open Sans Condensed:300','Roboto Condensed','Roboto Slab']
  }
});
class Routes extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    	pathnameCalories:''
    }
    };

  render() {
  	browserHistory.getCurrentLocation();
  	const location = browserHistory.getCurrentLocation();
  	if(location.pathname.split('/').slice(-2)[0]==='kalorycznosc'){
      this.setState({pathnameCalories: location.pathname.split('/').slice(-1)[0]})
  			
  	}

    return (
		<Router history={browserHistory}>
			<Route component={MenuBar}>
			  <Route path="/" component={MainPage}/>
        <Route path="/dodajtemat" component={AuthComponent(AddTopic)}/>  
        <Route path="/edycja/temat/:id"  component={EditNote}/> 
        <Route path="/edycja/komentarz/:id"  component={EditComment}/> 
        <Route path="/edycja/produkt/:id"  component={EditProduct}/> 
        <Route path="/forum" component={Forum}/>  
        <Route path="/kalkulatory" component={Calculator}/>
        <Route path="/kalkulatory/BMI" component={BMI}/>
        <Route path="/kalorycznosc" component={CaloriesTabels}/>
        <Route path="/kalorycznosc/:id"  component={CaloriesList}/>
        <Route path="/kalkulatory/zapotrzebowania" component={Energy}/>
        <Route path="/logowanie" component={Login}/>
        <Route path="/logowanie/przypomnij" component={ForgotPassword}/>       
        <Route path="/przepisy" component={Recipes}/>
        <Route path="/przepisy/dodajprzepis" component={AuthComponent(AddRecipe)}/>
        <Route path="/przepisy/:id" component={RecipeCategory}/>
        <Route path="/przepisy/info/:id" component={RecipeInfo}/>
        <Route path="/przepis/nr/:id" component={RecipeNumber}/>
        <Route path="/rejestracja" component={SignUp}/>
        <Route path="/temat/:id"  component={Note}/> 

      <Route component={Forum}>
        <Route path="/forum"  component={ForumNote}/> 
            </Route>

        </Route>
	    </Router>
    );
  }
}

export default Routes;