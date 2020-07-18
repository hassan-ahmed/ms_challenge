class Api::V1::RecipesController < ApplicationController
  before_action :set_contentful_client

  def index
    recipes_raw = @client.entries(content_type: 'recipe')
    recipes_list = recipes_raw.map { |recipe| ({ id: recipe.id, title: recipe.title, photo_url: recipe.photo.url }) }

    render json: recipes_list
  end

  def show
    recipe = @client.entry(params[:id])
    fields = recipe.fields

    json_obj = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      calories: recipe.calories
    }

    json_obj[:chef] = recipe.chef.name if recipe.respond_to? :chef
    json_obj[:tags] = recipe.tags.map { |tag| tag.name } if recipe.respond_to? :tags
    json_obj[:photo_url] = recipe.photo.url if recipe.respond_to? :photo

    render json: json_obj
  end

  private

    def set_contentful_client
      @client = Contentful::Client.new(
        space: ENV['Contentful_Space'],
        access_token: ENV['Contentful_Access_Token']
      )
    end
end
