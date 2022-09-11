let now = new Date();

let currentdate = document.querySelector(".todayDate");
let currenttime = document.querySelector(".time");

let date = now.getDate();
let hours = now.getHours() % 12 || 12;
if (hours < 10) {
  hours = `0${hours}`;
}
let amOrpm = now.getHours() < 12 ? "AM" : "PM";
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

currentdate.innerHTML = `${day}, ${month} ${date},`;
currenttime.innerHTML = `${hours}:${minutes} ${amOrpm}`;

function displayTemp(response) {
  console.log(response);
  let tempElement = document.querySelector(`.temperature`);
  let cityElement = document.querySelector(`.weatherLocation`);
  let mainHighElement = document.querySelector(`.mainHigh`);
  let mainLowElement = document.querySelector(`.mainLow`);
  let mainWeatherDescription = document.querySelector(`#weatherDescription`);
  let mainFeelsLikeTemp = document.querySelector(`.feelsLikeTemp`);
  let mainHumidityElement = document.querySelector(`.mainHumidity`);
  let mainWindElement = document.querySelector(`.mainWind`);
  let currentWeatherIconElement = document.querySelector(`#currentWeatherIcon`);

  fahrenheitTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(fahrenheitTemp);
  cityElement.innerHTML = response.data.name;
  mainHighElement.innerHTML = Math.round(response.data.main.temp_max);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_min);
  mainWeatherDescription.innerHTML = response.data.weather[0].description;
  mainFeelsLikeTemp.innerHTML = Math.round(response.data.main.feels_like);
  mainHumidityElement.innerHTML = response.data.main.humidity;
  mainWindElement.innerHTML = Math.round(response.data.wind.speed);
  currentWeatherIconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    `alt`,
    response.data.weather[0].description
  );
}

function search(city) {
  let apiKey = `258df64cfd55487c8f08030e7b6a407b`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTemp);
}

function startSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(`#city-input`);
  celsiusLink.classList.remove(`active`);
  fahrenheitLink.classList.add(`active`);
  search(cityInputElement.value);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  fahrenheitLink.classList.remove(`active`);
  celsiusLink.classList.add(`active`);
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.remove(`active`);
  fahrenheitLink.classList.add(`active`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function updateLocalWeather(response) {
  let tempElement = document.querySelector(`.temperature`);
  let cityElement = document.querySelector(`.weatherLocation`);
  let mainHighElement = document.querySelector(`.mainHigh`);
  let mainLowElement = document.querySelector(`.mainLow`);
  let mainWeatherDescription = document.querySelector(`#weatherDescription`);
  let mainFeelsLikeTemp = document.querySelector(`.feelsLikeTemp`);
  let mainHumidityElement = document.querySelector(`.mainHumidity`);
  let mainWindElement = document.querySelector(`.mainWind`);
  let currentWeatherIconElement = document.querySelector(`#currentWeatherIcon`);

  fahrenheitTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(fahrenheitTemp);
  cityElement.innerHTML = response.data.name;
  mainHighElement.innerHTML = Math.round(response.data.main.temp_max);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_min);
  mainWeatherDescription.innerHTML = response.data.weather[0].description;
  mainFeelsLikeTemp.innerHTML = Math.round(response.data.main.feels_like);
  mainHumidityElement.innerHTML = response.data.main.humidity;
  mainWindElement.innerHTML = Math.round(response.data.wind.speed);
  currentWeatherIconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    `alt`,
    response.data.weather[0].description
  );
}
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateLocalWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", startSearch);

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonUseLocation = document.querySelector("#useLocation-button");
buttonUseLocation.addEventListener("click", getCurrentPosition);

navigator.geolocation.getCurrentPosition(retrievePosition);
search(`New York`);
