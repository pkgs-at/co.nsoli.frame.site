
(function($) {
	$.fn.at_pkgs_template = function() {
		if (this.length != 1) throw new Error('invalid template source object');
		return at.pkgs.template(this.html());
	};
	$.fn.replaceClass = function(replace, value) {
		var i;
		var j;
		var element;
		var news;
		var olds;
		var name;
		var classes;

		news = (value || '').match(/\S+/g) || new Array();
		for (i = 0; i < this.length; i ++) {
			element = this[i];
			classes = new Array();
			olds = (element.className || '').match(/\S+/g) || new Array();
			for (j = 0; j < olds.length; j ++) {
				name = olds[j];
				if (!name.match(replace))
					classes.push(name);
			}
			for (j = 0; j < news.length; j ++) {
				classes.push(news[j]);
			}
			classes = classes.join(' ');
			if (element.className != classes)
				element.className = classes;
		}
		return this;
	};
})(jQuery);

(function(_root_) {
	//
}).call(at.pkgs, this);
