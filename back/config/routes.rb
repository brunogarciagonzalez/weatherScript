Rails.application.routes.draw do
  resources :user_cities
  resources :cities
  resources :users
  get '/weather', to: 'cities#weatherData'
  post '/woe-id', to: 'cities#getWoeId'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
