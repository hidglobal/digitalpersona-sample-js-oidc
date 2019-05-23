/*global angular*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('authenticatedController', ['$log', 'oidcService', function ($log, oidcService) {
            $log.debug('authenticatedController: created');
        }]);

})();
