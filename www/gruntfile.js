module.exports = function (grunt) {
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-typescript');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-concurrent');



// Project configuration.
grunt.initConfig({
  connect: {
    server: {
      options: {
        port: 5674,
        base: '.'
	  }
     }
  },
  karma: {
      e2e: {
        configFile: 'configs/karma-e2e.conf.js',
        singleRun: true,
		autoWatch:false
      },
	  unit: {
        configFile: 'configs/karma.conf.js',
        singleRun: true,
		autoWatch:false
      }
    },
	typescript: {
            base: {
                src: ['js/**/*.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        },
    watch: {
            typescript: {
				files: '**/*.ts',
				tasks: ['typescript','test']
			},
			normal: {
				files: '**/*.js',
				tasks: ['test']
			}
    },
	
  
});

grunt.registerTask('test', ['connect:server','karma']);
grunt.registerTask('e2e',['connect:server','karma:e2e']);
grunt.registerTask('unit',['karma:unit']);
grunt.registerTask('server', ['connect:server:keepalive']);
grunt.registerTask('type', ['typescript']);
grunt.registerTask('auto', ['watch:normal']);
grunt.registerTask('autoType', ['watch:typescript']);

}