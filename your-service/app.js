function main() {
    "use strict";

    var express = require('express');
    var path = require('path');
    var cors = require('cors');
    var bearerToken = require('express-bearer-token');
    var jsonwebtoken = require('jsonwebtoken');
    var fs = require('fs');
    var packageJson = require('./package.json');

    var app = express();
    var port = 3001;
    var realm = 'your-service';
    var clientid = 'digitalpersona-sample-js-oidc';
    var signingCertificate = fs.readFileSync('signingCertificate.pem');
    var yourService = packageJson["your-service"];
    var verificationOptions = {
        audience: yourService.authenticationOptions.audience,
        issuer: yourService.authenticationOptions.issuer,
        clockTolerance: yourService.authenticationOptions.clockTolerance
    };

    app.use(cors()); /* For testing purposes only! */

    app.use(bearerToken());

    app.get(
        '/secured',
        function (request, response) {
            var accessToken = request.token;

            if (!accessToken) {
                /*
                   HTTP/1.1 401 Unauthorized
                     WWW-Authenticate: Bearer realm="example"
                * */
                response.status(401);
                response.set('Access-Control-Expose-Headers', 'WWW-Authenticate');
                response.set('WWW-Authenticate', 'Bearer realm="' + realm + '"');
                response.send('Unauthorized');
                return ;
            }

            jsonwebtoken.verify(
                accessToken,
                signingCertificate,
                verificationOptions,
                function (error, decodedToken) {
                    if (
                        error || decodedToken.scope.indexOf('openid') === -1 || decodedToken.client_id !== clientid
                    /*
                    Check for the other claims if needed
                     */
                    ) {
                        /*
                 HTTP/1.1 401 Unauthorized
                 WWW-Authenticate: Bearer realm="example",
                                   error="invalid_token",
                                   error_description="The access token expired"
                        */
                        var error_description = error.message? (error.message + '(' + error.name + ')'): 'The access token expired';

                        response.status(401);
                        response.set('Access-Control-Expose-Headers', 'WWW-Authenticate');
                        response.set('WWW-Authenticate', 'Bearer realm="' + realm + '",error="invalid_token",error_description="' + error_description + '"');
                        response.send('Unauthorized');
                        return;
                    }

                    var sampleResponse = {
                        data: 'Subject: ' + decodedToken.sub + ', welcome to /your-service'
                    };

                    response.setHeader('content-type', 'application/json');
                    response.send(sampleResponse);

                }
            );
        }
    );

    app.listen(
        port,
        function () {
            console.log('Example app listening on port %d!', port);
        }
    );
}

main.call();