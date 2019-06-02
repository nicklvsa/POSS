'use strict';

exports.parse = (line) => {
	var buffer = {};
	var parts;

	line = line.trim();
	line = line.substr(1, line.length - 2);
	parts = line.split(',');

	parts.forEach((k) => {
		var cssIntegerLikelySizingType = "";
		var segs = k.split('=');
		if(segs[0].substr(segs[0].indexOf('<') + 1, segs[0].indexOf('>')) != null) {
			//css integer type defined
			cssIntegerLikelySizingType = segs[0].substr(segs[0].indexOf('<') + 1, segs[0].indexOf('>')).trim().toLowerCase();
		}
		buffer[segs[0]] = segs[1] + (cssIntegerLikelySizingType != null && cssIntegerLikelySizingType != "") ? cssIntegerLikelySizingType : "";
	});

	return buffer;
};

exports.set = (params, vals) => {
	values = values || {};

	var buffer = {};
	var i = 0;

	for(var k in params) {
		buffer[k] = values[i] || params[k];
		i++;
	}

	return buffer;
};

