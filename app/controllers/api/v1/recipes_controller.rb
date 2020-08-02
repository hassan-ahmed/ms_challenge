class Api::V1::RecipesController < ApplicationController

  # GET /recipes
  def index
    page = params[:page] || 1
    query = params[:query].present? ? params[:query] : '*'
    recipes = Recipe.search query, page: params[:page], per_page: 25

    render json: recipes, each_serializer: RecipeIndexSerializer
  end

  # GET /recipes/:id
  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end
end
