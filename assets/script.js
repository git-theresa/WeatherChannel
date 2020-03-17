// Required in objects:
//    * UV Index (with color representation)  
    // Local Storage Set

// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
// var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;

var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLBase);
// var queryURLToday = "api.openweathermap.org/data/2.5/weather?q={city name}&APPID=" + apiKey 
// var uvURLBase = "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
// console.log(uvURLBase);
var lat = 36.162; 
console.log(lat);
var lon =-86.78;
// assign inside ajax URL today (response.lat.)
 var uvURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey +  "&lat=" + lat + "&lon=" +lon;
console.log(uvURL);


var queryTerm = localStorage.getItem("searchTerm") || "Nashville";

var queryTermList = JSON.parse(localStorage.getItem("searchTermList")) || ["Nashville"];

var queryTerm=$("#searchTerm").val();;


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

// Set Current Time with Moment.js 
var now = moment().format("LLLL");
  // console.log(now);
  $("#currentTime").append(now);


var queryTerm ="";
function runQuery(queryURL){
  $.ajax({url: queryURL, method: "GET"})
    .then(function(response) {
    console.log(response);
    var temp = $("<div>");
    $("#temp").text(response.list[0].main.temp);
    var currentTemp= (response.list[0].main.temp - 273.15) * 1.8 + 32;
    console.log(currentTemp);
    $("#currentTemp").append("Temperature: "+     currentTemp.toFixed() + " F");
    console.log(response.list[0].main.temp);
    
    console.log(response.list[0].main.humidity);
    $("#humidity").text(response.list[0].main.humidity);
    $("#currentHumidity").append("Humidity: " + response.list[0].main.humidity + "  %");
   
    // console.log(response.list[i].main.weather.icon);

    console.log(response.list[0].wind.speed);
    $("#wind").text(response.list[0].wind.speed);
    $("#currentWind").append("Wind: @ " + response.list[0].wind.speed  +  "mph");
})
}





// Five Day Forecast
// for (var i = 0; i < response.list.length; i++){
    // console.log (response.list.length);
    //  temperature id=currentWeather
// console.log(response.list[7].main.temp);
// localStorage.setItem("currentTemp", response.list[7].main.temp);
// localStorage.setItem("currentTempList", JSON.stringify([response.list[7].main.temp]));
// var currentTemp = localStorage.getItem("currentTemp") || "Nashville";
// // localStorage.getItem("currentTemp");
// var currentTempList = JSON.parse(localStorage.getItem("currentTempList")) || [];
// console.log(currentTemp, currentTempList);
// //  grab id to chang HTML response.main.temp / response.main.uv
// var tomorrowSection = $("<div>");
// $("#tomorrowSection").attr("class - card");
// // <!-- <img src="..." class="card-img-top" alt="..."> -->
// var tomorrow = $("#<div>");
// $("#tomorrow").attr("class - card-body");
//   <h5 class="card-title">Tomorrow</h5>
//   <p class="card-text" id="dayTemp"></p>
//   <p class="card-text" id="dayHumidity"></p>
//   <p class="card-text" id="dayWind"></p>
//   <p class="card-text" id="dayUvIndex"></p>

  


// Main Process to run Query
$("#searchBtn").on("click", function(event){
  event.preventDefault();
   var userInput=$("#searchTerm").val();
   queryTerm = userInput;
  queryTermList.push(userInput);
 
  localStorage.setItem("searchTerm", queryTerm);
localStorage.setItem("searchTermList", JSON.stringify(queryTermList));


//  queryTermList = JSON.parse(localStorage.setItem("queryTerm")) || [];

  var queryTerm = $("#searchTerm").val().trim();
  $("#currentCity").empty();
  $("#currentCity").append(queryTerm);

  var newURL = queryURLBase + "&q=" + queryTerm;
  runQuery(newURL);
  console.log(queryTerm);
  console.log(newURL);
 
});


// new search query for each API?
// get icons
// work on local storage appending
// API for UV
// same API for 5 day?