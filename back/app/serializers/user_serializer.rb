class UserSerializer < ActiveModel::Serializer
  has_many :cities
  attributes :id, :first_name, :last_name, :username, :password, :cities
end
