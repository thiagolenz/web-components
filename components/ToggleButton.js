define([], function (){
	
	function create (options) {
		createElements(options);
	}
	
	function createElements (options) {
		var btnGroup = document.createElement("div");
		$(btnGroup).addClass ("btn-group");
		for (var i = 0 ; i< options.data.length; i++)
			createToggleButton (options.data[i], btnGroup, options);
		$("#"+options.container).append(btnGroup);
		setActive($("#"+options.container + " button")[0]);
		if (options.onFinishCreate) 
			options.onFinishCreate();
	}
	
	function createToggleButton (element, btnGroup, options) {
		var button = document.createElement("button");
		$(button).attr("data-toggle", "button");
		$(button).attr("data-enumvalue", element.enumValue);
		$(button).html(element[options.varname]);
		$(button).addClass("btn btn-default");
		$(button).click (function (event) {
			onButtonClick(event.target, options.container);
			if (options.onChange)
				options.onChange (getSelectedValue(options.container));
		});
		$(btnGroup).append (button);
	}
	
	function onButtonClick (button, container) {
		changeSelected (button, container);
	}
	
	function setSelected (container, value) {
		var button = $("#" + container + " button[data-enumvalue='" + value + "']");
		changeSelected(button, container);
	}
	
	function changeSelected (newButton, container) {
		var selected = $("#" + container + " .btn-primary")[0];
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
	
	function getSelectedValue(container) {
		var selected = $("#" + container + " .btn-primary")[0];
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