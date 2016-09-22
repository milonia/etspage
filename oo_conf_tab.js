/*
OnlineOpinion v5.9.3
Released: 09/21/2015. Compiled 09/30/2015 12:09:31 PM -0500
Branch: 5.9.3 efe6bf2541deb563c2a9884b2a3034c881047acf
Components: Full
UMD: disabled
The following code is Copyright 1998-2015 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/* global window, OOo */

function parseURL(url) {
    var anchor =  document.createElement('a');
    anchor.href = url;
    return {
        params: (function(){
            var param_list = {},
                seg = anchor.search.replace(/^/,'').split('&'),
                len = seg.length, i = 0, key;
            for (; i<len; i++) {
                if (!seg[i]) { 
									continue;
								}
                key = seg[i].split('=');
                param_list[key[0]] = key[1];
            }
            return param_list; 
        })()
    };
}

var urlParams = parseURL(location.href),
	  urlHost = location.hostname,
    urlPath = location.pathname;

var searchBy = urlParams.params["?searchBy"],
		us_zip = '',
		country = '',
		oo_rp = '';

if (urlHost.indexOf('gace') > -1) {
	oo_rp = '://gace-inline.ets.org';
} else if (urlHost.indexOf('maprequest') > -1) {
	if (urlPath.indexOf('GAT') > -1) {
		oo_rp = '://maprequest-inline.ets.org';
	} else if (urlPath.indexOf('PRX') > -1) {
		oo_rp = '://maprequest-inline.ets-praxis.org';
	}
} else if ((urlHost.indexOf('ets') > -1) && (urlPath.indexOf('praxis') > -1)) {
		oo_rp = '://www.ets-praxis.org';
}

	
if (searchBy == 'ZIP') {
		us_zip = urlParams.params["us_zip"];
} else {
		country = urlParams.params["country"];
}

/* [+] Tab & Inline configuration */
(function (w, o) {
    'use strict';

    var OpinionLabInit = function () {

        o.oo_tab = new o.Ocode({
            tab: {},
            newWindowSize: [545, 425],
        });

		o.oo_feedback = new o.Ocode({
			referrerRewrite: {
				searchPattern: /:\/\/.*/g, 
				replacePattern: oo_rp 
			},
			customVariables: {
				loc: country, 
				zip: us_zip
			}
		});

        o.oo_launch = function(e, feedback) {
            var evt = e || window.event;
            o[feedback].show(evt);
        };

    };

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);
