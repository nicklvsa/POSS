'use strict';

exports.find = (tree) => {
	var buffer = {};

	tree.forEach((child) => {
		if(child.name[0] === '$') {
			var parts = child.name.split('=');
			if(parts[1]) {
				buffer[parts[0].trim()] = parts[1].trim();
			}
			child.deleted = true;
		}
	});

	return buffer;
};

exports.replace = (line, vars) => {
	for(var k in vars) {
		var v = vars[k];
		line = line.replace(k, v);
	}
	return line;
};