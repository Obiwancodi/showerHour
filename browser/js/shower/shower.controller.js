'use strict'

app.controller('AddShowerCrtl', function($scope,setUser, addShowerFactory,allBathrooms) {
	$scope.user = setUser
	$scope.addShower = addShowerFactory.postShower
	$scope.allBathrooms = allBathrooms
	$scope.time = function addMinutes(date, minutes) {
    		return new Date(date.getTime() + minutes*40000);
}

	console.log($scope.user)


})