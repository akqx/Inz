import React from "react";
import { Link } from "react-router";
export default class RecipeCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
        this.handleError = this.handleError.bind(this);

  }

  componentDidMount() {
    this.fetchRecipe(this.props.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.params.id !== prevProps.params.id) {
      this.fetchRecipe(this.props.params.id);
    }
  }

  fetchRecipe(id) {
    return fetch("/recipe/type/" + id)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }


  handleError(){
    console.log("NIE")
  }

  render() {

    let recipe = this.state.recipe.map((recipe, id) => (
      <div key={id}>
        <div className="col-lg-3 col-md-6 col-sm-6 ">
          <Link to={`/przepis/nr/${recipe.id}`} className=" thumbnail">
            <div className="minHigh-70">{recipe.text}</div>

            <img  alt="img" className="max_h_150" src={require(`./../pic/users/${recipe.photo_name}`)}
            
       onError= {this.handleError}
             />

          </Link>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="logo">Przepisy: </div>
        <div className="container">{recipe}</div>
      </div>
    );
  }
}
