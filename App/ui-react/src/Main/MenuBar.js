import React from "react";
import { Link } from "react-router";
import FlashMessagesList from "./../flash/FlashMessagesList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../Login/loginActions.js";
import jwt_decode from "jwt-decode";
import { Navbar, NavDropdown , MenuItem , Nav, NavItem } from "react-bootstrap";

var name = "";
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUsername: ""
    };
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (localStorage.getItem("token")) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    const gestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/rejestracja">
            <span className="glyphicon glyphicon-user" /> Zarejestruj się
          </Link>
        </li>
        <li>
          <Link to="/logowanie">
            <span className="glyphicon glyphicon-log-in" /> Logowanie
          </Link>
        </li>
      </ul>
    );

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li onClick={this.logout.bind(this)}>
          <Link to="/">
            <span className="glyphicon glyphicon-user" /> Wyloguj się {name}
          </Link>
        </li>
      </ul>
    );

    return (
      <span className="index">
        <header className="padding">
          <Navbar className="navbar navbar-color navbar-fixed-top">
            <div className="container header">
              
             
  <Navbar.Collapse>

                  <ul className="nav navbar-nav navbar-left ">
                  <li className="dropdown ">
                    <Link to="/przepisy">Przepisy</Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/przepisy/daniaglowne">Dania Główne</Link>
                      </li>
                      <li>
                        <Link to="/przepisy/przystawkiiprzekaski">
                          Przystawki i przekąski
                        </Link>
                      </li>
                      <li>
                        <Link to="/przepisy/zupy">Zupy</Link>
                      </li>
                      <li>
                        <Link to="/przepisy/salatki">Sałatki</Link>
                      </li>
                      <li>
                        <Link to="/przepisy/napoje">Napoje</Link>
                      </li>
                      <li>
                        <Link to="/przepisy/deseryiciasta">
                          Desery i ciasta
                        </Link>
                      </li>
                      <li>
                        <Link to="/przepisy/przetwory">Przetwory</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <Link to="/kalorycznosc">Kaloryczność</Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/kalorycznosc/DaniaGotowe">Dania gotowe</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Drob">Drób</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/FastFood">Fast food</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Grzyby">Grzyby</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Miesa">Mięso</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Nabial">Nabiał</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Napoje">Napoje</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Orzechy">Orzechy</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Owoce">Owoce</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Przyprawy">Przyprawy</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Ryby">Ryby</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Slodycze">Słodycze</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Tluszcze">Tłuszcze</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Warzywa">Warzywa</Link>
                      </li>
                      <li>
                        <Link to="/kalorycznosc/Zboza">Zboża</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown ">
                    <Link to="/kalkulatory">Kalkulatory</Link>
                    <ul className="dropdown-menu">
                      <li>
                        {" "}
                        <Link to="/kalkulatory/BMI">BMI</Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/kalkulatory/zapotrzebowania">
                          Zapotrzebowania energetycznego
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/forum">Forum</Link>
                  </li>

                  <li>
                    <Link to="/">
                      {isAuthenticated ? (
                        <span>
                          <span className="glyphicon glyphicon-heart" />{" "}
                          Ulubione przepisy
                        </span>
                      ) : (
                        <span>
                          <span className="glyphicon glyphicon-home" /> Główna
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>

                {isAuthenticated ? userLinks : gestLinks}
                </Navbar.Collapse>
            </div>
               <Navbar.Toggle />
          </Navbar>
        </header>
        <div className="container ">
          <FlashMessagesList />
          {this.props.children}
          <div className="footer" />
        </div>
      </span>
    );
  }
}

MenuBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(MenuBar);
