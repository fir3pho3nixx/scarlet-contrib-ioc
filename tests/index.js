var g = require("../include");
var dummies = require("./dummies");
var installer = require("./dummies/installer");

var scarlet = new g.Scarlet(["../lib/index"]);

describe("Given we are using dummies", function(){

	describe("When loading dummies", function(){

		it("Then AnyDepedencyA should be a function", function(){
			g.assert(typeof(dummies.AnyDependencyA) == "function", "AnyDependencyA is not a function");
		});

		it("Then AnyDepedencyB should be a function", function(){
			g.assert(typeof(dummies.AnyDependencyB) == "function", "AnyDependencyB is not a function");
		});

		it("Then AnyDepedencyC should be a function", function(){
			g.assert(typeof(dummies.AnyDependencyC) == "function", "AnyDependencyC is not a function");
		});

		it("Then AnyObject should be a function", function(){
			g.assert(typeof(dummies.AnyObject) == "function", "AnyObject is not a function");
		});

	});

});

describe("Given we are using a container", function() {

	describe("When including the installer", function() {

		it("Then it should not throw", function() {
			g.assert(installer, "installer == null");
		});

	});

	describe("When constructing the container", function() {

		it("Then it should not throw", function() {
			var container = installer(scarlet);
			g.assert(container, "container == null")

		});

		it("Then it have an initialize", function() {
			var container = installer(scarlet);
			g.assert(container.initialize, "container.initialize is not defined");

		});

	});

	describe("When registering components", function() {

		var container = installer(scarlet);

		it("Then it should register a component correctly", function() {
			container.register("anyObject", dummies.AnyObject);
		});

	});

	describe("When resolving components", function() {

		var container = installer(scarlet);

		it("Then it should be able to find them again", function() {
			var instance = container.find("anyObject");
			g.assert(instance, "anyObject == null");
		});

		it("Then it should be resolve parameter names", function() {
			var component = container.find("anyObject");
			var result = component.getParameterNames(component.type);
			g.assert(g._.isEqual(result, ["anyDependencyA", "anyDependencyB", "anyDependencyC"]));
		});

		it("Then it be able to resolve dependencies", function() {
			var component = container.find("anyObject");
			var instance = component.getComponent();
			g.assert(instance, "getComponent failed");
		});


		it("Then it should be able to resolve AnyDependencyA", function(){
			var instance = container.resolve("anyDependencyA");
			g.assert(instance, "anyDependencyA == null")
		});

		it("Then it should be able to resolve AnyDependencyB", function(){
			var instance = container.resolve("anyDependencyB");
			g.assert(instance, "anyDependencyB == null")
		});

		it("Then it should be able to resolve AnyDependencyC", function(){
			var instance = container.resolve("anyDependencyC");
			g.assert(instance, "anyDependencyC == null")
		});

		it("Then it should be able to resolve AnyObject", function(){
			var instance = container.resolve("anyObject");
			g.assert(instance, "anyObject == null")
		});

	});

});

describe("Given we are using a container with an interceptor", function() {

	var container = installer(scarlet);

	describe("When resolving a dependency with interceptor", function() {

		var methodCalled = false;
		function interceptor(invocation, proceed) {
			methodCalled = true;
			proceed();
		}

		var anyObject = container
			.intercept(interceptor)
			.resolve("anyObject");

		it("Then should be able to assert that the interceptor was called", function(){
			anyObject.method();
			g.assert(methodCalled);
		});

	});

});