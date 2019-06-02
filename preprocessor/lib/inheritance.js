var parse = require('./params').parse;

exports.find = (tree) => {
	var buffer = {};

	tree.forEach((child) => {
		if(child.name.search('@inherit') === 0) {
			var inheritType = child.name.substr(child.name.indexOf('@inherit<') + 9, child.name.indexOf('>('));
			var toInherit = child.name.substr(child.name.indexOf('>(') + 1, child.name.indexOf(');'));
			//TODO: check if toInherit matches inheritType
			var parseDefinitionByInheritance = parse(toInherit);
			buffer[toInherit.trim()] = {
				children: child.children,
				params: params
			};

			child.deleted = true;
		}
	});

	return buffer;
};