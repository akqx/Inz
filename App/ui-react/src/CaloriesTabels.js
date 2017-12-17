import React from "react";
import { Link } from 'react-router';

export default class CaloriesTabels extends React.Component {

    render() {
        return ( 
<selection>
         <div>
            <div class="logo">KALORYCZNOŚĆ</div>
        </div>
        
        <div class="container">
            <div class="row">

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/DaniaGotowe" class="thumbnail">
                        <div>DANIA GOTOWE</div>
                        <img src={require("./pic/food/gotowe_danie.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Dorob" class="thumbnail">
                        <div>DRÓB</div>
                        <img src={require("./pic/food/drob.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/FastFood" class="thumbnail">
                        <div>FAST FOOD</div>
                        <img src={require("./pic/food/fasfood.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Grzyby" class="thumbnail">
                        <div>GRZYBY</div>
                        <img src={require("./pic/food/grzyby.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Miesa" class="thumbnail">
                        <div>MIĘSA</div>
                        <img src={require("./pic/food/mieso.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Nabial" class="thumbnail">
                        <div>NABIAŁ</div>
                        <img src={require("./pic/food/nabial.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Napoje" class="thumbnail">
                        <div>NAPOJE</div>
                        <img src={require("./pic/food/napoje.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Orzechy" class="thumbnail">
                        <div>ORZECHY</div>
                        <img src={require("./pic/food/orzechy.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Owoce" class="thumbnail">
                        <div>OWOCE</div>
                        <img src={require("./pic/food/owoce.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Przyprawy" class="thumbnail">
                        <div>PRZYPRAWY</div>
                        <img src={require("./pic/food/przyprawy.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Ryby" class="thumbnail">
                        <div>RYBY</div>
                        <img src={require("./pic/food/ryby.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Slodycze" class="thumbnail">
                        <div>SŁODYCZE</div>
                        <img src={require("./pic/food/slodycze.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Tluszcze" class="thumbnail">
                        <div>TŁUSZCZE</div>
                        <img src={require("./pic/food/tluszcze.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Warzywa" class="thumbnail">
                        <div>WARZYWA</div>
                        <img src={require("./pic/food/warzywa.jpg")}></img>
                    </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link to="/Zboza" class="thumbnail">
                        <div>ZBOŻA</div>
                        <img src={require("./pic/food/zboza.jpg")}></img>
                    </Link>
                </div>
            </div>
        </div>
    </selection>
        );
    }

}