module.exports = Module;

function Module() {
    'use strict';

    var method = {};

    method.init = function() {

    	alert('this is an alert');
    	console.log($);

    };

    return method;
}
