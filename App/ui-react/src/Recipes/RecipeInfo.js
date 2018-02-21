import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class RecipeInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      range_min: 0,
      range_hours: 0,
      selectValue: "Na surowo",
      radioValue: "TAK"
    };
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onButtonClick(e) {
    e.preventDefault();

    axios.post("/Recipe/info", {
      range_hours: this.state.range_hours,
      range_min: this.state.range_min,
      select_Val: this.state.selectValue,
      vege: this.state.radioValue,
      recipe_id: this.props.params.id
    });
    this.context.router.push("/przepis/nr/" + this.props.params.id);
  }

  render() {
    let information = (
      <div>
        <label className="control-label input-margin-50">
          Wybierz rodzaj przyrządzania:
        </label>
        <select
          className="form-control"
          value={this.state.selectValue}
          name="selectValue"
          onChange={e => {
            this.handleChange(e);
          }}
        >
          <option value="Na surowo">Na surowo</option>
          <option value="Gotowanie">Gotowanie</option>
          <option value="Gotowanie na parze">Gotowanie na parze</option>
          <option value="Grilowanie">Grilowanie</option>
          <option value="Pieczenie">Pieczenie</option>
          <option value="Smażenie">Smażenie</option>
          <option value="Duszenie">Duszenie</option>
        </select>

        <label className="control-label input-margin-50">
          Przybliżony czas przygotowania:
        </label>
        <div className="container input-margin">
          <div className="row">
            <div className="col-xs-5">
              godziny: {this.state.range_hours}
              <input
                type="range"
                defaultValue="0"
                min="0"
                max="12"
                name="range_hours"
                onChange={e => {
                  this.handleChange(e);
                }}
                step="1"
              />
              minuty: {this.state.range_min}
              <input
                type="range"
                defaultValue="0"
                min="0"
                max="59"
                name="range_min"
                onChange={e => {
                  this.handleChange(e);
                }}
                step="1"
              />
            </div>

            <div className="col-xs-1" />

            <div className="col-xs-5">
              <div className="range_time">
                {this.state.range_hours}h {this.state.range_min}min
              </div>
            </div>
          </div>
        </div>
        <label className="control-label input-margin-50">
          Wegetariańskie:{" "}
        </label>
        <div />
        <div className="radio">
          <label className="radio-inline">
            <input
              name="radioValue"
              onClick={e => {
                this.handleChange(e);
              }}
              type="radio"
              defaultChecked
              value="TAK"
            />
            <div>TAK</div>
          </label>
        </div>
        <div className="radio">
          <label className="radio-inline">
            <input
              name="radioValue"
              onClick={e => {
                this.handleChange(e);
              }}
              type="radio"
              value="NIE"
            />
            <div>NIE</div>
          </label>
        </div>
        <div
          onClick={this.onButtonClick}
          className="form-control button-gray input-margin-50"
        >
          dodaj informacje
        </div>
      </div>
    );

    return (
      <div>
        <div className="logo"> Dodatkowe informacje</div>
        {information}
      </div>
    );
  }
}

// RecipeInfo.propTypes = {
//   auth: PropTypes.func.isRequired
// };

RecipeInfo.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(RecipeInfo);
