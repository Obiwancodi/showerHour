'use strict'

app.controller('AddShowerCrtl', function($scope,setUser, addShowerFactory,allBathrooms,$state) {
	$scope.user = setUser
	$scope.addShower = function(shower){
		return addShowerFactory.postShower(shower)
		.then(function(shower) {
			$state.go('home')
		})
	}
	$scope.allBathrooms = allBathrooms
	$scope.time = function addMinutes(date, minutes) {
    		return new Date(date.getTime() + minutes*40000);
}

	console.log($scope.user)


})