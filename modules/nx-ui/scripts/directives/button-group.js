(function () {
    'use strict';

    var angular = window.angular;

    angular.module('nx.ui')
        .directive('nxButtonGroup', function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'modules/nx-ui/templates/button-group.html',
                scope: {
                    config: "=config"
                }
            };
        });
}());