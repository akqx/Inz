import React from "react";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validateInput from "./../Validation/CalorieListValidate.js";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router";

class CaloriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      filter_text: "",
      errors: {},
      product_name: "",
      calorie_number: "",
      protein_number: "",
      fat_number: "",
      carb_number: "",
      //state num is to refesh states, when admin delete states or adding
      num: 1
    };
    this.onButonClick = this.onButonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchFood(this.props.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    //delete infinite loop
    if (
      this.props.params.id !== prevProps.params.id ||
      JSON.stringify(this.state.num) !== JSON.stringify(prevState.num)
    ) {
      for (var i = 0; i < 2; i++) {
        this.fetchFood(this.props.params.id);
      }
    }
  }

  fetchFood(id) {
    return fetch("/food/type/" + id)
      .then(res => res.json())
      .then(food => this.setState({ food }));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onButonClick(e) {
    e.preventDefault();
    //refresh states in componentDidUpdate
    this.setState({ num: this.state.num + 1 });

    if (this.isValid()) {
      this.setState({ errors: {} });
      axios.post("/Admin/AddProduct", {
        product: this.state.product_name,
        calorie: this.state.calorie_number,
        protein: this.state.protein_number,
        fat: this.state.fat_number,
        carb: this.state.carb_number,
        id: this.props.params.id
      });
      this.inputTitle1.value = "";
      this.inputTitle2.value = "";
      this.inputTitle3.value = "";
      this.inputTitle4.value = "";
      this.inputTitle5.value = "";
    }
  }
  handleDelete(event, id) {
    //refresh states in componentDidUpdate
    this.setState({ num: this.state.num + 1 });
    axios.post("/Admin/delete", { id_product_delete: id });
  }

  render() {
    const { errors } = this.state;

    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let product_list = this.state.food
      .filter(product => {
        return product.name.toLowerCase().indexOf(this.state.filter_text) >= 0;
      })
      .map((product, id) => (
        <div className="row" key={id}>
          {name === "Admin" ? (
            <div className="container">
              <div className="row input-margin">
                <Link to={`/edycja/produkt/${product.id}`}>
                  {" "}
                  <div className="col-xs-8 cal_edit">EDYTUJ</div>
                </Link>
                <div
                  onClick={e => this.handleDelete(e, product.id)}
                  className="col-xs-4 cal_delete"
                >
                  USUŃ PRODUKT
                </div>
              </div>
            </div>
          ) : null}

          <p className="cal_list1 col-lg-4 col-md-4 col-sm-4">{product.name}</p>
          <p className="cal_list col-lg-2 col-md-2 col-sm-2">
            {product.calories}
          </p>
          <p className="cal_list2 col-lg-2 col-md-2 col-sm-2">
            {product.protein}
          </p>
          <p className="cal_list3 col-lg-2 col-md-2 col-sm-2">{product.fat}</p>
          <p className="cal_list4 col-lg-2 col-md-2 col-sm-2">{product.carb}</p>
        </div>
      ));

    return (
      <span className="container">
        <div className="logo">
          <span className="glyphicon glyphicon-cutlery" /> Lista produktów:{" "}
          {this.props.menu}
        </div>
        <div className="container">
          <textarea
            type="text"
            name="filter_text"
            onChange={e => this.handleChange(e)}
            className="form-control"
            placeholder="Szukaj produkt..."
            rows="1"
          />

          <div className="row row_list alert-margin">
            <p className="cal_list1 col-lg-4 col-md-4 col-sm-4">
              NAZWA PRODUKTU:
            </p>
            <p className="cal_list col-lg-2 col-md-2 col-sm-2">KALORIE:</p>
            <p className="cal_list2 col-lg-2 col-md-2 col-sm-2">BIAŁKO(g)</p>
            <p className="cal_list3 col-lg-2 col-md-2 col-sm-2">TŁUSZCZ(g)</p>
            <p className="cal_list4 col-lg-2 col-md-2 col-sm-2">
              WĘGLOWODANY(g)
            </p>
          </div>
          <div className="input-margin">{product_list}</div>
        </div>
        <div>
          {name === "Admin" ? (
            <div>
              <div className="row_list alert-margin">
                <div
                  className={classnames("form-group", {
                    "has-error": errors.product_name
                  })}
                >
                  <input
                    className=" form-control"
                    placeholder="produkt"
                    onChange={e => this.handleChange(e)}
                    name="product_name"
                    ref={el => (this.inputTitle1 = el)}
                  />
                  {errors.product_name && (
                    <span className="help-block">{errors.product_name}</span>
                  )}
                </div>

                <div
                  className={classnames("form-group", {
                    "has-error": errors.calorie_number
                  })}
                >
                  <input
                    className="form-control"
                    placeholder="kalorie"
                    onChange={e => this.handleChange(e)}
                    name="calorie_number"
                    type="number"
                    min={0}
                    ref={el => (this.inputTitle2 = el)}
                  />
                  {errors.calorie_number && (
                    <span className="help-block">{errors.calorie_number}</span>
                  )}
                </div>

                <div
                  className={classnames("form-group", {
                    "has-error": errors.protein_number
                  })}
                >
                  <input
                    className="form-control"
                    placeholder="białko"
                    onChange={e => this.handleChange(e)}
                    name="protein_number"
                    type="number"
                    min={0}
                    ref={el => (this.inputTitle3 = el)}
                  />
                  {errors.protein_number && (
                    <span className="help-block">{errors.protein_number}</span>
                  )}
                </div>

                <div
                  className={classnames("form-group", {
                    "has-error": errors.fat_number
                  })}
                >
                  <input
                    className="form-control"
                    placeholder="tłuszcze"
                    onChange={e => this.handleChange(e)}
                    name="fat_number"
                    type="number"
                    min={0}
                    ref={el => (this.inputTitle4 = el)}
                  />
                  {errors.fat_number && (
                    <span className="help-block">{errors.fat_number}</span>
                  )}
                </div>

                <div
                  className={classnames("form-group", {
                    "has-error": errors.carb_number
                  })}
                >
                  <input
                    className="form-control"
                    placeholder="węglowodany"
                    onChange={e => this.handleChange(e)}
                    name="carb_number"
                    type="number"
                    min={0}
                    ref={el => (this.inputTitle5 = el)}
                  />
                  {errors.carb_number && (
                    <span className="help-block">{errors.carb_number}</span>
                  )}
                </div>
              </div>
              <div
                className="form-control button-gray input-margin"
                onClick={this.onButonClick}
              >
                dodaj produkt do bazy
              </div>
            </div>
          ) : null}
        </div>
      </span>
    );
  }
}

CaloriesList.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(CaloriesList);
