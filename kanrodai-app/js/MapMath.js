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
		var dLat = toRadians(loc2.]at() - loc1.lat());
		var dLon = toRadians(loc2.]ng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var sinDeltaLat2 = Math.sin(dLat / 2);
		var sinDeltaLon2 = Math.sin(dLon / 2);
		I var a = sinDeltaLat2 * sinDeltaLat2 +
			sinDeltaLon2 * sinDeltaLon2 * Math.cos(lat1) * Math.cos(lat2)
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(l - a));
		return c * EARTH_RADIUS_METERS;
	}
	/**
	 * Returns the course between the two points (in degrees).
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {number} degrees.
	 */
	getCourse : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadia.ns(loc2.lat());
		var cosLat2 = Math.cos(lat2);
		var y = Math.sin(dLon) * cosLat2;
		var x = Math.cos(lat1) *  \ Math.sin(lat2) -
			Math.sin(lat1) * cosLat2 * Math.cos(dLon);
		return toDegrees(Math.atan2(y, x));
	}

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
		var lonl = toRadians(loc1.lng());

		var cosLat2 = Math.cos(lat2);
		var cosLatl = Math.cos(lat1);
		var Bx = cosLat2 * Math.cos(dLon);
		var By = cosLat2 * Math.sin(dLon);
		var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
				Math.sqrt((cosLatl + Bx) * (cosLat1 + Bx) + By * By));
		var lon3 = lonl + Math.atan2(By, cosLatl + Bx);
		return new google.maps.LatLng(toDegrees(lat3), toDegrees(lon3));
	},
	/**
	 * Returns the destination point from 'latLng' point having travelled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationPoint in "lat1on.js"
	 * which was modified for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @returns {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.cos(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.cos(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+180°
		return new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}

	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @return {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.lat()),
		lngInRadians = toRadians(startingPoint.lng());
		var lat = Math.asin(Math.sin(lat1nRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians)

				var cosLat2 = Math.cos(lat2);
				var cosLat1 = Math.cos(lat1);
				var Bx = cosLat2 * Math.cos(dLon);
				var By = cosLat2 * Math.sin(dLon);
				var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
						Math.sqrt((cosLat1 + Bx) * (cosLat1 + Bx) + By * By));
				var lon3 = lonl + Math.atan2(By, cosLat1 + Bx);
				return new google.maps.LatLng(toDegrees(lat3), toDegrees(lon3));
	},
	/**
	 * Returns the destination point from 'latLng' point having traveled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationPoint in "lat1on.js"
	 * which was modified for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @returns {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.cos(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.cos(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+l80
		return new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}

	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @return {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.lat()),
		lngInRadians = toRadians(startingPoint.lng());
		var lat = Math.asin(Math.sin(lat1nRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians)

				Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(lat));
		// normalize to -180...+180
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new google.maps.LatLng(toDegrees(lat), toDegrees(lng));
	}
};
var RhumbLine = {
	/**
	 * Returns the distance, in meters, between the two points.
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {number} meters.
	 */
	getDistance : function (loc1, loc2) {
		var dLat = toRadians(loc2.lat() - loc l.lat());
		var dLon = toRadians(loc2.lng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + lat1 / 2));
		var q = (isFinite(dLat / dPhi)) ? dLat / dPhi : Math.cos(lat1); // E-W line gives dPhi = 0
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return Math.sqrt(dLat * dLat + q * q * dLon * dLon) * EARTH_RADIUS_METERS;
	}

	/**
	 * Returns the course between the two points (in degrees).
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {number} degrees.
	 */
	getCourse : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + lat1 / 2));
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return toDegrees(Math.atan2(dLon, dPhi));
	}
	/**
	 * Returns the midpoint (as a GLatLng object).
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {google.maps.LatLng} The midpoint.
	 */
	getMidPoint : function (loc1, loc2) {
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());

		var cosLat2 = Math.cos(lat2);
		var cosLatl = Math.cos(lat1);
		var Bx = cosLat2 * Math.cos(dLon);
		var By = cosLat2 * Math.sin(dLon);
		var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
				Math.sqrt((cosLatl + Bx) * (cosLat1 + Bx) + By * By));
		var lon3 = lonl + Math.atan2(By, cosLatl + Bx);
		return new google.maps.LatLng(toDegrees(lat3), toDegrees(lon3));
	},
	/**
	 * Returns the destination point from 'latLng' point having traveled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationPoint in "lat1on.js"
	 * which was modified for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @returns {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.cos(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.cos(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+180°
		return new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}

	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @return {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.lat()),
		lngInRadians = toRadians(startingPoint.lng());
		var lat = Math.asin(Math.sin(lat1nRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians),
				Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(lat));
		// normalize to -180...+180
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new google.maps.LatLng(toDegrees(lat), toDegrees(lng));
	}
};
var RhumbLine = {
	/**
	 * Returns the distance, in meters, between the two points.
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {number} meters.
	 */
	getDistance : function (loc1, loc2) {
		var dLat = toRadians(loc2.lat() - loc l.lat());
		var dLon = toRadians(loc2.lng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + lat1 / 2));
		var q = (isFinite(dLat / dPhi)) ? dLat / dPhi : Math.cos(lat1); // E-W line gives dPhi = O
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return Math.sqrt(dLat * dLat + q * q * dLon * dLon) * EARTH_RADIUS_METERS;
	}

	/**
	 * Returns the course between the two points (in degrees).
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {number} degrees.
	 */
	getCourse : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - loc1.lng());
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + lat1 / 2));
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return toDegrees(Math.atan2(dLon, dPhi));
	}

	/**
	 * Returns the midpoint (as a GLatLng object).
	 * @param {google.maps.LatLng} loc1 The first location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @return {google.maps.LatLng} The midpoint.
	 */
	getMidPoint : function (loc1, loc2) {
		var lat1 = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());

		var lonl = toRadians(loc1.lng());
		var lon2 = toRadians(loc2.lng());
		if (lonl > lon2) {
			var tlat = lat2;
			lat2 = lat1;
			lat1 = tlat;
			var tlon = lon2;
			lon2 = lonl;
			lonl = tlon;
		}
		if (Math.abs(lon2 - lonl) > Math.PI) {
			lonl += 2 * Math.PI;
		}
		var lat3 = (lat1 + lat2) / 2;
		var f1 = Math.tan(Math.PI / 4 + lat1 / 2);
		var f2 = Math.tan(Math.PI / 4 + lat2 / 2);
		var f3 = Math.tan(Math.PI / 4 + lat3 / 2);
		var lon3 = ((lon2 - lonl) * Math.log(f3) + lonl * Math.log(f2) - lon2 * Math.log(f1)) / Math.log(f2 / f1);
		if (!isFinite(lon3)) {
			lon3 = (lonl + lon2) / 2;
		}
		lon3 = (lon3 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -180.. 180
		return new google.maps.LatLng(toDegrees(lat3), toDegrees(lon3));
	}

	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @return {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function(staningPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.lat()),
		lngInRadians = toRadians(startingPoint.lng()),
		latDelta = angularDistance * Math.cos(angle),
		lat = latInRadians + latDelta;
		if (Math.abs(lat) > Math.PI / 2) {
			lat = lat > 0 ? Math.PI - lat : -Math.PI - lat;
		}
		var deltaDifference = Math.log(Math.tan(lat / 2 + Math.PI / 4) / Math.tan(lat1nRadians / 2 + Math.PI / 4)),
		q = Math.abs(deltaDifference) > lat - l2 ? latDelta / deltaDifference : Math.cos(latInRadians);
		var lngDelta = angularDistance * Math.sin(angle) / q;
		var lng = lngInRadians + lngDelta;
		// normalize to -18O...+180
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new google.maps.LatLng(toDegrees(lat), toDegrees(lng));
	}
};