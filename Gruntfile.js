var cldr = require('cldr'),
	fs = require('fs'),
	path = require('path');

module.exports = function (grunt) {

	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    var localeJSON = '';

	grunt.registerTask('cldr', 'get cldr data', function(a, b) {
		var done = this.async();

		function cldrToMoment(cldrFormat) {
			return cldrFormat
				.replace(/[yad]/g, function (x) { return x.toUpperCase() })
				.replace(/Y/g, 'YYYY')
				.replace(/EEEE/g, 'dddd')
				.replace(/E/g, 'ddd')
				.replace(/K/g, 'h')
				.replace(/k/g, 'H');
		}

		fs.readdir('node_modules/moment/locale', function (err, files) {
			if (err) throw err;

			var complete = {},
				fmtstr = [];

			// add default language
			files.push('en.js');

			files.forEach(function (el, i) {
				var locale = path.basename(el, '.js'),
					localeCldr = cldr.extractDateIntervalFormats(locale),
					keys = 'hm,Hm,yMMMEd,fallback'.split(',');
				Object.keys(localeCldr).forEach(function (key) {
					if (keys.indexOf(key) === -1) {
						delete localeCldr[key];
					} else {
						Object.keys(localeCldr[key]).forEach(function (format) {
							var index = fmtstr.indexOf(localeCldr[key][format]);
							if (index === -1) {
								index = fmtstr.push(cldrToMoment(localeCldr[key][format])) - 1;
							}
							localeCldr[key][format] = index;
						});
					}
				});
				var jsonToSting = JSON.stringify(localeCldr, null, 4);
				complete[locale] = localeCldr;

			});

			// add format strings to locales object
			complete.formats = fmtstr;
			localeJSON = JSON.stringify(complete, null, 0);

			done();
		});
	});

    grunt.config.merge({
        assemble: {
            options: {
                locale: function () {
                	return localeJSON;
                }
            },
            interval: {
                options: {
                    layout: false,
                    ext: ''
                },
                files: [
                    {
                        src: ['moment-formatInterval.js.hbs'],
                        expand: true
                    }
                ]
            }
        }
    });

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('default', [ 'cldr', 'assemble:interval' ]);
};
