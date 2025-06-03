// scripts/setBackgroundImage.js
// Sets the background image of the whole page using Unsplash
import getUnsplashImageUrl from './getUnsplashImage.js';

// On load, use the saved image if available
const savedImage = localStorage.getItem('dashboardBgImage');
if (savedImage) {
  document.body.classList.add('dashboard-bg');
  document.body.style.backgroundImage = `url('${savedImage}')`;
} else {
  document.body.classList.remove('dashboard-bg');
}

async function setBackgroundImage() {
  // Only fetch a new image if the button is pressed (not on load)
  const imageUrl = await getUnsplashImageUrl();
  if (imageUrl) {
    document.body.classList.add('dashboard-bg');
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    localStorage.setItem('dashboardBgImage', imageUrl);
  }
}

// Add event listener for refresh button
const refreshBtn = document.getElementById('refresh-image-btn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', setBackgroundImage);
}

export default setBackgroundImage;
