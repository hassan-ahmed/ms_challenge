class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :instructions, :ingredients, :total_time, :yields,
    :host, :host_author, :host_image_url, :host_ratings, :external_url,
    :language
end
