let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
let units = "metric";
let currentCityName = document.querySelector("#current-city-name");
let currentDegree = document.querySelector("#current-degree");
let currentCondition = document.querySelector("#current-condition");
let currentWind = document.querySelector("#current-wind");
let currentHumid = document.querySelector("#current-humid");

let changeCelcius = document.querySelector("#celsius");
let changeFharenheit = document.querySelector("#fharenheit");

//opening page

navigator.geolocation.getCurrentPosition(showPlace);

function showPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);

  function showTemperature(response) {
    currentCityName.innerHTML = response.data.name;
    currentDegree.innerHTML = Math.round(response.data.main.temp);
    currentCondition.innerHTML = response.data.weather[0].description;
    currentWind.innerHTML = `Wind: ${Math.round(
      response.data.wind.speed
    )} km/h`;
    currentHumid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let CurrentEmoji = document.querySelector(`#current-emoji`);
    CurrentEmoji.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    CurrentEmoji.setAttribute("alt", `${response.data.weather[0].description}`);

    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(forecastUrl).then(displayForecast);

    //searchCity

    let searchCity = document.querySelector("#search-city");
    searchCity.addEventListener("submit", chooseCity);

    function chooseCity(event) {
      event.preventDefault();
      let cityInput = document.querySelector("#type-city");
      let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
      axios.get(searchURL).then(showTemperature);
    }

    //celsius to fharenheit

    changeFharenheit.classList.add("link-like");
    changeCelcius.classList.remove("link-like");

    changeCelcius.addEventListener("click", convertCelsius);
    function convertCelsius(event) {
      event.preventDefault();
      changeCelcius.classList.remove("link-like");
      changeFharenheit.classList.add("link-like");
      currentDegree.innerHTML = Math.round(response.data.main.temp);
    }

    changeFharenheit.addEventListener("click", convertFharenheit);
    function convertFharenheit(event) {
      event.preventDefault();
      changeFharenheit.classList.remove("link-like");
      changeCelcius.classList.add("link-like");
      currentDegree.innerHTML = Math.round(
        response.data.main.temp * 1.8 + 32.0
      );
    }
  }
}

//forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let futureDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  futureDays.forEach(function (futureDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
              <span class="next-dayname">${futureDay}</span>
              <br />
              <img
                class="next-emoji"
                id="next-emoji-0"
                src="http://openweathermap.org/img/wn/01d@2x.png"
                alt="icon"
              />

              <br />
              <span class="next-degree">0  1</span>
              <br />
        <span class="next-condition">Condi</span>
       
          </div>
          `;
  });

  forecastElement.innerHTML = forecastHTML;
}
//date

let now = new Date();

let currentDay = document.querySelector("#current-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
currentDay.innerHTML = days[now.getDay()];
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = `${now.getHours()} : ${now.getMinutes()}`;
