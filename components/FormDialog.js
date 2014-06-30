define(["components/Service", 
        "components/Dialog", 
        "components/Messages", 
        "i18n!components/nls/Generic", 
        "components/FieldsValidation"], 
function (service, dialog, messages, i18n_g, fieldsValidation){
	
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
		
		fieldsValidation.validateMandatory ({
			bean : obj,
			source : config.source,
			inModal : true,
			container : dialog.idContainer, 
			success : function() {
				submitSave(config, obj);
			}
		});
		
	}
	
	function submitSave (config, obj) {
		var requestConfig = {
				url: config.restUrl,
				data: obj,
				inModal: true,
				id : config.id,
				success: function (data) {
					onSuccess(config, data);
				},
				error: onError
		};
		if (config.id)
			service.put(requestConfig);
		else 
			service.post(requestConfig);
	}
	
	function onSuccess (config, data) {
		if (config.afterSuccess)
			config.afterSuccess(data);
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