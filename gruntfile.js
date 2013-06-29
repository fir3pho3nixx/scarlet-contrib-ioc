module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'index.js', 'lib/**/*.js','test/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },
    release: {
      options: {
        bump: true, //default: true
        file: 'package.json', //default: package.json
        add: true, 
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask("deploy", ["release", "scarlet-bump"]);

  grunt.registerTask("scarlet-bump", "A task for bumping release announcements to twitter", function(){

    var done = this.async();
    
    var fs = require("fs");
    require("string-format");
    var http = require("http");
    var prompt = require("prompt");

    var project = "scarlet-contrib-ioc";
    var package = fs.readFileSync("./package.json");
    var version = JSON.parse(package).version;

    console.log("Please enter the scarlet twitter password to bump the release annnouncement:");

    prompt.start();

    prompt.get(["password"], function(err, result){
        //var url = "http://www.scarletjs.com/release/bump?project={0}&version={1}&auth={2}"
        var url = "http://localhost:3001/release/bump?project={0}&version={1}&auth={2}"
        var req = http.get(url.format(project, version, result.password), function(res) {
        console.log("Scarletj.scom: " + res.statusCode);
        console.log("Scarletjs.com: " + JSON.stringify(res.headers));
        done();
      });

    });

  });
};
