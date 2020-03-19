// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
// var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLFiveDay);
var queryURLToday = "http://api.openweathermap.org/data/2.5/weather?APPID=" + apiKey + "&q=";
var uvURLBase = "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";



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
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey +  "&lat=" + lat + "&lon=" + lon;
   
    var temp = $("<div>");
    
    $("#temp").text(response.main.temp);
    var currentTemp= (response.main.temp - 273.15) * 1.8 + 32;
    console.log(currentTemp);
     $("#temp").empty();
    $("#currentTemp").append("Temperature: "+     currentTemp.toFixed() + " F");
    console.log(response.main.temp);

    console.log(response.main.humidity);
    $("#humidity").text(response.main.humidity);
    $("#currentHumidity").append("Humidity: " + response.main.humidity + "  %");
   
    console.log(response.wind.speed);
    $("#wind").text(response.wind.speed);
    $("#currentWind").append("Wind: @ " + response.wind.speed  +  "mph");

      $.ajax({url: uvURL, method: "GET"})
      .then(function(resp) {
      console.log(resp);
      
      $("#uv").append("UV Index: " + resp.value);
     })
    })

    // Five DAY 
    $.ajax({url: queryURLFiveDay + queryTerm, method: "GET"})
    .then(function(response) {
     for (var i = 0; i < 5; i++) {
    // console.log (response.list.length);
    var temp = $("<div>");
    $("#temp").text(response.list[0].main.temp);
    // var currentTemp= (response.list[0].main.temp - 273.15) * 1.8 + 32;
    console.log(currentTemp);
    // $("#currentTemp").append("Temperature: "+     currentTemp.toFixed() + " F");
    // // console.log(response.list[0].main.temp);
    }
  });
  // console.log(response.list[0].main.humidity);
  // $("#humidity").text(response.list[0].main.humidity);
  // $("#currentHumidity").append("Humidity: " + response.list[0].main.humidity + "  %");

  // console.log(response.list[0].wind.speed);
  // $("#wind").text(response.list[0].wind.speed);
  // $("#currentWind").append("Wind: @ " + response.list[0].wind.speed  +  "mph");
   

  // $("#tomorrow").attr("class - card-body");
  //   <h5 class="card-title">Tomorrow</h5>
  //   <p class="card-text" id="dayTemp"></p>
  //   <p class="card-text" id="dayHumidity"></p>
  //   <p class="card-text" id="dayWind"></p>
  //   <p class="card-text" id="dayUvIndex"></p>


 
}

  
 




 
 






// //  grab id to chang HTML response.main.temp / response.main.uv
// var tomorrowSection = $("<div>");
// $("#tomorrowSection").attr("class - card");
// // <!-- <img src="..." class="card-img-top" alt="..."> -->
// var tomorrow = $("#<div>");
  // var lat = 36.162; 
// console.log(lat);
// var lon =-86.78;
  
// $.ajax({url: uvURL, method: "GET"})
// .then(function(response){
// $("#uv").text(response.value);
// console.log(uvURL)
// var uvURLBase ="http://api.openweathermap.org/data/2.5/uvi?appid={a40d2c347523bc6c683485054db1e19c}&lat={lat}&lon={lon}"
// var lat = response.coord.lat;
//   var lon = response.coord.lon;
//  var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey +  "&lat=" + lat + "&lon=" +lon;


  


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




