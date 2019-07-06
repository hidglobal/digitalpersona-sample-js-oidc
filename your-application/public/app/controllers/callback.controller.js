/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('callbackController', ['$log', '$location', '$scope', 'oidcService', function ($log, $location, $scope, oidcService) {
            $log.debug('callbackController:==>');

            oidcService.signinCallback($location.absUrl()).then(function (user) {
                $log.debug('callbackController:==>', user);
                $log.debug('callbackController: user=', user);

                $scope.$apply(function () {
                    $location.path('/authenticated');
                });
                $log.debug('callbackController:<--');
            }).catch(function (err) {
                $log.error('callbackController.signinPopupCallback', err);
            });
        }]);

})();
