define(["i18n!components/nls/Generic"], 
function (i18n_g){

	function load (options, callback) {
		$(options.container).load(options.file, function () {
			mergeTranslate(options);
			translateElements(options);
			translatePlaceholders(options);
			translateMixElements(options);
			if (callback)
				callback(options);
		});
	}
	
	function mergeTranslate (options) {
		var i18n = {};
		if (Array.isArray(options.i18n)) 
			for (var i in options.i18n)
				mergeObjects(i18n, options.i18n[i]);
		else 
			i18n = options.i18n;
		options.i18n = mergeObjects (i18n, i18n_g);
	}
	
	function mergeObjects (destiny, obj2) {
		return $.extend(destiny, obj2);
	}
	
	function translateMixElements (options) {
		var elements = $(options.container + " .translate-mix");
		for (var i = 0; i < elements.length; i++) {
			var element= $(elements[i]);
			var html = $(element).html();
			var index = html.indexOf('}') +1;
			var content = html.substring(0, index);
			var restHtml = html.substring(index, html.length);
			content = getTranslatePath(content);
			var parts = content.split(".");
			translateMixElement(options, element, parts, content, restHtml);
		}
	}
	
	
	function translateMixElement (options, element, parts, content, extraHtml) {
		var value = findValueOf(options, parts, content);
		if (value != undefined) 
			element.html(value + extraHtml);
	}
	
	function translateElements (options) {
		var elements = $(options.container + " *:contains('${'):not(:has(*))");
		for (var i = 0; i < elements.length; i++) {
			var element= $(elements[i]);
			var content = element.text();
			content = getTranslatePath(content);
			var parts = content.split(".");
			translateElement(options, element, parts, content);
		}
	}
	
	function translatePlaceholders (options) {
		translatePlaceholderBySelection(options, " input[placeholder^='${']");
		translatePlaceholderBySelection(options, " textarea[placeholder^='${']");
	}
	
	function translatePlaceholderBySelection (options, selection) {
		var elements = $(options.container + selection);
		for (var i = 0; i < elements.length; i++) {
			var element= $(elements[i]);
			var content = element.attr("placeholder");
			content = getTranslatePath(content);
			var parts = content.split(".");
			translatePlaceholder(options, element, parts, content);
		}
	}
	
	function getTranslatePath (content) {
		var indexStart = content.indexOf("${") + 2;
		var indexEnd = content.indexOf("}");
		content = content.substring(indexStart, indexEnd);
		return content;
	}
	
	function translatePlaceholder (options, element, parts, content){
		var value = findValueOf(options, parts, content);
		if (value != undefined) 
			element.attr("placeholder", value);
	}
	
	function translateElement (options, element, parts, content) {
		var value = findValueOf(options, parts, content);
		if (value != undefined) 
			element.text(value);
	}
	
	function findValueOf (options, parts, content) {
		try {
			var value = getValueRecursive(options.i18n, 0, parts);
			if (value != undefined)
				return value;
			else 
				console.error ("Value not found: "+ content);
		} catch (e) {
			console.error("Error on get value : "+ content);
		}
	}
	
	function getValueRecursive (object, index, parts) {
		if (index === parts.length -1)
			return object[parts[index]];
		else 
			return getValueRecursive(object[parts[index]], ++index, parts);
	} 

	return {
		load : load
	};
});