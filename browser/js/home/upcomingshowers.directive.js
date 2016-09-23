app.directive('upcomingShowers', function (addShowerFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/home/upcoming-showers.html',
        scope : {
        	showers: '='
        }
    };

});