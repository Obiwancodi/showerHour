app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCrtl',
        resolve: {
        setShower : function(addShowerFactory) {
      		return addShowerFactory.getShowers();
      	}
      }
    });
});

app.controller('homeCrtl', function($scope,setShower) {
	$scope.showers = setShower
})
