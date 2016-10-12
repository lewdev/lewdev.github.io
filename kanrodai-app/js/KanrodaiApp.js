var map, kanrodaiApp,
KANRODAI_LOC = {
  lat : 34.60119673714936,
  lng : 135.84321758174895
},
//Diamond Head lookout
DEFAULT_USER_LOC = {
    lat: 21.2869588443271,
    lng: -157.68656843825454
};

/**
 * This is called back by the Google Maps script when it is finished initializing.
 */
window.initMap = function() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom : 15, // Sets zoom level (0-21)
    center : KANRODAI_LOC,
    mapTypeControl : true, // allows you to select map type eg. map or satellite
    navigationControlOptions : {
      style : google.maps.NavigationControlStyle.SMALL // sets map controls size eg. zoom
    },
    mapTypeId : google.maps.MapTypeId.SATELLITE // sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
  });
  kanrodaiApp = new KanrodaiApp();
  kanrodaiApp.initialize();
};

function KanrodaiApp() {
  var thisRef = this;
  /**
   * @private
   * @type {google.maps.Marker}
   */
  thisRef.kanrodaiMarker = null;
  /**
   * @private
   * @type {google.maps.InfoWindow}
   */
  thisRef.kanrodaiInfowindow = null;
  /**
   * @private
   * @type {google.maps.Marker}
   */
  thisRef.userLocMarker = null;
  /**
   * @private
   * @type {google.maps.InfoWindow}
   */
  thisRef.userInfowindow = null;
  /**
   * @private
   * @type {Array<number>}
   */
  thisRef.kanrodaiPath = null;
};

/**
 * 
 * @public
 * @this {KanrodaiApp}
 */
KanrodaiApp.prototype.initialize = function() {
  var thisRef = this;

  this.kanrodaiMarker = new google.maps.Marker({
    position : KANRODAI_LOC,
    icon : "images/kanrodai-30x30.png",
    title : 'The Kanrodai!',
    map : map
  });

  this.kanrodaiInfowindow = new google.maps.InfoWindow({
    content : '<h2>The Kanrodai</h2>Learn more about the Kanrodai '
        + '<a href="http://en.tenrikyo-resource.com/wiki/Kanrodai" target="_blank">here</a>.'
  });
  this.kanrodaiMarker.addListener('click', function() {
    thisRef.kanrodaiInfowindow.open(map, thisRef.kanrodaiMarker);
  });

  this.userLocMarker = new google.maps.Marker({
    position : DEFAULT_USER_LOC,
    title : 'You are here!',
    icon : "images/happi-coat-30x30.png",
    draggable : true,
    map : map
  });
  google.maps.event.addListener(this.userLocMarker, "dragend", function() {
    var newLoc = {
      lat : this.getPosition().lat(),
      lng : this.getPosition().lng()
    };
    thisRef.onLocationChanged(newLoc);
  });
  this.userInfowindow = new google.maps.InfoWindow({
    content : "<h2>You're here!</h2>You may click-and-drag to move this icon to a more accurate location."
  });
  this.userLocMarker.addListener('click', function() {
    thisRef.userInfowindow.open(map, thisRef.userLocMarker);
  });

  this.kanrodaiPath = new google.maps.Polyline({
    path : [KANRODAI_LOC, DEFAULT_USER_LOC],
    geodesic : true,
    strokeColor : '#FF0000',
    strokeOpacity : 1.0,
    strokeWeight : 2,
    map: map
  });

  this.getUserLocation();
};

/**
 * @public
 * @param {Object} newLoc Stores lat and lng.
 */
KanrodaiApp.prototype.onLocationChanged = function(newLoc) {
  this.kanrodaiPath.setPath([ newLoc, KANRODAI_LOC ]);

  var distance = GreatCircle.getDistance(
        this.userLocMarker.getPosition(),
        new google.maps.LatLng(KANRODAI_LOC.lat, KANRODAI_LOC.lng)
      ),
      distanceDiv = document.getElementById("distance");
  distanceDiv.style.textAlign = "center";
  distanceDiv.style.display = "block";
  distanceDiv.style.paddingTop = "5px";
  distanceDiv.innerHTML = "<strong>Distance:</strong> "
      + this.formatDistance(distance);
};

/**
 * @private
 * @this {KanrodaiApp}
 */
KanrodaiApp.prototype.getUserLocation = function() {
  var thisRef = this;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

/**
 * @private
 * @this {KanrodaiApp}
 */
KanrodaiApp.prototype.showPosition = function(position) {
  var currentLoc = {
    lat : position.coords.latitude,
    lng : position.coords.longitude
  };

  // set map center and zoom.
  map.setCenter(currentLoc);
  map.setZoom(9);

  // set the to the user's position.
  kanrodaiApp.userLocMarker.setPosition(currentLoc);
  kanrodaiApp.onLocationChanged(currentLoc);
};

/**
 * @private
 * @param {Number} distance In meters.
 * @returns {String}
 */
KanrodaiApp.prototype.formatDistance = function(distance) {
  var units = " ft.",
      distanceStr,
      distanceMeters = distance,
      distanceFeet = distance * 3.28084; //converting the distance (meters) to feet.
  if (distanceFeet > 5280) {
      distanceFeet = distanceFeet / 5280;
      units = " mi."
  }
  distanceFeet = Math.round(distanceFeet);
  distanceStr = distanceFeet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var mUnits = " m",
      distanceMetersStr;
  if (distanceMeters > 1000) {
    distanceMeters = distance / 1000;
    mUnits = " km";
  }
  distanceMeters = Math.round(distanceMeters);
  distanceMetersStr = distanceMeters.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return distanceStr + units + "(" + distanceMetersStr + mUnits + ")";
};

/**
 * @public
 * @returns {boolean}
 */
KanrodaiApp.prototype.goToKanrodai = function() {
  map.setCenter(KANRODAI_LOC);
  map.setZoom(19);
};

/**
 * @public
 * @returns {boolean}
 */
KanrodaiApp.prototype.goToUserLoc = function() {
  map.setCenter(this.userLocMarker.getPosition());
  map.setZoom(19);
};

/**
 * @public
 * @returns {boolean}
 */
KanrodaiApp.prototype.viewPath = function() {
  var distance, midpoint;
  if (this.userLocMarker) {
    // get midpoint
    midpoint = GreatCircle.getMidPoint(this.userLocMarker.getPosition(),
        new google.maps.LatLng(KANRODAI_LOC.lat, KANRODAI_LOC.lng));
    map.setCenter(midpoint);

    // get distance
    distance = GreatCircle.getDistance(this.userLocMarker.getPosition(),
        new google.maps.LatLng(KANRODAI_LOC.lat, KANRODAI_LOC.lng));

    // get zoom level
    map.setZoom(GreatCircle.getZoomLevelByRange(distance));
  }
  return false;
};