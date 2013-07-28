require("../include");

function AnyObject(anyDependencyA, anyDependencyB, anyDependencyC) {

	var self = this;

	self.method = function() {

		$assert(anyDependencyA, "AnyObject::anyDependencyA == null");
		$assert(anyDependencyB, "AnyObject::anyDependencyB == null");
		$assert(anyDependencyC, "AnyObject::anyDependencyC == null");

		anyDependencyA.method();
		anyDependencyB.method();
		anyDependencyC.method();

	};
}

module.exports = AnyObject;