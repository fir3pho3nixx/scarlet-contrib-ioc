require("./include");

var $dummies = require("./dummies");
var $installer = require("./dummies/installer");

describe("Given we are using dummies", function(){

	describe("When loading dummies", function(){

		it("Then AnyDepedencyA should be a function", function(){
			$assert(typeof($dummies.AnyDependencyA) == "function", "AnyDependencyA is not a function");
		});

		it("Then AnyDepedencyB should be a function", function(){
			$assert(typeof($dummies.AnyDependencyB) == "function", "AnyDependencyB is not a function");
		});

		it("Then AnyDepedencyC should be a function", function(){
			$assert(typeof($dummies.AnyDependencyC) == "function", "AnyDependencyC is not a function");
		});

		it("Then AnyObject should be a function", function(){
			$assert(typeof($dummies.AnyObject) == "function", "AnyObject is not a function");
		});

	});

});

describe("Given we are using a container", function() {

	describe("When including the installer", function() {

		it("Then it should not throw", function() {

			$assert($installer, "installer == null");

		});

	});

	describe("When constructing the container", function() {

		it("Then it should not throw", function() {

			var container = $installer($scarlet);
			$assert(container, "container == null")

		});

		it("Then it have an initialize", function() {

			var container = $installer($scarlet);
			$assert(container.initialize, "container.initialize is not defined");

		});

	});

	describe("When registering components", function() {

		var container = $installer($scarlet);

		it("Then it should register a component correctly", function() {

			container.register("anyObject", $dummies.AnyObject);

		});

	});

	describe("When resolving components", function() {

		var container = $installer($scarlet);

		it("Then it should be able to find them again", function() {

			var instance = container.find("anyObject");
			$assert(instance, "anyObject == null");

		});

		it("Then it should be resolve parameter names", function() {

			var component = container.find("anyObject");
			var result = component.getParameterNames(component.type);
			$assert($_.isEqual(result, ["anyDependencyA", "anyDependencyB", "anyDependencyC"]));

		});

		it("Then it be able to resolve dependencies", function() {

			var component = container.find("anyObject");
			var instance = component.getComponent();
			$assert(instance, "getComponent failed");

		});


		it("Then it should be able to resolve AnyDependencyA", function(){

			var instance = container.resolve("anyDependencyA");
			$assert(instance, "anyDependencyA == null")

		});

		it("Then it should be able to resolve AnyDependencyB", function(){

			var instance = container.resolve("anyDependencyB");
			$assert(instance, "anyDependencyB == null")

		});

		it("Then it should be able to resolve AnyDependencyC", function(){

			var instance = container.resolve("anyDependencyC");
			$assert(instance, "anyDependencyC == null")

		});

		it("Then it should be able to resolve AnyObject", function(){

			var instance = container.resolve("anyObject");
			$assert(instance, "anyObject == null")

		});

	});

});

describe("Given we are using a container with an interceptor", function() {

	var container = $installer($scarlet);

	describe("When resolving a dependency with interceptor", function() {

		var methodCalled = false;
		function interceptor(proceed, invocation) {
			proceed();
			methodCalled = true;
		}

		var anyObject = container
			.intercept(interceptor)
			.resolve("anyObject");

		it("Then should be able to assert that the interceptor was called", function(){

			anyObject.method();
			$assert(methodCalled);

		});

	});

});