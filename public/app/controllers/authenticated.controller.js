/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('authenticatedController', ['$log', '$location', '$scope', '$window', 'oidcService', function ($log, $location, $scope, $window, oidcService) {
            $log.debug('authenticatedController: created');

            $scope.user = oidcService.getCurrentUser()
                .catch(function (error) {
                    $window.alert(error.message);
                });
            $scope.signout = function () {
                oidcService.signout()
                    .then(function () {
                        $location.path('/unauthorized');
                    })
                    .catch(function (error) {
                        $window.alert(error.message);
                    });
            };
        }]);

})();
