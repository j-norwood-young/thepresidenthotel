var _ = require('lodash');
// var $ = require('jquery');
// var jQuery = $;
// require("jquery-hotspot");
require('waypoints/lib/noframework.waypoints.min');

$(function() {
	var hotspots = [
	{
		top: 260,
		left: 220,
		width: 150,
		height: 150,
		css: {
			"border": "5px #bfecfd solid",
			"border-radius": "150px",
			"position": "absolute",
		},
		element: "#hotspotOverlay1",
		container: "#presidentContainer",
	},
	{
		top: 80,
		left: 650,
		width: 150,
		height: 150,
		css: {
			"border": "5px #bfecfd solid",
			"border-radius": "150px",
			"position": "absolute",
		},
		element: "#hotspotOverlay2",
		container: "#presidentContainer",
	},
	{
		top: 200,
		left: 420,
		width: 150,
		height: 150,
		css: {
			"border": "5px #bfecfd solid",
			"border-radius": "150px",
			"position": "absolute",
		},
		element: "#hotspotOverlay3",
		container: "#presidentContainer",
	},
	// {
	// 	top: 430,
	// 	left: 60,
	// 	width: 150,
	// 	height: 150,
	// 	css: {
	// 		"border": "5px #bfecfd solid",
	// 		"border-radius": "150px",
	// 		"position": "absolute",
	// 	},
	// 	element: "#hotspotMobileOverlay1",
	// 	container: "#presidentMobileContainer",
	// },
	// {
	// 	top: 620,
	// 	left: 410,
	// 	width: 150,
	// 	height: 150,
	// 	css: {
	// 		"border": "5px #bfecfd solid",
	// 		"border-radius": "150px",
	// 		"position": "absolute",
	// 	},
	// 	element: "#hotspotMobileOverlay2",
	// 	container: "#presidentMobileContainer",
	// },
	// {
	// 	top: 830,
	// 	left: 60,
	// 	width: 150,
	// 	height: 150,
	// 	css: {
	// 		"border": "5px #bfecfd solid",
	// 		"border-radius": "150px",
	// 		"position": "absolute",
	// 	},
	// 	element: "#hotspotMobileOverlay3",
	// 	container: "#presidentMobileContainer",
	// }
	];
	var setHotspots = function() {
		$(".hotspot").remove();
		hotspots.forEach(hotspot => {
			let sizing = $(hotspot.element).height() / $(hotspot.element)[0].naturalHeight;
			hotspot.css["margin-left"] = hotspot.left * sizing;
			hotspot.css["margin-top"] = hotspot.top * sizing;
			hotspot.css.width = hotspot.width * sizing;
			hotspot.css.height = hotspot.height * sizing;
			var el = $("<div class='hotspot'></div>");
			for (let i in hotspot.css) {
				$(el).css(i, hotspot.css[i]);	
			}
			$(el).on("mouseover", e => {
				$(hotspot.element).addClass("show-overlay");
				$(".hotspot").css("opacity", 0);
				$(e.target).css("opacity", 1);
			});
			$(el).on("mouseout", e => {
				$(hotspot.element).removeClass("show-overlay");
				$(".hotspot").css("opacity", 0.6);
			});
			$(hotspot.container).prepend(el);
		});
	};
	setHotspots();
	$( window ).resize(function() {
		setHotspots();
	});

	function selectionToArray(selection) {
		var len = selection.length;
		var result = [];
		for (var i = 0; i < len; i++) {
			result.push(selection[i]);
		}
		return result;
	}

	var triggers = selectionToArray(document.getElementsByClassName("trigger"));

	var waypoints = triggers.map(function(trigger) {
		var step = +trigger.getAttribute('data-step');
		return new Waypoint({
			element: trigger,
			handler: function(direction) {
				if (step === "3" && direction === "down") {
					$(`.overlay-text`).removeClass("is-fixed");
					$(`.overlay-text-container`).removeClass("show-text-overlay");
					$(`.overlay`).removeClass("show-overlay");
					return;
				}
				$(`.overlay-text`).removeClass("is-fixed");
				$(`.overlay-text-container`).removeClass("show-text-overlay");
				$(`.overlay`).removeClass("show-overlay");
				// return;
				if (direction === "down") {
					// $(`#hotspotMobileText${ step + 1 } > .overlay-text`).addClass("is-fixed");
					$(`#hotspotMobileText${ step + 1 }`).addClass("show-text-overlay");
					$(`#hotspotMobileOverlay${ step + 1 }`).addClass("show-overlay");
				} else {
					// $(`#hotspotMobileText${ step } > .overlay-text`).addClass("is-fixed");
					$(`#hotspotMobileText${ step }`).addClass("show-text-overlay");
					$(`#hotspotMobileOverlay${ step }`).addClass("show-overlay");
				}

			},
			offset: "50%"
		});
	});

	var topMobileWaypoint = new Waypoint({
		element: document.getElementById("presidentMobileContainer"),
		handler: direction => {
			// console.log("top", direction);
			var top = $("#presidentMobileContainer")[0].offsetTop;
			var bottom = $("#bottom")[0].offsetTop;
			var scrollTop = window.pageYOffset;
			var scrollBottom = scrollTop + $(window).height();
			var height = $("#presidentMobileContainer")[0].clientHeight;
			if ((scrollBottom >= top) && (scrollBottom <= bottom)) {
				if (direction === "down") {
					$("#presidentMobileBackground").addClass("is-fixed");
					$("#presidentMobileBackground").css("top", 0);
					$("#hotspotMobileOverlay1").css("top", 0);
					$("#hotspotMobileOverlay1").css("position", "fixed");
				} else {
					$("#presidentMobileBackground").removeClass("is-fixed");
					$("#presidentMobileBackground").css("top", "auto");
					$("#hotspotMobileOverlay1").css("top", "auto");
					$("#hotspotMobileOverlay1").css("position", "absolute");
				}
			}
		},
		offset: "0%"
	});

	var bottomWaypoint = new Waypoint({
		element: document.getElementById("bottom"),
		handler: function(direction) {
			console.log("bottom", direction);
			var top = $("#presidentMobileContainer")[0].offsetTop;
			var bottom = $("#bottom")[0].offsetTop;
			var scrollTop = window.pageYOffset;
			var scrollBottom = scrollTop + $(window).height();
			var height = $("#presidentMobileContainer")[0].clientHeight;
			if (scrollTop < top)
				return;
			// console.log({bottom, scrollTop, scrollBottom});
			if (direction === "down") {
				$("#presidentMobileBackground").removeClass("is-fixed");
				$("#presidentMobileBackground").css("top", scrollTop + bottom - scrollBottom);
				$("#hotspotMobileOverlay3").css("top", scrollTop + bottom - scrollBottom);
				$("#hotspotMobileOverlay3").css("position", "absolute");
			} else {
				$("#presidentMobileBackground").addClass("is-fixed");
				$("#presidentMobileBackground").css("top", 0);
				$("#hotspotMobileOverlay3").css("top", 0);
				$("#hotspotMobileOverlay3").css("position", "fixed");
			}

			// $(`.overlay-text`).removeClass("is-fixed");
			// $(`.overlay-text-container`).removeClass("show-text-overlay");
			// $(`.overlay`).removeClass("show-overlay");
		},
		offset: "100%"
	});

	// var stickMobile = function() {
	// 	var top = $("#presidentMobileContainer")[0].offsetTop;
	// 	var bottom = $("#bottom")[0].offsetTop;
	// 	var scrollTop = window.pageYOffset;
	// 	var scrollBottom = scrollTop + $(window).height();
	// 	var height = $("#presidentMobileContainer")[0].clientHeight;
	// 	console.log({bottom, scrollTop, scrollBottom});
	// 	if ((scrollTop >= top) && (bottom > scrollBottom)) {
	// 		$("#presidentMobileBackground").addClass("is-fixed");
	// 		// $("#presidentMobileBackground").css("top", 0);
	// 	} else if (bottom < scrollBottom) {
	// 		$("#presidentMobileBackground").removeClass("is-fixed");
	// 		$("#presidentMobileBackground").css("top", scrollTop + bottom - scrollBottom);
	// 	} else {
	// 		$("#presidentMobileBackground").removeClass("is-fixed");
	// 	}
	// };

	var stickHeader = function() {
		var stickyHeaderEl = $("#sponsorMobileContainer");
		if (window.pageYOffset >= 40) {
			stickyHeaderEl.addClass("is-fixed");
		} else {
			stickyHeaderEl.removeClass("is-fixed");
		}
	};
	window.onscroll = function() {
		stickHeader(); 
		// stickMobile();
	};
});
