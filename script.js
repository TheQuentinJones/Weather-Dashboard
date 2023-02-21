// var apiKey = "b0f0b0255afd924efbe3e26981bbf98c"
var apiKey = "cea924180544dde5b612be105dafb515"
var inputCity = $("#city-name").val()
var responseText = $("#city-search")
var forecastDays = ["day-1" , "day-2" , "day-3" , "day-4" , "day-5"]

function displayWeather(lat,lon,inputCity) {

  var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

  fetch(secondUrl) 
    .then(function (response) {

    // console.log(response);

    
      return response.json();
    
  }).then(function(veryNewData) {

    console.log(veryNewData)

    const cityEl = document.querySelector("#city-name-date")
    const tempItem = document.querySelector(".temp-wind-humid")

    cityEl.textContent = inputCity
    tempItem.textContent = veryNewData.current.temp

    console.log(veryNewData.current.temp)
    

  })


}




function getApi() {

    var inputCity = $("#city-name").val()

    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=" + apiKey;


    fetch(requestUrl)
      .then(function (response) {
        // console.log(response);

        // console.log(inputCity)

        localStorage.setItem( "button-1" , inputCity)
        
        

        return response.json();

    }).then( function (data) {

      console.log(data)


      var lat = data[0].lat
      var lon = data[0].lon

      displayWeather(lat,lon,inputCity)

    })
  }
 

  

  $(".btn").on("click" , getApi)

  


  