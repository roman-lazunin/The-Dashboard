// Store coordinates globally
let locationCoordinates = {
  latitude: null,
  longitude: null
};

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationCoordinates.latitude = position.coords.latitude;
          locationCoordinates.longitude = position.coords.longitude;
          console.log("Latitude:", locationCoordinates.latitude);
          console.log("Longitude:", locationCoordinates.longitude);
          
          resolve(locationCoordinates);
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      const error = "Geolocation is not supported by this browser.";
      console.error(error);
      reject(new Error(error));
    }
  });
}

// Export both the function and the coordinates object
export { getCurrentLocation, locationCoordinates };