/*global angular*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('unauthorizedController', ['$log', '$location', '$scope', 'oidcService', function ($log, $location, $scope, oidcService) {
            $log.log('unauthorizedController: created');

            $scope.authenticate = function () {
                $location.path('/authenticated');
            };
        }]
    );

})();
