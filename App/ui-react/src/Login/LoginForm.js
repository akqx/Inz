import React from "react";
import validateInput from "./../Validation/LoginValidate.js";
import TextFieldGroup from "./../FieldGroup/TextFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "./loginActions.js";
import { addFlashMessage } from "./../redux/flashMessages.js";
import { Link } from "react-router";

let error = {};
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: "",
      password: "",
      errors: {},
      username: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => {
        this.setState({ username: users });
      });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });

      this.props.login(this.state);
      let isUser = false;
      this.state.username.map(user => {
        if (this.state.nick === user.username && this.state.password === user.password){
         isUser = true;
        }
      });
      if (!isUser) {
        error.form = "Niepoprawne dane. Zaloguj się jeszcze raz.";
      }
      if (isUser) {
        this.props.addFlashMessage({
          type: "success",
          text: "Zalogowałeś się "
        });
        this.context.router.push("/przepisy");
      }
    }
  }

  render() {
    const { errors, nick, password } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="input-margin">
            <div className="logo">
              <span className="glyphicon glyphicon-log-in" /> ZALOGUJ SIĘ
            </div>
          </div>
          <div className="myModal container">
            <TextFieldGroup
              field="nick"
              label="Nazwa użytkownika:"
              value={nick}
              error={errors.nick}
              onChange={this.onChange}
              placeholder="Wpisz nazwę użytkownika..."
            />

            <TextFieldGroup
              field="password"
              label="Hasło użytkownika:"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
              placeholder="Wpisz hasło użytkownika..."
            />
            <div className="form-group">
              {" "}
              <button className="btn my-btn btn-block">
                <span className="glyphicon glyphicon-off" />Logowanie
              </button>
            </div>
            {error.form && (
              <div className="alert alert-danger">{error.form}</div>
            )}
          </div>
        </form>

        <div className="modal-footer top-buffer">
          <p className="container">
            Nie pamiętasz hasła?{" "}
            <Link to="/logowanie/przypomnij"> PRZYPOMNIJ</Link>
          </p>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login, addFlashMessage })(LoginForm);
