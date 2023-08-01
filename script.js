// var apiKey = "b0f0b0255afd924efbe3e26981bbf98c"
var apiKey = "cea924180544dde5b612be105dafb515"

var inputEl = document.querySelector("#city-name")



function displayWeather( lat, lon, thisCity, thisState, thisCountry) {

  var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

  fetch(secondUrl) 
    .then(function (response) {

    // console.log(response);

    
      return response.json();
    
  }).then(function(veryNewData) {

    console.log(veryNewData)

    const cityEl = document.querySelector("#city-name-date")
    const infoEl = document.querySelector(".temp-wind-humid")

    infoEl.innerHTML = ""

    const tempItem = document.createElement("p")
    const windItem = document.createElement("p")
    const iconItem = document.createElement("img")
    const feelsLike = document.createElement("p")

    cityEl.textContent = thisCity + ", " + thisState + ", " + thisCountry + " (" + dayjs.unix(veryNewData.current.dt).format("MM/DD/YYYY") + ")"

    tempItem.textContent = "Temp: " + veryNewData.current.temp + " F"
    windItem.textContent = "Wind Speed: " + veryNewData.current.wind_speed + " MPH"
    iconItem.setAttribute( "src" , "https://openweathermap.org/img/wn/" + veryNewData.current.weather[0].icon + "@2x.png" )
    feelsLike.textContent = "Feels Like: " + veryNewData.current.feels_like + " F"

    infoEl.append(tempItem)
    infoEl.append(iconItem)
    infoEl.append(windItem)
    infoEl.append(feelsLike)

    var cardsEl = document.querySelector(".card-container")
    cardsEl.innerHTML = ""  
    

    for ( var i = 0; i < 7; i++ ) {

      var cardEl = document.createElement("div")
      cardEl.setAttribute( "class" , "card")   
      var cardTitleEl = document.createElement("p")
      var cardPtag = document.createElement("p")
      var cardPtag2 = document.createElement("p")
      var cardPtag3 = document.createElement("h5")
      var cardIcon = document.createElement("img")

      cardTitleEl.textContent = "Temp: " + veryNewData.daily[i].temp.day + " F"
      cardPtag.textContent = "Wind Speed: " + veryNewData.daily[i].wind_speed + " MPH"
      cardPtag2.textContent = "Feels Like: " + veryNewData.daily[i].feels_like.day + " F"
      cardPtag3.textContent = "Date: (" + dayjs.unix(veryNewData.daily[i].dt).format("MM/DD/YY") + ")"
      cardIcon.setAttribute("src",  "https://openweathermap.org/img/wn/" + veryNewData.daily[i].weather[0].icon + "@2x.png")

      console.log(veryNewData.daily[0].temp.day)

      cardsEl.append(cardEl)
      cardEl.append(cardPtag3)
      cardEl.append(cardTitleEl)
      cardEl.append(cardIcon)
      cardEl.append(cardPtag)
      cardEl.append(cardPtag2)

    }


    
    inputEl.value = ""

  })


}




function getApi() {

  var inputCity = $("#city-name").val()
  

  var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=" + apiKey;  
  
  fetch(requestUrl)
    .then(function (response) {      

    return response.json();

  }).then( function (data) {

    console.log(data)

    var itExists = isValueInLocalStorage(data[0].name)     

    if (!itExists) {
      localStorage.setItem( localStorage.length + 1 , data[0].name)
      console.log(localStorage)

      var tableEL = document.querySelector(".table")
      var liEntry = document.createElement("li")
      var button = document.createElement("button")

      button.setAttribute("class", "button is-black is-normal is-fullwidth")
      button.setAttribute( "id" , data[0].name )
      button.setAttribute( "onclick", "clickEd(this.id)" )
      button.textContent = data[0].name 

      tableEL.append(liEntry)
      liEntry.append(button)
    }   
    
    var thisCountry = data[0].country
    var thisState = data[0].state
    var nameCity = data[0].name
    var lat = data[0].lat
    var lon = data[0].lon

    displayWeather( lat, lon, nameCity, thisState, thisCountry)    

  })
}

function getApiClicked(cityName) {

  var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;


  fetch(requestUrl)
    .then(function (response) {


    return response.json();

  }).then( function (data) {

    console.log(data)

    var thisCountry = data[0].country
    var thisState = data[0].state
    var lat = data[0].lat
    var lon = data[0].lon

    displayWeather(lat,lon, cityName, thisState, thisCountry)    

  })
}
 

  

$("#search-button").on("click" , getApi)

buttonCreate = () => {

  var ulEl = document.querySelector(".table")
  

  for ( i = 1; i < localStorage.length + 1; i++) {

    var liEl = document.createElement("li")
    var button = document.createElement("button")

    button.setAttribute("class", "button is-black is-normal is-fullwidth")
    button.setAttribute( "id", localStorage.getItem(i) )
    button.setAttribute( "onclick", "clickEd(this.id)" )
    button.textContent = localStorage.getItem(i)

    ulEl.append(liEl)
    liEl.append(button)
    
    
  }
}

buttonCreate()


clickEd = (clicked) => {

  getApiClicked(clicked)
  console.log(clicked)

}

function isValueInLocalStorage(value) {

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedValue = localStorage.getItem(key);
    if (storedValue.toLowerCase() === value.toLowerCase()) {
      return true;
    }
  }
  return false;
}


  


  