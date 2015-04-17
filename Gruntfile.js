var cldr = require('cldr');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

module.exports = function (grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

	grunt.registerTask('cldr', 'get cldr data', function(a, b) {
		var done = this.async();
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
								index = fmtstr.push(localeCldr[key][format]);
							}
							localeCldr[key][format] = index;
						});
					}
				});

				var jsonToSting = JSON.stringify(localeCldr, null, 4);

				fs.writeFileSync('locale/' + el , jsonToSting);
				var md5 = crypto.createHash('md5').update(jsonToSting).digest('hex');
				complete[locale] = localeCldr;

			});

			console.log(fmtstr);
			fs.writeFileSync('locale/locale.js', JSON.stringify(complete, null, 0));
			done();
		});
	});

	grunt.registerTask('default', [ 'cldr' ]);
};
