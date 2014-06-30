define ([], function (){
	function create (options) {
		var btnGroup = document.createElement("div");
		$(btnGroup).addClass ("btn-group");
		for (var i = 0 ; i< options.data.length; i++) 
			createCheckboxButton(options.data[i], options, btnGroup);
		$("#"+options.container).append(btnGroup);
		if (options.onFinishCreate)
			options.onFinishCreate();
	}
	
	function createCheckboxButton (element, options, btnGroup) {
		var button = document.createElement("button");
		$(button).html(element[options.varname]);
		$(button).attr ("data-name", element.dataName);
		$(button).attr ("data-type", "checkbox");
	
		if (element.checked)
			$(button).addClass("btn btn-primary active");
		else 
			$(button).addClass("btn btn-default");	
	
		$(button).click (onClick);
		$(btnGroup).append (button);
	}
	
	function onClick (event) {
		var clickedBtn = $(event.target);
		$(clickedBtn).toggleClass("active");
		$(clickedBtn).toggleClass("btn-primary");
		$(clickedBtn).toggleClass("btn-default");
	}
	
	function getValue (element) {
		return $(element).hasClass("active");
	}
	
	function setValue (element, value) {
		if (value) {
			$(element).addClass("active btn-primary");
			$(element).removeClass("btn-default");
		} else {
			$(element).addClass("active btn-default");
			$(element).removeClass("active btn-primary");
		}
	}
 	
	return {
		create : create,
		getValue : getValue,
		setValue : setValue
	} ;
});