const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9f3a662777ef1569c2f30f7ed6ae2dfa&units=metric`;
//         request({ url: url, json: true }, (error, response) => {
//               if(error){
//                 callback('unable to connect service!!!',undefined)
//               }
//               else if(response.body.message){
//                 callback('unable to get location!!!',undefined)
//               }
//               else{
//                 callback(undefined, response.body.list[0].weather[0].description + ".It is currently" + response.body.list[0].main.temp + " degrees out. there is a " + response.body.list[0].clouds.all + " chance of rain")
//               }
//         })

// }
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9f3a662777ef1569c2f30f7ed6ae2dfa&units=metric`;
      request({ url, json: true }, (error, {body}) => {
            if(error){
              callback('unable to connect service!!!',undefined)
            }
            else if(body.message){
              callback('unable to get location!!!',undefined)
            }
            else{
              callback(undefined,body.list[0].weather[0].description + ".It is currently " + body.list[0].main.temp + " degrees out. there is a " + body.list[0].clouds.all + " chance of rain")
            }
      })

}

module.exports=forecast;
