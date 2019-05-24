/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('callbackController', ['$log', 'oidcService', function ($log, oidcService) {
            $log.debug('callbackController: created');


            // TODO parse the response and report error if necessary

        }]);

})();
