module.exports = function(grunt) {

  grunt.initConfig({
    // packages as defined in package.json (npm)
    pkg: grunt.file.readJSON('package.json'),
    // Run jsHint on all sources & tests
    jshint: {
      files: ['Gruntfile.js', '/src/**/*.js', '/test/**/*.js'],
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
        src: ['src/**/*.js'],
        dest: '../../apps/lobby/static/lobby/js/lobby.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['css'], dest: '../../apps/lobby/static/lobby/'},
          {expand: true, src: ['fonts'], dest: '../../apps/lobby/static/lobby/'},
          {expand: true, src: ['lib/**'], dest: '../../apps/lobby/static/lobby/js/'},
          {
            expand: true,
            src: ['templates/*.html'],
            dest: '../../apps/lobby/templates/lobby/',
          },
        ]
      }
    },
    // create a mimified version
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'apps/lobby/static/lobby/js/lobby.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // on each file modification, run jsHint
    watch: {
      files: ['<%= jshint.files %>', ],
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
