var ioc = require("./include");
var Component = require("./component");

function Container($scarlet, $ioc) {

	ioc.assert($scarlet, "scarlet-contrib-ioc::Container::$scarlet == null");

	var self = this;

	self.components = [];
	self.interceptor = null;

	self.initialize = function() {
		$scarlet.plugins.ioc = self;
		return self;
	};

	self.find = function(keyName) {

		var component = ioc._.find(self.components, function(component) {
			return ioc._.isEqual(component.keyName, keyName);
		});

		ioc.assert(component, "scarlet-contrib-ioc::Container::find::No component found for key '{0}' in container".format(keyName));

		return component;

	}

	self.register = function(keyName, type, lifecycle) {

		ioc.assert(keyName, "scarlet-contrib-ioc::Container::register::keyName == null");
		ioc.assert(type, "scarlet-contrib-ioc::Container::register::type == null for '{0}'".format(keyName));
		ioc.assert(typeof(type) == "function", "scarlet-contrib-ioc::Container::register::typeof(type) != 'function'");

		var lifecycle = ioc._.isNull(lifecycle) ? "transient" : lifecycle;

		var component = new Component(self, keyName, type, lifecycle);
		self.components.push(component);

		return self;
	};

	self.intercept = function(interceptor) {
		self.interceptor = interceptor;
		return self;
	};

	self.resolve = function(keyName, args) {

		ioc.assert(keyName, "Cannot resolve with keyName = 'null'");

		var component = self.find(keyName);

		var instance = component.getComponent(args);

		ioc.assert(instance, "Could not resolve instance using key '{0}'".format(keyName));

		if (!ioc._.isNull(instance) && !ioc._.isNull(self.interceptor)) {
			$scarlet.intercept(instance).using(self.interceptor);
		}

		return instance;
	};

}

module.exports = Container;