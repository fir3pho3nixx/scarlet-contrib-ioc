scarlet-ioc
===========

A plugin for doing IoC using Scarlet.

##Installation

    npm install scarlet-ioc

##Quickstart

```javascript
function MyObjectA(){
	var self = this;
	self.anyMethod = function(){
		console.log("calling A");
	};
}

function MyObjectB(myObjectA){
	var self = this;
	self.anyMethod = function(){
		myObjectA.anyMethod();
		console.log("calling B");
	};
}

var Scarlet = require("scarlet");
var scarlet = new Scarlet(["scarlet-ioc"]);

scarlet.plugins.ioc
	.register("myObjectA", MyObjectA)
	.register("myObjectB", MyObjectB);

var myObjectB = scarlet.plugins.ioc.resolve("myObjectB");
myObjectB.anyMethod();
```

