import React from "react";
import { Link } from "react-router";
import validateInput from "./../Validation/CommentValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

class RecipeNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      product: [],
      comment: [],
      note_comment: "",
      errors: {},
      recipe_id: "",
      comment_delete_id: "",
      num: 1,
      username: "",
      condition: 0,
      info: []
    };
    this.onButonCommentClick = this.onButonCommentClick.bind(this);
    this.onEditClickComment = this.onEditClickComment.bind(this);
    this.onDeleteClickComment = this.onDeleteClickComment.bind(this);
  }

  componentDidMount() {
    this.fetchRecipe(this.props.params.id);
    this.fetchProduct(this.props.params.id);
    this.fetchComment(this.props.params.id);
    this.fetchFav(this.props.params.id);
    this.fetchInfo(this.props.params.id);

    var id = this.props.params.id;
    this.setState({ recipe_id: id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.num) !== JSON.stringify(prevState.num)) {
      this.fetchComment(this.props.params.id);
      this.fetchComment(this.props.params.id);
    }
  }

  fetchComment() {
    return fetch("/recipe/comments/" + this.props.params.id)
      .then(res => res.json())
      .then(comment => this.setState({ comment }));
  }

  fetchFav(id) {
    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }
    return fetch(`/recipe/heart/${id}/${name}`)
      .then(res => res.json())
      .then(condition => {
        if (condition.length > 0) {
          this.setState({
            condition: 1
          });
        }
      });
  }

  fetchInfo(id) {
    return fetch("/recipe/getInfo/" + this.props.params.id)
      .then(res => res.json())
      .then(info => this.setState({ info }));
  }

  fetchRecipe(id) {
    return fetch("/recipe/getRecipe/" + id)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }

  fetchProduct(id) {
    return fetch("/recipe/getIngredient/" + id)
      .then(res => res.json())
      .then(product => this.setState({ product }));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  heartClick(e) {
    this.setState({
      condition: !this.state.condition
    });
    if (this.state.condition === 1)
      axios.post("/recipe/favourite/delete", {
        id_recipe: this.props.params,
        user: this.props.auth.user
      });
    else
      axios.post("/recipe/favourite/add", {
        id_recipe: this.props.params,
        user: this.props.auth.user
      });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onAddInfo(e) {
    this.context.router.push("/przepisy/info/" + this.props.params.id);
  }

  onButonCommentClick(e) {
    this.setState({ num: this.state.num + 1 });

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.inputComment.value = "";

      return axios.post("/Recipe/addedRecipe/comment", {
        author: this.props.auth,
        text: this.state.note_comment,
        recipe_id: this.state.recipe_id
      });
    }
  }

  onDelete(e) {
    axios.post("/recipe/delete", this.props.params);
    this.context.router.push("/przepisy");
  }

  onDeleteClickComment(e, data) {
    this.setState({ num: this.state.num + 1 });
    axios.post("/recipe/comment/delete", { id_comment_delete: data });
    //  this.context.router.push('/forum');
  }

  onEditClickComment(e, data) {
    this.context.router.push("/edycja/komentarz/" + data);
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;

    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let userView = (
      <div>
        <div>
          <div
            className={classnames("form-group", {
              "has-error": errors.note_comment
            })}
          >
            <textarea
              ref={el => (this.inputComment = el)}
              type="text"
              placeholder="Tekst..."
              className="form-control input-margin"
              maxLength="10000"
              name="note_comment"
              onChange={e => {
                this.handleChange(e);
              }}
              rows="6"
            />
            {errors.note_comment && (
              <span className="help-block">{errors.note_comment}</span>
            )}
          </div>
        </div>
        <div
          onClick={this.onButonCommentClick}
          className="form-control button-gray input-margin-50"
        >
          dodaj komentarz
        </div>
      </div>
    );

    let guestView = (
      <div>
        <Link to="/logowanie">
          {" "}
          <div className="form-control  input-margin-50">
            Aby dodać komantarz, musisz być zalogowany. Idź do strony logowania
            (klik)
          </div>
        </Link>
      </div>
    );

    let comment_list = this.state.comment.map((comment, id) => (
      <div className="input-margin row note_container" key={id}>
        <div className="itemNote ">
          <div className="note_name note_comment ">
            <div className="glyphicon glyphicon-envelope" />
          </div>
          <div className="note_author note_comment">{comment.username}</div>
          <div className="note_content date_note note_comment">
            {" "}
            Dodano: {comment.date}
          </div>
        </div>
        <div className="note_content_main">{comment.text}</div>
        {comment.username === name || name === "Admin" ? (
          <div>
            <div
              className="delete_note"
              onClick={e => this.onDeleteClickComment(e, comment.id)}
            >
              USUŃ KOMENTARZ
            </div>
          </div>
        ) : null}
      </div>
    ));

    let recipe = this.state.recipe.map((product, id) => (
      <div key={product.id + "c"}>
        <div className="recipeTitle ">autor: {product.username}</div>
        <div className="recipeContent ">Przepis: {product.description}</div>
      </div>
    ));

    let deleteRecipe = this.state.recipe.map((product, id) => (
      <div key={product.id + "b"}>
        {product.username === name || name === "Admin" ? (
          <div>
            <div className="container">
              <div className="row">
                <div
                  className="col-xs-6 delete_note dark_red"
                  onClick={e => this.onDelete(e)}
                >
                  USUŃ PRZEPIS
                </div>

                <div
                  className="col-xs-6 delete_note dark_red"
                  onClick={e => this.onAddInfo(e)}
                >
                  UMIEŚĆ DODATKOWE INFORMACJE
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    ));

    var sumCal = 0;
    var sumProtein = 0;
    var sumCarb = 0;
    var sumFat = 0;

    this.state.product.map((product, id) => (
      <div className="row product_row" key={product.id}>
        {(sumCal += parseInt(product.calories * product.weight / 100,10))}
        {(sumProtein += parseInt(product.protein * product.weight / 100,10))}
        {(sumCarb += parseInt(product.carb * product.weight / 100,10))}
        {(sumFat += parseInt(product.fat * product.weight / 100,10))}
      </div>
    ));

    let product = this.state.product.map((product, id) => (
      <div className="row product_row" key={product.id}>
        <div className="product_recipe col-xs-6">{product.name}</div>
        <div className="product_weight col-xs-1">{product.weight}</div>
        <div className="col-xs-1">
          {parseInt(product.calories * product.weight / 100, 10)}
        </div>
        <div className="col-xs-1">
          {parseInt(product.protein * product.weight / 100, 10)}
        </div>
        <div className="col-xs-1">
          {parseInt(product.fat * product.weight / 100, 10)}
        </div>
        <div className="col-xs-2">
          {parseInt(product.carb * product.weight / 100, 10)}
        </div>
      </div>
    ));

    let product_list = (
      <div>
        {this.state.product.length > 0 ? (
          <div>
            <div className="product_group input-margin">
              <div className="product_recipe col-xs-6" />
              <div className=" col-xs-1">WAGA(g)</div>
              <div className="col-xs-1">KALORIE</div>
              <div className="col-xs-1">BIAŁKO(g)</div>
              <div className="col-xs-1">TŁUSZCZ(g)</div>
              <div className="col-xs-2">WĘGLOWODANY(g)</div>
            </div>

            {product}

            <div className="row product_row sum">
              <div className="product_recipe col-xs-7">SUMA: </div>
              <div className="col-xs-1">{sumCal} kcal</div>
              <div className="col-xs-1">{sumProtein} g</div>
              <div className="col-xs-1">{sumFat} g</div>
              <div className="col-xs-2">{sumCarb} g</div>
            </div>
          </div>
        ) : null}
      </div>
    );

    return (
      <div>
        <div>
          <div className="logo">
            {this.state.recipe.map((product, id) => (
              <div key={id + "a"}>
                {product.text}{" "}
                {isAuthenticated ? (
                  <span
                    onClick={e => this.heartClick(e)}
                    className={
                      this.state.condition
                        ? "heart glyphicon glyphicon-heart toggle_heart"
                        : "heart glyphicon glyphicon-heart"
                    }
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div className="container" />
        </div>
        <div>
          {deleteRecipe}
          {recipe}
          {product_list}
        </div>

        <div>
          {this.state.info.map((product, id) => (
            <div key={id + "d"} className="row input-margin info_recipe">
              <div className="col-xs-4">
                Sposób przyrządzenia: {product.prepare_method}
              </div>
              <div className="col-xs-4">
                Wegetariańskie: {product.vegeterian}
              </div>
              <div className="col-xs-4">
                Czas przyrządzenia: {product.prepare_time}
              </div>
            </div>
          ))}
        </div>

        {comment_list}
        {isAuthenticated ? userView : guestView}
      </div>
    );
  }
}

RecipeNumber.propTypes = {
  auth: PropTypes.object.isRequired
};

RecipeNumber.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(RecipeNumber);
