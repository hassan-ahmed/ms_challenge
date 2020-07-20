import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios(`/api/v1/recipes`);
      setRecipes(response.data);
      setLoading(false);
    }

    fetchRecipes();
  }, []);

  const renderRecipe = (recipe, index) => {
    return (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.host_image_url}
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

  const renderRecipes = () => {    
    if (recipes.length === 0) {
      return (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No recipes yet
          </h4>
        </div>
      );
    }
    return recipes.map((recipe, index) => renderRecipe(recipe, index));
  }

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">Delicious Recipes</h1>
          <p className="lead text-muted">
            Recipes for every occasion
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row my-flex-card">
            {loading ?
              <h4>loading...</h4>
            :
              renderRecipes()
            }
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
