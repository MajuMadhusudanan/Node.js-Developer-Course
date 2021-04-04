const request = require('request');

const forecast = (latitude,longitude,callback) => {

        const url = 'http://api.weatherstack.com/current?access_key=7547b9e5ebcd1ba58fd5d1606c765ed0&query=' + latitude + "," + longitude;  
        request({url,json:true},(error,{body})=> {
            if (error) {
                callback("Unable to connect to forecast location services!",undefined);
            }
            else if (body.error) {
                callback('Unable to find forecast location. Try another search', undefined);
            }
            else {
                callback(undefined,{
                    place: body.location.name + "/" + body.location.region + "/" + body.location.country,
                    weather_description: body.current.weather_descriptions[0],
                    current: body.current.temperature,
                    feelslike: body.current.feelslike
                });
            }
        })
   
}

module.exports = forecast;