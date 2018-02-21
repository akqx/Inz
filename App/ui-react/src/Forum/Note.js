import React from "react";
import validateInput from "./../Validation/CommentValidate.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { Link } from "react-router";
import axios from "axios";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      comment: [],
      note_comment: "",
      errors: {},
      topic_id: "",
      comment_delete_id: "",
      num: 1
    };
    this.onButonClick = this.onButonClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClickComment = this.onEditClickComment.bind(this);
    this.onDeleteClickComment = this.onDeleteClickComment.bind(this);
  }

  componentDidMount() {
    this.setState({ num: this.state.num + 1 });
    this.fetchNote();
    this.fetchComment();

    var id = this.props.params.id;
    this.setState({ topic_id: id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.num) !== JSON.stringify(prevState.num)) {
      for (var i = 0; i < 2; i++) {
        this.fetchComment(this.props.params.id);
      }
    }
  }

  fetchNote() {
    return fetch("/forum/addedTopic/note/" + this.props.params.id)
      .then(res => res.json())
      .then(note => this.setState({ note }));
  }

  fetchComment() {
    return fetch("/Forum/addedTopic/note/comments/" + this.props.params.id)
      .then(res => res.json())
      .then(comment => this.setState({ comment }));
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
    this.setState({ num: this.state.num + 1 });

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      axios.post("/Forum/addedTopic/comment", this.state);
      this.inputTitle.value = "";
    }this.setState({note_comment:''})

  }

  onDeleteClick(e) {
    axios.post("/Forum/addedTopic/delete", this.state);
    this.context.router.push("/forum");
  }

  onDeleteClickComment(e, data) {
    this.setState({ num: this.state.num + 1 });
    axios.post("/Forum/addedTopic/comment/delete", { id_comment_delete: data });
  }

  onEditClickComment(e, data) {
    this.context.router.push("/edycja/komentarz/" + data);
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;

    var name;
    if (this.props.auth.user.length > 0) {
      var decoded = jwt_decode(this.props.auth.user);
      name = decoded.username;
      name = name.substring(1, name.length - 1);
    }

    let userView = (
      <div>
        <div>
          <div
            className={classnames("form-group", {
              "has-error": errors.note_comment
            })}
          >
            <textarea
              ref={el => (this.inputTitle = el)}
              type="text"
              placeholder="Tekst..."
              className="form-control input-margin"
              maxLength="10000"
              name="note_comment"
              onChange={e => {
                this.handleChange(e);
              }}
              rows="6"
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
    );

    let guestView = (
      <div>
        <Link to="/logowanie">
          {" "}
          <div className="form-control  input-margin-50">
            Aby dodać komantarz, musisz być zalogowany. Idź do strony logowania
            (klik)
          </div>
        </Link>
      </div>
    );

    let comment_list = this.state.comment.map((comment, id) => (
      <div className="input-margin row note_container" key={id}>
        <div className="itemNote ">
          <div className="note_name note_comment ">
            <div className="glyphicon glyphicon-envelope" />
          </div>
          <div className="note_author note_comment">{comment.username}</div>
          <div className="note_content date_note note_comment">
            {" "}
            Dodano: {comment.date}
          </div>
        </div>
        <div className="note_content_main">{comment.text}</div>

        {name === comment.username || name === "Admin" ? (
          <div>
            <div
              className="edit_note"
              onClick={e => this.onEditClickComment(e, comment.id)}
            >
              EDYTUJ
            </div>
            <div
              className="delete_note"
              onClick={e => this.onDeleteClickComment(e, comment.id)}
            >
              USUŃ KOMENTARZ
            </div>
          </div>
        ) : null}
      </div>
    ));

    let product_list = this.state.note.map((note, id) => (
      <div key={id+"f"}>
        <div className="row note_container">
          <div className="itemNote">
            <div className="note_name ">{note.username.split("")[0]}</div>
            <div className="note_author note_post">{note.username}</div>
            <div className="note_content note_post date_note ">
              {" "}
              Dodano: {note.date}
            </div>
          </div>
          <div className="note_topic_main">{note.topic}</div>
          <div className="note_content_main">{note.content}</div>

          {name === note.username || name === "Admin" ? (
            <div>
              <Link to={`/edycja/temat/${this.props.params.id}`}>
                {" "}
                <div className="edit_note" onClick={this.onEditC}>
                  EDYTUJ
                </div>
              </Link>
              <div className="delete_note" onClick={this.onDeleteClick}>
                USUŃ POST
              </div>
            </div>
          ) : null}
        </div>

        {comment_list}
        {isAuthenticated ? userView : guestView}
      </div>
    ));

    return (
      <div className="container">
        <div className="logo">
          <span className="glyphicon glyphicon-cutlery" /> Temat
        </div>
        <div>{product_list}</div>
      </div>
    );
  }
}


Note.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Note);
