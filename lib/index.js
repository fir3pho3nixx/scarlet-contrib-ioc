module.exports = function($scarlet) {

	var self = this;

	self.initialize = function() {
		var Container = require("./container");
		var container = $scarlet.plugins.ioc = new Container($scarlet);
		container.initialize();
		return container;
	};

	return self;

};