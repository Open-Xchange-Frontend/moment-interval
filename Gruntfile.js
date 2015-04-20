var cldr = require('cldr');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

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
				.replace('EEEE', 'dddd')
				.replace('E', 'ddd')
				.replace('K', 'h')
				.replace('k', 'H');
		}

		fs.readdir('node_modules/moment/locale', function (err, files) {
			if (err) throw err;

			var complete = {};
			var fmtstr = [];
			
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
								index = fmtstr.push(cldrToMoment(localeCldr[key][format]));
							}
							localeCldr[key][format] = index;
						});
					}
				});
				var jsonToSting = JSON.stringify(localeCldr, null, 4);
				complete[locale] = localeCldr;

			});

			localeJSON = JSON.stringify(complete, null, 0);

			fs.writeFileSync('locale/format.js', JSON.stringify(fmtstr, null, 0));
			fs.writeFileSync('locale/locale.js', localeJSON);

			done();
		});
	});

    grunt.config.merge({
        assemble: {
            options: {
                formatStrings: ['locale/formatStrings.js'],
                locale: localeJSON
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
