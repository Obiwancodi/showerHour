
app.config(function($stateProvider) {
    $stateProvider.state('front', {
        url: '/',
        templateUrl: 'js/home/start-page.html',
        controller: 'frontCtrl'
      })
})

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
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

app.controller('frontCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
