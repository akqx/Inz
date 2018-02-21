import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { Carousel } from "react-bootstrap";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav_recipes: []
    };
    this.fetchFav();
  }

  fetchFav() {
    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }
    return fetch(`/recipe/heart/${name}`)
      .then(res => res.json())
      .then(fav_recipes => this.setState({ fav_recipes }));
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    let recipe = this.state.fav_recipes.map((recipe, id) => (
      <div key={id}>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Link to={`/przepis/nr/${recipe.id_recipe}`} className=" thumbnail">
            <div className="minHigh-70">{recipe.text}</div>
            <img
              alt="img"
              className="max_h_220"
              src={require(`./../pic/users/${recipe.photo_name}`)}
            />
          </Link>
        </div>
      </div>
    ));

    let carousel = (
      <div>
        {" "}
        <Carousel>

          <Carousel.Item>
            <img src={require("./../pic/BMI-MAIN.jpeg")} alt="" />
            <Carousel.Caption>
              <Link to="/kalkulatory/BMI">
                {" "}
                <div className="carousel-caption">
                  <h3>Oblicz swoje BMI</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={require("./../pic/VEGETERIAN_MAIN.jpeg")} alt="" />
            <Carousel.Caption>
              <Link to="/przepisy">
                {" "}
                <div className="carousel-caption">
                  <h3>Zobacz przepisy</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={require("./../pic/LOGIN_MAIN.jpeg")} alt="" />
            <Carousel.Caption>
              <Link to="/rejestracja">
                {" "}
                <div className="carousel-caption">
                  <h3>Dołącz do nas! Zarejestruj się</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          
        </Carousel>;
      </div>
    );
    return (
      <div>
        {isAuthenticated ? (
          <div>
            <div className="logo">Ulubione przepisy: </div>
            {recipe}
          </div>
        ) : (
          carousel
        )}
      </div>
    );
  }
}

MainPage.propTypes = {
  auth: PropTypes.object.isRequired
};

MainPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(MainPage);
