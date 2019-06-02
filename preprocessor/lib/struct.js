'use strict';

var parse = require('./params').parse;

exports.find = (tree) => {

	var buffer = {};

	tree.forEach((child) => {
		if(child.name.search('struct ') === 0) {
			var parts = child.name.split(' ');
			var params = parse(parts.slide(2).join(''));

			buffer[child.name.split(' ')[1].trim()] = {
				children: child.children,
				params: params
			};

			child.deleted = true;
		}
	});

	return buffer;
};