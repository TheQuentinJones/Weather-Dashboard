var apiKey = "b0f0b0255afd924efbe3e26981bbf98c"
var inputCity = $("#city-name").val()
var responseText = $("#city-search")


function displayWeather(lat,lon) {

  var secondUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=" + apiKey;

  fetch(secondUrl) 
    .then(function (newData) {

    console.log(newData);

    
      return newData.json();
    
  }).then(function(veryNewData) {

    console.log(veryNewData)


  })


}




function getApi() {

    var inputCity = $("#city-name").val()

    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=" + apiKey;


    fetch(requestUrl)
      .then(function (response) {
        console.log(response);

        console.log(inputCity)


        $("#city-search").append("<button>").val(inputCity)
        
        

        return response.json();

    }).then( function (data) {

      console.log(data)


      var lat = data[0].lat
      var lon = data[0].lon

      displayWeather(lat,lon)

    })
  }
 

  

  $(".btn").on("click" , getApi)

  


  