import React from "react";
import Dropzone from "react-dropzone";
import validateInput from "./../Validation/RecipeAddValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import FormData from "form-data";

var formData = new FormData();

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_text: "",
      food: [],
      id_food: 0,
      specyfic_food: [],
      div_visible: "skladniki",
      image_upload: [],
      image_show: [],
      range_min: 0,
      range_hours: 0,
      errors: {},
      recipe_name: "",
      recipe_content: "",
      editNumber: [],
      cal: [],
      selectCategory: "daniaglowne",
      acceptedFiles: [],
      editList: [],
      image_name: "",
      date: ""
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchFood();
  }

  fetchFood() {
    return fetch("/food/abc")
      .then(res => res.json())
      .then(food => this.setState({ food }));
  }
  //dodawnie produktu z listy do talbicy produktów
  getSpecyficFood(e) {
    var selectID = JSON.parse(this.state.id_food);

    var correct = true;
    this.state.specyfic_food.map(a => {
      if (a.id === selectID.id) {
        return (correct = false);
      } else {
        return (correct = true);
      }
    });

    if ((JSON.stringify(this.state.id_food).length > 2) & correct) {
      this.setState({
        specyfic_food: this.state.specyfic_food.concat([
          JSON.parse(this.state.id_food)
        ]),
        editList: this.state.editList.concat([
          JSON.parse(JSON.stringify({ id: selectID.id, grams: "0" }))
        ])
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleVisibleVal(value) {
    this.setState({
      div_visible: value
    });
  }

  onButtonClick(e) {
    e.preventDefault();
    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    if (this.isValid()) {
      this.setState({ errors: {} });

      axios.post("/food/date", {
        date: this.state.date
      });

      axios.post("/recipe", {
        author: name,
        recipe_name: this.state.recipe_name,
        category: this.state.selectCategory,
        recipe_content: this.state.recipe_content,
        ingredient: this.state.editList,
        image_name: this.state.date + this.state.image_name
      });
      formData.append("photo", this.state.image_upload);

      fetch("/food/image1", {
        method: "POST",
        body: formData
      });
      this.context.router.push("/przepisy/");
    }
  }

  deleteProduct = (id, e, productID) => {
    const product = Object.assign([], this.state.specyfic_food);
    product.splice(id, 1);
    this.setState({ specyfic_food: product });
    const productUpdate = Object.assign([], this.state.editList);
    productUpdate.splice(id, 1);
    this.setState({ editList: productUpdate });
  };

  changeEvent = (id, e) => {
    let recipesCopy = this.state.editList;
    var index = 0;

    for (var i = 0; i < recipesCopy.length; i++) {
      if (recipesCopy[i].id === id) index = i;
    }
    recipesCopy[index].grams = e.target.value;

    this.setState({
      editList: recipesCopy
    });
  };

  onDrop(file) {
    this.setState({
      image_upload: file[0],
      image_show: file
    });

    //    formData.append("photo", file[0]);
    this.setState({
      image_name: file[0].name
    });

    this.setState({
      date: Date.now()
    });
  }

  render() {
    const { errors } = this.state;

    let product_list = this.state.food
      .filter(product => {
        return product.name.toLowerCase().indexOf(this.state.filter_text) >= 0;
      })
      .map((product, id) => (
        <option value={JSON.stringify(product)} key={id}>
          {product.name}
        </option>
      ));

    let specyfic_ingredient = this.state.specyfic_food.map((product, id) => (
      <div key={product.id}>
        <div className="col-xs-8 specyfic_ingredient cal_list ">
          {product.name}
        </div>
        <input
          type="number"
          min={0}
          defaultValue={0}
          className="col-xs-2 cal_list1 edit_color_input"
          onChange={this.changeEvent.bind(this, product.id)}
        />
        <button
          className="col-xs-1 specyfic_ingredient cal_list1 delete_color"
          onClick={this.deleteProduct.bind(this, id, product.id)}
        >
          USUŃ
        </button>
      </div>
    ));

    let ingredient = (
      <div>
        <div className="container">
          <label className="control-label input-margin-50">
            Wpisz szukany produkt, lub znajdźgo na liście:
          </label>
          <textarea
            type="text"
            onChange={this.handleChange.bind(this)}
            name="filter_text"
            className="form-control"
            placeholder="Szukaj składniku..."
            rows="1"
          />
          <select
            size="6"
            className="form-control input-margin"
            id="sel2"
            value={this.state.id_food}
            name="id_food"
            onClick={this.handleChange}
            onChange={this.handleChange}
          >
            {product_list}
          </select>
          <div
            className="form-control button-gray"
            onClick={this.getSpecyficFood.bind(this)}
          >
            Kliknij na składnik i go dodaj
          </div>
          <label className="control-label input-margin">Lista produktów:</label>
          <div className="container">
            <div className="row">
              <div className="col-xs-8 specyfic_ingredient cal_list">
                NAZWA PODUKTU
              </div>
              <div className="col-xs-2 specyfic_ingredient cal_list1 edit_color">
                Edytuj gramy:
              </div>
              <div className="col-xs-1 specyfic_ingredient cal_list1 delete_color">
                Usuń:
              </div>

              {specyfic_ingredient}
            </div>
          </div>
        </div>
      </div>
    );

    let description = (
      <div className="container">
        <div className="form-group">
          <label className="control-label input-margin-50">
            Nazwa przepisu:
          </label>

          <div
            className={classnames("form-group", {
              "has-error": errors.recipe_name
            })}
          >
            <input
              onChange={e => {
                this.handleChange(e);
              }}
              name="recipe_name"
              className="form-control"
              maxLength="50"
              placeholder="Podaj tytuł przepisu... Tytuł powinien byc krótki, max: 50 znaków"
            />
            {errors.recipe_name && (
              <span className="help-block">{errors.recipe_name}</span>
            )}
          </div>

          <div
            className={classnames("form-group", {
              "has-error": errors.recipe_content
            })}
          >
            <label className="control-label">Opis:</label>
            <textarea
              type="text"
              name="recipe_content"
              onChange={e => {
                this.handleChange(e);
              }}
              placeholder="Sposób przygotowania..."
              maxLength="2000"
              className="form-control"
              rows="6"
            />
            {errors.recipe_content && (
              <span className="help-block">{errors.recipe_content}</span>
            )}
          </div>
        </div>

        <label className="control-label input-margin">
          Wybierz kategorię przepisu:
        </label>
        <select
          className="form-control"
          value={this.state.selectCategory}
          onChange={e => {
            this.handleChange(e);
          }}
          name="selectCategory"
        >
          <option value="daniaglowne">Dania główne</option>
          <option value="deseryiciasta">Desery i ciasta</option>
          <option value="napoje">Napoje</option>
          <option value="przetwory">Przetwory</option>
          <option value="przystawkiiprzekaski">Przystawki i przekąski</option>
          <option value="salatki">Sałatki</option>
          <option value="zupy">Zupy</option>
        </select>
        <div className="input-margin">
          <label className="control-label input-margin">Dodaj zdjęcie:</label>
          <div className="row">
            <div className="col-xs-6">
              <Dropzone
                className="dropzone "
                accept="image/*"
                multiple={false}
                onDrop={this.onDrop.bind(this)}
              >
                <div>
                  Kiliknij lub przeciągnij zdjęcie{" "}
                  <div className="glyphicon glyphicon-picture" />
                </div>
              </Dropzone>

              {errors.image_name && (
                <span className="red_letter">{errors.image_name}</span>
              )}
            </div>
            <div className="col-xs-6">
              {this.state.image_show.length > 0 ? (
                <div>
                  <div>
                    {this.state.image_show.map(file => (
                      <img
                        alt="img"
                        key="1"
                        className="image_upload"
                        src={file.preview}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          onClick={this.onButtonClick}
          className="form-control button-gray input-margin-50"
        >
          dodaj przepis
        </div>
      </div>
    );

    return (
      <div>
        <div className="logo">Dodaj przepis</div>

        <div className="container form-group">
          <div className="container">
            <div className="row recipe_view">
              <div
                onClick={() => this.handleVisibleVal("skladniki")}
                className="recipe_1 col-sm-6"
              >
                Składniki
              </div>
              <div
                onClick={() => this.handleVisibleVal("opis")}
                className="recipe_2  col-sm-6"
                value="div_visible"
              >
                Opis
              </div>
            </div>
          </div>

          {this.state.div_visible === "skladniki" && ingredient}
          {this.state.div_visible === "opis" && description}
        </div>
      </div>
    );
  }
}

AddRecipe.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(AddRecipe);
