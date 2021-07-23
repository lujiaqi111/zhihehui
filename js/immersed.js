(function(w) {
	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;
	if(immersed) {
		console.log($('#header'))
		$('#header').attr('style', "height:"+(44+immersed)+'px;padding-top: '+immersed+'px;');
		$('.mui-bar-nav~.mui-content').attr('style', 'padding-top:' + (43 + immersed) + 'px');
		style_css='<style>.mui-pull-top-pocket{margin-top:' + (immersed) + 'px;</style>'
		document.write(style_css);
	}
})(window);