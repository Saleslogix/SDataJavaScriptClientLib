module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['src/**/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 8002,
                    hostname: '127.0.0.1',
                    base: '.'
                }
            }
        },
        jasmine: {
            coverage: {
                src: ['src/**/*.js'],
                options: {
                    specs: 'tests/**/*.js',
                    host: 'http://127.0.0.1:8002/',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: [
                            {
                                type: 'text'
                            },
                            {
                                type: 'html',
                                options: {
                                    dir: 'coverage'
                                }
                            }
                        ],
                        template: 'GruntRunner.tmpl'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['connect', 'jasmine:coverage']);
    grunt.registerTask('default', ['test']);
};
