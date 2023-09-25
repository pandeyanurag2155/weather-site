const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW51cmFnMjE1NSIsImEiOiJjbGw3dmUybGUwbmg0M25zNmQ4ZnQ1NnV4In0.QxoMItLVr9a2TusPhsJByw&limit=1'
 
          request({url:url , json: true},(error,{body})=>{
                  if(error){
                   callback('unable to connect service!!!' , undefined)
                  }
                  else if(body.features.length==0){
                   callback('unable to get location',undefined)
                  }
                  else{
                   callback(undefined,{
                     latitude :body.features[0].center[1],
                     longitude :body.features[0].center[0],
                     location: body.features[0].place_name
                   })
                  }
          })
   }
 
   module.exports=geocode