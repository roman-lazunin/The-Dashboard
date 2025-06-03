// Add, show, and remove custom links (saved in localStorage)
const LINKS_KEY = 'dashboardCustomLinks';
function getLinks() {
  try { return JSON.parse(localStorage.getItem(LINKS_KEY)) || []; } catch { return []; }
}
function saveLinks(links) {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
}
export function renderLinksCard(section) {
  section.innerHTML = '';
  const container = document.createElement('div');
  const list = document.createElement('ul');
  list.className = 'custom-links-list';
  const links = getLinks();
  links.forEach((link, i) => {
    const li = document.createElement('li');
    li.style.cursor = 'pointer';
    li.onclick = e => {
      if (!e.target.classList.contains('delete-link-btn')) window.open(link.url, '_blank');
    };
    const favicon = document.createElement('img');
    try { favicon.src = new URL(link.url).origin + '/favicon.ico'; } catch { favicon.src = ''; }
    favicon.alt = '';
    favicon.className = 'link-favicon';
    favicon.onerror = function() { this.style.display = 'none'; };
    li.appendChild(favicon);
    const span = document.createElement('span');
    span.textContent = link.name;
    span.className = 'custom-link-text';
    li.appendChild(span);
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Ta bort');
    delBtn.className = 'delete-link-btn';
    delBtn.onclick = e => {
      e.stopPropagation();
      links.splice(i, 1);
      saveLinks(links);
      renderLinksCard(section);
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  container.appendChild(list);
  const addBtn = document.createElement('button');
  addBtn.className = 'add-link-fab-inside';
  addBtn.type = 'button';
  addBtn.title = 'Lägg till länk';
  addBtn.innerHTML = '+';
  addBtn.onclick = () => { showAddLinkModal(); };
  container.appendChild(addBtn);
  function showAddLinkModal() {
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
    container.appendChild(modal);
    modal.querySelector('input[name="name"]').focus();
    modal.querySelector('.add-link-cancel').onclick = () => modal.remove();
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
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
  }
  section.appendChild(container);
}
if (typeof window !== 'undefined') {
  window.renderLinksCard = renderLinksCard;
}
