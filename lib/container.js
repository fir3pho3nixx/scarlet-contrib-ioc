var g = require("../include");
var Component = require("./component");

function Container(scarlet) {

	g.assert(scarlet, "scarlet-ioc::Container::scarlet == null");

	var self = this;

	self.components = [];
	self.interceptor = null;

	self.initialize = function() {
		scarlet.plugins.ioc = self;
		return self;
	};

	self.find = function(keyName) {
		var component = g._.find(self.components, function(component) {
			return g._.isEqual(component.keyName, keyName);
		});
		g.assert(component, "scarlet-ioc::Container::find::No component found for key '{0}' in container".format(keyName));
		return component;
	}

	self.register = function(keyName, type, lifecycle) {
		g.assert(keyName, "scarlet-ioc::Container::register::keyName == null");
		g.assert(type, "scarlet-ioc::Container::register::type == null for '{0}'".format(keyName));
		g.assert(typeof(type) == "function", "scarlet-ioc::Container::register::typeof(type) != 'function'");
		var lifecycle = g._.isNull(lifecycle) ? "transient" : lifecycle;
		var component = new Component(self, keyName, type, lifecycle);
		self.components.push(component);
		return self;
	};

	self.intercept = function(interceptor) {
		self.interceptor = interceptor;
		return self;
	};

	self.resolve = function(keyName) {
		g.assert(keyName, "Cannot resolve with keyName = 'null'");
		var component = self.find(keyName);
		var instance = component.getComponent();
		g.assert(instance, "Could not resolve instance using key '{0}'".format(keyName));
		if (!g._.isNull(instance) && !g._.isNull(self.interceptor)) {
			scarlet.intercept(instance, scarlet.INSTANCE).using(self.interceptor);
		}
		return instance;
	};

}

module.exports = Container;