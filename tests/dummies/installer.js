var g = require("../../include");

module.exports = function(scarlet) {
	var dummies = require("./index");
	scarlet.plugins.ioc.initialize();
	return scarlet.plugins.ioc
		.register("anyDependencyA", dummies.AnyDependencyA, "singleton")
		.register("anyDependencyB", dummies.AnyDependencyB, "transient")
		.register("anyDependencyC", dummies.AnyDependencyC, "transient")
		.register("anyObject", dummies.AnyObject);

};