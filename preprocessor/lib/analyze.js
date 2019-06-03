'use strict';


module.exports = (input) => {
    return input.map((line) => {

        var rPart = line.trimLeft();
        return {
            l: line.replace(rPart, ''),
            r: rPart
        };
        
    });
};