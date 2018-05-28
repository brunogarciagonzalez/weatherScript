class UserCitiesController < ApplicationController


  def addCity
    # using two id passed in
    # USerCity.create
    UserCity.create(user_id: params['user_city']['user_id'], city_id: params['user_city']['city_id'])


    render json: {'status': 'successfully added'}, status: 200
  end

  def removeCity
    # filter UserCity.all by current user id
    # filter those results by city id
    # destroy

    user_id = params['user_city']['user_id']
    city_id = params['user_city']['city_id']

    target = UserCity.all.select do |u_c|
      u_c.user_id == user_id
    end.select do |u_c|
      u_c.city_id == city_id
    end[0]

    if target.destroy
      render json: {'status': 'successfully removed'}, status: 200
    else
      render json: {'status': 'removal unsuccessfully '}, status: 200
    end
  end
end
