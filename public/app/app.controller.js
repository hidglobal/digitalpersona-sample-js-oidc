/*global angular, Oidc*/
(function () {
    'use strict';

    angular.module('app.controllers', [])
        .controller('appController', ['$log', 'oidcService', function ($log, oidcService) {
            oidcService.init({
                authority: "https://win-erepv5i4qub.ldsdemo.com/dppassivests/.well-known/openid-configuration",
                client_id: "digitalpersona_sample_js_oidc",
                redirect_uri: window.location.origin +"/callback",
                post_logout_redirect_uri: window.location.origin +"/signout",

                response_type: "id_token token",
                scope: "openid profile",

                automaticSilentRenew: true,

                filterProtocolClaims: true,
                loadUserInfo: true
            });

            $log.log('appController: created');
        }]);

})();
