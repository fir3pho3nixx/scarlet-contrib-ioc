require("../include");

function AnyDependencyC(anyDependencyB) {

	var self = this;

	self.method = function() {
		
		$assert(anyDependencyB, "AnyObject::anyDependencyB == null");

		anyDependencyB.method();
	};

}

module.exports = AnyDependencyC; 