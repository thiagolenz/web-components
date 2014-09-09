define (["numeral", 
         "i18n!components/nls/Numeral",], 
function (numeral, i18ns) {
	
	function format (value) {
		return numeral(value).format("$0,0.00");
	}
	
	var _this = {
		format : format	
	};
	
	numeral.language(Language.getLanguage(), i18ns.config);
	numeral.language(Language.getLanguage());
	return _this;
});