Rails.application.routes.draw do
  resources :user_cities
  resources :cities
  resources :users
  get '/weather', to: 'cities#weatherData'
  post '/woe-id', to: 'cities#getWoeId'
  post '/woe-id-random-city', to: 'cities#getWoeIdRandomCity'
  post '/login-user', to: 'users#loginUser'
  post '/convert-woe', to: 'cities#alreadyHaveWoe'
  post '/convert-woe-plus-parent', to: 'cities#alreadyHaveWoePlusAddParent'
  post '/add-city', to: 'user_cities#addCity'
  post '/remove-city', to: 'user_cities#removeCity'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
