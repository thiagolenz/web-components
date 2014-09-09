define ([], function () {
	function createAutoCompleteComponent (config) {
		var completeDiv = document.createElement ("div");
		$(completeDiv).addClass ("tagsinput");
		
		var input = document.createElement("input");
		$(input).addClass("autocomplete-input");
		$(completeDiv).append (input);
	
		$("#"+config.container).append (completeDiv);
		$("#"+config.container).addClass ( "dropdown");
		$("#"+config.container).attr ( "data-varDisplay", config.varDisplay);
		
		
		createDropDown(config);
	}
	
	function fillAndShowDropDown (config, result, value) {
		showDropDown(config);
		removeCurrentTag(config);
		fillDropDown(config, result);

		if (config.canCreate == undefined)
			config.canCreate = true;
		
		if (config.canCreate)
			createOptionNewOnDropDown(config, value);
	}
	
	function createOptionNewOnDropDown (config, value) {
		var item = $("#"+config.container +" .elementNew")[0];
		var dropDown = $("#"+config.container + " ul");
		if (item == undefined) {
			createDivider(dropDown);
			item = createLinkCreateNew(dropDown);
		} else {
			$(item).html("");			
		}
		$(item).append ("Create new ");
		var strong = document.createElement("strong");
		$(strong).html(value);
		$(item).append(strong);
	}
	
	function createDivider (dropdown) {
		var divider = document.createElement("li");
		$(divider).addClass("divider");
		$(divider).css("margin", "0px");
		$(dropdown).append(divider);
	}
	
	function createLinkCreateNew (dropdown) {
		var li = document.createElement ("li");
		$(dropdown).append(li);
		item = document.createElement ("a");
		$(item).addClass("elementNew");
		$(item).addClass("autocomplete-item");
		$(li).append(item);
		return item;
	}
	
	function createDropDown (config) {
		var dropDown = document.createElement ("ul");
		$(dropDown).addClass("dropdown-menu");
		$(dropDown).attr ("role", "menu");		
		$("#"+config.container).append (dropDown);
	} 
	
	function fillDropDown (config, result) {
		var dropDown = $("#"+config.container + " ul");
		$(dropDown).html("");
		for (var i = 0; i < result.dataList.length; i++) {
			var item = document.createElement("li");
			$(item).attr ("role","presentation");
			var linkable = createLinkableElement(config, result, i);
			$(item).append(linkable);
			$(dropDown).append (item);
		}
	}
	
	function createLinkableElement (config, result, index) {
		var a = document.createElement ("a");
		$(a).html(result.dataList[index][config.varDisplay]);
		$(a).addClass("autocomplete-item");
		$(a).attr ("tabindex", "-1");
		$(a).attr ("role", "menuitem");
		$(a).attr ("data-index", index);
		a.href = "#";
		return a;
	}
	
	function createBoxSelected (config, value) {
		var spanTag = createSelectedSpanTag(config);
		
		var spanText = createSelectedSpanText(value);
		$(spanTag).append (spanText);
		
		var remove = createSelectedRemoveButton(config);
		$(spanTag).append (remove);

		return spanTag;
	}
	
	function createTagsInputIfNotExist () {
		
	}
	
	function createSelectedSpanTag (config) {
		var spanTag = document.createElement ("span");
		$(spanTag).addClass("tag");
		return spanTag;
	}
	
	function createSelectedSpanText (value) {
		var spanText = document.createElement ("span");
		$(spanText).html ( value);
		return spanText;
	}
	
	function createSelectedRemoveButton (config) {
		var remove = document.createElement ("button"); 
		$(remove).html ("x");
		$(remove).addClass("close");
		$(remove).click (function () {
			removeCurrentTag (config);
			if (config.onChange)
				config.onChange (undefined);
		});
		return remove;
	}
	
	function disable (config) {
		enableDisable(config, true);
	}
	
	function enable (config) {
		enableDisable(config, false);
	}
	
	function enableDisable (config, flag) {
		$("#"+config.container + " .tagsinput").attr('disabled', flag);
		$("#"+config.container + " input").attr('disabled', flag);
		if (flag)
			$("#"+config.container).parent().addClass("disabled");
		else 
			$("#"+config.container).parent().removeClass("disabled");
	}
	
	function removeCurrentTag (config)  {
		config.onRemoveTag(config);
		$("#"+config.container + " .tag").remove();
	}
	
	function removeCurrentTagByName (name)  {
		$("[data-name='"+ name +"'] .tag").remove();
	}
	
	function showDropDown (config) {
		$("#"+config.container).addClass("open");
	}
	
	function hideDropDown (config) {
		$("#"+config.container).removeClass("open");
	}
	
	function focus (config) {
		$("#"+ config.container + " .tagsinput ").addClass("focus");
	}
	
	function removeFocus (config) {
		$("#"+ config.container + " .tagsinput ").removeClass("focus");
	}
	
	function resizeInput (config) {
		var sizeInput = 0;
		var containerWidth = $("#"+config.container).width ();
		if (containerWidth > 0) {
			var spanTag = $("#"+config.container + " .tag");
			if (spanTag) 
				sizeInput = containerWidth - $(spanTag).width() - 45;
			else 
				sizeInput = containerWidth;
		} else {
			sizeInput = 70;
		}
		if (sizeInput < 30) 
			sizeInput = 30;
		
		$("#"+config.container).find ("input").css("width", sizeInput);
	}


	return {
		createAutoCompleteComponent : createAutoCompleteComponent, 
		createBoxSelected : createBoxSelected, 
		removeCurrentTag : removeCurrentTag,
		showDropDown : showDropDown,
		hideDropDown : hideDropDown,
		createOptionNewOnDropDown : createOptionNewOnDropDown,
		fillAndShowDropDown : fillAndShowDropDown,
		createDropDown : createDropDown,
		focus : focus,
		removeFocus : removeFocus,
		removeCurrentTagByName : removeCurrentTagByName, 
		disable: disable,
		enable : enable,
		resizeInput : resizeInput
	};
});