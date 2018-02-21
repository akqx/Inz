import React from "react";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import axios from "axios";
import PropTypes from "prop-types";

let error = {};

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errors: {},
      username: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => {
        this.setState({ username: users });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = this.validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      let isUser = false;
console.log("nazwa"+this.state.password)

      this.state.username.map(user => {
        if (this.state.password === user.username) {
           isUser = true;
        } else {
           isUser = false;
        }
      });
      if (!isUser) {
        error.form = "Nie ma takiego użytkownika w bazie danych";
      }
      if (isUser) {
        axios.post("/CheckUser/user/login/reset", {
          user: this.state.password
        });
        this.context.router.push("/logowanie");
      }
    }
  }

  validateInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.password)) {
      errors.password = "Wpisz hasło";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <div className="logo">PRZYPOMNIJ HASŁO</div>
        </div>
        <label className="control-label input-margin">
          Wpisz nazwę użytkownika:
        </label>

        <div
          className={classnames("form-group", { "has-error": errors.password })}
        >
          <input
            className="form-control"
            maxLength="100"
            placeholder="nazwa użytkownika..."
            name="password"
            onChange={e => {
              this.handleChange(e);
            }}
          />
          {errors.password && (
            <span className="help-block">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          {" "}
          <button onClick={this.onSubmit} className="btn my-btn btn-block">
            Resetuj hasło
          </button>
        </div>
        <label className="control-label">
          ...na Twoją skrzynkę pocztkową prześlemy zapomniane hasło
        </label>

        {error.form && <div>{error.form}</div>}
      </div>
    );
  }
}

ForgotPassword.contextTypes = {
  router: PropTypes.object.isRequired
};
