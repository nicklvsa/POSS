'use strict';


exports.parse = function(line) {
    var buffer = {};
    var parts;

    line = line.trim();
    line = line.substr(1, line.length - 2);
    parts = line.split(',');

    parts.forEach((k) => {
        var segments = k.split('=');

        buffer[segments[0]] = segments[1];
    });

    return buffer;
};

exports.set = (params, values) => {
    values = values || [];

    var buffer = {};
    var i = 0;

    for (var k in params) {
        buffer[k] = values[i] || params[k];

        i++;
    }

    return buffer;
};