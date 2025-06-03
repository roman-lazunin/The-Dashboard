// Add, edit, and delete notes (saved in localStorage)
const NOTES_KEY = 'dashboardNotes';
function getNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || []; } catch { return []; }
}
function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}
export function renderNotesCard(section) {
  section.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'notes-card-container';
  const list = document.createElement('ul');
  list.className = 'notes-list';
  const notes = getNotes();
  notes.forEach((note, i) => {
    const li = document.createElement('li');
    li.className = 'note-item';
    const textDiv = document.createElement('div');
    textDiv.className = 'note-text';
    textDiv.textContent = note;
    textDiv.title = 'Click to edit';
    textDiv.tabIndex = 0;
    textDiv.onclick = () => startEdit(i, note, textDiv, li);
    textDiv.onkeydown = e => { if (e.key === 'Enter') startEdit(i, note, textDiv, li); };
    li.appendChild(textDiv);
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Delete note');
    delBtn.className = 'delete-note-btn';
    delBtn.onclick = e => {
      e.stopPropagation();
      notes.splice(i, 1);
      saveNotes(notes);
      renderNotesCard(section);
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  container.appendChild(list);
  const form = document.createElement('form');
  form.className = 'add-note-form';
  form.innerHTML = `
    <textarea name="note" placeholder="Add a note..." required autocomplete="off" class="add-note-input" rows="1" style="resize:none;"></textarea>
    <button type="submit" class="add-note-btn" title="Add note">+</button>
  `;
  const input = form.querySelector('textarea[name="note"]');
  input.oninput = autoResize;
  function autoResize() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
  form.onsubmit = e => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      notes.push(value);
      saveNotes(notes);
      renderNotesCard(section);
    }
    input.value = '';
    autoResize.call(input);
    input.focus();
  };
  container.appendChild(form);
  section.appendChild(container);
  function startEdit(idx, oldValue, textDiv, li) {
    const input = document.createElement('textarea');
    input.value = oldValue;
    input.className = 'edit-note-input';
    input.rows = 1;
    input.style.resize = 'none';
    input.oninput = autoResize;
    input.onblur = saveEdit;
    input.onkeydown = e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') cancelEdit();
    };
    textDiv.replaceWith(input);
    autoResize.call(input);
    input.focus();
    input.select();
    function saveEdit() {
      const newValue = input.value.trim();
      if (newValue && newValue !== oldValue) {
        notes[idx] = newValue;
        saveNotes(notes);
      }
      renderNotesCard(section);
    }
    function cancelEdit() { renderNotesCard(section); }
    function autoResize() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }
}
if (typeof window !== 'undefined') {
  window.renderNotesCard = renderNotesCard;
}
