(function (root, factory) {
	'use strict';

	/*global define*/
	if (typeof define === 'function' && define.amd) {
		define(['moment'], factory);                 // AMD
	} else if (typeof exports === 'object') {
		module.exports = factory(require('moment')); // Node
	} else {
		factory(root.moment);                        // Browser
	}
}(this, function (moment) {
	'use strict';

	// Do not load moment-timezone a second time.
	if (moment.fn.formatInterval !== undefined) { return moment; }

	var regex = new RegExp("(G+|y+|Y+|M+|w+|W+|D+|d+|F+|E+|u+|a+|H+|k+|K+|h+|m+|s+|S+|z+|Z+|v+|V+)|'((?:[^']|'')+)'|('')", 'g');

	// convert cldr date format to moment format
	function convertFormatToMoment(format) {
		return format;
	}

	function getFormat(end) {

	}

    function formatInterval(end, format) {
        var fields = {}, match;
        regex.lastIndex = 0;
        while ((match = regex.exec(format))) {
            if (!match[1]) continue;
            var letter = match[1].charAt(0);
            if (fields[letter]) break;
            fields[letter] = true;
        }
        if (regex.lastIndex) {
        	console.log(format.slice(0, match.index), format.slice(match.index));
            // return this.format() + end.format(format.slice(match.index));
        } else {
        	console.log(format);
            // return this.format(format);
        }
    }

	moment.fn.formatInterval = function (endMoment) {
		return 'interval';
	};

	return moment;
}));
