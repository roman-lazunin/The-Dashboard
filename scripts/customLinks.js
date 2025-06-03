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

  // Add-link floating button (inside the card, not absolutely positioned)
  const addBtn = document.createElement('button');
  addBtn.className = 'add-link-fab-inside';
  addBtn.type = 'button';
  addBtn.title = 'Lägg till länk';
  addBtn.innerHTML = '+';
  addBtn.onclick = () => {
    showAddLinkModal();
  };
  // Place the button at the end of the container, after the list
  container.appendChild(addBtn);

  // Modal for add-link form
  function showAddLinkModal() {
    // Prevent multiple modals in the same card
    if (container.querySelector('.add-link-modal')) return;
    const modal = document.createElement('div');
    modal.className = 'add-link-modal';
    modal.innerHTML = `
      <div class="add-link-modal-content">
        <form class="add-link-form-modal">
          <input type="text" name="name" placeholder="Namn" required autocomplete="off">
          <input type="url" name="url" placeholder="https://..." required autocomplete="off">
          <button type="submit" aria-label="Lägg till" title="Lägg till" class="add-link-btn">+</button>
          <button type="button" class="add-link-cancel">Avbryt</button>
        </form>
      </div>
    `;
    // Insert modal inside the card container
    container.appendChild(modal);
    // Focus first input
    modal.querySelector('input[name="name"]').focus();
    // Cancel button
    modal.querySelector('.add-link-cancel').onclick = () => modal.remove();
    // Submit
    modal.querySelector('form').onsubmit = e => {
      e.preventDefault();
      const name = modal.querySelector('input[name="name"]').value.trim();
      const url = modal.querySelector('input[name="url"]').value.trim();
      if (name && url) {
        links.push({ name, url });
        saveLinks(links);
        renderLinksCard(section);
        modal.remove();
      }
    };
    // Close on outside click (only if click is on modal background)
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
  }

  section.appendChild(container);
}

// Auto-init if loaded as module
if (typeof window !== 'undefined') {
  window.renderLinksCard = renderLinksCard;
}
