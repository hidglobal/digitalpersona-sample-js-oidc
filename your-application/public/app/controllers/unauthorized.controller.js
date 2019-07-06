/*global angular*/
(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('unauthorizedController', ['$log', '$location', '$scope', 'oidcService', function ($log, $location, $scope, oidcService) {
            $log.debug('unauthorizedController: created');

            $scope.authenticate = function () {

                oidcService.signin()
                    .then(
                        function (user) {
                            $log.debug('unauthorizedController.authenticateuser:', user);
                            if (!!user) {

                                $scope.$apply(function () {
                                    $location.path('/authenticated');
                                });
                            }
                        }
                    )
                    .catch(
                        function (error) {
                            alert(error.message);
                            $log.log('unauthorizedController.authenticateuser:', error);
                        }
                    );
            };
        }]
    );

})();
