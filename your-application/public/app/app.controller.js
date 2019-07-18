/*global angular, Oidc*/
(function () {
    'use strict';

    var digitalPersonaHostName = '<DigitalPersonaHostName>';

    angular.module('app.controllers', [])
        .controller('appController', ['$log', 'oidcService', '$window', function ($log, oidcService, $window) {
            oidcService.init({
                authority: 'https://' + digitalPersonaHostName + '/dppassivests/.well-known/openid-configuration',
                client_id: 'digitalpersona-sample-js-oidc',
                redirect_uri: $window.location.origin + '/callback',
                post_logout_redirect_uri: $window.location.origin + '/signout',

                response_type: 'id_token token',
                scope: 'openid profile',

                automaticSilentRenew: true,

                filterProtocolClaims: true,
                loadUserInfo: true
            });

            $log.log('appController: created');
        }]);

})();
