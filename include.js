var log = console.log;
var util = require("util");
var print = util.print;
var inspect = util.inspect;

require("string-format");

module.exports = {
	l: log,
	p: print,
	i: inspect,
	_: require("lodash"), 
	S: require("string"), 
	util: require("util"),
	assert: require("assert"),
	Scarlet: require("scarlet"),
	ll: function(val) { log(inspect(val)); }
}
