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

currentdate.innerHTML = `${day}, ${month} ${date}`;
currenttime.innerHTML = `${hours}:${minutes} ${amOrpm}`;

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

  tempElement.innerHTML = Math.round(response.data.main.temp);
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

let city = `New York`;
let apiKey = `258df64cfd55487c8f08030e7b6a407b`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiURL).then(displayTemp);
