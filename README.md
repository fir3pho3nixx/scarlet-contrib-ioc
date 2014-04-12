scarlet-ioc
===========

A plugin for doing IoC using Scarlet.

##Installation

    npm install scarlet-ioc

##Quickstart

```javascript
var Scarlet = require("scarlet");
var scarlet = new Scarlet(["scarlet-ioc"]);

function MyObjectA(){
    var self = this;
    self.anyMethod = function(){
    	// do stuff
    };
}

function MyObjectB(myObjectA){
	var self = this;
	self.anyMethod = function(){
		myObjectA.anyMethod();
	};
}

scarlet.plugins.ioc
	.register("myObjectA", MyObjectA, "singleton")
	.register("myObjectB", MyObjectB, "transient");

var myObjectB = scarlet.plugins.ioc.resolve("myObjectB");
myObjectB.anyMethod();
```
