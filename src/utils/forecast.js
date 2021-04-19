const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=15c87ca48b60545ad67ce8dbe82c25b5&query=" +
    latitude +
    "," +
    longitude +
    "&unit=m";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Please specify a valid location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} *C outside, also it feels like ${body.current.feelslike} *C`
      );
    }
  });
};

module.exports = forecast;
