angular.module('myApp')
.service('mapService', function($http) {

	var self = this;

	var visits = [];

	var map;


	this.getVisits = function() {
		return $http({
  			method: 'GET',
  			url: '/api/visit'
		}).then(function (response) {
    		return response.data
  		});
	}

	this.initAutocomplete = function () {
		var myLatlng = new google.maps.LatLng(39.832243, -98.579396);
	  	map = new google.maps.Map(document.getElementById('map'), {
	    	center: myLatlng,
	    	zoom: 5,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP
	 	});

		self.getVisits().then(function (response) {
			var visits = response;
			console.log( visits )
			for (var i = 0; i < visits.length; i++) {
				self.addMarker(visits[i])
			}
		})

	// Create the search box and link it to the UI element.
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

  var searchBoxMarker = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    searchBoxMarker.forEach(function(marker) {
      marker.setMap(null);
    });
    searchBoxMarker = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      searchBoxMarker.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    });

  }



	this.addMarker = function (visit) {
		var markerId = visit.temple.latitude + "_" + visit.temple.longitude;
		var newVisitPosition = new google.maps.LatLng(visit.temple.latitude, visit.temple.longitude)
		console.log(newVisitPosition)
		var newMarker = new google.maps.Marker({
			position: newVisitPosition,
			title: visit.title,
      id: markerId
		// animation:
		})
		newMarker.setMap(map);

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading"> ' + visit.title + '</h3>'+
      '<div id="bodyContent">'+
      '<p> ' + visit.temple.name + ' </p>'+
      '<p>Baptisms: ' + visit.baptisms + ' </p>'+
      '<p>Initiatories: ' + visit.initiatories + ' </p>'+
      '<p>Endowments: ' + visit.endowments + ' </p>'+
      '<p>Sealings: ' + visit.sealings + ' </p>'+
      '<p>Need to see the whole visit? <a href="/#/visit/'+visit._id+'">'+
      'Click for Details</a> '+
      '</p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });


    newMarker.addListener('click', function() {
      infowindow.open(map, newMarker);
    });



	} 







	})