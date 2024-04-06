function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
 let windSpeedElement = document.querySelector("#wind-speed");
 let timeElement = document.querySelector("#time");
 let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}">`;

  getForecast(response.data.city);

}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}: ${minutes}`;
}
function searchCity(city) {
  let apiKey = "0cfoaaa95a543f7a2fff380b463etc50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=0cfoaaa95a543f7a2fff380b463etc50`;

  axios.get(apiUrl).then(refreshweather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp + 1000);
  let days = ["sun", "mon", " tue", "wed", "thur", "fri", "sat"];
  return days[
    date.getDay()];
}
  function getForecast(city) {
    let apiUrl =`https://api.shecodes.io/weather/v1/forcast?query=${city}&key=0cfoaaa95a543f7a2fff380b463etc50`;
      axios(apiUrl).then(displayForcast);
  }

  
function displayForcast(response) {
   forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
     let forecastHtml = forecastHtml + `
      <div class="weather-forcast-day">
      <div class = "weather-forcast-date">tue </div>
      <img src="${day.condition.icon_url}" "class=weather-forcast-icon">
      <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
      <strong> ${Math.round(day.temperature.maximum)}</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
      </div>
      </div>
      `;
    }
  });
  let forcastElement = document.querySelector("#forecast");
forcastElement.innerHTML = forecastHtml;
    
  }




let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("nigeria");