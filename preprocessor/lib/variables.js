'use strict';

exports.find = function(tree) {
    var buffer = {};

    tree.forEach(function(child) {

        if (child.name[0] === '$') {

            //console.log(child);

            var parts = child.name.trim().split('=');
            if (parts[1]) {
                buffer[parts[0].trim()] = parts[1].trim();
            }

            child.deleted = true;
        }
    });

    return buffer;
};

exports.replace = function(line, vars) {
    for (var k in vars) {
        var v = vars[k];

        //prob make this a little better... lots of string replacement
        line = line.replace(' ', '').trim();

        if(line.indexOf("<") > -1 || line.indexOf(">") > -1 || line.indexOf("@inherit") > -1) {
            line = line.replace(k, v).replace('=', ':').trim();
        } else {
            line = line.replace(k, v).replace('=', ':').replace('class', '.').replace('id', '#').trim();
        }

    }

    return line;
};