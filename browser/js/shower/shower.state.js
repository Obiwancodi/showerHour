app.config(function($stateProvider) {

    $stateProvider.state('shower', {
        url: '/shower/add',
        templateUrl: 'js/shower/shower.html',
        controller: 'AddShowerCrtl',

        resolve : {
        	setUser : function(AuthService) {
        		return AuthService.getLoggedInUser()
        	},

            allBathrooms: function(BathroomFactory) {
                return BathroomFactory.getBathrooms()

            
            }
        }
    });
})



app.config(['momentPickerProvider', function (momentPickerProvider) {
        momentPickerProvider.options({
            /* Picker properties */
            locale:        'en',
            format:        'L LTS',
            minView:       'decade',
            maxView:       'minute',
            startView:     'year',
            autoclose:     true,
            today:         false,
            keyboard:      false,
            
            /* Extra: Views properties */
            leftArrow:     '&larr;',
            rightArrow:    '&rarr;',
            yearsFormat:   'YYYY',
            monthsFormat:  'MMM',
            daysFormat:    'D',
            hoursFormat:   'HH:[00]',
            minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
            secondsFormat: 'ss',
            minutesStep:   20,
            secondsStep:   1
        });
    }]);