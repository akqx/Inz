import React from "react";

export default class CaloriesList extends React.Component {

state={ food:[] }
  componentDidMount() {
    return fetch('/ingredient/type/Napoje')
      .then(res => res.json())
      .then(food=> this.setState({food}));
  }
    render() {
        return (
            <selection>
                   <div class="container">
                     <div class="logo"><span class="glyphicon glyphicon-cutlery"></span> Napojediv>
                         <div class="container">
                            <div class="row">
                            <p class="cal_list col-lg-4 col-md-4 col-sm-4">NAZWA PRODUKTU:</p> 
                            <p class="cal_list1 col-lg-2 col-md-2 col-sm-2">KALORIE:</p> 
                            <p class="cal_list2 col-lg-2 col-md-2 col-sm-2">BIAŁKO(g)</p> 
                            <p class="cal_list3 col-lg-2 col-md-2 col-sm-2">TŁUSZCZ(g)</p>
                            <p class="cal_list4 col-lg-2 col-md-2 col-sm-2">WĘGLOWODANY(g)</p> 
                            </div>
                               {this.state.food.map(user=>
                            <div class="row">
                            <p class="cal_list col-lg-4 col-md-4 col-sm-4">{user.name}</p> 
                            <p class="cal_list1 col-lg-2 col-md-2 col-sm-2">{user.calories}</p> 
                            <p class="cal_list2 col-lg-2 col-md-2 col-sm-2">{user.protein}</p> 
                            <p class="cal_list3 col-lg-2 col-md-2 col-sm-2">{user.fat}</p>
                            <p class="cal_list4 col-lg-2 col-md-2 col-sm-2">{user.carb}</p>
                            </div>
                              )}
                          </div>
                  </div>
                  </div>
            </selection>
          );
    }
}