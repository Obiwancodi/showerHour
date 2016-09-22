'use strict'

app.controller('addShowerCrtl', function($scope,setUser, addShowerFactory) {
	$scope.user = setUser
	$scope.addShower = addShowerFactory.postShower
	$scope.myDate = new Date();

})