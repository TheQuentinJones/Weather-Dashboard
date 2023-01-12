var apiKey = "b0f0b0255afd924efbe3e26981bbf98c"
var inputCity = $("#city-name").val()
var responseText = $("#city-search")
var forecastDays = ["day-1" , "day-2" , "day-3" , "day-4" , "day-5"]

function displayWeather(lat,lon) {

  var secondUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=" + apiKey;

  fetch(secondUrl) 
    .then(function (response) {

    console.log(response);

    
      return response.json();
    
  }).then(function(veryNewData) {

    console.log(veryNewData)

    $("#city-name-date").append("<h3>").val(veryNewData.city.name)

    

  })


}




function getApi() {

    var inputCity = $("#city-name").val()

    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=" + apiKey;


    fetch(requestUrl)
      .then(function (response) {
        console.log(response);

        console.log(inputCity)

        localStorage.setItem( "button-1" , inputCity)
        
        

        return response.json();

    }).then( function (data) {

      console.log(data)


      var lat = data[0].lat
      var lon = data[0].lon

      displayWeather(lat,lon)

    })
  }
 

  

  $(".btn").on("click" , getApi)

  


  