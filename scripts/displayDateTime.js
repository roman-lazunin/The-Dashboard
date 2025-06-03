/**
 * Function to display and update the current date and time in the header
 * Updates every 15 seconds (15000 milliseconds)
 */

// Elements to display date and time
let dateElement;
let timeElement;

// Function to update the date and time display
function updateDateTime() {
  const now = new Date();
  
  // Format the date: e.g., "Wednesday, April 23, 2025"
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', dateOptions);
  
  // Format the time: e.g., "14:30:45"
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
  
  // Update the content of the elements
  if (dateElement) dateElement.textContent = formattedDate;
  if (timeElement) timeElement.textContent = formattedTime;
}

// Initialize the date and time display when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the elements from the DOM
  dateElement = document.getElementById('current-date');
  timeElement = document.getElementById('current-time');
  
  // Initial update
  updateDateTime();
  
  // Set interval to update every 15 seconds
  setInterval(updateDateTime, 15000);
});