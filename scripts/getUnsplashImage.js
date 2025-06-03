// Get a random Unsplash image URL
const UNSPLASH_KEY = 'wS6Z1gaXKuNHpVml6xxz-HTCeBgtnyOvolG262fhXRM';
async function getUnsplashImageUrl() {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}`);
    const data = await res.json();
    return data.urls && data.urls.regular ? data.urls.regular : null;
  } catch {
    return null;
  }
}
export default getUnsplashImageUrl;
