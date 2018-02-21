import React from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { userSignupRequest } from "./signupActions";
import PropTypes from "prop-types";
import { addFlashMessage } from "./../redux/flashMessages.js";

class SignUp extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div>
        <SignupForm
          userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage}
        />
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignUp);
