import React from "react";
import Glowa from "./Glowa";

export default class Proba extends React.Component {
constructor(){
super();
this.state={
    title:"Welcome",
      };
}

change(title){
    this.setState({title});
}
    render() {
        return ( 
     <div>
        <p>DUPA</p>
        <p>DUPA</p>
        <p>DUPA</p>
        <p>DUPA</p>
        <Glowa spoko="kupa" change={this.change.bind(this)} title={this.state.title}/>
     </div>
        );
    }
}