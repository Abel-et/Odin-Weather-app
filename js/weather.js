
const api = '2G74XVA757XKXN4KZZGDVPE7C'
const form = document.querySelector('form')
const city_name = document.getElementById('city-name')
let place = null
let user_location = ''


// Entry of functionality 
form.addEventListener('submit',async (event)=>{
  event.preventDefault()

  // getting the country name from user
  user_location = document.getElementById('location').value
  place = await getData(user_location)
  head_location(place)
  description(place)
  weeklyForecast(place)
  console.log(place)
  


  // send the user location to get data 
  
})

async function getData(user_location){
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(user_location)},CA?unitGroup=metric&key=2G74XVA757XKXN4KZZGDVPE7C&contentType=json`);

  if(!response){
    throw new Error('Invalid location ')
  }

  const data = await response.json()
  return data
}



function head_location(place){
 const city_name = document.getElementById('city-name')
 const weather_icon = document.querySelector('#current_condition')

//  access place object and pass the location name and icon
city_name.textContent = place.resolvedAddress
weather_icon.src = `./asset/4th Set - Color/${encodeURIComponent(place.currentConditions.icon)}.svg`
}

// display the weather discription and another infos

function description(place){
  const discrpt = document.querySelector('#discription')
  const longitude = document.querySelector('#long')
  const latitude = document.querySelector('#lang')
  const rise = document.querySelector('#rise')
  const  set = document.querySelector('#set')

  latitude.textContent = "Latitude :"+ place.latitude
  longitude.textContent = "Longitude :"+ place.longitude
  rise.textContent = "Sunrise :"+ place.currentConditions.sunrise
  set.textContent = "Sunset :" + place.currentConditions.sunrise
  discrpt.textContent = place.description

}



// creating weekly forecast un order list

function weeklyForecast(place){
  const forecast = document.querySelector('#forecasts')
  // putting an ai data to the ul list 
  // datetime
  forecast.innerHTML = ''
  for(let i = 0 ; i<15; i++){
    const dayName = new Date(place.days[i].datetime).toLocaleDateString('en-US', { weekday: 'long' })
    const ul = document.createElement('ul')
    ul.classList.add('day')

    const head = document.createElement('div')
    head.classList.add('head')

    const span = document.createElement('span')
    span.textContent = dayName
    
    const h3 = document.createElement('h3')
    h3.textContent = place.days[i].conditions

    head.appendChild(span) ;head.appendChild(h3)

    const mid_section = document.createElement('div')
    const img = document.createElement('img')
    img.src = `./asset/4th Set - Color/${encodeURIComponent(place.days[i].icon)}.svg`
    mid_section.appendChild(img)

    const foot = document.createElement('div')
    const span2 = document.createElement('span')
    span2.textContent = "Temp: "+ place.days[i].temp
    foot.appendChild(span2)

    ul.appendChild(head); ul.appendChild(mid_section);ul.appendChild(foot)
    forecast.appendChild(ul)
  }
}




