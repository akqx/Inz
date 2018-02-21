import React from "react";
import validateInput from "./../Validation/BMIValidate.js";
import classnames from "classnames";

var BMI;
export default class BMImain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyWeight: "",
      bodyHight: "",
      errors: {},
      bmi: ""
    };
    this.onButonClick = this.onButonClick.bind(this);
  }
  
  calculateBMI() {
    BMI =
      this.state.bodyWeight *
      10000 /
      (this.state.bodyHight * this.state.bodyHight);
    BMI = Math.floor(BMI * 100) / 100;
    this.setState({
      bmi: BMI
    });
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
      this.calculateBMI();
      this.setState({ errors: {} });
    }
  }


  render() {
    const { errors } = this.state;

    let bmi_infromation = (
      <div>
        <strong>Co to jest BMI?</strong>
        <p className="p_wrap">
          BMI to wskaźnik masy ciała(ang. Body Mass Index). Oliczając BMI
          pomożemy określić czy Twoja waga jest prawidłowa. Prawidłowa masa
          ciała powinna mieścić się między 18,5 a 25. BMI to iloraz masy
          ciała(liczony w kg) oraz wzrostu(podniesionego do kwadratu).
        </p>
      </div>
    );
    let sorce = (
      <div>
        Twój wynik to:
        <strong> {this.state.bmi}</strong>
        <p className="p_wrap input-margin">Wartość BMI:</p>
        <p className="p_wrap">0 > 16 - wygłodzenie</p>
        <p className="p_wrap">16 - 16.99 - wychudzenie</p>
        <p className="p_wrap">17 - 18.49 - niedowaga</p>
        <p className="p_wrap">18.5 - 24.99 - norma</p>
        <p className="p_wrap">25 - 29.99 - nadwaga</p>
        <p className="p_wrap">30 - 34.99 - I stopień otyłości</p>
        <p className="p_wrap">35 - 39.99 - II stopień otyłości</p>
        <p className="p_wrap">powyżej 40 - otyłość skrajna</p>
      </div>
    );
    return (
      <div>
        <div>
          <div>
            <div className="logo">{this.state.value}KALKULATORY</div>
          </div>

          <div className="container bmi">
            <div className="row">
              <div className=" col-lg-4 a1" />

              <div className="col-lg-3 a4">
                {this.state.bmi > 0 ? (
                  <div>{sorce}</div>
                ) : (
                  <div>{bmi_infromation}</div>
                )}
              </div>
              <div className=" col-lg-5 a2">
                <div
                  className={classnames("form-group", {
                    "has-error": errors.bodyWeight
                  })}
                >
                  <strong>Masa ciała(kg):</strong>
                  <input
                    name="bodyWeight"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    type="number"
                    min={30}
                    className="form-control"
                    placeholder="Ile ważysz?"
                  />
                  {errors.bodyWeight && (
                    <span className="help-block">{errors.bodyWeight}</span>
                  )}
                </div>

                <div
                  className={classnames("form-group", {
                    "has-error": errors.bodyHight
                  })}
                >
                  <strong>Wzrost(cm):</strong>
                  <input
                    name="bodyHight"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    error={errors.bodyHight}
                    type="number"
                    min={100}
                    className="form-control"
                    placeholder="Ile masz wzrostu?"
                  />
                  {errors.bodyHight && (
                    <span className="help-block">{errors.bodyHight}</span>
                  )}
                </div>

                <button
                  onClick={this.onButonClick}
                  type="submit"
                  className="btn bodySubmit"
                >
                  OBLICZ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
