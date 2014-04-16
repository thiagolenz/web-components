define(["formatter", "moment"], function (formatter, moment){
	
	function copyBeanToForm (source, bean) {
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
		}
	}
	
	function copy (source, destiny) {
		if (!destiny)
			destiny = {};
		var mapAttFields = mapAttributesFields(source);
		for (var i in mapAttFields) {
			var obj = mapAttFields[i];
			destiny[obj.attribute] = parseData (obj.element.value, obj.type);
		}
		return destiny;
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
	
	function parseData (value, type) {
		if (!type || type === "String" || !value)
			return value;
		else if (type === "Integer")
			return parseInt(value, 10);
		else if (type === "Date")
			return  moment(value, moment.langData()._longDateFormat.L).toDate();
		return value;
	}
	
	return {
		copy : copy,
		copyBeanToForm : copyBeanToForm
	};
});