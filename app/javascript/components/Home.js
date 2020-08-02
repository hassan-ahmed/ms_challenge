import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const focusSearch = useRef(null);

  const fetchRecipes = async (query, pageNum) => {
    const response = await axios(`/api/v1/recipes?query=${query}`);
    setRecipes(response.data);
    setLoading(false);
    setPageNum(1);
    setHasNextPage(true);
  }

  const fetchRecipesPaginated = async (query, pageNum) => {
    setLoading(true);
    const response = await axios(`/api/v1/recipes?query=${query}&page=${pageNum}`);
    if (response.data.length > 0) {
      setRecipes([...recipes, ...response.data]);
      setPageNum(pageNum);
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRecipes();
    focusSearch.current.focus();
  }, []);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadRecipes = async () => {
      await sleep(500);
      if (currentQuery) {
        fetchRecipes(query, controller);
      }
    }
    loadRecipes();

    return () => {
      currentQuery = false;
      controller.abort();
    }
  }, [query]);
 
  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => { fetchRecipesPaginated(query, pageNum + 1); },
    scrollContainer: "window"
  });
 
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

          <input 
            type="text" 
            placeholder="Search for a recipe..." 
            ref={focusSearch}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      </section>
      <div className="py-5">
        <main className="container" ref={infiniteRef}>
          <div className="row my-flex-card">
            {renderRecipes()}
            {loading && <h4>loading...</h4>}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
