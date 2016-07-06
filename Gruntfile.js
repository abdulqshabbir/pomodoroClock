module.exports = function(grunt) {
require('load-grunt-tasks')(grunt);

    //All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
            jshint: {
                all: ['Gruntfile.js', 'js/app_ES5.js']
            },
            concat: {
                sass: {
                    src: 'css/**.sass',
                    dest: 'dest/styles.sass',
                },
                js: {
                    src: 'js/**.js',
                    dest: 'dest/app.js',
                },
            },
            babel: {
		        options: {
			        presets: ['babel-preset-es2015'],
		        },
        	    dist: {
    			    files: {
    	                'dest/app_ES5.js': 'dest/app.js'
    			    },
        	    }
	        },

            sass: {
            	dist: {
        			files: {
        				'dest/styles.css': 'dest/styles.sass'
        			},
        		},
        	},
            autoprefixer: {
                css: {
                    src: 'dest/styles.css',
                    dest: 'dest/styles_autoprefixed.css',
                },
            },
            watch: {
                js: {
                    files: 'js/*.js',
                    tasks: ['jshint', 'concat', 'babel', 'jasmine'],
                    options: {
                        spawn: false,
                    },
                },
                sass: {
                    files: 'css/*.sass',
                    tasks: ['concat', 'sass', 'autoprefixer'],
                },
            },
    });
    //Where we tell Grunt we plan to use this plug-in.
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
    //Where we tell Grunt what to do when we type "grunt" into the terminal.
        grunt.registerTask('default', ['concat', 'babel', 'jshint', 'sass', 'autoprefixer']);
        grunt.registerTask('grunt watch');
};
