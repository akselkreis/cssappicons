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
					"css/critical.css": "scss/critical.scss",
					"css/styles.css": "scss/hub.scss"
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 0%']
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

					'css/build/minified/critical.css': [
					'css/build/mq-d/critical.css',
					],
				},

				options:{
					report: 'min'
				}
			}
		},

		htmlmin: {                                     // Task
	    dist: {                                      // Target
	      options: {                                 // Target options
	        removeComments: true,
	        collapseWhitespace: true,
					minifyJS: true
	      },
	      files: {                                   // Dictionary of files
	        'index.html': 'index-src.html'
	      }
	    },
		},

		jshint: {
			options: {
				'-W014':true,
				'-W018':true,
				'-W024': true,
				'-W030':true,
				'-W032':true,
				'-W041':true,
				'-W058':true,
				'-W067':true,
				'-W099':true,
				'-W093':true,
				asi:true,
				eqnull: true,
				eqeqeq: false,
				smarttabs: true,
			},
			beforeconcat: ['js/script.js'],
			afterconcat:{
				options:{
					'-W014':true,
					'-W018':true,
					'-W024': true,
					'-W030':true,
					'-W032':true,
					'-W041':true,
					'-W058':true,
					'-W067':true,
					'-W099':true,
					'-W093':true,
					asi:true,
					smarttabs:true,
					shadow:true
				},
				files:{
					src:['js/build/production.js']
				}
			}
		},

		concat: {
			dist: {
				src: [
				'js/zepto.min.js',
				'js/modernizr.js',
				'js/script.js'
				],
				dest: 'js/build/production.js'
			}
		},

		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},

		watch: {
			options: {
				//livereload: true,
			},

			scripts: {
				files: ['js/*.js','js/**/*.js'],
				tasks: ['jshint:beforeconcat','concat','uglify'],
				options: {
					spawn: false,
				}
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

	grunt.registerTask('default', ['jshint:beforeconcat','concat', 'uglify', 'sass', 'autoprefixer', 'cmq', 'cssmin', 'htmlmin', 'watch']);
	grunt.registerTask('dev', ['watch']);
};
