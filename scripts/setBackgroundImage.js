// Set the background image using Unsplash
import getUnsplashImageUrl from './getUnsplashImage.js';

// Use saved image if there is one
const saved = localStorage.getItem('dashboardBgImage');
if (saved) {
  document.body.classList.add('dashboard-bg');
  document.body.style.backgroundImage = `url('${saved}')`;
} else {
  document.body.classList.remove('dashboard-bg');
}

async function setBackgroundImage() {
  const url = await getUnsplashImageUrl();
  if (!url) return;
  const img = new window.Image();
  img.src = url;
  img.onload = function() {
    document.body.classList.add('dashboard-bg');
    document.body.style.backgroundImage = `url('${url}')`;
    localStorage.setItem('dashboardBgImage', url);
    if (typeof window.setInvertedTitleColor === 'function') {
      setTimeout(() => window.setInvertedTitleColor(), 100);
    }
  };
}

// Add event listener for refresh button
const btn = document.getElementById('refresh-image-btn');
if (btn) btn.addEventListener('click', setBackgroundImage);

export default setBackgroundImage;
