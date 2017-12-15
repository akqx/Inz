import React from "react";
import { Link } from 'react-router';

export default class MenuBar extends React.Component {
    render() {
        return ( 
         <header class="padding">
         <div class="navbar navbar-color navbar-fixed-top">
            <div class="container header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="collapse navbar-collapse navHeaderCollapse">
                    <ul class="nav navbar-nav navbar-left ">
                        <li class="dropdown ">
                            <Link to="Przepisy">Przepisy</Link>
                            <ul class="dropdown-menu">
                                <li><Link to="/DaniaGlowne">Dania Główne</Link></li>
                                <li><Link to="/PrzystawkIPrzekaski">Przystawki i przekąski</Link></li>
                                <li><Link to="/Zupy">Zupy</Link></li>
                                <li><Link to="/Salatki">Sałatki</Link></li>
                                <li><Link to="/Napoje">Napoje</Link></li>
                                <li><Link to="/Deseryiciasta">Desery i ciasta</Link></li>
                                <li><Link to="/Przetwory">Przetwory</Link></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <Link to="/Kalorycznosc">Kaloryczność</Link>
                            <ul class="dropdown-menu">
                                <li><Link to="/DaniaGotowe">Dania gotowe</Link></li>
                                <li><Link to="/Drob">Drób</Link></li>
                                <li><Link to="/FastFood">Fast food</Link></li>
                                <li><Link to="/Grzyby">Grzyby</Link></li>
                                <li><Link to="/Miesa">Mięsa</Link></li>
                                <li><Link to="/Nabial">Nabiał</Link></li>
                                <li><Link to="/Napoje">Napoje</Link></li>
                                <li><Link to="/Orzechy">Orzechy</Link></li>
                                <li><Link to="/Owoce">Owoce</Link></li>
                                <li><Link to="/Przyprawy">Przyprawy</Link></li>
                                <li><Link to="/Ryby">Ryby</Link></li>
                                <li><Link to="/Slodycze">Słodycze</Link></li>
                                <li><Link to="/Tluszcze">Tłuszcze</Link></li>
                                <li><Link to="/Warzywa">Warzywa</Link></li>
                                <li><Link to="/Zboza">Zboża</Link></li>
                            </ul>
                        </li>
                        <li class="dropdown ">
                            <Link to="/Kalkulatory">Kalkulatory</Link>
                            <ul class="dropdown-menu">
                                <li> <Link to="/BMI">BMI</Link></li>
                                <li> <Link to="/Zapotrzebowania">Zapotrzebowania energetycznego</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/Forum">Forum</Link></li>
                        <li><Link to="/Szukaj"><span class="glyphicon glyphicon-search"></span> Szukaj...</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/Rejestracja"><span class="glyphicon glyphicon-user"></span> Zarejestruj się</Link></li>
                        <li><Link to="/Logowanie"><span class="glyphicon glyphicon-log-in"></span> Logowanie</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        </header>
        );
    }

}