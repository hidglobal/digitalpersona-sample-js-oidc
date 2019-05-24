(function () {
    'use strict';

    angular.module('app.services', [])
        .config(['$provide', function ($provide) {
            $provide.factory('oidcService', ['$log', function ($log) {
                $log.debug('oidcService: created');

                //var settings = null;
                var userManager = null;
                var currentUser = null;

                function init(settings) {
                    $log.debug('oidcService.init:==>');

                    Oidc.Log.logger = $log;
                    Oidc.Log.logLevel = Oidc.Log.DEBUG;
                    userManager = new Oidc.UserManager(settings);

                    $log.debug('oidcService.init:<--');
                }

                function signin(args) {
                    $log.debug('oidcService.signin:==>');

                    if (!userManager) {
                        throw('oidcService.signin" Must call init method first');
                    }

                    return userManager.signinPopup(args)
                        .then(function (user) {
                            $log.debug('oidcService.signin: user=', user);
                            currentUser = user;
                        })
                        .catch(function (error) {
                            $log.error('oidcService.signin:', error);
                        });

                    $log.debug('oidcService.signin:<--');
                }

                function signout(args) {
                    $log.debug('oidcService.signout:==>');

                    if (!userManager) {
                        throw('oidcService.signout:" Must call init method first');
                    }

                    return userManager.signoutPopup(args)
                        .then(function () {
                            currentUser = null;
                            $log.debug('oidcService.signout: signed out successfully');
                        })
                        .catch(function (error) {
                            $log.error('oidcService.signin:', error);
                        });


                    $log.debug('oidcService.signout:<--');
                }

                function getCurrentUser() {
                    $log.debug('oidcService.getCurrentUser:==>');

                    if (!userManager) {
                        throw('oidcService.getCurrentUser:" Must call init method first');
                    }

                    return currentUser;

                    $log.debug('oidcService.getCurrentUser:<--');
                }
                
                return {
                    init: init,
                    signin: signin,
                    signout: signout,
                    getCurrentUser: getCurrentUser
                };
            }]);
        }]);

}) ();