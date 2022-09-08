function displayTemp(response) {
  let tempElement = document.querySelector(`.temperature`);
  let cityElement = document.querySelector(`.weatherLocation`);
  let mainHighElement = document.querySelector(`.mainHigh`);
  let mainLowElement = document.querySelector(`.mainLow`);
  let mainWeatherDescription = document.querySelector(`#weatherDescription`);
  let mainFeelsLikeTemp = document.querySelector(`.feelsLikeTemp`);
  let mainHumidityElement = document.querySelector(`.mainHumidity`);
  let mainWindElement = document.querySelector(`.mainWind`);

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  mainHighElement.innerHTML = Math.round(response.data.main.temp_max);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_min);
  mainWeatherDescription.innerHTML = response.data.weather[0].main;
  mainFeelsLikeTemp.innerHTML = Math.round(response.data.main.feels_like);
  mainHumidityElement.innerHTML = response.data.main.humidity;
  mainWindElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response);
}

let apiKey = `258df64cfd55487c8f08030e7b6a407b`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiURL).then(displayTemp);
