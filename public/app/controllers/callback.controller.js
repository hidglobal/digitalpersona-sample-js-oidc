/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('callbackController', ['$log', '$location', '$window', 'oidcService', function ($log, $location, $window, oidcService) {
            $log.debug('callbackController:==>');

            oidcService.signinCallback($location.absUrl()).then(function () {
                $log.debug('callbackController:<--');
            }).catch(function (err) {
                $log.error('callbackController.signinPopupCallback', err);
            });
        }]);

})();
