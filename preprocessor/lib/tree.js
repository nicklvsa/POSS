'use strict';

var _chars = require('./chars');
var _structs = require('./structs');
var _params = require('./params');
var _variables = require('./variables');

exports.forge = (input) => {
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

        if (parent.ind === elem.ind) {
            parents.pop();
            parent = parents[parents.length - 1] || {
                ind: 0
            };
        }

        elem.parent = parent;
        
        if (elem.ind === 0) {
            parents = [elem];
            elem.parent = null;
            return elem;
        } else if (parent.ind < elem.ind) {
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
        console.log('depth: ' + i);
        console.log('name: ' + k.name);
        console.log('parent: ' + k.parent);

        printTree(k.children, i + 1);
    });
}

exports.print = printTree;

function transformTree(tree) {

    var mathTypes = [
        "mult",
        "sub",
        "add",
        "div",
        "cos",
        "sin",
        "tan"
    ];

    var variables = _variables.find(tree);
    var structs = _structs.find(tree);
    var nested = [];

    var semiColonTracker = 0;

    var recursion = (tree, i, vars) => {
        return tree.map((child) => {
            if (child.deleted) {
                return '';
            }

            //console.log(child);

            //an @ decorator was found
            if(child.name.startsWith('@') && child.name[0] === '@') {
                if(child.name.indexOf('@use') > -1) {

                    var type = child.name.split('<')[1].split('>')[0].trim();
                    var value = child.name.split('(')[1].split(')')[0].trim();

                 

                    /*if((child.parent.name).includes(type) && (child.parent.name).includes(value)) {
                        child.name = child.name.replace(child.name, child.parent.name);
                    }  */

                   
                    /*if(child.parent.children.name.indexOf(type) > -1 && child.parent.children.name.indexOf(value) > -1) {
                        child.name = child.name.replace(child.name, child.parent.children.name);
                    }*/

                    

                    //TEMP: remove traces of invalid @inherit tag in css
                    
                    /*if(child.name.includes(type) && child.name.includes(value)) {
                        child.name = child.name.replace(child.name, child.parent.name);
                    }*/

                    //console.log('value: ' + value + ' | as type: ' + type);
                }

                //TODO: not working... issues with not finding @calc on a var decl
                if(child.name.includes("@calc")) {
                    var eqReturnType = child.name.split('<')[1].split('>')[0].trim();
                    var eq = child.name.split('(')[1].split(')')[0].trim().split(',');

                    console.log('@calc return type: ' + eqReturnType + ' | eq[0]: ' + eq[0]);

                    for(var i = 0; i < eq.length; i++) {
                        for(var j = 0; j < mathTypes.length; j++) {
                            if(eq[i].trim().indexOf(mathTypes[j]) > -1) {
                                switch(mathTypes[j]) {
                                    case "mult":
                                        console.log("mult found");
                                    break;
                                    case "add":
                                        console.log("add found");
                                    break;
                                    case "sub":
                                        console.log("sub found");
                                    break;
                                    case "div":
                                        console.log("div found");
                                    break;
                                    default:
                                        console.log("no-matching-types");
                                    break;
                                }
                            } else {
                                /*
                                   provided type was not found in valid types array
                                */
                            }
                        }
                    }
                }

            }

            var buffer = '';
            var parts = child.name.split('=');

            //console.log(parts[1]);

            var begin = parts[0].trim();

            //console.log(begin);

            if (begin in structs) {
                var values = parts[1] || '';
                values = values.split(' ');
                var struct = structs[begin];
                var structParams = _params.set(struct.params, values);

                buffer += recursion(struct.children, i, structParams).join('\n');

                return buffer;
            }

            var prefix = _chars(' ', i * 4);
            var name = _variables.replace(_variables.replace(child.name, vars), variables);
            buffer = (prefix + name).trim();

            //TODO: fix random extra semi colons being written

            if (child.children.length) {
                if (child.parent) {
                    nested.push(child);
                    buffer = '';
                } else {
                    buffer += ' {\n' + recursion(child.children, i + 1).join('\n') + '\n}\n';
                }
            } else {
                if(child.children.length >= 0) {
                    semiColonTracker++;
                    buffer += ';';
                }
            }

            //console.log("Semi Colon Written: " + semiColonTracker);
            return buffer;
        });
    };

    var buffer = recursion(tree, 0);

    var getFullName = (child) => {
        return child.parent ? getFullName(child.parent) + ' ' + child.name : child.name;
    };
    
    if (nested.length) {
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