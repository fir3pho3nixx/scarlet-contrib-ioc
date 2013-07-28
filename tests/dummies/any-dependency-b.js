require("../include");

function AnyDependencyB(anyDependencyA) {

	var self = this;

	self.method = function() {
		l("AnyDependencyB::method()");
		assert(anyDependencyA, "AnyObject::anyDependencyA == null");
		anyDependencyA.method();
	};

}

module.exports = AnyDependencyB;