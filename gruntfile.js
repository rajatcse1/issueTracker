module.exports = function(grunt){
	grunt.initConfig({		
		useminPrepare:{
			html:"public/index.html",
			options:{
				dest:"build"
			}
		},
		usemin:{html:["build/index.html"]},
		copy:{
			task0:{
				src:"public/index.html", dest:"build/index.html"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-usemin");

	grunt.registerTask("build", [
		"copy:task0",
		"useminPrepare",
		"concat",
		"cssmin",
		"uglify",
		"usemin"
	])
}