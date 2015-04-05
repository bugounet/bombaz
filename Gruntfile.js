module.exports = function(grunt) {

  grunt.initConfig({
    // packages as defined in package.json (npm)
    pkg: grunt.file.readJSON('package.json'),
    // Run jsHint on all sources & tests
    jshint: {
      files: ['Gruntfile.js', 'javascript/src/**/*.js', 'javascript/test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['javascript/src/lobby/**/*.js'],
        dest: 'apps/lobby/static/lobby/js/<%= pkg.name %>.js'
      }
    },
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
      tasks: ['jshint']
    }
  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('test', ['jshint']);
grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
