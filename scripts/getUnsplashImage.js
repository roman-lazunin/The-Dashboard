// scripts/getUnsplashImage.js
// Simple modular function to fetch a new Unsplash image URL

const UNSPLASH_ACCESS_KEY = 'wS6Z1gaXKuNHpVml6xxz-HTCeBgtnyOvolG262fhXRM'; // Replace with your Unsplash API key

async function getUnsplashImageUrl() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Unsplash image');
    }
    const data = await response.json();
    return data.urls && data.urls.regular ? data.urls.regular : null;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}

export default getUnsplashImageUrl;
