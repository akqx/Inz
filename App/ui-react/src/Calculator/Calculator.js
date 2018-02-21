import React from "react";
import { Link } from "react-router";

export default class Calculator extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="logo">KALKULATORY</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Link to="/kalkulatory/BMI" className="thumbnail">
                <div>BMI</div>
                <img alt="img" src={require("./../pic/bmi.jpeg")} />
              </Link>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <Link to="/kalkulatory/zapotrzebowania" className="thumbnail">
                <div>ZPOTRZEBOWANIA ENERGETYCZNEGO</div>
                <img alt="img" src={require("./../pic/energy.jpeg")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
