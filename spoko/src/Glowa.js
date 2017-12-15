import React from "react";

export default class Glowa extends React.Component {
handleChange(e){
	const title=e.target.value;
	this.props.change(title);
}

    render() {
        return ( 
        <div>{this.props.spoko}
        <input onChange={this.handleChange.bind(this)}/>
        </div>
        );
    }
}