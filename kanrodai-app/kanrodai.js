var map;
var kanrodaiLoc = {lat: 34.60119673714936, lng: 135.84321758174895};
var currentLocMarker, kanrodaiPath;
function initMap() {
     map = new google.maps.Map(document.getElementById("map"), {
       zoom: 15,  //Sets zoom level (0-21)
       center: kanrodaiLoc,
       mapTypeControl: true, //allows you to select map type eg. map or satellite
       navigationControlOptions:
       {
         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
       },
       mapTypeId: google.maps.MapTypeId.SATELLITE //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
    });

    var kanrodaiMarker = new google.maps.Marker({
        position: kanrodaiLoc,
        icon: "images/kanrodai-30x30.png",
        title: 'The Kanrodai!',
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
          content: '<h2>The Kanrodai</h2>Learn more about the Kanrodai ' 
            + '<a href="http://en.tenrikyo-resource.com/wiki/Kanrodai" target="_blank">here</a>.'
        });
    kanrodaiMarker.addListener('click', function() {
        infowindow.open(map, kanrodaiMarker);
    });
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var currentLoc = {lat: position.coords.latitude, lng: position.coords.longitude};

    //set map center and zoom.
    map.setCenter(currentLoc);
    map.setZoom(9);

    var pathCoordinates = [currentLoc, kanrodaiLoc];

    kanrodaiPath = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    kanrodaiPath.setMap(map);

    //create your marker for your location!
    currentLocMarker = new google.maps.Marker({
        position: currentLoc,
        title: 'You are here!',
        icon: "images/happi-coat-30x30.png",
        draggable: true,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: "<h2>You're here!</h2>You may click-and-drag to move this icon to a more accurate location."
    });
    currentLocMarker.addListener('click', function() {
      infowindow.open(map, currentLocMarker);
    });
    onLocationChanged(currentLoc);

    google.maps.event.addListener(currentLocMarker, "dragend", function() {
        console.log("dragend");
        var newLoc = {
            lat: this.getPosition().lat(),
            lng: this.getPosition().lng()
        };
        onLocationChanged(newLoc);
    });
    currentLocMarker.setMap(map);
}

function onLocationChanged(newLoc) {
    kanrodaiPath.setPath([newLoc, kanrodaiLoc]);
    var distance = GreatCircle.getDistance(currentLocMarker.getPosition(),
            new google.maps.LatLng(kanrodaiLoc.lat, kanrodaiLoc.lng)
        ),
        distanceDiv = document.getElementById("distance");
    distanceDiv.style.textAlign = "center";
    distanceDiv.style.display = "block";
    distanceDiv.style.paddingTop = "5px";
    distanceDiv.innerHTML = "<strong>Distance:</strong> " + formatDistance(distance);
}

function formatDistance(distance) {
   var units = " ft.",
       distanceStr,
       distanceM = distance;
   //convert distance (meters) to feet
   distance = distance * 3.28084;
   if (distance > 5280) {
       distance = distance / 5280;
       units = " mi."
   }
   distance = Math.round(distance);
   distanceStr = distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   return distanceStr + units;
    
}

function goToKanrodai() {
    map.setCenter(kanrodaiLoc);
    map.setZoom(19);
    return false;
}

function goToCurrentLoc() {
    map.setCenter(currentLocMarker.getPosition());
    map.setZoom(19);
    return false;
}

function viewPath() {
    var distance,
        midpoint;
    if (currentLocMarker) {
        //get midpoint
        midpoint = GreatCircle.getMidPoint(
            currentLocMarker.getPosition(),
            new google.maps.LatLng(kanrodaiLoc.lat, kanrodaiLoc.lng)
        );
        map.setCenter(midpoint);

        //get distance
        distance = GreatCircle.getDistance(currentLocMarker.getPosition(),
            new google.maps.LatLng(kanrodaiLoc.lat, kanrodaiLoc.lng)
        );
        console.log(distance);

        //get zoom level
        map.setZoom(GreatCircle.getZoomLevelByRange(distance));
    }
}
