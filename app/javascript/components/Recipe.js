import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const Recipe = (props) => {
  const [recipe, setRecipe] = useState({
    id: null,
    title: "",
    instructions: "",
    ingredients: [],
    total_time: null,
    yields: "",
    host: "",
    host_author: "",
    host_image_url: null,
    host_ratings: null,
    external_url: null,
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const { id: recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async (id) => {
      const response = await axios(`/api/v1/recipes/${id}`);
      setRecipe(response.data);
      setLoading(false);
    }

    fetchRecipe(recipeId);
  }, []);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        {!loading &&
          <img
            src={recipe.host_image_url}
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
              <p>Total time: {recipe.total_time} minutes</p>
              <p>Yield: {recipe.yields} </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipe.instructions}`
                }}
              />
              {recipe.host_author && <p>- Recipe by: {recipe.host_author}</p>}
              {recipe.host_ratings && <p>Rating: {recipe.host_ratings}</p>}
            </div>
            {recipe.ingredients && recipe.ingredients.length > 0 &&
              <div className="col-sm-12 col-lg-3">
                <span className="mb-2">Ingredients: </span>
                <ul className="list-group tags-list">
                  {recipe.ingredients.map((ingredient, index) => <li className="list-group-item" key={index}>{ingredient}</li>)}
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

export default Recipe;
