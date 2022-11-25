navigator.geolocation.getCurrentPosition(showPlace);
function showPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
  let cityInput = "Copenhagen";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
  function showTemperature(response) {
    let currentCityName = document.querySelector("#current-city-name");
    let currentDegree = document.querySelector("#current-degree");
    let currentCondition = document.querySelector("#current-condition");
    let currentWind = document.querySelector("#current-wind");
    let currentHumid = document.querySelector("#current-humid");
    currentCityName.innerHTML = response.data.name;
    currentDegree.innerHTML = Math.round(response.data.main.temp);
    currentCondition.innerHTML = response.data.weather[0].main;
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
  }
}
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

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", chooseCity);
function chooseCity(event) {
  event.preventDefault();
  let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
  let cityInput = document.querySelector("#type-city");
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
  function showTemperature(response) {
    let currentCityName = document.querySelector("#current-city-name");
    let currentDegree = document.querySelector("#current-degree");
    let currentCondition = document.querySelector("#current-condition");
    let currentWind = document.querySelector("#current-wind");
    let currentHumid = document.querySelector("#current-humid");
    currentCityName.innerHTML = response.data.name;
    currentDegree.innerHTML = Math.round(response.data.main.temp);
    currentCondition.innerHTML = response.data.weather[0].main;
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
  }
}
