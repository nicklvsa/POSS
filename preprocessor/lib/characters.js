'use strict';

module.exports = (c, n) => {
	var buffer = '';
	for(var i = 0; i < n; i++) {
		buffer += c;
	}
	return buffer;
};