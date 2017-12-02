const request = require('request');

var getWeather = (lat,lng,callback) => {
  request({
      url: `https://api.darksky.net/forecast/ef4c4edb1de50724c8a29685f0e2a06f/${lat},${lng}`,
      json: true
  },(error,response,body) => {
  //  console.log(JSON.stringify(error,undefined, 2));
          if(error) {
            callback('Unable to connect');
          }else if (response.statusCode === 400){
            callback('Unable to fetch weather');
          } else if (response.statusCode === 200) {
            callback(undefined,{
              temperature: body.currently.temperature,
              apparentTemperature: body.currently.apparentTemperature
        });
      }
    });
      //console.log(JSON.stringify(error,undefined,2 ));//console.log(body);

    };

module.exports.getWeather = getWeather;
