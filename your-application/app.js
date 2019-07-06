function main() {
    "use strict";

    var express = require('express');
    var path = require('path');
    var cors = require('cors');

    var app = express();
    var port = 3000;

    app.use(cors()); /* For testing purposes only! */
    app.use(express.static('public'));
    app.use('/node_modules', express.static('node_modules'));

    app.get(
        '/:ngroute',
        function (request, response) {
            console.log('ngroute=' + request.params.ngroute);
            response.sendFile(path.join(__dirname + '/public/index.html'));
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