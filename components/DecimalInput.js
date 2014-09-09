define(["i18n!components/nls/DecimalInput"],
function (i18ns){

	function createDecimalInput (config) {
		var input = document.createElement("input");
		configInput(input, config);
		return input;
	}
	
	function configInputSelection (selection, config) {
		configInput($(selection), config);
	}
	
	function configInput (input, config) {
		if (!config)
			config = {};
		$(input).maskMoney(i18ns.config.maskConfig);
		$(input).addClass("form-control");
		$(input).css("text-align", "right");
		
		$(input).on("blur", function (){
			var value = $(this).maskMoney('unmasked')[0];
			$(this).maskMoney('mask');
			if (config.onValueChange) 
				config.onValueChange(value);
			
		});
		
	}

	var _this = {
			createDecimalInput: createDecimalInput,
			configInputSelection : configInputSelection
	};
	return _this;
});