import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFlashMessage } from "./../redux/flashMessages.js";

export default function(ComposedComponent) {
  class AuthComponent extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: "error",
          text: "Musisz być zalogowany, żeby miec dostęp do kategorii"
        });
        this.context.router.push("/logowanie");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  AuthComponent.contextTypes = {
    router: PropTypes.object.isRequired
  };

  AuthComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(AuthComponent);
}
