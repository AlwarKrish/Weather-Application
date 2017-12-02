var request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve,reject) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}',
    json: true
    }, (error,response,body) => {
      if(error){
        reject('unable to connect to the google server');
      }else if(body.status === 'ZERO_RESULTS'){
        reject('Unable to find the provided address');
      }else if(body.status === 'OK'){
        resolve(undefined ,{
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      //console.log(JSON.stringify(error,undefined,2 ));//console.log(body);

    }
  });
});
};

geocodeAddress('625002').then((location) => {
  console.log(JSON.strgify(location,undefined,2));
}, (errorMessage) => {
  console.log(errorMessage);
});
