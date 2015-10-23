// Simple Material Design Color Palette Extension for Chrome
// Author: Santhosh Sundar
// Organization: SapientNitro


(function() {
	$('.color-list div').mouseenter(function() {
		if (!$(this).hasClass('active')) {
			$('.color-list div').removeClass('active');
			$('.color-wrap').fadeOut(400, 'swing');
			$('.color-wrap[data-color="' + $(this).data('color') + '"]').fadeIn(400, 'swing');
		}
		$(this).addClass('active');
	});

	$('li.color, .color-set').click(function() {
		$('#toast').fadeIn(250, 'swing', function() {
			$(this).fadeOut(250, 'swing');
		});
	});

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	function convertColor(model) {
		switch (model) {
			case "RGB":
				$('li.color').each(function() {
					var getHex = $(this).attr('style').slice(18, 25),
						toRGB = 'rgb(' + hexToRgb(getHex).r + "," + hexToRgb(getHex).g + "," + hexToRgb(getHex).b + ')';

					$(this).attr('data-clipboard-text', toRGB);
					$(this).find('span.hex').text(toRGB);
				});
				localStorage.setItem('color-model', 'RGB');
				break;
			case "RGBA":
				$('li.color').each(function() {
					var getHex = $(this).attr('style').slice(18, 25),
						toRGBA = 'rgba(' + hexToRgb(getHex).r + "," + hexToRgb(getHex).g + "," + hexToRgb(getHex).b + ",1" + ')';
					$(this).attr('data-clipboard-text', toRGBA);
					$(this).find('span.hex').text(toRGBA);
				});
				localStorage.setItem('color-model', 'RGBA');
				break;
			case "HEX":
				$('li.color').each(function() {
					var getHex = $(this).attr('style').slice(18, 25);
					$(this).attr('data-clipboard-text', getHex);
					$(this).find('span.hex').text(getHex);
					localStorage.setItem('color-model', 'HEX');
				});
				break;
			default:
				$('li.color').each(function() {
					var getHex = $(this).attr('style').slice(18, 25);
					$(this).attr('data-clipboard-text', getHex);
					$(this).find('span.hex').text(getHex);
					localStorage.setItem('color-model', 'HEX');
				});
		}
	}

	$('#toggles li').click(function() {
		$('#toggles li').removeClass('active');
		$(this).addClass('active');
		convertColor($(this).data('to'));
	});

	$(document).ready(function() {
		var getColorModel = localStorage.getItem('color-model');
		convertColor(getColorModel);

		console.log(getColorModel);
		if (getColorModel != null) {
			$('#toggles li').removeClass('active');
			$('#toggles li[data-to="' + getColorModel + '"]').addClass('active');
		}
	});

	new Clipboard('li.color');
	new Clipboard('.color-set');
})();