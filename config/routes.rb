Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
    end
  end

  root 'application#home'
  get '/*path' => 'application#home'
end
