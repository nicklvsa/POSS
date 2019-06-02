var POSS_SPECIAL_FUNCTIONS = [
	'@respond', //one argument(_responder), opens as function
	'@inherit', //one modifier<class/id> and one argument(_class/id)
	'@calc'//three arguments(num1, num2, 'expr')
];

var POSS_SPECIAL_KEYWORDS = [
	'var',
	'as',

	'boolean',
	'string',
	'number',
	'array',

	'phone',
	'tablet',
	'desktop',

	'redef',
	'mod',

	'class',
	'id'
];

module.exports = (css) => {
	return new PossParser(css);
}

function PossParser(raw) {
	
}

function verifyCssValidity(css) {
	//convert poss -> css
	var parser = require('css-parse');
	this.css = css;
	this.root = parser(css, {position: false});
	this.indents = 0;
}
