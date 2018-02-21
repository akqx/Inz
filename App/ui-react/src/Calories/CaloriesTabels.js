import React from "react";
import { Link } from "react-router";

export default class CaloriesTabels extends React.Component {
  render() {
    return (
      <span>
        <div>
          <div className="logo">KALORYCZNOŚĆ</div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/DaniaGotowe" className="thumbnail">
                <div>DANIA GOTOWE</div>
                <img alt="img" src={require("./../pic/food/gotowe_danie.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Drob" className="thumbnail">
                <div>DRÓB</div>
                <img alt="img" src={require("./../pic/food/drob.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/FastFood" className="thumbnail">
                <div>FAST FOOD</div>
                <img alt="img" src={require("./../pic/food/fasfood.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Grzyby" className="thumbnail">
                <div>GRZYBY</div>
                <img alt="img" src={require("./../pic/food/grzyby.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Miesa" className="thumbnail">
                <div>MIĘSA</div>
                <img alt="img" src={require("./../pic/food/mieso.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Nabial" className="thumbnail">
                <div>NABIAŁ</div>
                <img alt="img" src={require("./../pic/food/nabial.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Napoje" className="thumbnail">
                <div>NAPOJE</div>
                <img alt="img" src={require("./../pic/food/napoje.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Orzechy" className="thumbnail">
                <div>ORZECHY</div>
                <img alt="img" src={require("./../pic/food/orzechy.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Owoce" className="thumbnail">
                <div>OWOCE</div>
                <img alt="img" src={require("./../pic/food/owoce.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Przyprawy" className="thumbnail">
                <div>PRZYPRAWY</div>
                <img alt="img" src={require("./../pic/food/przyprawy.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Ryby" className="thumbnail">
                <div>RYBY</div>
                <img alt="img" src={require("./../pic/food/ryby.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Slodycze" className="thumbnail">
                <div>SŁODYCZE</div>
                <img alt="img" src={require("./../pic/food/slodycze.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Tluszcze" className="thumbnail">
                <div>TŁUSZCZE</div>
                <img alt="img" src={require("./../pic/food/tluszcze.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Warzywa" className="thumbnail">
                <div>WARZYWA</div>
                <img alt="img" src={require("./../pic/food/warzywa.jpg")} />
              </Link>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/kalorycznosc/Zboza" className="thumbnail">
                <div>ZBOŻA</div>
                <img alt="img" src={require("./../pic/food/zboza.jpg")} />
              </Link>
            </div>
          </div>
        </div>
      </span>
    );
  }
}
