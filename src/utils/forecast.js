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
                callback(undefined,
                    body.location.name + "," + body.location.region + "," + body.location.country + ". It is currently " +
                    body.current.weather_descriptions[0] + " with " + 
                    body.current.temperature + ". It feels like " +
                    body.current.feelslike + " degrees. The humidity is " + body.current.humidity + "%"
                );
            }
        })
   
}

module.exports = forecast;