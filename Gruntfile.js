module.exports = function(grunt) {

  grunt.initConfig({
    // packages as defined in package.json (npm)
    pkg: grunt.file.readJSON('package.json'),
    // Run jsHint on all sources & tests
    jshint: {
      files: ['Gruntfile.js', 'bombaz/javascript/lobby/src/**/*.js', 'bombaz/javascript/lobby/test/**/*.js'],
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
        src: ['bombaz/javascript/lobby/src/**/*.js'],
        dest: 'bombaz/apps/lobby/static/lobby/js/lobby.js'
      }
    },
    copy: {
      lobby: {
        files: [
          {
            expand: true,
            src: ['bombaz/javascript/lobby/css/**/*'],
            dest: 'bombaz/apps/lobby/static/lobby/css/'
          },
          {
            expand: true,
            src: ['bombaz/javascript/lobby/fonts/**/*'],
            dest: 'bombaz/apps/lobby/static/lobby/fonts/'
          },
          {
            expand: true,
            src: ['bombaz/javascript/lobby/templates/**/*.html'],
            dest: 'bombaz/apps/lobby/templates/lobby/',
          }
        ]
      },
      lobbylibs: {
        files: [
          {
            expand: true,
            src: ['bombaz/javascript/lobby/lib/**/*'],
            dest: 'bombaz/apps/lobby/static/lobby/js/'
          }
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
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('test', ['jshint']);
grunt.registerTask('default', ['jshint', 'concat', 'copy:lobby']);
};
