/*global angular*/
(function () {
    'use strict';
    angular.module('app', [
        'ngRoute',
        'app.controllers',
        'app.services'
    ])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when(
                    '/unauthorized',
                    {
                        'templateUrl': 'app/controllers/unauthorized.html',
                        controller: 'unauthorizedController'
                    }
                )
                .when(
                    '/authenticated',
                    {
                        'templateUrl': 'app/controllers/authenticated.html',
                        controller: 'authenticatedController'
                    }
                )
                .when(
                    '/callback',
                    {
                        'templateUrl': 'app/controllers/callback.html',
                        controller: 'callbackController'
                    }
                )
                .otherwise(
                    {
                        redirectTo: '/unauthorized'
                    }
                );

            /* Enable HTML5 routes to avoid hashtag conflict in url*/
            $locationProvider.html5Mode(true);
        })
        .run(function ($log, $rootScope) {
            $log.debug('run:==>');
            $log.debug('run:<--');
        });

})();