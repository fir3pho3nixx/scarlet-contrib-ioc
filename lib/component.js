var ioc = require("./include");

function Component(container, keyName, type, lifecycle) {

	ioc.assert(container, "scarlet-contrib-ioc::Component::container == null");
	ioc.assert(keyName, "scarlet-contrib-ioc::Component::keyName == null");
	ioc.assert(type, "scarlet-contrib-ioc::Component::type == null");

	var self = this;

	self.type = type;
	self.keyName = keyName;
	self.lifecycle = lifecycle;
	self.container = container;
	self.singleton = null;

	self.getParameterNames = function() {

		if (typeof(type) == "function") {

			var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

			var typeCode = self.type.toString();
			typeCode = typeCode.replace(STRIP_COMMENTS, '');

			var startBracket = typeCode.indexOf('(');
			var endBracket = typeCode.indexOf(')');

			return typeCode.slice(startBracket + 1, endBracket).match(/([^\s,]+)/g);

		}

		return [];

	}

	self.resolveDependencies = function(type) {

		ioc.assert(type, "scarlet-contrib-ioc::Component::resolveDependencies::type == null");

		var dependencies = [];
		var parameters = self.getParameterNames(type);

		if (ioc._.any(parameters)) {

			ioc._.forEach(parameters, function(keyName) {

				var instance = container.resolve(keyName);
				if (!ioc._.isNull(instance))
					dependencies.push(instance);

			});

		}
		return dependencies;

	};

	self.getComponent = function(args) {

		var instance = null;

		var dependencies = self.resolveDependencies(self.type);

		if (self.lifecycle == "singleton") {

			if (ioc._.isNull(self.singleton)) {

				instance = new Object();
				self.type.apply(instance, dependencies);
				self.singleton = instance;

			}

			instance = self.singleton;

		} else {

			instance = new Object();
			self.type.apply(instance, dependencies);

		}

		return instance;

	};
}

module.exports = Component;