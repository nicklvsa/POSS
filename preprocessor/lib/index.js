'use strict';

var analyze = require('./analyze');
var tree = require('./tree');

module.exports = (data) => {
    return tree.transform(tree.ify(analyze(data.split('\n')))).join('\n');
};