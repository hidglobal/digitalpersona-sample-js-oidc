/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('authenticatedController', ['$log', '$location', '$scope', '$window', '$http', 'oidcService', function ($log, $location, $scope, $window, $http, oidcService) {
            $log.debug('authenticatedController: created');

            // TODO change to vm

            oidcService.getCurrentUser()
                .then(function (user) {
                    $scope.$apply(function () {
                        $scope.user = user;
                    });

                    var options = {
                        method: 'GET',
                        url: 'http://avetrovd10.crossmatch.net:3001/secured',
                        //params : data,
                        headers : {
                            "Content-Type": "application/json;charset=UTF-8",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + user.access_token
                        },
                        transformResponse: [function (data) {
                            return data;
                        }]
                    };

                    return $http(options).then(function (response) {
                        $log.debug('authenticatedController: getCurrentUser: response.data = ' + response.data);
                        $scope.service_response = response.data;
                    })
                        .catch(function (error) {
                            $scope.service_response = error.message? error.message: error.status + ' ' + error.statusText;
                        });
                })
                .catch(function (error) {
                    $window.alert(error.message);
                });

            $scope.signout = function () {
                oidcService.signout()
                    .then(function () {
                        $scope.$apply(function () {
                            $location.path('/unauthorized');
                        });
                    })
                    .catch(function (error) {
                        $window.alert(error.message);
                    });
            };
        }]);

})();
