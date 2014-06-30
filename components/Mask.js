define (["i18n!components/nls/Generic",], 
function(i18ns_g){
	
	function formatDocumentNumber (value, personType) {
		var maskConf = getMaskPersonType(personType);
		value = documentNumberToString(value, maskConf);
		var input = document.createElement("input");
		$(input).val(value);
		$(input).mask(maskConf);
		return $(input).val();
	}
	
	function documentNumberToString (document, mask) {
		document = ""+document;
		mask = getValueWithoutMask(mask);
		for (var i = document.length; i < mask.length ; i++)
			document = "0" + document;
		return document;
	}
	
	function getValueWithoutMask (value) {
		var regex = /[^\w\s]/gi;
		return value.replace(regex,'');
	}
	
	function getMaskPersonType (personType) {
		if (personType == "LEGAL_PERSON") 
			return i18ns_g.masks.legalPerson;
		else  
			return i18ns_g.masks.naturalPerson;	
	}
	
	return {
		documentNumberToString : documentNumberToString,
		getValueWithoutMask : getValueWithoutMask,
		getMaskPersonType :  getMaskPersonType,
		formatDocumentNumber : formatDocumentNumber
	};
});