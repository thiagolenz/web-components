define(["service", "dialog", "messages", "i18n!components/nls/generic"], 
function (service, dialog, messages, i18n_g){
	
	function open (config) {
		config.caller.onModalConfirm = onModalConfirm;
		config.confirmLabel = i18n_g.save;
		dialog.open(config);
	}
	
	function onModalConfirm (config) {
		messages.clear({
			inModal: true
		});
		var obj = config.caller.prepareObjToSave();
		var requestConfig = {
				url: config.restUrl,
				data: obj,
				inModal: true,
				id : config.id,
				success: function () {
					onSuccess(config);
				},
				error: onError
		};
		if (config.id)
			service.put(requestConfig);
		else 
			service.post(requestConfig);
	}
	
	function onSuccess (config) {
		dialog.close();
		messages.success ( {
			title: i18n_g.congrats,
			message: {
				value: config.id ? config.successEditMessage : config.successNewMessage  
			}
		});
	}
	
	function onError (data) {
		messages.error({
			inModal: true,
			message: data
		});	
	}
	
	return {
		open: open,
		onModalConfirm: onModalConfirm
	};
});