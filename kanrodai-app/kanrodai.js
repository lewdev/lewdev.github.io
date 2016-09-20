var kanrodaiLoc = {lat: 34.60119673714936, lng: 135.84321758174895};
var map;
var currentLoc;
function initMap() {
/*
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: kanrodaiLoc,
      mapTypeId: 'terrain'
    });
*/
     map = new google.maps.Map(document.getElementById("map"), {
       zoom: 15,  //Sets zoom level (0-21)
       center: kanrodaiLoc,
       mapTypeControl: true, //allows you to select map type eg. map or satellite
       navigationControlOptions:
       {
         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
       },
       mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
    });

    var kanrodai = new google.maps.Marker({
        position: kanrodaiLoc,
        map: map,
        title: 'The Kanrodai!'
    });

    var myLatLng = {lat: -25.363, lng: 131.044};
    var marker1 = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable:true,
        title: 'Hello World!'
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
    currentLoc = {lat: position.coords.latitude, lng: position.coords.longitude};

    //set map center and zoom.
    map.setCenter(currentLoc);
    map.setZoom(9);

    var pathCoordinates = [currentLoc, kanrodaiLoc];

    var kanrodaiPath = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    kanrodaiPath.setMap(map);

    var currentLocMarker = new google.maps.Marker({
        position: currentLoc,
        map: map,
        title: 'You are here!'
    });
    currentLocMarker.setMap(map);
}

function goToKanrodai() {
    map.setCenter(kanrodaiLoc);
    return false;
}

function goToCurrentLoc() {
    map.setCenter(currentLoc);
    return false;
}

function viewPath() {
    var coords = new google.maps.LatLng(currentLoc.lat, currentLoc.lng);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel'));
    var request = {
        origin: coords,
        destination: 'Tenri City, Nara, Japan',
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
           directionsDisplay.setDirections(response);
        }
else {
alert("Failed");
}
    });
    return false;
}