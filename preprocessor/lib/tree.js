'use strict';

var chars = require('./characters');
var vars = require('./vars');
var params = require('./params');
var structs = require('./structs');

exports.ify = (input) => {
	var parents = [];

	return input.filter((elem) => {
		return elem.l || elem.r;
	}).map((line) => {
		var elem = {
			name: line.r,
			children: [],
			ind: line.l.length
		};
		var parent = parents[parents.length - 1] || {
			ind: 0
		};
		if(parents.ind === elem.ind) {
			parents.pop();
			paren = parents[parents.length - 1] || {
				ind: 0
			};
		}
		elem.parent = parent;
		if(elem.ind === 0) {
			parent = [elem];
			elem.parent = null;
			return elem;
		} else if(parent.ind < elem.ind) {
			parents.push(elem);
			parent.children.push(elem);
		}
	}).filter((a) => {
		return a;
	});
};

function printTree(tree, i) {
	i = i || 0;

	tree.forEach((k) => {
		console.log('DEPTH: ' + i);
		console.log('NAME: ' + k.name);
		console.log('PARENT: ' + k.parent);
		printTree(k.children, i + 1);
	});
}

exports.print = printTree;

function transformTree(tree) {
	var variables = vars.find(tree);
	var structures = structs.find(tree);
	var nested = [];

	var recursion = (tree, i, chVars) => {
		return tree.map((child) => {
			var buffer = '';
			if(child.deleted) {
				return '';
			}

			var parts = child.name.split('=');
			var begin = parts[0];

			if(begin in structs) {
				var values = parts[1] || '';
				values = values.trim().split(' ');
				var inject = structs[begin];
				var structParams = params.set(inject.params, values);
				buffer += recursion(inject.children, i, structParams).join('\n');
				return buffer;
			}

			var prefix = characters(' ', i * 4);
			var name = vars.replace(vars.replace(child.name, chVars), variables);
			buffer = prefix + name;
			
			if(child.children.length) {
				if(child.parent) {
					nested.push(child);
					buffer = '';
				} else {
					buffer += '{\n' + recursion(child.children, i + 1).join('\n') + '\n}\n';
				}
			} else {
				buffer += ';';
			}

			return buffer;
		});
	};

	var buffer = recursion(tree, 0);
	var getFullName = (child) => {
		return child.parent ? getFullName(child.parent) + ' ' + child.name : child.name;
	};

	if(nested.length) {
		nested = nested.map((child) => {
			child.name = getFullName(child);
			child.parent = null;
			return child;
		});
		buffer.push(transformTree(nested));
	}
	return buffer.filter((o) => {
		return o;
	});
}

exports.transform = transformTree;