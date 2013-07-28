// Diagnostics Shorthand Functions
l = module.exports.l = console.log;
i = module.exports = require("util").inspect;
ll = module.exports.ll = function(val) {
	l(i(val));
};

// Global Standard Includes
$_ = module.exports._ = require("lodash");
$util = module.exports.util = require("util");
$assert = module.exports.assert = require("assert");

// Inversion of Control
Scarlet = require("scarlet");
$scarlet = module.exports.$scarlet = new Scarlet(["../lib"]);
$container = module.exports.$container = $scarlet.plugins.ioc;


