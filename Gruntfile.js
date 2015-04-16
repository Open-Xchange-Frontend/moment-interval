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
			files.forEach(function (el, i) {
				var locale = path.basename(el, '.js'),
					localeCldr = cldr.extractDateIntervalFormats(locale),
					keys = 'hm,Hm,yMMMd,yMMMEd,fallback'.split(',');
				
				Object.keys(localeCldr).forEach(function (key) {
					if (keys.indexOf(key) === -1) {
						delete localeCldr[key];
					}
				});

				var jsonToSting = JSON.stringify(localeCldr, null, 4);

				fs.writeFileSync('locale/' + el , jsonToSting);
				var md5 = crypto.createHash('md5').update(jsonToSting).digest('hex');
				complete[locale] = localeCldr;
			});
			fs.writeFileSync('locale/locale.js', JSON.stringify(complete, null, 4));
			done();
		});
	});

	grunt.registerTask('default', [ 'cldr' ]);
};
