/*global angular*/
(function () {
    'use strict';

    angular.module('app.controllers', [])
        .controller('appController', ['$log', 'oidcService', function ($log, oidcService) {
            $log.log('appController: created');
        }]);

})();
