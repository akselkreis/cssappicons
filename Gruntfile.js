module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		sass: {
		    dist: {
				options: {
					style: 'expanded'
				},
				files: {
					"css/styles.css": "scss/hub.scss"
				}
			}
		},
		
		autoprefixer: {
			options: {
				browsers: ['> 1%','Last 2 versions','IE 8','IE 9']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/*.css',
				dest: 'css/build/prefixed/'
			}
		},

		cmq: {
		    options: {
		      log: true
		    },
		    your_target: {
		      files: {
		        'css/build/mq-d': ['css/build/prefixed/*.css']
		      }
			}
		},

		
		cssmin: {
			combine: {
				files: {
					'css/build/minified/styles.css': [
					'css/build/mq-d/styles.css',
					],
				},

				options:{
					report: 'min'
				}
			}
		},
		
		watch: {
			options: {
				//livereload: true,
			},

			css: {
				files: ['scss/*.scss','scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cmq', 'cssmin'],
				options: {
					spawn: false,
				}
			}	
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['sass', 'autoprefixer', 'cmq', 'cssmin', 'watch']);

	grunt.registerTask('dev', ['watch']);
};