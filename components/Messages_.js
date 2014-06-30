define([], function () {
	function warning (options) {
		clear(options);
		message(options, "alert-warning");
	}

	function error (options) {
		clear(options);
		message(options, "alert-danger");
	}

	function info (options) {
		clear(options);
		message(options, "alert-info");
	}

	function success (options) {
		clear(options);
		message(options, "alert-success");
	}

	function message (options, classType) {
		defineContainer (options);
		var divMsg = createDivMessage(classType);
		var title = createTitle(options);
		$(divMsg).append(title).append(options.message.errorDescription || options.message.value);
		$("#"+options.container).append(divMsg);
	}

	function createDivMessage (classType) {
		var divMsg = document.createElement("div");
		divMsg.className = "alert " + classType;
		return divMsg;
	}
	
	function createTitle (options) {
		var title = document.createElement("strong");
		title.innerHTML = options.title != undefined ? options.title : "" ;
		return title;
	}

	function clear (options) {
		if (!options)
			options = {};
		defineContainer(options);
		$("#"+options.container).empty();
	}

	function defineContainer (options) {
		if (options.inModal)
			options.container="modal-messages";
		else {
			options.container = "app-messages-container";
			createAppMessagesIfDontExists(options.container);
		}
	}
	
	function createAppMessagesIfDontExists (container) {
		if ($("#"+container).length === 0) {
			var div = document.createElement("div");
			div.id = container;
			$(div).insertAfter ("#body h3");
		}
	}

	return {
		warning : warning,
		success : success,
		info : info,
		error: error,
		clear : clear
	};
});