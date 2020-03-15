// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLBase);
// Required in objects:
// City Name
//    * Date
//    * Icon representation
//    * Temperature
//    * Humidity
//    * Wind Speed
//    * UV Index (with color representation)  
//    _Hint: Multiple API endpoints will be required._

// set Functions
var now = moment().format("LLLL");
  // console.log(now);

  $("#currentWeather").append(now);
var queryTerm ="";
function runQuery(queryURL){
  $.ajax({url: queryURL, method: "GET"})
  .then(function(response) {
  console.log(response);

  for (var i = 0; i < response.list.length; i++){
    console.log (response.list.length);
    console.log(response.list[i].main.temp);
    console.log(response.list[i].main.humidity);
    // console.log(response.list[i].main.weather.icon);
    console.log(response.list[i].wind.speed);
    // to append onto html
    // / Convert the temp to fahrenheit
    var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;
    console.log(tempF);

    // add temp content to html
    
    var currentTempSection = $("<div>");
    $("#currentTemp").text(response.list[i].main.temp);
    $("#currentTemp").text("currentTemp" + " " + tempF.toFixed(2));
    currentTempSection.attr("id", "currentTemp" + i);
   $("currentWeather").append(currentTempSection);
    // $("currentTempSection" + i).append("<p>" + (response.list[i].main.temp) + "</p>");
    // $("#currentWeather").append(currentTempSection);
  }
    
console.log(response.list[7].main.temp);
localStorage.setItem("currentTemp", response.list[7].main.temp);
localStorage.setItem("currentTempList", JSON.stringify([response.list[7].main.temp]));

var currentTemp = localStorage.getItem("currentTemp") || "Nashville";
// localStorage.getItem("currentTemp");
var currentTempList = JSON.parse(localStorage.getItem("currentTempList")) || [];
console.log(currentTemp, currentTempList);
//  grab id to chang HTML response.main.temp / response.main.uv

// var lastSearchCity = 
})
}
     
// Main Process
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var queryTerm = $("#searchTerm").val().trim();
  var newURL = queryURLBase + "&q=" + queryTerm;
  runQuery(newURL);
  // runQuery("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey);
  // alert("hell0");
  console.log(queryTerm);
  console.log(newURL);
})
// 1. retrieve userInput and convert to variables
// 2. use variables to run ajax
// 3. Break down weather objects into usable fields
// 4. dynamically generate html content using jquery

// search parameters   
