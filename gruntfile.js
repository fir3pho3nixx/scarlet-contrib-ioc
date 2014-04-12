module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: ["gruntfile.js", "index.js", "lib/**/*.js", "test/**/*.js"],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },
    spawn: {
      test: {
        command: "mocha",
        commandArgs: ["--reporter", "spec", "{0}"],
        directory: "./tests",
        pattern: "tests/**/*.js",
        ignore: [
          "dummies/index.js",
          "dummies/any-dependency-a.js",
          "dummies/any-dependency-b.js",
          "dummies/any-dependency-c.js",
          "dummies/any-object.js",
        ]
      }
    },
    release: {
      options: {
        bump: true,
        file: "package.json",
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "spawn:test"]
    },
    browserify: {
      basic: {
        src: ['./index.js'],
        dest: './pub/scarlet.js'
      },
      options: {
        standalone: 'scarlet'
      }
    }
  });

  grunt.loadNpmTasks("grunt-mox");
  grunt.loadNpmTasks("grunt-spawn");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("test", ["spawn:test"]);
  grunt.registerTask("default", ["jshint"]);
  grunt.registerTask("deploy", ["jshint", "browserify", "release"]);

};