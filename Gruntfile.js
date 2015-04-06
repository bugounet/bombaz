module.exports = function(grunt) {

  grunt.initConfig({
    // packages as defined in package.json (npm)
    pkg: grunt.file.readJSON('package.json'),
    // Run jsHint on all sources & tests
    jshint: {
      files: ['Gruntfile.js', 'javascript/lobby/src/**/*.js', 'javascript/lobby/test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    // concatenate all sources in one app file.
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['javascript/lobby/src/**/*.js'],
        dest: 'apps/lobby/static/lobby/js/<%= pkg.name %>.js'
      }
    },
    // create a mimified version
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'apps/lobby/static/lobby/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // on each file modification, run jsHint
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat']
    }
  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('test', ['jshint']);
grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
