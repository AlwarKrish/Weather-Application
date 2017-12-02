const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});




// const yargs = require('yargs');
// const axios = require('axios');
//
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address for ehich weather is ti be checked',
//       string: true  //this forces the yargs to parse it as a string
//     }
// })
// .help()
// .alias('help','h')
// .argv;
//
// var addr = encodeURIComponent(argv.address);
// var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;
//
// axios.get(geocodeUrl).then((response) => {
//   if(response.status === 'ZERO_RESULTS') {
//     throw new Error('Unable to find that address.');
//   }
//   var lat = response.data.results[0].geometry.location.lat;
//   var lng = response.data.results[0].geometry.location.lng;
//   var weatherUrl = `https://api.darksky.net/forecast/ef4c4edb1de50724c8a29685f0e2a06f/${lat},${lng}`;;
//   console.log(response.data.results[0].formatted_address);
//   return axios.get(weatherUrl);
// }).then((response) => {
//   var temperature = response.data.currently.temperature;
//   var apparentTemperature = response.data.caurrent.apparentTemperature;
//   console.log(`it is currently ${temperature}. it feels like ${apparentTemperature}`);
// }),catch((e) => {
//   if(e.code === 'ENOTFOUND') {
//   console.log('Unable to connect to the api servers');
// }else {
//   console.log(e.message);
// }
// });
