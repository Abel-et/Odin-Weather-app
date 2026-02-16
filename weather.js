console.log('Everything is ready')

const user_location = "London"
const form = document.querySelector('form')
const input = document.getElementById('location')
const api = '2G74XVA757XKXN4KZZGDVPE7C'
fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(user_location)},CA?unitGroup=metric&key=2G74XVA757XKXN4KZZGDVPE7C&contentType=json`).then(response =>{
  if(!response){
    throw new Error('Invalid location ')
  }
  return response.json()
}).then(data=>{
  console.log('weather data :',data)
}).catch(error =>{
  console.log('Error: '+error.message)
})




/*
  Information i can gathered
    1 current condition 
    2 15 days weather forecast
    3 temp , sun rise/set , humidity , wind speed 
    4 hourly forecast and weekly forecast 

*/