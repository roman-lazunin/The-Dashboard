// scripts/customLinks.js
// Handles adding, displaying, and removing custom links in a dashboard card, with localStorage persistence

const LINKS_KEY = 'dashboardCustomLinks';

function getLinks() {
  try {
    return JSON.parse(localStorage.getItem(LINKS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLinks(links) {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
}

export function renderLinksCard(section) {
  section.innerHTML = '';
  const container = document.createElement('div');

  // List
  const list = document.createElement('ul');
  list.className = 'custom-links-list';
  const links = getLinks();
  links.forEach((link, i) => {
    const li = document.createElement('li');
    // Make the whole card clickable except the cross
    li.style.cursor = 'pointer';
    li.onclick = (e) => {
      // Only open if not clicking the delete button
      if (!e.target.classList.contains('delete-link-btn')) {
        window.open(link.url, '_blank');
      }
    };
    // Favicon
    const favicon = document.createElement('img');
    try {
      const urlObj = new URL(link.url);
      favicon.src = urlObj.origin + '/favicon.ico';
    } catch {
      favicon.src = '';
    }
    favicon.alt = '';
    favicon.className = 'link-favicon';
    favicon.onerror = function() { this.style.display = 'none'; };
    li.appendChild(favicon);
    // Länk (text, inte klickbar separat)
    const span = document.createElement('span');
    span.textContent = link.name;
    span.className = 'custom-link-text';
    li.appendChild(span);
    // Kryss-knapp
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Ta bort');
    delBtn.className = 'delete-link-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      links.splice(i, 1);
      saveLinks(links);
      renderLinksCard(section);
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  container.appendChild(list);

  // Add form
  const form = document.createElement('form');
  form.className = 'add-link-form';
  form.innerHTML = `
    <input type="text" name="name" placeholder="Namn" required style="margin-right:6px;">
    <input type="url" name="url" placeholder="https://..." required style="margin-right:6px;">
    <button type="submit">Lägg till</button>
  `;
  form.onsubmit = e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const url = form.url.value.trim();
    if (name && url) {
      links.push({ name, url });
      saveLinks(links);
      renderLinksCard(section);
      form.reset();
    }
  };
  container.appendChild(form);

  section.appendChild(container);
}

// Auto-init if loaded as module
if (typeof window !== 'undefined') {
  window.renderLinksCard = renderLinksCard;
}
