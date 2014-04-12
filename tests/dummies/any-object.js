var g = require("../../include");

function AnyObject(anyDependencyA, anyDependencyB, anyDependencyC) {
	var self = this;
	self.method = function() {
		g.assert(anyDependencyA, "AnyObject::anyDependencyA == null");
		g.assert(anyDependencyB, "AnyObject::anyDependencyB == null");
		g.assert(anyDependencyC, "AnyObject::anyDependencyC == null");
		anyDependencyA.method();
		anyDependencyB.method();
		anyDependencyC.method();

	};
}

module.exports = AnyObject;