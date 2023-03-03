const asyncRequest = require("async-request");

const getWeather = async (address) => {
  const token = process.env.API_TOKEN;
  const url = `http://api.weatherstack.com/current?access_key=${token}&query=${address}`;
  try {
    const response = await asyncRequest(url);
    const data = JSON.parse(response.body);
    return {
      success: true,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      country: data.location.country,
      region: data.location.region,
      weather_icons: data.current.weather_icons[0],
      description: data.current.weather_descriptions.join(),
      time: data.location.localtime,
      humidity: data.current.humidity,
      feelslike: data.current.feelslike
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

module.exports = {
  getWeather,
};
