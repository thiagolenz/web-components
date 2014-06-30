define (["components/HtmlLoader"], function (htmlLoader) {
	var config = null;
	
	function showYesNo (_config) {
		config = _config;
		loadConfirmationDialog();
	}

	function loadConfirmationDialog () {
		var idContainer = "dialogContainer";
		var modalContainer = document.createElement("div");
		modalContainer.id = idContainer;
		$("body").append(modalContainer);
		
		htmlLoader.load({
			container: "#"+idContainer,
			file: "components/templates/DialogConfirmation.html"
		}, loadBodyModal);
	}
	
	function loadBodyModal () {
		configModalLabels();
		var message = document.createElement("h4");
		$(message).html(config.message);
		$(".modal-body").append(message);
		bindEvents();
		$("#modalConfirmation").modal({
			backdrop: "static"
		});		
	}
	
	function bindEvents () {
		$("#btnModalConfirmationYes").on("click", function () {
			config.onYes();
			close();
		});
	}
	
	function close () {
		$("#modalConfirmation").modal("hide");
	}

	function configModalLabels () {
		$(".modal-title").html(config.title);
	}

	return {
		showYesNo : showYesNo
	};
});