const yargs = require('yargs');
const weather = require('./weather/weather');
const geocode = require('./geocode/geocode')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address for ehich weather is ti be checked',
      string: true  //this forces the yargs to parse it as a string
    }
})
.help()
.alias('help','h')
.argv;

// console.log(argv);
// geocode.geocodeAddress(argv.address);

geocode.geocodeAddress(argv.address, (errorMessage,results) =>{
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(results.address,results.latitude,results.longitude);
    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`It is currently ${weatherResults.temperature}.It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
