define (["components/AutoCompleteHtml", 
         "components/Service"], function (autoCompleteHtml, service){
	var TABKEY = 9;
	var ESCAPE = 27;
	var ENTER = 13;
	var DOWN = 40;
	
	var selectedBeans = {};
	var loadedData = {};
	var configs = {};
	
	function create (config) {
		config.onRemoveTag = function (config) {
			setValue(getDataName(config), undefined);
		};
		
		autoCompleteHtml.createAutoCompleteComponent(config);
		bindEvents(config);
		configs [$("#"+config.container).attr("data-name")] = config;
	}
	
	function bindEvents (config) {
		$("#"+ config.container + " input").keyup (function (event) {
			onKeyupEvent(event, config);
		});
		$("#"+ config.container + " .tagsinput").click (function (event) {
			$("#"+ config.container + " input").focus();
		});
		$("#"+ config.container + " input").on( 'focusin', function( event ) {
			autoCompleteHtml.focus(config);
		});
		
		$("#"+ config.container + " input").on( 'focusout', function( event ) {
			autoCompleteHtml.removeFocus(config);
		});
	}
	
	function onKeyupEvent (event, config) {
		if (event.keyCode != TABKEY) {
			if (event.keyCode == ESCAPE)  
				processEscapeKeyEvent(event, config);
			else if (event.keyCode == DOWN )  
				processDownEvent(event, config);
			else if (event.keyCode == ENTER) 
				processEnterEvent(event, config);
			else 
				loadData(config, event.target.value);
		}
	}
	
	function processEscapeKeyEvent (event, config) {
		autoCompleteHtml.hideDropDown(config);
		var selectedValue = $("#"+ config.container).attr("data-selectedvalue");
		if (selectedValue && $( this ).val().length > 0 ) 
			setShowDisplayValue(config, selectedValue);
		else 
			setShowDisplayValue(config, "");
	}
	
	function processDownEvent (event, config) {
		autoCompleteHtml.showDropDown(config);
		autoCompleteHtml.removeCurrentTag(config);
		$("#"+ config.container + " > ul > li > a ")[0].focus();
	}
	
	function processEnterEvent (event, config) {
		// TODO chamar a url para criar um novo registro
		setShowDisplayValue(config, event.target.value);
		autoCompleteHtml.hideDropDown(config);
	}
	
	function loadData (config, value) {
		var  data = {};
		data [config.varSearch] = value;
		if (config.beforeSearch)
			config.beforeSearch(data);
		service.post ({
			url : config.url,
			data : data, 
			skipLoading: true,
			success : function (result) {
				autoCompleteHtml.fillAndShowDropDown(config, result, value);
				bindEventOnChoose(config);
				loadedData[config.container] = result.dataList;
			}
		});
	}
	
	function bindEventOnChoose (config) {
		$("#"+ config.container + " .dropdown-menu a").click (function (event) {
			onChooseElement(config, event);
		});
	}
	
	function onChooseElement (config, event) {
		var index = $(event.target).attr("data-index");
		event.preventDefault();
		setShowDisplayValue(config, event.target.text);
		autoCompleteHtml.resizeInput(config);
		autoCompleteHtml.hideDropDown (config);
		$("#"+ config.container).attr("data-selectedvalue", event.target.text);
		
		var obj = loadedData[config.container][index];
		
		if (config.onChange)
			config.onChange (obj);

		selectedBeans [getDataName(config)] = obj;
		
		findNextElementToFocus(config);
	}
	
	function getDataName (config) {
		return $("#"+ config.container).attr("data-name");
	}
	
	function findNextElementToFocus (config) {	
		var tabables = $("input, button, textarea[tabindex != '-1']:visible");
		var current = $("#"+ config.container + " input");
		var currentIndex = tabables.index(current);
		$(tabables[currentIndex+1]).focus();
	}
	
	function setValue (name, bean) {
		selectedBeans[name] = bean;
		if (bean) {
			var element = $("[data-name='"+ name +"']")[0];
			var value = bean[$(element).attr("data-varDisplay")];
			setShowDisplayValue(configs[name], value);
			autoCompleteHtml.resizeInput(configs[name]);
		} else 
			autoCompleteHtml.removeCurrentTagByName(name);

	}
	
	function setShowDisplayValue (config, value) {
		$("#"+ config.container + " input").val("");
		if (value) {		
			var tag = autoCompleteHtml.createBoxSelected(config, value);
			$("#"+config.container + " .tagsinput").prepend(tag);
			//$("#"+ config.container + " input").attr("placeholder", "");
		}// else 
			//$("#"+ config.container + " input").attr("placeholder", "Digite um valor");
	}

	function getValue (name) {
		return selectedBeans[name];
	}
	
	function cleanSelected() {
		selectedBeans = {};
	}
	
	function disable (config) {
		autoCompleteHtml.disable (config);
	}
	
	function enable (config) {
		autoCompleteHtml.enable (config);
	}
	
	var _this =  {
		create : create,
		getValue : getValue,
		setValue : setValue,
		cleanSelected : cleanSelected,
		disable : disable,
		enable : enable
	};
	
	return _this;
});