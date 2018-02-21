import React from "react";
import validateInput from "./../Validation/CalorieListValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      comment: [],
      product_name: "",
      calorie_number:"",
      protein_number: "",
      fat_number:"",
      carb_number: ""
    };
    this.onButonClick = this.onButonClick.bind(this);
  }

  componentDidMount() {
    this.fetchNote(this.props.params.id);

    fetch("/food/" + this.props.params.id)
      .then(res => res.json())
      .then(food =>{
          console.log(food[0]);
        this.setState({
          product_name: JSON.stringify(food[0].name).slice(1, -1),
          calorie_number: JSON.stringify(food[0].calories),
          protein_number: JSON.stringify(food[0].protein),
          fat_number: JSON.stringify(food[0].fat),
          carb_number: JSON.stringify(food[0].carb)

        })}
      );
  }

  fetchNote(id) {
    return fetch("/food/" + id)
      .then(res => res.json())
      .then(comment => this.setState({ comment }));
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
    if (this.isValid()) {
      this.setState({ errors: {} });
      axios.post("/Admin/EditProduct", {
        product: this.state.product_name,
        calorie: this.state.calorie_number,
        protein: this.state.protein_number,
        fat: this.state.fat_number,
        carb: this.state.carb_number,
        id: this.props.params.id
      });
      this.context.router.push("/kalorycznosc");
    }
  }
  render() {
    const {
      errors,
    } = this.state;


    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let userView = this.state.comment.map((food, id) => (
      <div className="row" key={id}>
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
                  defaultValue={food.name}
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
                  defaultValue={food.calories}
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
                  defaultValue={food.protein}
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
                  defaultValue={food.fat}
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
                  defaultValue={food.carb}
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
    ));

    return (
      <div className="container">
        <div className="logo">
          <span className="glyphicon glyphicon-cutlery" /> Edytuj produkt
        </div>
        <div>{userView}</div>
      </div>
    );
  }
}

EditProduct.propTypes = {
  auth: PropTypes.func.isRequired
};

EditProduct.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(EditProduct);
