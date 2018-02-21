import React from "react";
import validateInput from "./../Validation/CommentValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note_comment: "",
      errors: {},
      comment: []
    };
    this.onButonClick = this.onButonClick.bind(this);
  }

  componentDidMount() {
    this.fetchNote(this.props.params.id);
    fetch("/Forum/addedTopic/comment/" + this.props.params.id)
      .then(res => res.json())
      .then(comment =>
        this.setState({
          note_comment: JSON.stringify(comment[0].text).slice(1, -1)
        })
      );
  }

  fetchNote(id) {
    return fetch("/Forum/addedTopic/comment/" + id)
      .then(res => res.json())
      .then(comment => this.setState({ comment }));
  }

  handleChangeComment(e) {
    this.setState({ note_comment: e.target.value });
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
      axios.post("/Forum/addedTopic/edit/comment", {
        comment: this.state.note_comment,
        id: this.props.params.id
      });
      this.context.router.push("/temat/" + this.state.comment[0].id_forum_note);
    }
  }

  render() {
    const { errors } = this.state;

    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let userView = this.state.comment.map((comment, id) => (
      <div className="row" key={id}>
        {name === comment.username || name === "Admin" ? (
          <div>
            <div>
              <div
                className={classnames("form-group", {
                  "has-error": errors.note_comment
                })}
              >
                <textarea
                  type="text"
                  placeholder="Tekst..."
                  className="form-control input-margin"
                  maxLength="10000"
                  onChange={e => {
                    this.handleChangeComment(e);
                  }}
                  rows="6"
                  defaultValue={comment.text}
                />
                {errors.note_comment && (
                  <span className="help-block">{errors.note_comment}</span>
                )}
              </div>
            </div>
            <div
              onClick={this.onButonClick}
              className="form-control button-gray input-margin-50"
            >
              dodaj komentarz
            </div>
          </div>
        ) : null}
      </div>
    ));

    return (
      <div className="container">
        <div className="logo">
          <span className="glyphicon glyphicon-cutlery" /> Edytuj komentarz
        </div>
        <div>{userView}</div>
      </div>
    );
  }
}

EditComment.propTypes = {
  auth: PropTypes.func.isRequired
};

EditComment.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(EditComment);
