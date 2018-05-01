require('waypoints/lib/noframework.waypoints.min');

$(function() {
	var hotspots = [
	{
		top: 40,
		left: 790,
		width: 200,
		height: 200,
		css: {},
		element: "#hotspotOverlay1",
		container: "#presidentContainer",
	},
	{
		top: 90,
		left: 1070,
		width: 260,
		height: 260,
		css: {},
		element: "#hotspotOverlay2",
		container: "#presidentContainer",
	},
	{
		top: 410,
		left: 720,
		width: 200,
		height: 200,
		css: {},
		element: "#hotspotOverlay3",
		container: "#presidentContainer",
	},
	{
		top: 470,
		left: 410,
		width: 330,
		height: 330,
		css: {},
		element: "#hotspotOverlay4",
		container: "#presidentContainer",
	},
	{
		top: 570,
		left: 940,
		width: 200,
		height: 200,
		css: {},
		element: "#hotspotOverlay5",
		container: "#presidentContainer",
	},
	{
		top: 25,
		left: 190,
		width: 120,
		height: 120,
		css: {},
		element: "#hotspotMobileOverlay1",
		container: "#presidentMobileContainer",
	},
	{
		top: 60,
		left: 380,
		width: 120,
		height: 120,
		css: {},
		element: "#hotspotMobileOverlay2",
		container: "#presidentMobileContainer",
	},
	{
		top: 250,
		left: 145,
		// top: 310,
		// left: 0,
		width: 120,
		height: 120,
		css: {},
		element: "#hotspotMobileOverlay3",
		container: "#presidentMobileContainer",
	},
	{
		top: 310,
		left: 0,
		width: 140,
		height: 140,
		css: {},
		element: "#hotspotMobileOverlay4",
		container: "#presidentMobileContainer",
	},
	{
		top: 345,
		left: 285,
		width: 120,
		height: 120,
		css: {},
		element: "#hotspotMobileOverlay5",
		container: "#presidentMobileContainer",
	},
	];

	var setHotspot = (hotspot, attempt = 0) => {
		if (!$(hotspot.element).height()) {
			if (attempt > 10)
				return;
			// console.log("Dont' have height, deferring", hotspot.element, attempt);
			setTimeout(function() { setHotspot(hotspot, ++attempt); }, 1000);
			return;
		}
		let sizing = $(hotspot.element).height() / $(hotspot.element)[0].naturalHeight;
		// console.log(hotspot.element, sizing, $(hotspot.element).height(), $(hotspot.element)[0].naturalHeight);
		hotspot.css["margin-left"] = hotspot.left * sizing;
		hotspot.css["margin-top"] = hotspot.top * sizing;
		hotspot.css.width = hotspot.width * sizing;
		hotspot.css.height = hotspot.height * sizing;
		var el = $("<div class='hotspot' data-name='" + hotspot.element + "'></div>");
		for (let i in hotspot.css) {
			$(el).css(i, hotspot.css[i]);	
		}
		$(el).on("mouseover", e => {
			$(".overlay").removeClass("show-overlay");
			$(hotspot.element).addClass("show-overlay");
			$(e.target).css("opacity", 1);
		});
		$(el).on("mouseout", e => {
			$(hotspot.element).removeClass("show-overlay");
		});
		$(hotspot.container).prepend(el);
	}

	var setHotspots = function() {
		$(".hotspot").remove();
		hotspots.forEach(setHotspot);
	};

	setHotspots();
	
	$( window ).resize(function() {
		setHotspots();
	});

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
	};
});
