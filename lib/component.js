var g = require("../include");

function Component(container, keyName, type, lifecycle) {

	g.assert(container, "scarlet-contrib-g::Component::container == null");
	g.assert(keyName, "scarlet-contrib-g::Component::keyName == null");
	g.assert(type, "scarlet-contrib-g::Component::type == null");

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
		g.assert(type, "scarlet-contrib-g::Component::resolveDependencies::type == null");
		var dependencies = [];
		var parameters = self.getParameterNames(type);
		if (g._.any(parameters)) {
			g._.forEach(parameters, function(keyName) {
				var instance = container.resolve(keyName);
				if (!g._.isNull(instance))
					dependencies.push(instance);
			});
		}
		return dependencies;
	};

	self.getComponent = function(args) {
		var instance = null;
		var dependencies = self.resolveDependencies(self.type);
		if (self.lifecycle == "singleton") {
			if (g._.isNull(self.singleton)) {
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