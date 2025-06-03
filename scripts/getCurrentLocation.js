// Get current location (latitude, longitude)
let locationCoordinates = { latitude: null, longitude: null };
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject('No geolocation');
    navigator.geolocation.getCurrentPosition(
      pos => {
        locationCoordinates.latitude = pos.coords.latitude;
        locationCoordinates.longitude = pos.coords.longitude;
        resolve(locationCoordinates);
      },
      err => reject(err)
    );
  });
}
export { getCurrentLocation, locationCoordinates };