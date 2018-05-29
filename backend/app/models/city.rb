class City < ApplicationRecord
  has_many :user_cities
  has_many :users, through: :user_cities
end
