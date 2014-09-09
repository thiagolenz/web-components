define ([], function () {
	
	function formatData (value, format) {
		
	}
	
	function toDate (value){
		return moment(value, moment.langData()._longDateFormat.L).toDate();
	}
	
	function initializeDatePicker () {
		$(".dataType").datepicker({
			autoclose: true,
			format: moment.langData()._longDateFormat.L.toLowerCase(),
			language: defineLang()
		}).on("changeDate", function(event){
			var tabables = $("input, button, textarea[tabindex != '-1']:visible");
			var currentIndex = tabables.index(event.target);
			$(tabables[currentIndex+1]).focus();
		});
	}
	
	function defineLang () {
		var lang = moment.lang();
		lang = lang.substring(0, 3) + lang.substring(3,5).toUpperCase();
	}
	
	return {
		initializeDatePicker : initializeDatePicker,
		toDate : toDate
	};
});