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



// var userInput = $("queryTerm-input").val();;
// console.log(userInput);

var queryTerm=$("#searchTerm").val();;

queryTermList = JSON.parse(localStorage.getItem("queryTerm")) || [];
localStorage.getItem(queryTerm, queryTermList);
// localStorage.getItem("#searchTerm" , queryTermList)=$("<div>");
console.log(queryTermList);
// ("#search").append(localStorage.getItem(queryTerm));

// local Storage


  function lastCitySearch() {
  for (var i = 0; i < queryTermList.length; i++) {
      var queryTermLi = $('<li>');
      queryTerm.text(queryTerm[i]);
      $("#history").append(queryTerm);
    
      console.log(lastCitySearch);
  }
  lastCitySearch();
  }



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
    //  temperature id=currentWeather
    var currentTemp = $("<div>");
    $("#currentTemp").text(response.list[0].main.temp);
    var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
    console.log(tempF);
    $("#currentWeather").append("Temperature: "+     tempF.toFixed() + " F");
    console.log(response.list[0].main.temp);
    var humidity = $("<div>");
    console.log(response.list[0].main.humidity);
    $("#humidity").text(response.list[0].main.humidity);
    
    $("#currentWeather").append("Humidity: " + response.list[0].main.humidity + "  %");
    // $("#currentWeather").append(humidity);
    // console.log(response.list[i].main.weather.icon);
//     console.log(response.list[i].wind.speed);
// console.log(response.list[7].main.temp);
// localStorage.setItem("currentTemp", response.list[7].main.temp);
// localStorage.setItem("currentTempList", JSON.stringify([response.list[7].main.temp]));
// var currentTemp = localStorage.getItem("currentTemp") || "Nashville";
// // localStorage.getItem("currentTemp");
// var currentTempList = JSON.parse(localStorage.getItem("currentTempList")) || [];
// console.log(currentTemp, currentTempList);
// //  grab id to chang HTML response.main.temp / response.main.uv

// // set Functions

    }
  })
}

// Main Process to run Query
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  
  // var queryTerm=$("#searchTerm").val();;
  // localStorage.setItem("#searchTerm", queryTerm);
  // var queryTermList = localStorage.setItem("#searchTerm", JSON.stringify([queryTerm])) || "Nashville";
  localStorage.setItem("#searchTerm", queryTerm);
var queryTermList = localStorage.setItem("#searchTerm", JSON.stringify([queryTerm])) || "Nashville";
  localStorage.getItem(queryTerm, queryTermList);
  // localStorage.getItem("#searchTerm" , queryTermList)=$("<div>");
  console.log(queryTermList);

  var queryTerm = $("#searchTerm").val().trim();
  var newURL = queryURLBase + "&q=" + queryTerm;
  runQuery(newURL);
  // runQuery("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey);
  // alert("hell0");
  console.log(queryTerm);
  console.log(newURL);
 
});



