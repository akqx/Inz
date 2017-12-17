import Calculator from "./Calculator";
import CaloriesTabels from "./CaloriesTabels";
import CaloriesList from "./CaloriesList";
import jquery from 'jquery';
import Login from "./Login";
import MenuBar from "./MenuBar";
import Slider from "./Slider";
import SignUp from "./SignUp";
import React, { Component } from 'react';
import Routes from './Routes';
import $ from 'jquery';

class App extends Component {
  
  render() {
    return (
      <div className="App">
       <MenuBar/>
       <SignUp/>
      </div>
    );
  }
}

export default App;
