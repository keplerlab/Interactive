// Simple Material Design Color Palette Extension for Chrome
// Author: Santhosh Sundar
// Organization: SapientNitro
// URL: http://gigacore.in


(function() {

	//Caching Elements
	var $colorList = $('.color-list div'),
		$colorItem = $('li.color'),
		$toggleBtn = $('#toggles li');

	// Display corresponding color list on mouseenter.
	// The list of colors exist in the markup.
	$colorList.mouseenter(function() {
		if (!$(this).hasClass('active')) {
			$colorList.removeClass('active');
			$('.color-wrap').fadeOut(400, 'swing');
			$('.color-wrap[data-color="' + $(this).data('color') + '"]').fadeIn(400, 'swing');
		}
		$(this).addClass('active');
	});

	// Display "Copied to Clipboard" toast on click of colors.
	$('li.color, .color-set').click(function() {
		$('#toast').fadeIn(250, 'swing', function() {
			$(this).fadeOut(250, 'swing');
		});
	});

	// Magic receipe for converting HEX to RGB.
	// Courtesy: http://stackoverflow.com/a/5624139/1584680
	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	// Converts one color mode to another based based on user selection.
	// Saves user selected color mode in localStorage so that when the user
	// will always have the color mode of their choice enabled by default on load.
	function convertColor(model) {
		switch (model) {
			case "RGB":
				$colorItem.each(function() {
					var getHex = $(this).attr('style').slice(18, 25),
						toRGB = 'rgb(' + hexToRgb(getHex).r + "," + hexToRgb(getHex).g + "," + hexToRgb(getHex).b + ')';

					$(this).attr('data-clipboard-text', toRGB);
					$(this).find('span.hex').text(toRGB);
				});
				localStorage.setItem('color-model', 'RGB');
				break;
			case "RGBA":
				$colorItem.each(function() {
					var getHex = $(this).attr('style').slice(18, 25),
						toRGBA = 'rgba(' + hexToRgb(getHex).r + "," + hexToRgb(getHex).g + "," + hexToRgb(getHex).b + ",1" + ')';
					$(this).attr('data-clipboard-text', toRGBA);
					$(this).find('span.hex').text(toRGBA);
				});
				localStorage.setItem('color-model', 'RGBA');
				break;
			case "HEX":
				$colorItem.each(function() {
					var getHex = $(this).attr('style').slice(18, 25);
					$(this).attr('data-clipboard-text', getHex);
					$(this).find('span.hex').text(getHex);
					localStorage.setItem('color-model', 'HEX');
				});
				break;
			default:
				$colorItem.each(function() {
					var getHex = $(this).attr('style').slice(18, 25);
					$(this).attr('data-clipboard-text', getHex);
					$(this).find('span.hex').text(getHex);
					localStorage.setItem('color-model', 'HEX');
				});
		}
	}

	// Triggers convertColor(model) on click.
	$toggleBtn.click(function() {
		$toggleBtn.removeClass('active');
		$(this).addClass('active');
		convertColor($(this).data('to'));
	});

	// Initializing
	$(document).ready(function() {

		// If the user has selected a color mode, say RGB, the extension loads with that mode by default.
		// If no exists, loads default, i.e HEX.
		var getColorModel = localStorage.getItem('color-model');
		convertColor(getColorModel);

		// Highlights the toggle based on user-selected color mode.
		if (getColorModel != null) {
			$toggleBtn.removeClass('active');
			$('#toggles li[data-to="' + getColorModel + '"]').addClass('active');
		}
	});

	// Setting items for the clipboard.js to copy color code to clipboard.
	new Clipboard('li.color');
	new Clipboard('.color-set');
})();