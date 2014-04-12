var g = require("../../include");

function AnyDependencyB(anyDependencyA) {
	var self = this;
	self.method = function() {
		g.assert(anyDependencyA, "AnyObject::anyDependencyA == null");
		anyDependencyA.method();
	};
}

module.exports = AnyDependencyB;