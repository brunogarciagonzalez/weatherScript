class CitiesController < ApplicationController

  def getWoeId
    puts params
    @city_name = params[:city]

    # ================== _ 1 _ ==================
    # need to standardize name so as to check db
    # title case

    formatted_city_name_array = @city_name.split(" ").map(&:capitalize)

    # above works for all except something like 'dc' => 'Dc'.
    # lets handle exception before .join(" "):

    final_city_name =
      formatted_city_name_array.map do |word|
        if word.downcase == "dc" || word.downcase == "d.c." || word.downcase == "d.c"
          "DC"
        elsif word.downcase == "bc" || word.downcase == "b.c." || word.downcase == "b.c"
          "BC"
        else
          word
        end
      end
    .join(" ")

    # in case user inputted space @ beginning or end
    final_city_name.strip!

    # ================== _ 2 _ ==================
    # if in cities table => find woeid from db and send to self.weatherData
    # if not in cities table => construct search query,
    # =>                send query,
    # =>                persist in cities table (name, parent, woeId)

    city_find_result = City.find_by(name: final_city_name)


    if city_find_result
      # find woeid from db and send to self.weatherData
        # with a second argument of: false,
        # since in our db already has parent
      self.weatherData(
        city_find_result["woe_id"],
        false
      )
    else
      # construct search query
      # send query
      # on return => persist in db,
      #               send to self.weatherData

      parsed_city_name = final_city_name.gsub(' ', '%20')
      woe_data = RestClient.get("https://www.metaweather.com/api/location/search/?query=#{parsed_city_name}")
      json = JSON.parse(woe_data) # returns an array, even if of one object


      # if json.length == 1
      # then send to self.weatherData,
      # else need searchResults functionality

      if json.length == 0
        # there were no results

        render json: [], status: 200
      elsif json.length == 1
        # persist in db
        # send to self.weatherData, with second argument of: true,
          # so that parent is added to db
        the_city = json[0]
        City.create(name: the_city['title'], woe_id: the_city['woeid'])
        self.weatherData(the_city['woeid'], true)
      else
        # need searchResults functionality
        render json: json, status: 200
      end
    end

  end

  def alreadyHaveWoe
    @woe = params[:woeId]
    self.weatherData(@woe)
  end

  def weatherData(woeId, addParentBoolean=nil)
    # given weoID, get 5-day forecast
    all_data = RestClient.get("https://www.metaweather.com/api/location/#{woeId}/")
    json = JSON.parse(all_data)

    # given addParentBoolean, update db or not
    if addParentBoolean
      # update our db with city's parent before rendering

      City.find_by(woe_id: woeId).update(parent: json["parent"]["title"])

      render json: json, status: 200
    else
      # render results to front-end
    render json: json, status: 200
    end
  end

end
