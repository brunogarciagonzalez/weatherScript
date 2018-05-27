class CitiesController < ApplicationController

  def getWoeId
    @city_name = params[:city]
    parsedName = @city_name.gsub(' ', '%20')
    woeData = RestClient.get("https://www.metaweather.com/api/location/search/?query=#{parsedName}")
    json = JSON.parse(woeData)
    self.weatherData(json[0]['woeid'])
  end

  def weatherData(woeId)
    all_data = RestClient.get("https://www.metaweather.com/api/location/#{woeId}/")
    json = JSON.parse(all_data)
    render json: json, status: 200
  end

end
