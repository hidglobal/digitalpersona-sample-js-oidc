/*global angular, Oidc*/
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

                    return userManager.signinRedirect(args)
                        .then(function (user) {
                            $log.debug('oidcService.signin:<-- user=', user);
                            return user;
                        })
                        .catch(function (error) {
                            $log.error('oidcService.signin:', error);
                            throw(error);
                        });
                }

                function signinCallback(url) {
                    $log.debug('oidcService.signinCallback:==>');

                    if (!userManager) {
                        throw('oidcService.signinCallback:" Must call init method first');
                    }

                    return userManager.signinRedirectCallback(url)
                        .then(function (user) {
                            $log.debug('oidcService.signinCallback:<-- signed in successfully', user);
                        })
                        .catch(function (error) {
                            $log.error('oidcService.signinCallback:', error);
                            throw(error);
                        });
                }

                function signout(args) {
                    $log.debug('oidcService.signout:==>');

                    if (!userManager) {
                        throw('oidcService.signout:" Must call init method first');
                    }

                    return userManager.signoutRedirect(args)
                        .then(function () {
                            $log.debug('oidcService.signout:<-- signed out successfully');
                        })
                        .catch(function (error) {
                            $log.error('oidcService.signout:', error);
                        });
                }

                function getCurrentUser() {
                    $log.debug('oidcService.getCurrentUser:==>');

                    if (!userManager) {
                        throw('oidcService.getCurrentUser:" Must call init method first');
                    }

                    $log.debug('oidcService.getCurrentUser:<--');
                    return userManager.getUser();
                }

                return {
                    init: init,
                    signin: signin,
                    signinCallback: signinCallback,
                    signout: signout,
                    getCurrentUser: getCurrentUser
                };
            }]);
        }]);

}) ();