// Import the getWeatherData function
import getWeatherData from './getWeatherData.js';

// Function to display weather data
function displayWeather() {
  // Get the first section element to display weather info
  const weatherSection = document.querySelector('section');
  
  // Create weather cards container
  const weatherCards = document.createElement('div');
  weatherCards.className = 'weather-cards';

  getWeatherData()
    .then(data => {
      // Today
      const todayData = data.today;
      const todayIconCode = todayData.weather[0].icon;
      const todayIconUrl = `https://openweathermap.org/img/wn/${todayIconCode}@2x.png`;
      const todayTemp = `${Math.round(todayData.main.temp - 273.15)}°C`;
      const todayDesc = todayData.weather[0].description;
      const todayCard = `
        <div class="weather-card">
          <img src="${todayIconUrl}" alt="Weather icon">
          <div class="weather-info">
            <span class="weather-title">Idag</span>
            <span class="weather-temp">${todayTemp}</span>
            <span class="weather-desc">${capitalizeFirst(todayDesc)}</span>
          </div>
        </div>
      `;

      // Tomorrow
      const tomorrowData = data.tomorrow;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(12, 0, 0, 0);
      let tomorrowForecast = tomorrowData.list[0];
      let smallestDiff = Infinity;
      for (const forecast of tomorrowData.list) {
        const forecastTime = new Date(forecast.dt * 1000);
        const timeDiff = Math.abs(forecastTime - tomorrow);
        if (timeDiff < smallestDiff) {
          smallestDiff = timeDiff;
          tomorrowForecast = forecast;
        }
      }
      const tomorrowIconCode = tomorrowForecast.weather[0].icon;
      const tomorrowIconUrl = `https://openweathermap.org/img/wn/${tomorrowIconCode}@2x.png`;
      const tomorrowTemp = `${Math.round(tomorrowForecast.main.temp - 273.15)}°C`;
      const tomorrowDesc = tomorrowForecast.weather[0].description;
      const tomorrowCard = `
        <div class="weather-card">
          <img src="${tomorrowIconUrl}" alt="Weather icon">
          <div class="weather-info">
            <span class="weather-title">Imorgon</span>
            <span class="weather-temp">${tomorrowTemp}</span>
            <span class="weather-desc">${capitalizeFirst(tomorrowDesc)}</span>
          </div>
        </div>
      `;

      // Add both cards
      weatherCards.innerHTML = todayCard + tomorrowCard;
      weatherSection.innerHTML = '';
      weatherSection.appendChild(weatherCards);
    })
    .catch(error => {
      weatherCards.innerHTML = '<p>Failed to load weather data</p>';
      weatherSection.innerHTML = '';
      weatherSection.appendChild(weatherCards);
    });
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Call the display function when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayWeather);