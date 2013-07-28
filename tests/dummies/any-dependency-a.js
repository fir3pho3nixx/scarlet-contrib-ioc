require("../include");

function AnyDependencyA() {

	var self = this;

	self.method = function() {
		l("AnyDependencyA::method()");
	};

}

module.exports = AnyDependencyA;
