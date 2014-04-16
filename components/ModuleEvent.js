define (["components/BDomunModulesMapping"], function (bdomunMapping){
	
	function loadModule (moduleId, args) {
		console.log("loading: "+ moduleId);
		
		if ( bdomunMapping[moduleId] == undefined) {
			console.error ("module not found : "+ moduleId);
			return;
		}
		
		var moduleConfig = bdomunMapping[moduleId];
		requireAndLoadModule(moduleConfig, moduleId, args);
	}
	
	function requireAndLoadModule (moduleConfig, moduleId, args) {
		require([moduleConfig.path], function (module){
			module.load(args);
			if (moduleConfig.loadInURL) {
				appendModuleInUrl(moduleId);
				saveModuleCookie(moduleId);		
			}
			console.log("module loaded:"+ moduleId);
		});
	}
	
	function appendModuleInUrl (moduleId) {
		var urlParts = document.URL.split("/#");
		history.pushState('', '', urlParts[0] + "/#!" + moduleId);
	}
	
	function saveModuleCookie (moduleId) {
		var expiry = new Date(new Date().getTime()  + (30 * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + expiry.toGMTString();
		var cookieConfig = "currentModule=" +moduleId + expires+ "; path=/";
		document.cookie=cookieConfig;
	}
	
	return {
		loadModule: loadModule
	};
});