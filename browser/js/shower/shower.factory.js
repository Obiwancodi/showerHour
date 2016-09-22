app.factory('addShowerFactory', function($http) {

	var addShowerFactory = {}

	addShowerFactory.postShower = function(shower) {

		$http.post('/', shower)
		.then(function(shower) {
			console.log(shower)
		})
	}

	return addShowerFactory
})