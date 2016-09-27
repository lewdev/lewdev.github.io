
var MAX_ZOOM = 13;
function toRadians(value) {
  return value * Math.PI / 180.0;
}
function toDegrees(value) {
  return value * 180.0 / Math.PI;
}
var EARTH_RADIUS_METERS = 6371000;
var GreatCircle = {
  /**
   * Returns the distance, in meters, between the two points.
   * @param {google.maps.LatLng} loc1 The first location.
   * @param {google.maps.LatLng} loc2 The second location.
   * @return {number} meters.
   */
  getDistance : function (loc1, loc2) {
    var dLat = toRadians(loc2.lat() - loc1.lat());
    var dLon = toRadians(loc2.lng() - loc1.lng());
    var lat1 = toRadians(loc1.lat());
    var lat2 = toRadians(loc2.lat());
    var sinDeltaLat2 = Math.sin(dLat / 2);
    var sinDeltaLon2 = Math.sin(dLon / 2);
    var a = sinDeltaLat2 * sinDeltaLat2 +
      sinDeltaLon2 * sinDeltaLon2 * Math.cos(lat1) * Math.cos(lat2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * EARTH_RADIUS_METERS;
  },
  /**
   * Returns the midpoint (as a google.maps.LatLng object).
   * @param {google.maps.LatLng} loc1 The first location.
   * @param {google.maps.LatLng} loc2 The second location.
   * @return {google.maps.LatLng} The midpoint.
   */
  getMidPoint : function (loc1, loc2) {
    var dLon = toRadians(loc2.lng() - loc1.lng());
    var lat1 = toRadians(loc1.lat());
    var lat2 = toRadians(loc2.lat());
    var lon1 = toRadians(loc1.lng());

    var cosLat2 = Math.cos(lat2);
    var cosLat1 = Math.cos(lat1);
    var Bx = cosLat2 * Math.cos(dLon);
    var By = cosLat2 * Math.sin(dLon); 
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((cosLat1 + Bx) * (cosLat1 + Bx) + By * By));
    var lon3 = lon1 + Math.atan2(By, cosLat1 + Bx);
    return new google.maps.LatLng(toDegrees(lat3), toDegrees(lon3));
  },
  getZoomLevelByRange : function(range) {
      var zoomLevel = range == 0 ? MAX_ZOOM : Math.round(Math.log(35200000 / range) / Math.log(2));
      zoomLevel = zoomLevel > MAX_ZOOM ? MAX_ZOOM : zoomLevel;
      return zoomLevel;
  }
};