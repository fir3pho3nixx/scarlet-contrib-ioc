module.exports = function(scarlet) {

	var dummies = require("./index");

	return scarlet.plugins.ioc
		.register("anyDependencyA", dummies.AnyDependencyA)
		.register("anyDependencyB", dummies.AnyDependencyB)
		.register("anyDependencyC", dummies.AnyDependencyC)
		.register("anyObject", dummies.AnyObject);

};