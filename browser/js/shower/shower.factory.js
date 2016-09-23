app.factory('addShowerFactory', function($http) {

	var addShowerFactory = {}

	addShowerFactory.postShower = function(shower) {
		$http.post('/api/showers', shower)
		.then(function(shower) {
			console.log(shower)
		})
	}

	addShowerFactory.getShowers = function() {
		console.log("fun")
		return $http.get('/api/showers/personshower')
		.then(function(showers) {
			console.log(showers.data)
			return showers.data
		})
	}

	return addShowerFactory
})

app.factory('BathroomFactory', function($http) {

	var BathroomFactory = {}
	BathroomFactory.getBathrooms = function() {
		return $http.get('/api/bathrooms')
		.then(function(bathroom) {
			console.log("batroom", bathroom.data)
			return bathroom.data
		})
	}

	return BathroomFactory
})