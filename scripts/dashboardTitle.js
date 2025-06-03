// Editable dashboard title with localStorage
const TITLE_KEY = 'dashboardTitle';
function setInvertedTitleColor() {
  const title = document.getElementById('dashboard-title');
  if (!title) return;
  title.style.color = '#fff';
  const bg = window.getComputedStyle(document.body).backgroundColor;
  const rgb = bg.match(/\d+/g);
  if (rgb && rgb.length >= 3) {
    const [r, g, b] = rgb.map(Number);
    if (0.299 * r + 0.587 * g + 0.114 * b > 200) title.style.color = '#111';
  }
}
window.setInvertedTitleColor = setInvertedTitleColor;
export function setupDashboardTitle() {
  const container = document.querySelector('.dashboard-title-bar') || document.querySelector('header');
  if (!container) return;
  const title = localStorage.getItem(TITLE_KEY) || 'The Dashboard';
  const titleEl = document.createElement('h1');
  titleEl.id = 'dashboard-title';
  titleEl.textContent = title;
  titleEl.style.cursor = 'pointer';
  titleEl.onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = titleEl.textContent;
    input.id = 'dashboard-title-input';
    input.style.fontSize = '2.3em';
    input.style.width = 'min(90vw, 480px)';
    input.style.margin = '0 auto 0.2em auto';
    input.onblur = save;
    input.onkeydown = e => { if (e.key === 'Enter') input.blur(); };
    titleEl.replaceWith(input);
    input.focus();
    input.select();
    function save() {
      const newTitle = input.value.trim() || 'The Dashboard';
      localStorage.setItem(TITLE_KEY, newTitle);
      titleEl.textContent = newTitle;
      input.replaceWith(titleEl);
    }
  };
  container.innerHTML = '';
  container.appendChild(titleEl);
  setTimeout(setInvertedTitleColor, 100);
  window.addEventListener('resize', setInvertedTitleColor);
}
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', setupDashboardTitle);
}
