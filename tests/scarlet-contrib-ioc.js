var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");

var $scarlet = require("scarlet");

describe("Given we are using scarlet with IoC", function(){

	beforeEach(function(){
	});

	function AnyDependencyA(){
		
		var self= this;
		
		self.method = function(){
			l("AnyDependencyA::method()");
		};

	}

	function AnyDependencyB(anyDependencyA){
		
		var self= this;
		
		self.method = function(){
			l("AnyDependencyB::method()");
			assert(anyDependencyA, "AnyObject::anyDependencyA == null");
			anyDependencyA.method();
		};

	}

	function AnyDependencyC(anyDependencyB){
		
		var self= this;
		
		self.method = function(){
			l("AnyDependencyC::method()");
			assert(anyDependencyB, "AnyObject::anyDependencyB == null");
			anyDependencyB.method();
		};

	}

	function AnyObject(anyDependencyA, anyDependencyB, anyDependencyC) {
		
		var self= this;
		
		self.method = function(){

			assert(anyDependencyA, "AnyObject::anyDependencyA == null");
			assert(anyDependencyB, "AnyObject::anyDependencyB == null");
			assert(anyDependencyC, "AnyObject::anyDependencyC == null");
			
			anyDependencyA.method();
			anyDependencyB.method();
			anyDependencyC.method();

		};
	}

	$scarlet.loadPlugin("../lib");
	
	$container = $scarlet.plugins.ioc
		.register("anyDependencyA", AnyDependencyA)
		.register("anyDependencyB", AnyDependencyB)
		.register("anyDependencyC", AnyDependencyC)
		.register("anyObject", AnyObject);

	describe("When resolving a dependency", function(){

		var anyObject = $container.resolveForKey("anyObject");

		it("Then should be able to resolve it through the container", function(){

			anyObject.method();

		});

	});

	describe("When resolving a dependency with interceptor", function(){

		var methodCalled = false;
		function interceptor(invocation) {
			invocation.proceed();
			methodCalled = true;
		}

		var anyObject = $container
			.interceptWith(interceptor)
			.resolveForKey("anyObject");

		it("Then should be able to resolve it through the container", function(){

			l("");
			anyObject.method();
			assert(methodCalled);

		});

	});

});