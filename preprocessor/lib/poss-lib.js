var analyzer = require('./analyzer');
var tree = require('./tree');

modules.exports = (data) => {
	return tree.transform(tree.ify(analyzer(data.split('\n')))).join('\n');
};