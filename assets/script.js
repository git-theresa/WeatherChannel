// set Variables
var apiKey = "a40d2c347523bc6c683485054db1e19c";
// var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
var queryURLFiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a40d2c347523bc6c683485054db1e19c";
console.log(queryURLFiveDay);
var queryURLToday =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" + apiKey + "&q=";
var uvURLBase =
  "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";

// Set Moment.js
var now = moment().format("LLLL");
$("#currentTime").append(now);

// Get Local Storage
var queryTerm = localStorage.getItem("searchTerm") || searchTerm[0];
var queryTermList = [];
if (localStorage.getItem("searchTermList") != null) {
  queryTermList = JSON.parse(localStorage.getItem("searchTermList"));
}

function lastCitySearch() {
  for (var i = 0; i < queryTermList.length; i++) {
    var queryTermDiv = $("<div>").text(queryTerm[i]);
    queryTermDiv.text(queryTermList[i]);
    $("#history").append(queryTermDiv);
    queryTermDiv.appendTo("#history");
  }
}
$("#history").append(queryTerm);

// Current Weather Function
function runQuery() {
  $.ajax({ url: queryURLToday + queryTerm, method: "GET" }).then(function (
    response
  ) {
    $("#currentTemp").empty();
    $("#currentWind").empty();
    $("#currentHumidity").empty();
    $(".current img").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL =
      "https://api.openweathermap.org/data/2.5/uvi?q=" +
      queryTerm +
      "&appid=" +
      apiKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    var temp = $("<div>");
    $("#temp").text(response.main.temp);
    var currentTemp = (response.main.temp - 273.15) * 1.8 + 32;
    $("#currentTemp").append("Temperature: " + currentTemp.toFixed() + " F");
    $("#humidity").text(response.main.humidity);
    $("#currentHumidity").append("Humidity: " + response.main.humidity + "  %");
    $("#wind").text(response.wind.speed);
    $("#currentWind").append("Wind: @ " + response.wind.speed + "mph");
    // UV Index ajax call:
    $.ajax({ url: uvURL, method: "GET" }).then(function (resp) {
      $("#uv").empty();
      $("#uv").append("UV Index: " + resp.value);
    });
  });
  // FIVE DAY FORECAST FUNCTION
  var queryURLFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    queryTerm +
    "&appid=" +
    apiKey;
  $.ajax({ url: queryURLFiveDay, method: "GET" }).then(function (forecastData) {
    $("#fiveDay").empty();
    $("#fiveDayTemp").empty();
    $("#fiveDayHumidity").empty();
    $("#fiveDayWind").empty();
    $("#fiveDayDate").empty();
    $("#iconImg").empty();

    for (var i = 0; i < 5; i++) {
      var fiveDayFaren = Math.floor(
        (forecastData.list[i].main.temp - 273.15) * 1.8 + 32
      );
      var fiveDayCard = $("<div class='card'>");
      var fiveDayDate = $("<div>");
      $("#fiveDayDate").append(
        "<p>" +
          moment()
            .add(i + 1, "day")
            .format("dddd") +
          "</p>"
      );
      fiveDayCard.append(
        "<p>" +
          moment()
            .add(i + 1, "day")
            .format("dddd") +
          "</p>"
      );
      $("#fiveDay").append(fiveDayCard);

      var iconImg = $("<img>");
      iconImg.attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          forecastData.list[i].weather[0].icon +
          "@2x.png"
      );
      fiveDayCard.append(iconImg);

      var fiveDayTemp = $("<div>");
      fiveDayTemp.text(fiveDayFaren);
      fiveDayCard.append("<p>Temp: " + fiveDayFaren + " F</p>");
      $("#fiveDay").append(fiveDayCard);

      var fiveDayHumidity = $("<div>");
      fiveDayHumidity.text(forecastData.list[i].main.humidity);
      fiveDayCard.append(
        "<p>Humidity: " + forecastData.list[i].main.humidity + "%</p>"
      );
      $("#fiveDay").append(fiveDayCard);

      var fiveDayWind = $("<div>");
      fiveDayWind.text(forecastData.list[i].wind.speed);
      fiveDayCard.append(
        "<p>Wind @ " + forecastData.list[i].wind.speed + "mph</p>"
      );
    }
  });
}
// Main Process to run Query
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var queryTermDiv = $("<div>");
  var userInput = $("#searchTerm").val();
  queryTerm = userInput;
  queryTermList.unshift(userInput);
  queryTermDiv.appendTo("#history");

  localStorage.setItem("searchTerm", queryTerm);
  localStorage.setItem("searchTermList", JSON.stringify(queryTermList));

  $("#currentCity").empty();
  $("#currentCity").append(queryTerm);

  runQuery();
});
runQuery();
