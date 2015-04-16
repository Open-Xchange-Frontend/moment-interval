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

	// set default interval values
	moment.locale('en', {
		interval: {
		    'hm': {
		        'a': 'h:mm a – h:mm a',
		        'h': 'h:mm – h:mm a',
		        'm': 'h:mm – h:mm a'
		    },
		    'Hm': {
		        'H': 'HH:mm – HH:mm',
		        'm': 'HH:mm – HH:mm'
		    },
		    'yMMMd': {
		        'd': 'MMM d – d, y',
		        'M': 'MMM d – MMM d, y',
		        'y': 'MMM d, y – MMM d, y'
		    },
		    'yMMMEd': {
		        'd': 'E, MMM d – E, MMM d, y',
		        'M': 'E, MMM d – E, MMM d, y',
		        'y': 'E, MMM d, y – E, MMM d, y'
		    }
		}
	});
	
	moment.fn.formatInterval = function (endMoment) {
		return 'interval';
	};

	return moment;
}));
