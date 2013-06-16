var l = console.log;
var i = require("util").inspect;

var _ = require("lodash");
var util = require("util");
var assert = require("assert");

function Component(container, keyName, type, lifecycle) {

	var self = this;

	self.type = type;
	self.keyName = keyName;
	self.lifecycle = lifecycle;
	self.container = container;
	self.singleton = null;

	self.getParameterNames = function(func) {
		var funStr = func.toString();
		return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
	};

	self.resolveDependencies = function(type) {

		var depedencies = [];
		var parameters = self.getParameterNames(type);

		if (_.any(parameters)) {

			_.forEach(parameters, function(keyName) {

				var instance = container.resolveForKey(keyName);
				if (!_.isNull(instance))
					depedencies.push(instance);

			});

		}
		return depedencies;

	};

	self.getComponent = function(args) {

		var instance = null;

		var depedencies = self.resolveDependencies(self.type);

		if (self.lifecycle == "singleton") {

			if (!_.isNull(self.singleton)) {

				instance = new Object();
				self.singleton = new self.type.apply(instance, depedencies);

			}

			instance = self.singleton;

		} else {

			instance = new Object();
			self.type.apply(instance, depedencies);

		}

		return instance;

	};
}

function Container($scarlet) {

	var self = this;

	self.components = [];
	self.interceptor = null;
	self.scarlet = $scarlet;

	self.initialize = function() {
		assert(self.scarlet, "Scarlet-Contrib-IoC::Container::$scarlet == null");
		$scarlet.plugins.ioc = self;
		return self;
	};

	self.register = function(keyName, type, lifecycle) {
		assert(self.scarlet, "Scarlet-Contrib-IoC::Container::$scarlet == null");
		var component = new Component(self, keyName, type, _.isNull(lifecycle) ? "transient" : lifecycle);
		self.components.push(component);
		return self;
	};

	self.interceptWith = function(interceptor) {
		assert(self.scarlet, "Scarlet-Contrib-IoC::Container::$scarlet == null");
		self.interceptor = interceptor;
		return self;
	};

	self.resolveForKey = function(keyName, args) {

		assert(self.scarlet, "Scarlet-Contrib-IoC::Container::$scarlet == null");

		var component = _.find(self.components, function(component) {
			return component.keyName == keyName;
		});

		assert(component, "No type found for key '{0}' in container".format(keyName));

		var instance = component.getComponent(args);

		if (!_.isNull(instance) && !_.isNull(self.interceptor)){
			self.scarlet.interceptObject(instance).using(self.interceptor);
		}

		return instance;
	};

	self.resolveForType = function(type, args) {

		assert(self.scarlet, "Scarlet-Contrib-IoC::Container::$scarlet == null");

		var component = _.find(self.components, function(component) {
			return component.type == type;
		});

		assert(component, "No type found for type '{0}' in container".format(typeof(type)));

		var instance = component.getComponent(args);

		if (!_.isNull(instance) && !_.isNull(self.interceptor)){
			self.scarlet.interceptObject(instance).using(self.interceptor);
		}


		return instance;
	};
}

module.exports = Container;