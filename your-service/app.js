function main() {
    "use strict";

    var express = require('express');
    var path = require('path');
    var cors = require('cors');
    var bearerToken = require('express-bearer-token');
    var jsonwebtoken = require('jsonwebtoken');
    var fs = require('fs');

    var app = express();
    var port = 3001;
    var realm = 'your-service';
    var clientid = 'digitalpersona-sample-js-oidc';
    var signingCertificate = fs.readFileSync('signingCertificate.pem');
    var verificationOptions = {
        audience: 'https://win-je24ttb0q9g.virgo.com/dpsts/resources',
        issuer: 'https://win-je24ttb0q9g.virgo.com/dpsts',
        clockTolerance: 10
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
                        response.status(401);
                        response.set('WWW-Authenticate', 'Bearer realm="' + realm + '",error="invalid_token",error_description="The access token expired"');
                        response.send('Unauthorized');
                        return;
                    }

                    var sampleResponse = {
                        data: 'Subject: ' + decodedToken.sub + ', welcome to the service'
                    };

                    /**
                     * TODO Call userinfo endpoint to fetch display name
                     */

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