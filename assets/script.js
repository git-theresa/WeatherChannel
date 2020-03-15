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
var queryTerm ="";
function runQuery(queryURL){
  $.ajax({url: queryURL, method: "GET"})
  .then(function(response) {
    console.log(response);
})


}

     
// Main Process
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var queryTerm = $("#searchTerm").val().trim;
  var newURL = queryURLBase + "&q=" + queryTerm;
  runQuery(newURL);
  // runQuery("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey);
  alert("hell0");
  console.log(queryTerm);
  console.log(newURL);
})
// 1. retrieve userInput and convert to variables
// 2. use variables to run ajax
// 3. Break down weather objects into usable fields
// 4. dynamically generate html content using jquery

// search parameters   
