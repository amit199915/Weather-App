const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bcea859d6444b8b95fef863d1a339485&query=' + latitude + ',' + longitude 
    // console.log(url);
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            // callback(undefined, response.body.current.weather_descriptions[0] + '. Temperature is ' + response.body.current.temperature + ' and wind speed is ' + response.body.current.wind_speed);
            callback(undefined, {
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                wind_speed: response.body.current.wind_speed,
                icon: response.body.current.weather_icons[0],
                humidity: response.body.current.humidity,
            });
        }
    })
}
module.exports = forecast;