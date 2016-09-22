//
// ets-base.js
//

$(function(){

	// Go!
	$('html').removeClass('no-js').addClass('js');
	
	// $("head").append('<meta name="viewport" content="width=device-width,initial-scale=1" />');

	// detects IE
	var isIE = detectIE();
	if( isIE ) {
		$('html').addClass('ie');
	}
	// console.log( '-isIE: '+ isIE );

	// detech OSX
	var isOSX = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	if( isOSX ) { $('html').addClass('osx'); }
	// console.log( '-isOSX: '+ isOSX );

	// detect flash
	var hasFlash = false;
	try {
		var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if(fo) { hasFlash = true; }
	}catch(e){
		if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) { hasFlash = true; }
	}
	$('html').addClass('hasFlash');
	// console.log( '-hasFlash: '+hasFlash );

	var isMoz = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	if( isMoz ) {
		$('html').addClass('moz');
	}

	if(document.addEventListener && !window.requestAnimationFrame) {
		$('html').addClass('ie9');
	}
	
	
	// make the opinion lab feedback tab work
	$('body').on('click','#oo_tab,#oo_lab_link',function(e){
		OOo.oo_feedback.show(e);
	});

	// make 'link' buttons active
	// <button type="button" data-link="url">text</button>
	$('body').on('click','[data-link]',function(e){
		e.preventDefault();
		window.location.href = $(this).data('link');		
	});

	$('div.graydottedbar').remove();
	
	// superscript all the registraion marks
	// this won't work in IE, because IE is lovely
	try { // so catch the error in IE
		$('body :not(script,sup)').contents().filter(function() {
			return this.nodeType === 3;
		}).replaceWith(function() {
			return this.nodeValue.replace(/[®]/g, '<sup>$&</sup>');
		});
	}
	catch(err) {
		// nothing.
	}
	try { // so catch the error in IE
		$('body :not(script,sup)').contents().filter(function() {
			return this.nodeType === 3;
		}).replaceWith(function() {
			return this.nodeValue.replace(/[™]/g, '<span class="tm">$&</span>');
		});
	}
	catch(err) {
		// nothing.
	}	
	//
	$('#main a[href^="http"]').each(function(){ openNewWindow( $(this) ); });
	$('#wrap-head a[href^="http"]').each(function(){ openNewWindow( $(this) ); });
	$('#footer a[href^="http"]').each(function(){ openNewWindow( $(this) ); });

	$('a[href^="/bin/getprogram.cgi?test=gre"]').each(function(){ openNewWindow( $(this) ); });
	$('a[href^="/gre/rrc"]').each(function(){ openNewWindow( $(this) ); });
	
	
	// pdfs open in a new window
	$('a[href$=".pdf"]').each(function(){
		// only add the PDF links if the link do not contain an image
		$(this).filter(function(index){
			return $('img', this).length == 0;
		}).filter(function(index){
			return $(this).hasClass('btn') == false;
		}).append(" <span class='is-pdf'>(PDF)</span>");
		$(this)
			.attr('title','This link opens in a new window')
			.attr('target','_blank')
			;
	}); // end: .pdf-each

	$('a[href$=".txt"]').each(function(){
		$(this).append(" (Text)");
		if( !(/^http/.test($(this).attr('href'))) && !(/popup/i.test($(this).attr('class'))) ) {
			$(this).click(function(e){
				e.preventDefault();
				openNewWindow( $(this) );
			});
		}
	});
	$('a[href$=".doc"]').each(function(){
		$(this).append(" (Word)");
		if( !(/^http/.test($(this).attr('href'))) && !(/popup/i.test($(this).attr('class'))) ) {
			$(this).click(function(e){
				e.preventDefault();
				openNewWindow( $(this) );
			});
		}
	});
	$('a[href$=".xls"]').each(function(){
		$(this).append(" (Excel)");
		if( !(/^http/.test($(this).attr('href'))) && !(/popup/i.test($(this).attr('class'))) ) {
			$(this).click(function(e){
				e.preventDefault();
				openNewWindow( $(this) );
			});
		}
	});
	$('a[href$=".swf"]').each(function(){
		$(this).append(" (Flash)");
		if( !(/^http/.test($(this).attr('href'))) && !(/popup/i.test($(this).attr('class'))) ) {
			$(this).click(function(e){
				e.preventDefault();
				openNewWindow( $(this) );
			});
		}
	});
	$('a[href$=".ppt"]').each(function(){
		$(this).append(" (Powerpoint)");
		if( !(/^http/.test($(this).attr('href'))) && !(/popup/i.test($(this).attr('class'))) ) {
			$(this).click(function(e){
				e.preventDefault();
				openNewWindow( $(this) );
			});
		}
	});

	// work some functionality for anchors with 'class="popup"'
	$('a.popup').each(function (i){
		$(this).attr('title','This link opens in a new window');
		$(this).click(function(event) {
			event.preventDefault();
			var hw = '';
			var pop_url = $(this).attr('href');

			if( $(this).attr('class') ) {
				var pop_width = 800;
				var pop_height = 600;

				var class_info = $(this).attr('class');
				var regexp = /(h-\d+|w-\d+)/gi;

				var info = class_info.match(regexp);
				if( info != null ) {
					info.forEach(function(x,idx){
						if( /w-\d+/.test(x) ){ pop_width = x.substr(2); }
						if( /h-\d+/.test(x) ){ pop_height = x.substr(2); }
					});
					hw =",width="+pop_width+",height="+pop_height;
				}
			}
			pop_window = window.open( pop_url, "ets_pop","location=1,resizable=1,scrollbars=1,status=1"+hw );
		}); // end this.click
	}); // end: a.popup each	
	
	// check for the fonts
	var observer = new FontFaceObserver('Open Sans', {
		weight: 400
	});
	observer.check().then(function () {
		// console.log('Font is available');
		$('html').addClass('fonts-loaded'); // https://www.filamentgroup.com/lab/font-events.html
		Cookies.set('fonts-loaded', 'true'); // server looks for this cookie, adds class to html tag if found
	});

	// set up the search trigger
	$('#search-trigger').attr({
		'role': 'button',
		'aria-controls': 'site-search',
		'aria-label': 'search form',
		'aria-expanded': 'false'
	});

	$('#search-trigger').on('click',function(e){
		// console.log('search trigger: click');
		e.preventDefault();
		toggleNavSlider('search-trigger','site-search', true);
	}).on('keydown', function(e){
		if( e.keyCode === 9 ){
			if( $(this).attr('aria-expanded') == 'true' ) {
				// do something on tab
			}
		}
	});

	$('#site-search-form-go').on('keydown',function(e){
		if( e.keyCode === 9 ){
			if( !e.shiftKey ){
				e.preventDefault();
				$('#search-trigger').focus();
			}
		}
	});
	// set up the search trigger

	// set up the language trigger
	$('#language-trigger').attr({
		'role': 'button',
		'aria-controls': 'language-form',
		'aria-label': 'language select form',
		'aria-expanded': 'false'
	});
	$('#language-trigger').on('click',function(e){
		// console.log('language trigger: click');
		e.preventDefault();

		toggleNavSlider('language-trigger','language-form', false);

	}).on('keydown', function(e){
		if( e.keyCode === 9 ){
			if( $(this).attr('aria-expanded') == 'true' ) {
				if( !e.shiftKey ){
					e.preventDefault()
					$('#language-form').find('a').first().focus();
				} else {
				}
			}
		}
	});
	$('#language-form').find('a').last().on('keydown',function(e){
		if( e.keyCode === 9 ){
			if( !e.shiftKey ){
				e.preventDefault();
				$('#language-trigger').focus();
			}
		}
	});
	// set up the language trigger

	// because we're amazing and *really* always have to show the audience types
	// no matter how many other places on the page they appear OR 
	// how long the name are... we may need to convert the amazing
	// list of audience types into a super spiffy and much loved
	// dropdown-select pattern. people love that. :-|
	//
	// if we see we need a dropdown, leap into action and add the necessary structures
	var logosW = $('#logos').width();
	var audsW = $('#auds').width();
		
	// unless the 'as-dropdown' is already present
	if( $('#auds ul.as-dropdown').exists() ) {

		// pull out the current-aud and make that a label
		$('#auds > ul > li > a.current-aud').parent('li').addClass('remove');
		$curAud = $('#auds li.remove a').clone().addClass('trigger');
		
		$('#auds').prepend($curAud);

		$audTrigger = $('#auds > a.current-aud.trigger');
		$audTrigger.append('<span class="icon" />');
		
		$audTrigger.on('click',function(e){
			e.preventDefault();
			// console.log('audTrigger: click');
			$('#auds > ul').toggle();
			$audTrigger.toggleClass('border');
		});	
	
	} else {
	
		$(window).on('load resize', function(){
	
			// available width for the audience menu
			availableW = $('#wrap-head > header').width() + 10 - logosW;

			// console.log('if( availableW > auds ) -- if( '+ availableW+' > '+ audsW +') == ' + (availableW > audsW) );
			
			if( availableW > audsW  ) {

				$('#auds > a.current-aud.trigger').remove();
				$('#auds > ul > li.remove').removeClass('remove');
				$('#auds > ul').removeClass('as-dropdown-dynamic');		
		
			} else {

				if( !($('#auds ul.as-dropdown-dynamic').exists() )) {
						
					$('#auds > ul').addClass('as-dropdown-dynamic');
					$('#auds > ul > li > a.current-aud').parent('li').addClass('remove');
					
					$curAud = $('#auds li.remove a').clone().addClass('trigger');
					
					$('#auds').prepend($curAud);

					$audTrigger = $('#auds > a.current-aud.trigger');
					$audTrigger.append('<span class="icon" />');
					
					$audTrigger.on('click',function(e){
						e.preventDefault();
						// console.log('audTrigger: click');
						$('#auds > ul').toggle();
						$audTrigger.toggleClass('border');
					});
				}
			}				
		}); // end on $(window).load.resize

	} // end if ul.as-dropdown	

	
	// fix the structure of the #aud-trigger
	var $audTrigger = $('#aud-trigger');
	var $audTriggerCurrentAnchor = $audTrigger.find('a.current-aud');
	$audTrigger.find('ul').addClass('as-dropdown');
	$audTriggerCurrentAnchor.addClass('trigger current-aud').append('<span class="icon" />');
	$audTrigger.prepend( $audTriggerCurrentAnchor.detach() );
	// fix the structure of the #aud-trigger
	
	// the language select form in the responsive menu
	$('#mm-lang-select').change(function(){
		var lang = "/" + this.value;
		var url = $('#ets-language-url').val();
		if( lang === "/en" ) { lang = ""; }
		window.location.href = lang + url
	});
	// the language select form in the responsive menu
	
	// handle #aud-trigger
	$audTriggerRwd = $('#aud-trigger > a.current-aud');
	$audTriggerRwd.on('click',function(e){
		e.preventDefault();
		// console.log('audTrigger: click');
		$('#aud-trigger > ul').toggle();
		$audTriggerRwd.toggleClass('border');
	});

	// set up the responsive menu trigger
	$('#mm-trigger a')
	.attr({
		'role': 'button',
		'aria-controls': 'mm',
		'aria-label': 'show collapsed menu',
		'aria-expanded': 'false'
	})	
	.on('click',function(e){
		e.preventDefault();

		var	$trigger = $(this), 
			$menu = $('#'+ $trigger.attr('aria-controls') ), // the menu below the trigger
			menuVisible = !($menu.is(":visible")); // is the menu visible?
			
		$menu.slideToggle({ // open or close the menu (majestically)
			duration: 200,
			complete: function(anime,progr,remain){
				if( menuVisible ) {
					// console.log('menu is visible');
					$trigger.attr({'aria-expanded':'true'});
					$trigger.find('.svg').html('<svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>');
				} else {
					// console.log('menu is hidden')
					$trigger.attr({'aria-expanded':'false'});
					$trigger.find('.svg').html('<svg class="icon icon-bars"><use xlink:href="#icon-bars"></use></svg>');
				}
				var $triggerHtml = $trigger.html();
				setTimeout(function() {
					$trigger.html($triggerHtml);
				}, 520);
			}
		});  		
	});	
	// set up the responsive menu trigger

	// set up the .misc.groups at the bottom of every left-nav .organizer
	if( $('#nav-site .nav-item:not("#search")').length > 0 ){
		$('#mm .organizer .wrap-groups').each(function(){
			$(this).append('<div class="group misc"></div>');
			$(this).find('.group.misc').html( $('#nav-site .nav-item:not("#search")').clone() );
		});		
	}
	// set up the .misc.groups at the bottom of every left-nav .organizer

	// set up the overview links for the responsive menu
	// start with the .has-sub items
	$('#mm li.has-sub').each(function(){
		$(this).addClass('js-overview');
		var $ul = $(this).find('ul');		
		var $a = $(this).find('> a');
		var isCurrent = "";
		if( $(this).hasClass('current') ) {
			isCurrent = ' current';
		}
		$ul.prepend('<li class="overview'+ isCurrent +'"><a href="'+ $a.attr('href') +'"><span class="hide">'+ $a.text() +' </span>Overview</a></li>');
	});
	// now the h3 that are followed by uls
	
	// set up the overview links for the responsive menu
	$('#mm .group:has("ul")').each(function(){
		$(this).addClass('js-overview');
		var $h3 = $(this).find('h3');
		var $ul = $h3.next('ul');
		var $a = $h3.find('a');
		var isCurrent = "";
		if( $h3.hasClass('current') ){
			isCurrent = ' current';
		}
		$ul.prepend('<li class="overview'+ isCurrent +'"><a href="'+ $a.attr('href') +'"><span class="hide">'+ $a.text() +' </span>Overview</a></li>');
	});
	
	
	// there have been some updates to proethica that boned the navigation
	// until we can get the templates updated, fix it here.
	if( $('body').hasClass('proethica') ) {
		// console.log('proethica');
		$organizers = $('#mm .organizer .organizer');
		$organizers.find('.wrap-groups').remove();
	}

	
	$('a').has('img').addClass('js-has-img');
	
	// and now expose the page
	$('body').removeClass('init');

}); // end document.ready


function slideMenu(trigger) {

		var	$trigger = trigger, 
			$menu = $('#'+ $trigger.attr('aria-controls') ), // the menu below the trigger
			menuVisible = !($menu.is(":visible")); // is the menu visible?
		
		$menu.slideToggle({ // open or close the menu (majestically)
			duration: 200,
			complete: function(anime,progr,remain){
				if( menuVisible ) {
					// console.log('menu is visible');
					$trigger.attr({'aria-expanded':'true'});
				} else {
					// console.log('menu is hidden')
					$trigger.attr({'aria-expanded':'false'});
				}
				var $triggerHtml = $trigger.html();
				setTimeout(function() {
					$trigger.html($triggerHtml);
				}, 520);
			}
		});  

} // end slideMenu

function setRwdMenu() {
	// console.log('setRwdMenu');
		
	// move the nav to a better spots
	// above the page contents
	$('#crumbs-and-support').prepend( $('#mm').detach() ).prepend( $('#wrap-triggers').detach() );
	
	// tack an ID onto each of the .groups
	// and set up the tiggers
	// and handle the show-hide on 'click'
	var organizerCount = 0;
	// $('#mm .wrap-groups').each(function(){
	$('#mm div:not(.only-panel) .wrap-groups').each(function(){
		var $group = $(this);
		$group
			.attr('id','rwd-organizer-'+organizerCount)
			.prev('h2')
				.find('a')
					.attr({
						'role': 'button',
						'aria-controls': 'rwd-organizer-'+organizerCount,
						'aria-label': 'show collapsed menu',
						'aria-expanded': 'false'
					})
					.on('click',function(e){
						// console.log('organizer.click: ' + $(this).attr('aria-controls') );
						e.preventDefault(); // don't follow the link
						slideMenu($(this));
					});
		organizerCount++;
	});
	// do the same for each of the groups
	var groupCount = 0;
	$('#mm .wrap-groups .group').each(function(){
		var $group = $(this)
		$group
			.find('ul')
				.attr('id','rwd-group-'+groupCount)
			.prev('h3')
				.find('a')
					.attr({
						'role': 'button',
						'aria-controls': 'rwd-group-'+groupCount,
						'aria-label': 'show collapsed menu',
						'aria-expanded': 'false'
					})
					.on('click',function(e){
						// console.log('h3.click: '+ $(this).attr('aria-controls') );
						e.preventDefault();
						slideMenu($(this));							
					});
		groupCount++;
	});
		
	//	and for the sub-menus
	var subMenuCount = 0;
	$('#mm li.has-sub').each(function(){
		var $group = $(this);
		$group
			.find('ul')
				.attr('id','rwd-submenu-'+subMenuCount)
			.prev('a')
				.attr({
					'role': 'button',
					'aria-controls': 'rwd-submenu-'+subMenuCount,
					'aria-label': 'show collapsed menu',
					'aria-expanded': 'false'
				})
				.on('click',function(e){
					// console.log('subMenu.click: '+ $(this).attr('aria-controls') );
					e.preventDefault();
					slideMenu($(this));							
				});
		subMenuCount++;
	});
	
	// and open the now tagged menus to the correct link
	var $org = $('#mm .organizer.current');
	var $currentgroup = $('#mm .organizer.current .group.current');
	var $currentAnchor = $('#mm .organizer.current .group.current').find('.current');
	
	// open the .current organizer
	$org.find('h2 a').attr({'aria-expanded':'true'});
	$org.find('.wrap-groups').show();	
	
	// if the .current .group has a sub-nav, expand the .group
	if( $currentgroup.find('> h3 > a').attr('aria-expanded') !== undefined ) {
		$currentgroup.find('> h3 > a').attr({'aria-expanded':'true'});
		$currentgroup.find('> ul').show();
	}
	
	// now find the .current h3 or li
	// if the .current anchor is contained in an h3, we don't need to do anything
	// if the .current anchros is in an li, open the ul that contains is
	if( $currentAnchor.is('li') ) {
		$currentAnchor
			.parent('ul')
				.show()
			.prev('a[aria-expanded]')
				.attr({'aria-expanded':'true'})
		;
	}
	
	
	
} // end setRwdMenu

function rmRwdMenu() {
	// if you comment out thie whole function
	// you get some nifty menu actions on the 'desktop' version
	// console.log('rmRwdMenu');

	// put the navigation back in to navigation.contents
	$('#main-contents .contents.navigation').prepend($('#mm').detach()).prepend($('#wrap-triggers').detach());
	
	// reset the trigger icon
	$('#mm-trigger a').attr({'aria-expanded': 'false'}).find('.svg').html('<svg class="icon icon-bars"><use xlink:href="#icon-bars"></use></svg>');

	// undo all the trigger aria attributes and click events
	$('#mm a[role="button"]').removeAttr('role aria-controls aria-label aria-expanded').unbind();

	// and remove any created ids
	$('#mm li, #mm ul, #mm .wrap-groups, #mm .wrap-groups .group').removeAttr('id style');
	$('#mm').removeAttr('style');
	
	// find the li or h3 marked .current
	var $current = $('#mm .panel.current').find('li.current, h3.current, h2.current');
	
	// my belief (as of 19 apr) is that there are NEVER any 4th level ULs
	// and that the 3rd level UL are open already
	// and this will expose any hidden 3rd level 'current' pages.
	$current.parents('ul').show();
	
	
} // end rmRewdMenu

function toggleNavSlider( trigger, tray, expand ) {
	// console.log('toggleNavSlider: '+ trigger +', '+ tray );

	var $trigger = $('#'+trigger);
	var $form = $('#'+tray);
	var isDesktopView = $('html').css('font-family');
	var labelClass = 'init';

	// before you toggle, make sure any other trays are closed
	$openNavs = $('.nav-item > a[aria-expanded="true"]');
	$openNavs.each(function(){
		var $nav = $(this);
		// don't do anything if the click the trigger of the open navslider
		if( $nav.attr('id') != trigger ) {
			$('#'+$nav.attr('aria-controls')).hide();
				$nav
					.attr({'aria-expanded': 'false',})
					.find('svg')
						.html('<use xlink:href="#icon-'+ $nav.attr('id').slice(0, -8) +'"></use>');
		}

	});

	// isDesktopView.indexOf('desktop') >= 0 ? labelClass = '' : labelClass = 'hide';

	// check .is(":visible") before the toggle
	var formVisible = !($form.is(":visible"));

	// toggle the navslider
	// console.log('toggle slider');
	$form.slideToggle({
		duration: 200,
		progress: function(anime,progr,remain){
			// if something has to happen while the navSlider is in motion
			// do that here
			if( expand ) {
				// adjust the height of the header
				var sliderHeight = $(this).height();
				if( sliderHeight >= 0 ) {
					$('#wrap-head > header').css('min-height',100 + sliderHeight);
				}
			}
		},
		start: function(anime,progr,remain){
			if( formVisible ) {
				// console.log('open slider');
				$trigger
					.attr({'aria-expanded':'true',})
					.find('svg')
						.html('<use xlink:href="#icon-close"></use>');
			}
		},
		complete: function(anime,progr,remain){
			// update the trigger depending on the state of the trigger
			if( !formVisible ) {
				$trigger
					.attr({'aria-expanded': 'false',})
					.find('svg')
						.html('<use xlink:href="#icon-'+ trigger.slice(0, -8) +'"></use>');
			}
			// and push the focus back on the trigger to help out screen readers
			var $triggerHtml = $trigger.html();
			setTimeout(function() {
				$trigger.html($triggerHtml);
			}, 520);
		}
	});

} // end: toggleNavSlider

// open tagged links in a new window
//
function openNewWindow(obj) {
	if( ! /popup/i.test($(obj).attr('class')) ) {
		// even if the link should pop open in a new window
		// if it matches one of the patterns below, don't pop open the link
		if( ! /search.ets.org/i.test($(obj).attr('href')) &&
		    ! /http:\/\/ets.pereless.com\/careers\//i.test($(obj).attr('href')) &&
		    ! /(http:\/\/)?etscrs.submit4jobs.com/i.test($(obj).attr('href')) &&
		    ! /(http:\/\/|http:\/\/www\.|www\.|http:\/\/mygre\.|https:\/\/mygre\.)?ets.org/i.test($(obj).attr('href')) || /(http:\/\/|http:\/\/www\.|www\.|https:\/\/www\.|)?ets.org\/portal\/site\/iserpraxis\//i.test($(obj).attr('href'))  ) {
			$(obj).attr('title','This link opens in a new window');
			$(obj).click(function(e){
				e.preventDefault();
				window.open ($(obj).attr('href'), "","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1"); // ,width=800,height=600
			});
		}
	}
} // end openNewWindow

/* font face observer */
/* https://github.com/bramstein/fontfaceobserver */
(function(){'use strict';var f,g=[];function l(a){g.push(a);1==g.length&&f()}function m(){for(;g.length;)g[0](),g.shift()}f=function(){setTimeout(m)};function n(a){this.a=p;this.b=void 0;this.f=[];var b=this;try{a(function(a){q(b,a)},function(a){r(b,a)})}catch(c){r(b,c)}}var p=2;function t(a){return new n(function(b,c){c(a)})}function u(a){return new n(function(b){b(a)})}function q(a,b){if(a.a==p){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d){d.call(b,function(b){c||q(a,b);c=!0},function(b){c||r(a,b);c=!0});return}}catch(e){c||r(a,e);return}a.a=0;a.b=b;v(a)}}
function r(a,b){if(a.a==p){if(b==a)throw new TypeError;a.a=1;a.b=b;v(a)}}function v(a){l(function(){if(a.a!=p)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0==a.a?"function"==typeof c?e(c.call(void 0,a.b)):e(a.b):1==a.a&&("function"==typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}})}n.prototype.g=function(a){return this.c(void 0,a)};n.prototype.c=function(a,b){var c=this;return new n(function(d,e){c.f.push([a,b,d,e]);v(c)})};
function w(a){return new n(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e==a.length&&b(h)}}var e=0,h=[];0==a.length&&b(h);for(var k=0;k<a.length;k+=1)u(a[k]).c(d(k),c)})}function x(a){return new n(function(b,c){for(var d=0;d<a.length;d+=1)u(a[d]).c(b,c)})};window.Promise||(window.Promise=n,window.Promise.resolve=u,window.Promise.reject=t,window.Promise.race=x,window.Promise.all=w,window.Promise.prototype.then=n.prototype.c,window.Promise.prototype["catch"]=n.prototype.g);}());

(function(){var k=!!document.addEventListener;function l(a,b){k?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function v(a){document.body?a():k?document.addEventListener("DOMContentLoaded",a):document.attachEvent("onreadystatechange",function(){"interactive"!=document.readyState&&"complete"!=document.readyState||a()})};function w(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function y(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=m;z(a)&&null!==a.a.parentNode&&b(a.g)}var m=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,H=!!window.FontFace;function I(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}D=""!==a.style.font}return D}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,m=a||"BESbswy",x=b||3E3,E=(new Date).getTime();return new Promise(function(a,b){if(H){var K=new Promise(function(a,b){function e(){(new Date).getTime()-E>=x?b():document.fonts.load(J(c,c.family),m).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),L=new Promise(function(a,c){setTimeout(c,x)});Promise.race([L,K]).then(function(){a(c)},function(){b(c)})}else v(function(){function q(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=
h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==r&&g==r&&h==r||f==t&&g==t&&h==t||f==u&&g==u&&h==u)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function F(){if((new Date).getTime()-E>=x)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=n.a.offsetWidth,
h=p.a.offsetWidth,q();G=setTimeout(F,50)}}var e=new w(m),n=new w(m),p=new w(m),f=-1,g=-1,h=-1,r=-1,t=-1,u=-1,d=document.createElement("div"),G=0;d.dir="ltr";y(e,J(c,"sans-serif"));y(n,J(c,"serif"));y(p,J(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);r=e.a.offsetWidth;t=n.a.offsetWidth;u=p.a.offsetWidth;F();A(e,function(a){f=a;q()});y(e,J(c,'"'+c.family+'",sans-serif'));A(n,function(a){g=a;q()});y(n,J(c,'"'+c.family+'",serif'));A(p,function(a){h=
a;q()});y(p,J(c,'"'+c.family+'",monospace'))})})};window.FontFaceObserver=B;window.FontFaceObserver.prototype.check=window.FontFaceObserver.prototype.load=B.prototype.load;"undefined"!==typeof module&&(module.exports=window.FontFaceObserver);}());
/* font face observer */

jQuery.fn.exists = function(){ return this.length > 0; }

/**
 * Copyright (c) 2008 Michael Manning (http://actingthemaggot.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 **/
jQuery.parseQuery = function(qs,options) {
	var q = (typeof qs === 'string'?qs:window.location.search), o = {'f':function(v){return unescape(v).replace(/\+/g,' ');}}, options = (typeof qs === 'object' && typeof options === 'undefined')?qs:options, o = jQuery.extend({}, o, options), params = {};
	jQuery.each(q.match(/^\??(.*)$/)[1].split('&'),function(i,p){
		p = p.split('=');
		p[1] = o.f(p[1]);
		params[p[0]] = params[p[0]]?((params[p[0]] instanceof Array)?(params[p[0]].push(p[1]),params[p[0]]):[params[p[0]],p[1]]):p[1];
	});
	return params;
}

String.prototype.splice = function( idx, rem, s ) {
	return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
} // end detectIE()

jQuery.fn.exists = function(){ return this.length > 0; }


/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(e){if("function"==typeof define&&define.amd)define(e);else if("object"==typeof exports)module.exports=e();else{var n=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=n,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(a){}return r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires&&"; expires="+i.expires.toUTCString(),i.path&&"; path="+i.path,i.domain&&"; domain="+i.domain,i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f[0].replace(u,decodeURIComponent),m=f.slice(1).join("=");'"'===m.charAt(0)&&(m=m.slice(1,-1));try{if(m=t&&t(m,l)||m.replace(u,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(a){}if(n===l){c=m;break}n||(c[l]=m)}catch(a){}}return c}return o.get=o.set=o,o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n()});

// listen for breakpoints
// https://github.com/sebastianekstrom/media-query-detection-with-js
var bpListener = (function (parent, $) {
    var MediaQueryListener = function() {
        this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
        this.currentBreakpoint = '';
        this.lastBreakpoint = '';
        this.init();
    };
    MediaQueryListener.prototype = {
        init: function () {
            var self = this;
            if(!self.afterElement) {
                return;
            }
            self._resizeListener();
        },
        _resizeListener: function () {
            var self = this;
            $(window).on('resize orientationchange load', function() {
                // Regexp for removing quotes added by various browsers
                self.currentBreakpoint = self.afterElement.getPropertyValue('content').replace(/^["']|["']$/g, '');
                if (self.currentBreakpoint !== self.lastBreakpoint) {
                    $(window).trigger('breakpoint-change', self.currentBreakpoint);
                    self.lastBreakpoint = self.currentBreakpoint;
                }
            });
        }
    };
    parent.mediaqueryListener = parent.mediaqueryListener || new MediaQueryListener();
    return parent;
}(bpListener || {}, jQuery));

$(window).on('breakpoint-change', function(e, breakpoint) {
	$body = $('body');
	$body.removeClass('gabby veronica samantha catherine belinda natalie rwd desktop')
	if(breakpoint === 'belinda') {  $body.addClass('belinda rwd');  setRwdMenu(); }      // at least 320
	if(breakpoint === 'veronica') { $body.addClass('veronica rwd'); setRwdMenu(); }      // at least 480
	if(breakpoint === 'samantha') { $body.addClass('samantha rwd'); setRwdMenu(); }      // at least 768
	if(breakpoint === 'catherine') { $body.addClass('catherine desktop'); rmRwdMenu(); } // at least 800
	if(breakpoint === 'natalie') {  $body.addClass('natalie desktop');    rmRwdMenu(); } // at least 992
	if(breakpoint === 'gabby') {    $body.addClass('gabby desktop');      rmRwdMenu();}  // at least 1200
});
// listen for breakpoints

// [[ fin ]]