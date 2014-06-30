define (["components/Messages",  
         "i18n!components/nls/Generic", 
         "components/AutoComplete"], 
function (messages, i18ns, autoComplete) {
	
	function validateMandatory (options) {
		var fields = getMandatoryFields(options);
		var firstField = null;
		for (var i = fields.length-1 ; i >= 0; i--) {
			var fieldConf = fields[i];
			if (fieldConf.info) {
				var hasError =  defineIfHasError(options, fieldConf);
					
				if (hasError){
					$(fieldConf.div).addClass("has-error");
					firstField = fieldConf;
				}else 
					$(fieldConf.div).removeClass("has-error");
			}
		}
		processEndValidations(options, firstField);
	}
	
	function defineIfHasError (options, fieldConf) {
		var element = fieldConf.info.element;
		if (isJustReadingElement(element)){
			var type = $(element).attr("data-type");
			if (type == "AutoComplete")
				return autoComplete.getValue($(element).attr("data-name")) == undefined;
		} else if (!options.bean[fieldConf.info.varname])
				return true;
		return false;
	}
	
	function isJustReadingElement (element) {
		return $(element).attr("data-just-reading");
	}
	
	function processEndValidations (options, firstField) {
		if (firstField) {
			if (firstField.info.element.tagName != "INPUT")
				$(firstField.info.element).find("input").focus();
			else 
				$(firstField.info.element).focus();
			messages.error({
				title: i18ns.error,
				inModal : options.inModal,
				message: {
					errorDescription : i18ns.mandatoryFields
				}
 			});
		} else { 
			messages.clear();
			options.success ();
		}
	}
	
	function getMandatoryFields (options) {
		var array = new Array();
		var divs = $("#" + options.container + " .required:not(.hidden):not(.disabled)");
		for (var i = 0; i < divs.length; i++) 
			array.push({
				div : divs[i],
				info : getMappingField(options, divs[i])
			});
		return array;
	}
	
	function getMappingField (options, subcontainer) {
		var elements = $(subcontainer).find("[name*='"+options.source+".']");
		if (elements.length)
			return getNameField(elements[0]);
		
		elements = $(subcontainer).find("[data-name*='"+options.source+".']");
		if (elements.length)
			return getDataNameField(elements[0]);
	}
	
	function getDataNameField (element) {
		return {
			varname : $(element).attr("data-name").split(".")[1],
			element: element
		};
	}
	
	function getNameField (element) {
		return {
			varname : $(element).attr("name").split(".")[1],
			element: element
		};
	}
	
	return {
		validateMandatory: validateMandatory
	};
});