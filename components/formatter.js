define ([], function () {
	
	function formatData (value, format) {
		
	}
	
	function parseData (value, format){
		
	}
	
	function initializeDatePicker () {
		$(".dataType").datepicker({
			autoclose: true,
			format: moment.langData()._longDateFormat.L.toLowerCase(),
			language: defineLang()
		});
	}
	
	function defineLang () {
		var lang = moment.lang();
		lang = lang.substring(0, 3) + lang.substring(3,5).toUpperCase();
	}
	
	return {
		initializeDatePicker : initializeDatePicker
	};
});