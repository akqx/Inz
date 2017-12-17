import React from "react";

export default class Slider extends React.Component {
    render() {
        return ( 
             <carousel>
                <div id="slider" class="carousel slide con">
                    <ol class="carousel-indicators">
                        <li data-target="#slider" data-slide-to="0" class="active"></li>
                        <li data-target="#slider" data-slide-to="1"></li>
                        <li data-target="#slider" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src={require("./pic/1.jpg")} alt=""></img>
                            <div class="carousel-caption">
                                <h3>Kurczak zapiekany w sosie własnym</h3>
                            </div>
                        </div>
                        <div class="item">
                            <img src={require("./pic/2.jpeg")} alt=""></img>
                            <div class="carousel-caption">
                                <h3>Pizza margerita</h3>
                            </div>
                        </div>
                        <div class="item">
                            <img src={require("./pic/3.jpeg")} alt=""></img>
                            <div class="carousel-caption">
                                <h3>To jest opis</h3>
                            </div>
                        </div>
                    </div>
                    <a class="left carousel-control" href="#slider" data-slide="prev">
                         <span class="icon-prev"></span>
                     </a>
                    <a class="right carousel-control" href="#slider" data-slide="next">
                         <span class="icon-next"></span>
                    </a>
                </div>
            </carousel>
        );
    }
}