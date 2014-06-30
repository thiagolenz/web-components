define(["components/Service", 
        "components/HtmlLoader"], 
function (service, htmlLoader){
	var config = null;

	function open (_config) {
		config = _config;
		loadModalContainer();
	}

	function loadModalContainer () {
		var modalContainer = document.createElement("div");
		modalContainer.id = _this.idContainer;
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
		if (config.large)
			$(".modal-dialog").addClass("modal-lg");
		else if (config.small)
			$(".modal-dialog").addClass("modal-sm");
		$("#myModal").modal({
			backdrop: "static"
		});		
		$('#myModal').on('hidden.bs.modal', function (e) {
			 if (config.onHideModal)
				 config.onHideModal();
			 else
				 console.log('hideeeeee');
		});
		$($("#dialogContainer input")[0]).focus();
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
	
	var _this = {
		open : open,
		close: close,
		idContainer : "dialogContainer"
	};
	
	return _this;

});