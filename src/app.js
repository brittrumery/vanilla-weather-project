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
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

currentdate.innerHTML = `${day}, ${month} ${date},`;
currenttime.innerHTML = `${hours}:${minutes} ${amOrpm}`;

function formatDay(timestamp) {
  let weekDay = new Date(timestamp * 1000);
  let day = weekDay.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
            <div class="col">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                class="card-img-top"
                alt= ""
                id="forecast-image"
                
              />
              <div class="card-body">
                <h5 class="card-title" id="forecast-date">${formatDay(
                  forecastDay.dt
                )}</h5>
                <p class="card-text">High: <span class="forecast-high"></span>${Math.round(
                  forecastDay.temp.max
                )}</span> °F <br />Low: <span class= "forecast-low">${Math.round(
          forecastDay.temp.min
        )}</span> °F</p>
                <p class="card-text">
                  <small class="small-text" id="forecast-description">${
                    forecastDay.weather[0].main
                  }</small>
                </p>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `3febf6b86d35cc7ae137c4e09c21db07`;
  let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemp(response) {
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png
    `
  );
  currentWeatherIconElement.setAttribute(
    `alt`,
    response.data.weather[0].description
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `3febf6b86d35cc7ae137c4e09c21db07`;
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

function retrievePosition(position) {
  let apiKey = "3febf6b86d35cc7ae137c4e09c21db07";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
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

search(`New York`);
