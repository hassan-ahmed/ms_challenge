import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        title: "",
        description: "",
        calories: null,
        tags: [],
        photo_url: null,
        chef: ""
      },
      loading: true
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/recipes/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.setState({
          recipe: response,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.history.push("/")
      });
  }

  render() {
    const { recipe, loading } = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          {!loading &&
            <img
              src={recipe.photo_url}
              alt={`${recipe.title} image`}
              className="img-fluid position-absolute"
            />
          }
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.title}
          </h1>
        </div>
        <div className="container py-5">
          {loading ?
            <h4>loading...</h4>
          :
            <div className="row">
              <div className="col-sm-12 col-lg-7">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${recipe.description}`
                  }}
                />
                {recipe.chef && <span>By: {recipe.chef}</span>}
              </div>
              {recipe.tags && recipe.tags.length > 0 &&
                <div className="col-sm-12 col-lg-3">
                  <span className="mb-2">Tags: </span>
                  <ul className="list-group tags-list">
                    {recipe.tags.map((tag, index) => <li key={index}>{tag}</li>)}
                  </ul>
                </div>
              }
            </div>
          }
          <Link to="/" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

}

export default Recipe;
