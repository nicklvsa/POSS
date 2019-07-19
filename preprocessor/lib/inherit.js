'use strict';

exports.find = (tree) => {
    var buffer = {};

    tree.forEach((child) => {

        if(child.name.indexOf('@inherit') > -1) {

            var type = child.name.split('<')[1].split('>')[0].trim();
            var value = child.name.split('(')[1].split(')')[0].trim();

            //TODO: figure out how to find defined property by type and value

            //buffer[child.name.trim()] = 

        }

    });

    return buffer;
};
