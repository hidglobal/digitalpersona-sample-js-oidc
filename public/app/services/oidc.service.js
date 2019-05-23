(function () {
    'use strict';

    angular.module('app.services', [])
        .config(['$provide', function ($provide) {
            $provide.factory('oidcService', ['$log', function ($log) {
                $log.debug('oidcService: created');

                return {};
            }]);
        }]);

}) ();