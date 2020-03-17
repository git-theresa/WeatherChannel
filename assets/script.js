// Required in objects:
//    * UV Index (with color representation)  
//    _Hint: Multiple API endpoints will be required._
    // Local Storage Set

// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLBase);
 



var queryTerm = [];
// $("queryTerm").textContent = userInput;
// localStorage.setItem("#searchTerm" , userInput);
// localStorage.getItem("#searchTerm" , queryTermList)=$("<div>");
// var userInput = $("queryTerm-input").val();;
// console.log(userInput);

var queryTerm=$("#searchTerm").val();;
queryTermList = JSON.parse(localStorage.getItem("queryTerm")) || [];
localStorage.getItem(queryTerm, queryTermList);
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
// Five Day Forecast
// for (var i = 0; i < response.list.length; i++){
    // console.log (response.list.length);
    //  temperature id=currentWeather

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
    // $("#currentWeather").append(humidity);
    // console.log(response.list[i].main.weather.icon);
    console.log(response.list[0].wind.speed);
    $("#wind").text(response.list[0].wind.speed);
    $("#currentWind").append("Wind: @ " + response.list[0].wind.speed  +  "mph");

// console.log(response.list[7].main.temp);
// localStorage.setItem("currentTemp", response.list[7].main.temp);
// localStorage.setItem("currentTempList", JSON.stringify([response.list[7].main.temp]));
// var currentTemp = localStorage.getItem("currentTemp") || "Nashville";
// // localStorage.getItem("currentTemp");
// var currentTempList = JSON.parse(localStorage.getItem("currentTempList")) || [];
// console.log(currentTemp, currentTempList);
// //  grab id to chang HTML response.main.temp / response.main.uv

// // set Functions

    // }
  })
}

// Main Process to run Query
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var queryTermList = localStorage.setItem("#searchTerm", JSON.stringify([queryTerm])) || "Nashville";
  var queryTerm = [];
  var queryTerm=$("#searchTerm").val();;
  localStorage.setItem("#searchTerm", queryTerm);
localStorage.setItem("searchTermList", queryTermList);


//  queryTermList = JSON.parse(localStorage.setItem("queryTerm")) || [];

  var queryTerm = $("#searchTerm").val().trim();
  $("#currentCity").append(queryTerm);
  var newURL = queryURLBase + "&q=" + queryTerm;
  runQuery(newURL);
  // runQuery("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey);
  // alert("hell0");
  console.log(queryTerm);
  console.log(newURL);
 
});



