'use strict';

module.exports = (input) => {
	return input.map((line) => {
		var right = line.trimLeft();
		return {
			l: line.replace(right, ''),
			r: right
		};
	});
};