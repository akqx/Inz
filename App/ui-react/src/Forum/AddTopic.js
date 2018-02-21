import React from "react";
import validateInput from "./../Validation/AddTopicValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFlashMessage } from "./../redux/flashMessages.js";
import { Link } from "react-router";
import axios from 'axios';

class AddTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_name: "",
      topic_content: "",
      errors: {},
      username: ""
    };
    this.onButonClick = this.onButonClick.bind(this);
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
     axios.post('/Forum/addedTopic', this.state);
      this.context.router.push("/forum");

      this.props.addFlashMessage({
        type: "success",
        text: "Dodałeś temat"
      });
    }
  }

  render() {
    const { errors } = this.state;
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

        <div className="container">
          <label className="control-label input-margin-50">Nowy temat:</label>

          <div
            className={classnames("form-group", {
              "has-error": errors.topic_name
            })}
          >
            <textarea
              name="topic_name"
              type="text"
              className="form-control"
              placeholder="Nazwa..."
              onChange={e => {
                this.handleChange(e);
              }}
              rows="1"
              maxLength="100"
            />
            {errors.topic_name && (
              <span className="help-block">{errors.topic_name}</span>
            )}
          </div>

          <div
            className={classnames("form-group", {
              "has-error": errors.topic_content
            })}
          >
            <textarea
              name="topic_content"
              type="text"
              placeholder="Tekst..."
              className="form-control input-margin"
              onChange={e => {
                this.handleChange(e);
              }}
              rows="6"
            />
            {errors.topic_content && (
              <span className="help-block">{errors.topic_content}</span>
            )}
          </div>

          <div
            onChange={this.handleChange}
            onClick={this.onButonClick}
            className="form-control button-gray input-margin-50"
          >
            dodaj temat
          </div>
        </div>
      </div>
    );
  }
}

AddTopic.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};

AddTopic.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {  addFlashMessage })(AddTopic);
