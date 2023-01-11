var apiKey = "b0f0b0255afd924efbe3e26981bbf98c"
var inputCity = $("#city-name").val()



var responseText = $("#city-search")

function getApi() {

    var inputCity = $("#city-name").val()

    var requestUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=90210,US&appid=" + apiKey;


    fetch(requestUrl)
      .then(function (response) {
        console.log(response);

        console.log(inputCity)
        
        
        if (response.status === 200) {
            
            $("<button>").appendTo("#city-search").val(response.status)
        }
        return response.json();
    });
  }
 
  

  $(".btn").on("click" , getApi)

  


  