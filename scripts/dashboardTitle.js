// dashboardTitle.js
// Handles the editable dashboard title and localStorage persistence

const TITLE_KEY = 'dashboardTitle';

export function setupDashboardTitle() {
  const header = document.querySelector('header');
  if (!header) return;

  let title = localStorage.getItem(TITLE_KEY) || 'The Dashboard';

  // Create the title element
  const titleEl = document.createElement('h1');
  titleEl.id = 'dashboard-title';
  titleEl.textContent = title;
  titleEl.style.cursor = 'pointer';

  // Replace with input on click
  titleEl.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = titleEl.textContent;
    input.id = 'dashboard-title-input';
    input.style.fontSize = '2em';
    input.style.width = 'min(90vw, 400px)';
    input.style.margin = '0 auto';

    // Save on blur or Enter
    function save() {
      const newTitle = input.value.trim() || 'The Dashboard';
      localStorage.setItem(TITLE_KEY, newTitle);
      titleEl.textContent = newTitle;
      input.replaceWith(titleEl);
    }
    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      }
    });
    titleEl.replaceWith(input);
    input.focus();
    input.select();
  });

  // Insert at the top of header
  header.insertBefore(titleEl, header.firstChild);
}

// Auto-init if loaded as module
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', setupDashboardTitle);
}
