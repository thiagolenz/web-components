define(["service", "htmlLoader"], function (service, htmlLoader){
	var config = null;

	function open (_config) {
		config = _config;
		loadModalContainer();
	}

	function loadModalContainer () {
		var idContainer = "dialogContainer";
		var modalContainer = document.createElement("div");
		modalContainer.id = idContainer;
		$("body").append(modalContainer);
		
		htmlLoader.load ({
			container : "#dialogContainer",
			file : "components/templates/DialogContainer.html"
		}, loadBodyModal);
	}

	function loadBodyModal () {
		configModalLabels();
		htmlLoader.load({
			container: ".modal-body",
			file: config.content,
			i18n : config.i18n
		}, onLoadFinish);
	}

	function configModalLabels () {
		$(".modal-title").html(config.title);
		$("#btnModalSave").html(config.confirmLabel);
	}

	function onLoadFinish () {
		config.caller.afterLoadContent ();
		bindEvents();
		$("#myModal").modal({
			backdrop: "static"
		});		
	}

	function bindEvents () {
		$("#btnModalSave").off().on("click", onModalConfirm);

		$('#myModal').off().on('hidden.bs.modal', function (e) {
			removeSomeTrash();
		});
	}

	function onModalConfirm () {
		config.caller.onModalConfirm (config);
	}

	function removeSomeTrash () {
		$(".datepicker.dropdown-menu").remove ();
		$("#dialogContainer").remove();
	}

	function close () {
		$("#myModal").modal("hide");
		if (config.caller.onCloseModal)
			config.caller.onCloseModal();
	}

	return {
		open : open,
		close: close
	};

});