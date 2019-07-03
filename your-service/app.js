function main() {
    "use strict";

    var express = require('express');
    var path = require('path');
    var cors = require('cors');

    var app = express();
    var port = 3001;

    app.use(cors()); /* For testing purposes only! */

    app.get(
        '/secured',
        function (request, response) {
            var user = '';

            var sampleResponse = {
                data: user + ', welcome to the service'
            };
            // TODO response.type('json');
            response.send(sampleResponse);
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