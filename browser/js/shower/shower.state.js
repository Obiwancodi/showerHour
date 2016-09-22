app.config(function($stateProvider) {

    $stateProvider.state('shower', {
        url: '/shower/add',
        templateUrl: 'js/shower/shower.html',
        controller: 'addShowerCrtl',
        resolve : {
        	setUser : function(AuthService) {
        		AuthService.getLoggedInUser().then(function (user) {
        		    return user
        		});
        	}
        }
    });

});