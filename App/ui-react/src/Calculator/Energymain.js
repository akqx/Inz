import React from "react";
import validateInput from "./../Validation/EnergyValidate.js";
import classnames from "classnames";

export default class Energymain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EnergyBodyWeight: "",
      EnergyBodyHight: "",
      EnergyAge: "",
      errors: {},
      selectValue: "1.2",
      radioValue: 5,
      bmr: "",
      cmp: ""
    };
    this.onButonClick = this.onButonClick.bind(this);
  }

  calBMR() {
    let BMR =
      10 * this.state.EnergyBodyWeight +
      6.25 * this.state.EnergyBodyHight -
      5 * this.state.EnergyAge +
      this.state.radioValue;
    BMR = parseInt(BMR, 10);

    let CPM = BMR * this.state.selectValue;
    CPM = parseInt(CPM, 10);

    this.setState({
      bmr: BMR,
      cpm: CPM
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
      this.calBMR();
      this.setState({ errors: {} });
    }
  }

  render() {
    const { errors } = this.state;

    let information = (
      <div>
        <strong>Zapotrzebowanie energetyczne...</strong>
        <p className="p_wrap">
          wyliczmy Ci z kalkulatora kalorii. Liczbę kalorii dostosujemy do
          Twojej aktywności fizycznej. Nie tylko, powiemy Ci ile spalasz
          dziennie kalorii, ale także ile spala Twój organiz w pozycji
          spoczynkowej. Te informacje ułatwią Ci wybranie diety. Proponujemy:
        </p>
        <p className="p_wrap">
          -aby schudnać, odejmij około 300-500 kalorii od zapotrzebiwania
          energetycznego,
        </p>
        <p className="p_wrap">
          -aby przytyć dodaj 300-500 kalorii do zapotrzebowania energetycznego
        </p>
        <p className="p_wrap">
          -natomiast, jeżeli chcesz zachować swoją mase ciała, jedź tyle kalorii
          ile wynosi Twoje zapotrzebiwanie energetyczne
        </p>
      </div>
    );
    let score = (
      <div>
        <p className="p_wrap input-margin-50">
          {" "}
          Twoje minimalne zapotrzebowanie na kalorie wynsi:
        </p>
        <p>
          <strong>{this.state.bmr} kcal</strong>, to znaczy że nie powinieneś
          spożywać mniej kalorii od {this.state.bmr}.
        </p>
        <p className="p_wrap"> Twoje zapotrzebiowanie na kalorie to: </p>
        <p>
          <strong>{this.state.cpm} kcal</strong>, oznacza to że jeżeli chcesz
          utrzymwać wagę powinieneś jesć około {this.state.cpm}
        </p>
        <p className="p_wrap">
          -aby schudnać, odejmij około 300-500 kalorii od zapotrzebiwania
          energetycznego,
        </p>
        <p className="p_wrap">
          -aby przytyć dodaj 300-500 kalorii do zapotrzebowania energetycznego
        </p>
      </div>
    );

    return (
      <div>
        <div>
          <div className="logo">KALKULATORY</div>
        </div>
        <div className="container energy">
          <div className="row">
            <div className=" col-lg-4 col-xs-4 a2">
              <strong>Płeć:</strong>
              <div className="radio">
                <label className="radio-inline">
                  <input
                    name="radioValue"
                    onClick={e => {
                      this.handleChange(e);
                    }}
                    type="radio"
                    defaultChecked
                    value="5"
                  />
                  <div>mężczyzna</div>
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
                    value="-161"
                  />
                  <div>kobieta</div>
                </label>
              </div>

              <div
                className={classnames("form-group", {
                  "has-error": errors.EnergyAge
                })}
              >
                <strong>Wiek:</strong>
                <input
                  name="EnergyAge"
                  type="number"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  className="form-control"
                  min={0}
                  max={100}
                  placeholder="Ile masz lat?"
                />
                {errors.EnergyAge && (
                  <span className="help-block">{errors.EnergyAge}</span>
                )}
              </div>

              <div
                className={classnames("form-group", {
                  "has-error": errors.EnergyBodyWeight
                })}
              >
                <strong>Masa ciała(kg):</strong>
                <input
                  name="EnergyBodyWeight"
                  type="number"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  min={20}
                  max={300}
                  className="form-control"
                  placeholder="Ile ważysz?"
                />
                {errors.EnergyBodyWeight && (
                  <span className="help-block">{errors.EnergyBodyWeight}</span>
                )}
              </div>

              <div
                className={classnames("form-group", {
                  "has-error": errors.EnergyBodyHight
                })}
              >
                <strong>Wzrost(cm):</strong>
                <input
                  name="EnergyBodyHight"
                  type="number"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  min={100}
                  max={240}
                  className="form-control"
                  placeholder="Ile masz wzrostu?"
                />
                {errors.EnergyBodyHight && (
                  <span className="help-block">{errors.EnergyBodyHight}</span>
                )}
              </div>

              <strong>Określ swoją aktywność fizyczną:</strong>
              <select
                name="selectValue"
                className="form-control"
                value={this.state.selectValue}
                onChange={e => {
                  this.handleChange(e);
                }}
              >
                <option value="1.2">
                  brak akytwnosci fizycznej(praca siedząca)
                </option>
                <option value="1.3">
                  bardzo mała(praca lekka, raz w tygodnu ćwiczenia)
                </option>
                <option value="1.5">
                  średnia(3/4 razy w tygodniu ćwiczenia ficzyczne)
                </option>
                <option value="1.7">
                  duża(ponad 4 razy w tygodniu ćwiczenia ficzyczne)
                </option>
                <option value="2">
                  wysoka(praca fizyczna, bardzo cieżkie treningi)
                </option>
              </select>
              <button onClick={this.onButonClick} className="btn bodySubmit">
                OBLICZ
              </button>
            </div>

            <div className="col-xs-3 a4">
              {this.state.bmr > 0 ? (
                <div>{score}</div>
              ) : (
                <div>{information}</div>
              )}
            </div>

            <div className=" col-xs-5 a1">1</div>
          </div>
        </div>
      </div>
    );
  }
}
