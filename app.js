function main() {
    "use strict";

    var express = require('express');
    var app = express();
    var port = 3000;

    app.get(
        '/',
        function (request, response) {
            response.send('Hello World!');
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