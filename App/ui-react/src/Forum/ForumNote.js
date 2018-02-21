import React from "react";
import { Link } from "react-router";

export default class ForumNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      filter_text: ""
    };
  }

  componentDidMount() {
    this.fetchNote();
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.note) !== JSON.stringify(prevState.note)) {
      this.fetchNote();
    }
  }
  fetchNote() {
    fetch("/Forum/addedTopic/note")
      .then(res => res.json())
      .then(note => this.setState({ note }));
  }
  handleChange(event) {
    this.setState({
      filter_text: event.target.value
    });
  }

  render() {
    let note_list = this.state.note
      .filter(product => {
        return product.topic.toLowerCase().indexOf(this.state.filter_text) >= 0;
      })
      .map((note, id) => (
        <Link key={id} to={`/temat/${note.id}`}>
          <div className="itemNote">
            <div className="note_name ">{note.username.split("")[0]}</div>
            <div className="note_author">{note.username}</div>
            <div className="note_content ">
              <div className="glyphicon glyphicon-envelope" /> {note.topic}
            </div>
          </div>
        </Link>
      ));

    return (
      <div>
        <textarea
          type="text"
          onChange={this.handleChange.bind(this)}
          className="form-control input-margin-50"
          placeholder="Szukaj tematu..."
          rows="1"
        />
        <div className="itemNote input-margin">
          <div className="note_author main_author">AUTOR</div>
          <div className="note_content main_topic ">TEMAT:</div>{" "}
        </div>

        <div className="input-margin">{note_list}</div>
      </div>
    );
  }
}
