require("string-format");

var l = console.log;
var i = require("util").inspect;

module.exports = {

	debug: {
		log: function(val) {
			l(i(val));
		}
	},
	
	_: require("lodash"), 
	S: require("string"), 
	util: require("util"),
	assert: require("assert"),

}
