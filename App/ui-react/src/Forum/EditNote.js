import React from "react";
import validateInput from "./../Validation/AddTopicValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { addFlashMessage } from "./../redux/flashMessages.js";
import axios from "axios";
class AddTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_name: "",
      topic_content: "",
      errors: {},
      note: []
    };
    this.onButonClick = this.onButonClick.bind(this);
  }

  componentDidMount() {
    this.fetchNote(this.props.params.id);
    fetch("/Forum/addedTopic/note/" + this.props.params.id)
      .then(res => res.json())
      .then(note =>
        this.setState({
          topic_content: JSON.stringify(note[0].content).slice(1, -1),
          topic_name: JSON.stringify(note[0].topic).slice(1, -1)
        })
      );
  }

  fetchNote(id) {
    return fetch("/Forum/addedTopic/note/" + id)
      .then(res => res.json())
      .then(note => this.setState({ note }));
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
      axios.post("/Forum/addedTopic/edit/note", {
        id: this.props.params.id,
        topic: this.state.topic_name,
        content: this.state.topic_content
      });
      this.context.router.push("/forum/");
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { errors } = this.state;

    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let note_edit = this.state.note.map((product, id) => (
      <div className="row" key={id}>
        {name === product.username || name === "Admin" ? (
          <div>
            <label className="control-label input-margin-50">
              Edycja tematu z dnia: {product.date}
            </label>

            <div
              className={classnames("form-group", {
                "has-error": errors.topic_name
              })}
            >
              <textarea
                type="text"
                placeholder="Tekst..."
                className="form-control input-margin"
                name="topic_name"
                onChange={e => {
                  this.handleChange(e);
                }}
                rows="1"
                defaultValue={product.topic}
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
                type="text"
                placeholder="Tekst..."
                className="form-control input-margin"
                name="topic_content"
                onChange={e => {
                  this.handleChange(e);
                }}
                rows="6"
                defaultValue={product.content}
              />
              {errors.topic_content && (
                <span className="help-block">{errors.topic_content}</span>
              )}
            </div>

            <div
              onClick={this.onButonClick}
              className="form-control button-gray input-margin-50"
            >
              Edytuj temat
            </div>
          </div>
        ) : null}
      </div>
    ));

    return (
      <div>
        <div className="logo">Edycja tematu</div>
        <div className="container">{note_edit}</div>
      </div>
    );
  }
}

AddTopic.propTypes = {
  auth: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

AddTopic.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { addFlashMessage })(AddTopic);
