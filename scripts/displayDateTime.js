// Show and update the current date and time
let dateEl, timeEl;
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  if (dateEl) dateEl.textContent = date;
  if (timeEl) timeEl.textContent = time;
}
document.addEventListener('DOMContentLoaded', () => {
  dateEl = document.getElementById('current-date');
  timeEl = document.getElementById('current-time');
  updateDateTime();
  setInterval(updateDateTime, 15000);
});