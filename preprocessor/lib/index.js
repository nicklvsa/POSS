'use strict';

var analyze = require('./analyze');
var tree = require('./tree');

module.exports = (data) => {
    return tree.transform(tree.forge(analyze(data.split('\n')))).join('\n');
};