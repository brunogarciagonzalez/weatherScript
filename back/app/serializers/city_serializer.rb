class CitySerializer < ActiveModel::Serializer
  has_many :users
  attributes :id, :name, :parent, :woe_id
end
