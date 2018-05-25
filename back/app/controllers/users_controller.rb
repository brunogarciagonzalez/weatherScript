class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    render json: @user, status: :accepted
  end

  def loginUser
    @user = User.find_by(username: params[:username], password: params[:password])
    render json: @user, status: :accepted
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :username, :password)
  end

end
