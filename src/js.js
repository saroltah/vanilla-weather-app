let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
let cityInput = "Copenhagen";
let units = "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
axios.get(apiURL).then(showTemperature);
function showTemperature(response) {
  let currentCityName = document.querySelector("#current-city-name");
  let currentDegree = document.querySelector("#current-degree");
  let currentCondition = document.querySelector("#current-condition");
  currentCityName.innerHTML = response.data.name;
  currentDegree.innerHTML = Math.round(response.data.main.temp);
  currentCondition.innerHTML = response.data.weather[0].main;
}
