import React from "react";
import validateInput from "./../Validation/ValidateInput";
import TextFieldGroup from "./../FieldGroup/TextFieldGroup";
import PropTypes from "prop-types";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: [] });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: "success",
            text: "Zarejestrowałeś się. Sprawdź czy pamietasz hasło"
          });
          this.context.router.push("/logowanie");
        },
        err => {
          this.setState({ errors: err.response.data, isLoading: false });
          this.props.addFlashMessage({
            type: "error",
            text:
              'Użytkownik o nazwie: "' +
              this.state.username +
              '" istenieje w bazie danych. Spróbuj ponownie'
          });
          console.log("Użytkownik już istnieje");
        }
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="logo">
              <span className="glyphicon glyphicon-user " /> ZAREJESTRUJ SIĘ
            </div>
          </div>

          <TextFieldGroup
            error={errors.username}
            label="Nazwa użytkownika:"
            onChange={this.onChange}
            value={this.state.username}
            placeholder="Wpisz nazwę użytkownika..."
            field="username"
            maxLength="20"
          />

          <TextFieldGroup
            error={errors.email}
            label="Podaj email:"
            onChange={this.onChange}
            value={this.state.email}
            placeholder="Podaj email..."
            field="email"
            maxLength="45"
          />

          <TextFieldGroup
            error={errors.password}
            label="Hasło:"
            onChange={this.onChange}
            value={this.state.password}
            placeholder="Podaj hasło..."
            field="password"
            type="password"
            maxLength="20"
          />

          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Powtórz hasło:"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            placeholder="Powtórz hasło..."
            field="passwordConfirmation"
            type="password"
          />

          <div className="form-group">
            <button className="btn my-btn btn-block">Zarejestruj się</button>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupForm;
