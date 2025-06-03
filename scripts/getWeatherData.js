// Get weather data for today and tomorrow
import { WEATHER_API_KEY } from '../API Keys/API_keys.js';
import { getCurrentLocation, locationCoordinates } from './getCurrentLocation.js';

async function getWeatherData() {
  try {
    try { await getCurrentLocation(); } catch {}
    const todayUrl = await getWeatherApiUrlToday();
    const tomorrowUrl = await getWeatherApiUrlTomorrow();
    if (!todayUrl || !tomorrowUrl) throw new Error('No location');
    const today = await (await fetch(todayUrl)).json();
    const tomorrow = await (await fetch(tomorrowUrl)).json();
    return { today, tomorrow };
  } catch (e) {
    throw e;
  }
}
async function getWeatherApiUrlToday() {
  let { latitude, longitude } = locationCoordinates;
  if (!latitude || !longitude) {
    const res = await fetch('./scripts/defaultCoordinates.json');
    const def = await res.json();
    latitude = def.latitude;
    longitude = def.longitude;
  }
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}
async function getWeatherApiUrlTomorrow() {
  let { latitude, longitude } = locationCoordinates;
  if (!latitude || !longitude) {
    const res = await fetch('./scripts/defaultCoordinates.json');
    const def = await res.json();
    latitude = def.latitude;
    longitude = def.longitude;
  }
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}
export default getWeatherData;