//Skeleton.js 0.0.1
//JS For Skeleton

//Main Closure referencing jquery.
//here defaults, properties and functions etc for the framework...
(function($){
	$.spooky = {};
	$.extend($.spooky, {
		passivePageClass: "skeletonPassive",
		activePageClass: "skeletonActive",
		defaultTransition : "skeletonPop",
		skeletonLoadEvent :  "skellyLoad",
		skeletonLeaveEvent : "skellyLeave",

		changeSkelly : function(skeleton) {
			if(skeleton) {
				var hash = (skeleton).replace('#', '');
				if(hash.length !== 0){
					var transClass = $.spooky.defaultTransition;
					var activePageClass = $.spooky.activePageClass;
					var passivePageClass = $.spooky.passivePageClass;
					var activePage = $('div.'+activePageClass);
					var currPage = "div#" + activePage.attr("id");
					var nextPage = "div#" + hash;

					//just before leaving
					$(currPage).addClass(passivePageClass);
					$(currPage).removeClass(activePageClass);
					//$(currPage).hide();
					$.spooky.skeletonLeave(currPage);
					//left that page event triggered
					//just before load
					$(nextPage).addClass(transClass);
					$(nextPage).addClass(activePageClass);
					setTimeout(function(){
						$(nextPage).removeClass(passivePageClass);
						$(nextPage).removeClass(transClass);
					},250);
					//$(nextPage).show();
					$.spooky.skeletonLoad(nextPage, currPage);
					//page loaded event triggered 
				} else{
				}
			}
		},
		changePage : function(hash) {
			hash = (hash).replace('#', '');
			location.hash = hash;
		},
		skeletonLoad : function(el, lastPage) {
			if(el !== lastPage) {
				setTimeout(function() {
					$(el).trigger($.spooky.skeletonLoadEvent);
				}, 500);
			}
		},
		skeletonLeave : function(el) {
			$(el).trigger($.spooky.skeletonLeaveEvent);
		},
		onhashchange : function() {
			$.spooky.changeSkelly(location.hash);
		},
		initBone : function(bone) {
			if(bone) {
				$.spooky.refresh[bone]();
				//called upon specific bone type
			} else {
				//most likey on load...call on all bone types.
				var refresh = $.spooky.refresh;
				$.each(refresh, function(i, ev) {
					ev();
				});
			}
		}
	});



	//refresh functions
	$.extend($.spooky, {
		refresh : {
			check : function() {
				$('input[type="checkbox"]').each(function() {
					var that = $(this);
					var parent = that.parent('div[bone="checkbox"]');
					if(parent.length === 0) {
						that.wrap('<div bone="checkbox"></div>');
						var labelFor = that.attr('id');
						var name = that.attr('name');
						console.log(labelFor);
						console.log(name);
						var checked;
						if(that.prop('checked')){
							checked = 'checked';
						} else {
							checked = 'unchecked';
						}
						that.parent('div[bone="checkbox"]').prepend('<span class="'+checked+'"></span>')
						.append('<label for="'+labelFor+'">'+name+'</label>');

						that.parent('div[bone="checkbox"]').on('click', function() {
							if(that.prop("checked")){
								$(this).children('span').addClass('unchecked');
								$(this).children('span').removeClass('checked');
							}else{
								$(this).children('span').removeClass('unchecked');
								$(this).children('span').addClass('checked');
							}
							that.prop("checked", !that.prop("checked"));
						});
					}
				});
			},
			radio : function() {
			},
			dropdown : function() {
				$('select').each(function() {
					var parent = $(this).parent('div[bone="dropdown"]');
					if(parent.length === 0) {
						var thatSelect = $(this);
						var selectText = thatSelect.children(":selected").text();
						thatSelect.wrap("<div bone='dropdown'></div>");
						thatSelect.before("<label>"+selectText+"</label><span>&dArr;</span>");
						thatSelect.on('change', function() {
							var selectText = $(this).children(":selected").text();
							$(this).parent('div[bone="dropdown"]').children('label').text(selectText);
						});
					}
				});
			}
		}
	});



	//Here is where functions will go that actually extend jquery element selection/functionality.
	$.fn.extend({
	});



	window.onhashchange = $.spooky.onhashchange;

	$(document).ready(function(){
		$('div[bone="skeleton"]').addClass($.spooky.passivePageClass);
		$('div[bone="skeleton"]').first().removeClass($.spooky.passivePageClass);
		$('div[bone="skeleton"]').first().addClass($.spooky.activePageClass);
		$.spooky.initBone();
		var hash = location.hash;
		console.log(hash);
		console.log(hash.length);
		if(hash.length > 0){
			console.log('changepage');
			$.spooky.changeSkelly(hash);
		}
	});
})(jQuery);