import React from "react";
import { Link } from "react-router";
import ForumNote from "./ForumNote";

const Forum = props => {
  return (
    <div>
      <div className="logo">Forum</div>
      <div className="container">
        <div className="container">
          <div className="row">
            <Link to="/forum">
              <p className="information_after  col-lg-6 col-md-6 col-sm-6">
                Tematy <span className="glyphicon glyphicon-arrow-down" />
              </p>{" "}
            </Link>
            <Link to="/dodajtemat">
              <p className="information_after  col-lg-6 col-md-6 col-sm-6">
                Dodaj temat <span className="glyphicon glyphicon-book" />
              </p>{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="container" />

      <ForumNote />
    </div>
  );
};

export default Forum;
