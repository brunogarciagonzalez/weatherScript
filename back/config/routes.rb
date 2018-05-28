Rails.application.routes.draw do
  resources :user_cities
  resources :cities
  resources :users
  get '/weather', to: 'cities#weatherData'
  post '/woe-id', to: 'cities#getWoeId'
  post '/login-user', to: 'users#loginUser'
  post '/convert-woe', to: 'cities#alreadyHaveWoe'
  post '/convert-woe-plus-parent', to: 'cities#alreadyHaveWoePlusAddParent'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
