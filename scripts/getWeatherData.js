import { WEATHER_API_KEY } from '../API Keys/API_keys.js';
import { getCurrentLocation } from './getCurrentLocation.js';
import { locationCoordinates } from '../scripts/getCurrentLocation.js';

async function getWeatherData() {
  try {
    // Try to get current location, but handle geolocation errors gracefully
    try {
      await getCurrentLocation();
    } catch (geoError) {
      console.warn('Geolocation failed, using default coordinates:', geoError);
      // Do not throw, continue to use default coordinates
    }

    // Get the API URL with current coordinates or defaults
    const apiUrlToday = await getWeatherApiUrlToday();
    const apiUrlTomorrow = await getWeatherApiUrlTomorrow();

    if (!apiUrlToday || !apiUrlTomorrow) {
      throw new Error('Location coordinates not available');
    }

    // Fetch today's weather data
    const responseToday = await fetch(apiUrlToday);
    if (!responseToday.ok) {
      throw new Error('Network response for today\'s weather was not ok');
    }
    const todayData = await responseToday.json();

    // Fetch tomorrow's weather forecast data
    const responseTomorrow = await fetch(apiUrlTomorrow);
    if (!responseTomorrow.ok) {
      throw new Error('Network response for tomorrow\'s forecast was not ok');
    }
    const tomorrowData = await responseTomorrow.json();

    // Merge the data into a single object
    return {
      today: todayData,
      tomorrow: tomorrowData
    };

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

// Helper function to construct the weather API URL
async function getWeatherApiUrlToday() {
  let latitude = locationCoordinates.latitude;
  let longitude = locationCoordinates.longitude;
  if (!latitude || !longitude) {
    const response = await fetch('./scripts/defaultCoordinates.json');
    const defaultCoordinates = await response.json();
    latitude = defaultCoordinates.latitude;
    longitude = defaultCoordinates.longitude;
  }
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}

async function getWeatherApiUrlTomorrow() {
  let latitude = locationCoordinates.latitude;
  let longitude = locationCoordinates.longitude;
  if (!latitude || !longitude) {
    const response = await fetch('./scripts/defaultCoordinates.json');
    const defaultCoordinates = await response.json();
    latitude = defaultCoordinates.latitude;
    longitude = defaultCoordinates.longitude;
  }
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}

export default getWeatherData;