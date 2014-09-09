define([], function (){
	
	function create (options) {
		return createElements(options);
	}
	
	function createElements (options) {
		var btnGroup = document.createElement("div");
		$(btnGroup).addClass ("btn-group");
		$(btnGroup).attr("data-name" , options.name);
		for (var i = 0 ; i< options.data.length; i++)
			createToggleButton (options.data[i], btnGroup, options);
		if (!options.container)
			return btnGroup;
		$("#"+options.container).append(btnGroup);
		setActive($("#"+options.container + " button")[0]);
		if (options.onFinishCreate) 
			options.onFinishCreate();
	}
	
	function createToggleButton (element, btnGroup, options) {
		var button = document.createElement("button");
		$(button).attr("data-toggle", "button");
		$(button).attr("data-enumvalue", element.enumValue);
		if (options.defaultValue == element.enumValue)
			setActive(button);
		$(button).html(element[options.varname]);
		$(button).addClass("btn btn-default");
		$(button).click (function (event) {
			onButtonClick(event.target, options.name);
			if (options.onChange)
				options.onChange (getSelectedValue(options.name));
		});
		$(btnGroup).append (button);
	}
	
	function onButtonClick (button, name) {
		changeSelected (button, name);
	}
	
	function setSelected (name, value) {
		var button = $("[data-name='" + name + "']").find(" button[data-enumvalue='" + value + "']");
		changeSelected(button, name);
	}
	
	function changeSelected (newButton, name) {
		var selected = $("[data-name='" + name + "']").find(".btn-primary")[0];
		if (selected ) {
			$(selected).removeClass("active");
			$(selected).removeClass("btn-primary");
		}
		setActive(newButton);
	}
	
	function setActive (button) {
		$(button).addClass("active");
		$(button).addClass("btn-primary");
	}
	
	function getSelectedValue(name) {
		var selected = $("[data-name='" + name + "']").find(" .btn-primary")[0];
		return $(selected).attr("data-enumvalue");
	}
	
	function disableAll (container) {
		$("#"+container+" button").addClass("disabled");
	}

	return {
		create: create,
		getSelectedValue : getSelectedValue,
		setSelected : setSelected,
		disableAll : disableAll
	};
});