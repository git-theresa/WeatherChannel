// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
// var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLFiveDay);
var queryURLToday = "https://api.openweathermap.org/data/2.5/weather?APPID=" + apiKey + "&q=";
var uvURLBase = "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";



// Set Moment.js
var now = moment().format("LLLL");
  // console.log(now);
  $("#currentTime").append(now);  



// Get Local Storage
    var queryTerm = localStorage.getItem("searchTerm") || "Nashville";
      var queryTermList = [];
    if (localStorage.getItem("searchTermList") != null) {
    queryTermList = JSON.parse(localStorage.getItem("searchTermList"));
    }

    // var queryTerm=$("#searchTerm").val();;
    console.log(queryTermList);
    $("#history").append(queryTerm);

function lastCitySearch() {
    for (var i = 0; i < queryTermList.length; i++) {
      var queryTermDiv = $("<div>");
      queryTermDiv.text(queryTermList[i]);
     $("#history").append(queryTermDiv);
      queryTermDiv.appendTo("#history");
    
      console.log(lastCitySearch);
    }
  }



// Current Weather Function
// var queryTerm ="";

function runQuery(){
    console.log(queryTerm);
    $.ajax({url: queryURLToday + queryTerm, method: "GET"})
    .then(function(response) {
    console.log(response);
    $("#currentTemp").empty();
    $("#currentWind").empty();
    $("#currentHumidity").empty();
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?q=" + queryTerm + "&appid=" + apiKey +  "&lat=" + lat + "&lon=" + lon;
    // "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial"

    var temp = $("<div>");
    
    $("#temp").text(response.main.temp);
    
    var currentTemp= (response.main.temp - 273.15) * 1.8 + 32;
    console.log(currentTemp);
     
    $("#currentTemp").append("Temperature: "+     currentTemp.toFixed() + " F");
   
    console.log(response.main.temp);

    console.log(response.main.humidity);
    $("#humidity").text(response.main.humidity);
    $("#currentHumidity").append("Humidity: " + response.main.humidity + "  %");
    console.log(response.wind.speed);
    $("#wind").text(response.wind.speed);
    $("#currentWind").append("Wind: @ " + response.wind.speed  +  "mph");
      // UV Index
      $.ajax({url: uvURL, method: "GET"})
      .then(function(resp) {
      console.log(resp);
       $("#uv").empty();
      $("#uv").append("UV Index: " + resp.value);
      })
    })
      // FIVE DAY FORECAST FUNCTION
      var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryTerm +"&appid=" + apiKey;    
      $.ajax({url: queryURLFiveDay, method: "GET"})
      .then(function(forecastData) {
      console.log(forecastData)
      
      $("#fiveDay").empty();
      $("#fiveDayTemp").empty();
      $("#fiveDayHumidity").empty();
      $("#fiveDayWind").empty();

     for (var i = 0; i < 5; i++) {
 
      var fiveDayFaren = Math.floor((forecastData.list[i].main.temp- 273.15) * 1.8 + 32);
      var fiveDayCard = $("<div class='card'>");
       var fiveDayTemp = $("<div>");
       fiveDayTemp.text(fiveDayFaren);
        fiveDayCard.append("<p>Temp: " + fiveDayFaren + " F</p>");
       $("#fiveDay").append(fiveDayCard);
      
      var fiveDayHumidity = $("<div>");
      fiveDayHumidity.text(forecastData.list[i].main.humidity);
      fiveDayCard.append("<p>Humidity: " + forecastData.list[i].main.humidity + "%</p>");
      $("#fiveDay").append(fiveDayCard);
       
      var fiveDayWind = $("<div>");
      fiveDayWind.text(forecastData.list[i].wind.speed);
      fiveDayCard.append("<p>Wind @ " + forecastData.list[i].wind.speed + "mph</p>");
      $("fiveDay").append(fiveDayCard);
 

      }
  });
 

}



// Main Process to run Query
  $("#searchBtn").on("click", function(event){
  event.preventDefault();
   
   var queryTermDiv = $("<div>");
   var userInput=$("#searchTerm").val();
   queryTerm = userInput;
  queryTermList.push(userInput);
  queryTermDiv.appendTo("#history");
 
  localStorage.setItem("searchTerm", queryTerm);
  localStorage.setItem("searchTermList", JSON.stringify(queryTermList));


  // var queryTerm = $("#searchTerm").val().trim();
  $("#currentCity").empty();
  $("#currentCity").append(queryTerm);

  // var newURL = queryURLFiveDay + "&q=" + queryTerm;

  runQuery();
  })
 runQuery(); 




