define(["components/Formatter", 
        "moment", 
        "components/CheckboxButton",
        "components/Mask", 
        "components/AutoComplete"], 
function (formatter, moment, checkboxButton, mask, autoComplete){
	
	function copyBeanToForm (source, bean) {
		copyFieldsToForm(source, bean);
		copyFieldsExtendsToForm(source, bean);
	} 
	
	function copyFieldsToForm (source, bean) {
		var mapAttFields = mapAttributesFields(source);
		for (var i in mapAttFields) {
			var obj = mapAttFields[i];
			setData(obj.element, obj.type, bean[obj.attribute]);
		}
	}
	
	function setData (element, type, value) {
		if (type === "String" || type == null) 
			$(element).val(value);
		else if (type === "Integer")
			$(element).val(value);
		else if (type === "Date") {
			var date = moment(account.registerDate).format('L');
			$(element).datepicker('update', date);
		} else if (type == "masked") {
			var mask = $(element).attr("data-mask");
			$(element).val(value).mask(mask);
		} 
	}
	
	function copyFieldsExtendsToForm (source, bean) {
		var mapAttFieldsExtends = mapAttributesFieldsExtends(source);
		for (var i in mapAttFieldsExtends) {
			var obj = mapAttFieldsExtends[i];
			setDataExtends(obj.element, obj.type, bean[obj.attribute]);
		}
	}
	
	function setDataExtends (element, type, value) {
		if (type == "checkbox") 
			checkboxButton.setValue(element, value);
		else if (type == "AutoComplete")
			autoComplete.setValue($(element).attr("data-name"), value);
	}
	
	function copy (source, destiny) {
		if (!destiny)
			destiny = {};
		
		copyFields(source, destiny);
		copyFieldsExtends(source, destiny);
		
		return destiny;
	}
	
	function copyFields (source, destiny) {
		var mapAttFields = mapAttributesFields(source);
		for (var i in mapAttFields) {
			var obj = mapAttFields[i];
			destiny[obj.attribute] = parseData (obj.element.value, obj.type);
		}
	}
	
	function copyFieldsExtends (source, destiny) {
		var mapAttFieldsExtends = mapAttributesFieldsExtends(source);
		for (var i in mapAttFieldsExtends) {
			var obj = mapAttFieldsExtends[i];
			destiny[obj.attribute] = parseDataExtends (obj.element, obj.type);
		}
	}
	
	function mapAttributesFields (source) {
		var array = new Array();
		var elements = $("[name*='"+source+".']");
		for (var i = 0; i < elements.length ; i++) {
			var element = elements[i];
			var attribute = element.name.split(".")[1];
			array.push({
				attribute : attribute,
				element : element,
				type : element.getAttribute("data-type")
			});
		}
		return array;
	}
	
	function mapAttributesFieldsExtends (source) {
		var array = new Array();
		var elements = $("[data-name*='"+source+".']:not([data-just-reading='true']");
		for (var i = 0; i < elements.length ; i++) {
			var element = elements[i];
			var attribute = $(element).attr("data-name").split(".")[1];
			array.push({
				attribute : attribute,
				element : element,
				type : element.getAttribute("data-type")
			});
		}
		return array;
	}
	
	function parseData (value, type) {
		if (!type || type === "String" || !value)
			return value;
		else if (type === "Integer")
			return parseInt(value, 10);
		else if (type === "Date")
			return  moment(value, moment.langData()._longDateFormat.L).toDate();
		else if (type === "masked") 
			return mask.getValueWithoutMask(value);
		return value;
	}
	
	function parseDataExtends (element, type) {
		if (type == "checkbox")
			return checkboxButton.getValue(element);
		else if (type == "AutoComplete")
			return autoComplete.getValue($(element).attr("data-name"));
		return undefined;
	}
	
	return {
		copy : copy,
		copyBeanToForm : copyBeanToForm
	};
});