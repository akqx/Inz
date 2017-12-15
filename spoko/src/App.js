import React, { Component } from 'react';
import MenuBar from "./MenuBar";
import Slider from "./Slider";
import CaloriesTabels from "./CaloriesTabels";
import Calculator from "./Calculator";
import Proba from "./Proba";
import SignUp from "./SignUp";
import Login from "./Login";
import jquery from 'jquery';
import $ from 'jquery';


class App extends Component {
  render() {
    return (
      <div className="App">
     <MenuBar/>
     <Login/>
     </div>
    );
  }
}

export default App;
