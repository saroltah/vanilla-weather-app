let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
let units = "metric";
let currentCityName = document.querySelector("#current-city-name");
let currentDegree = document.querySelector("#current-degree");
let currentCondition = document.querySelector("#current-condition");
let currentWind = document.querySelector("#current-wind");
let currentHumid = document.querySelector("#current-humid");

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

    //searchCity

    let searchCity = document.querySelector("#search-city");
    searchCity.addEventListener("submit", chooseCity);

    function chooseCity(event) {
      event.preventDefault();
      let cityInput = document.querySelector("#type-city");
      let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
      axios.get(searchURL).then(showTemperature);
    }

    //forecast

    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    apiKey = "fda3688b1db05987dd5d07c237aecfba";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(forecastUrl).then(displayForecast);

    function displayForecast(response) {
      let forecastData = response.data.daily;
      let forecastElement = document.querySelector("#forecast");
      let forecastHTML = `<div class="row">`;

      function formatDay(timestamp) {
        let futureDate = new Date(timestamp * 1000);
        let futureDay = futureDate.getDay();
        return days[futureDay];
      }
      forecastData.forEach(function (forecastDay, index) {
        if (index < 5) {
          forecastHTML =
            forecastHTML +
            `<div class="col nextdays">
              <span class="next-dayname">${formatDay(forecastDay.dt)}</span>
              <br />
              <img
                class="next-emoji"
                id="next-emoji-0"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="icon"
              />
              <br />
              <span class="max-degree id="max-celcius">${Math.round(
                forecastDay.temp.max
              )}?? </span>
               <span class="min-degree" id="min-celcius"> ${Math.round(
                 forecastDay.temp.min
               )}?? </span>
              <br />
        <span class="next-condition">${forecastDay.weather[0].main}</span>
       
          </div>
          `;
        }
      });

      forecastElement.innerHTML = forecastHTML;
    }
  }
}

//forecast

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
