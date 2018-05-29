class DataGetter
  def self.data_getter
    all_data = RestClient.get('https://www.metaweather.com/api/location/2487889/')
    JSON.parse(all_data)
  end
end
