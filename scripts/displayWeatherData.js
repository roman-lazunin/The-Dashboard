// Show weather for today and tomorrow
import getWeatherData from './getWeatherData.js';
function displayWeather() {
  const section = document.querySelector('.dashboard-card-weather');
  if (!section) return;
  const cards = document.createElement('div');
  cards.className = 'weather-cards';
  getWeatherData().then(data => {
    const today = data.today;
    const tIcon = today.weather[0].icon;
    const tUrl = `https://openweathermap.org/img/wn/${tIcon}@2x.png`;
    const tTemp = `${Math.round(today.main.temp - 273.15)}°C`;
    const tDesc = today.weather[0].description;
    const todayCard = `
      <div class="weather-card">
        <img src="${tUrl}" alt="Weather icon">
        <div class="weather-info">
          <span class="weather-title">Idag</span><br>
          <span class="weather-temp">${tTemp}</span><br>
          <span class="weather-desc">${cap(tDesc)}</span>
        </div>
      </div>
    `;
    const tomorrow = data.tomorrow;
    const target = new Date();
    target.setDate(target.getDate() + 1);
    target.setHours(12, 0, 0, 0);
    let closest = tomorrow.list[0], minDiff = Infinity;
    for (const f of tomorrow.list) {
      const ft = new Date(f.dt * 1000);
      const diff = Math.abs(ft - target);
      if (diff < minDiff) { minDiff = diff; closest = f; }
    }
    const tmIcon = closest.weather[0].icon;
    const tmUrl = `https://openweathermap.org/img/wn/${tmIcon}@2x.png`;
    const tmTemp = `${Math.round(closest.main.temp - 273.15)}°C`;
    const tmDesc = closest.weather[0].description;
    const tomorrowCard = `
      <div class="weather-card">
        <img src="${tmUrl}" alt="Weather icon">
        <div class="weather-info">
          <span class="weather-title">Imorgon</span><br>
          <span class="weather-temp">${tmTemp}</span><br>
          <span class="weather-desc">${cap(tmDesc)}</span>
        </div>
      </div>
    `;
    cards.innerHTML = todayCard + tomorrowCard;
    section.innerHTML = '';
    section.appendChild(cards);
  }).catch(() => {
    cards.innerHTML = '<p>Failed to load weather data</p>';
    section.innerHTML = '';
    section.appendChild(cards);
  });
}
function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
document.addEventListener('DOMContentLoaded', displayWeather);