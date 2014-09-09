define(["i18n!components/nls/MonetaryInput"],
function (i18ns){
	
	function createMoneyInput(config) {
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
	
	function getValue (input) {
		return $(input).maskMoney('unmasked')[0];
	}
	
	function setValue (input, value) {
		$(input).maskMoney('mask', value);
	}
	
	var _this = {
		createMoneyInput: createMoneyInput,
		configInputSelection : configInputSelection,
		getValue : getValue,
		setValue : setValue
	};
	return _this;
});