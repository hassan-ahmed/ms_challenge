import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    this.setState({ loading: true });
    fetch("/api/v1/recipes")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("API not accessible.");
      })
      .then(response => {
        this.setState({
          recipes: response,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.history.push("/")
      });
  }

  renderRecipe = (recipe, index) => {
    return (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.photo_url}
            className="card-img-top"
            alt={`${recipe.title} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.title}</h5>
            <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderRecipes = () => {
    const { recipes } = this.state;
    
    if (recipes.length === 0) {
      return (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No recipes yet
          </h4>
        </div>
      );
    }

    return recipes.map((recipe, index) => this.renderRecipe(recipe, index));
  }

  render() {
    const { loading } = this.state;
    const loader = <h4>loading...</h4>;

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container">
            <h1 className="display-4">Marley Spoon</h1>
            <p className="lead text-muted">
              Recipes for every occasion
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              {loading ? loader : this.renderRecipes()}
            </div>
          </main>
        </div>
      </>
    );
  }
}


export default Home;
