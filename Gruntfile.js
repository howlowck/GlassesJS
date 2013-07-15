module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs : {
            build: {
                options: {
                    name: "irtc",
                    baseUrl: "public/js/src/modules",
                    paths: {
                        "irtc": "../irtc"
                    },
                    out: "dist/irtc.js",
                    optimize: "none"
                }
            }
        },
        concat : {
            addFallback: {
                src: ['public/js/fallback.js', 'dist/irtc.js'],
                dest: 'dist/irtc.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/irtc.min.js': ['dist/irtc.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['requirejs', 'concat','uglify']);
};