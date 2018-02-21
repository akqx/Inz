import React from "react";
import { Link } from "react-router";
export default class Recipes extends React.Component {
  render() {
    return (
      <div>
        <Link to="/przepisy/dodajprzepis">
          <div className="logo">
            <span className="glyphicon glyphicon-ok" /> Dodaj przepis
          </div>
        </Link>

        <p className="recipe ">ZOBACZ PRZEPISY:</p>
        <div className="alert-margin" />

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/daniaglowne" className="thumbnail">
                <div>DANIA GOTOWE</div>
                <img alt="img" src={require("./../pic/recipes/daniegłowne.jpg")} />
              </Link>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/przystawkiiprzekaski" className="thumbnail">
                <div>PRZYSTAWKI i PRZEKĄSKI</div>
                <img alt="img" src={require("./../pic/recipes/przystawki.jpeg")} />
              </Link>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/zupy" className="thumbnail">
                <div>ZUPY</div>
                <img alt="img" src={require("./../pic/recipes/zupa.jpeg")} />
              </Link>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/salatki" className="thumbnail">
                <div>SAŁATKI</div>
                <img alt="img" src={require("./../pic/recipes/salatki.jpg")} />
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/napoje" className="thumbnail">
                <div>NAPOJE</div>
                <img alt="img" src={require("./../pic/recipes/napoje.jpeg")} />
              </Link>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/deseryiciasta" className="thumbnail">
                <div>DESERY i CIASTA</div>
                <img alt="img" src={require("./../pic/recipes/slodycze.jpeg")} />
              </Link>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Link to="/przepisy/przetwory" className="thumbnail">
                <div>PRZETWORY</div>
                <img alt="img" src={require("./../pic/recipes/przetwory.jpeg")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
