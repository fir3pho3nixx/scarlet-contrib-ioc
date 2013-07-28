require("../include");

function AnyDependencyB(anyDependencyA) {

	var self = this;

	self.method = function() {

		$assert(anyDependencyA, "AnyObject::anyDependencyA == null");

		anyDependencyA.method();

	};

}

module.exports = AnyDependencyB;