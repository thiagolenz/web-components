var Language = {
		getLanguage : function () {
			var cookie = Host.getHost() + "_language"; 
			var lang = Cookie.getCookie(cookie);
			if (lang)
				return lang.toLowerCase();
			else 
				return navigator.language.toLowerCase();
		}

};

var Cookie = {
		getCookie : function (name) {
			var cookie = {};
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i].trim();
				var parts = c.split ("=");
				cookie[parts[0]] = parts[1];
			}
			return cookie [name];
		},
		saveCookie : function (cookieName, value, expiry) {
			var expires = "; expires=" + expiry.toGMTString();
			var cookieConfig = Host.getHost()+ "_"+ cookieName + "=" + value + expires+ "; path=/";
			document.cookie=cookieConfig;
		}
};

var Host = {
		getHost : function () {
			var path = document.location.pathname;
			if (path != "/")
				path = "_" + path.substring(1, path.length -1).replace(/\-/g,'_');
			return document.location.hostname +  path;
		}
};


var requireConfig = {
		baseUrl: '.',
		paths: {
			bootstrap :  'scripts/bootstrap',
			datePicker : "scripts/bootstrap-datepicker",
			moment : "scripts/moment-with-langs",
			i18n : "scripts/i18n",
			treeGridJs : "scripts/jquery.treegrid",
			numeral : "scripts/numeral.min"
		},
		locale : Language.getLanguage()
};

require.config(requireConfig);
var parts = document.URL.split("#!");
var selectedModule = parts[1];

define(["modules/main/ApplicationMain", 
        "bootstrap", 
        "datePicker", 
        "treeGridJs"], function(applicationMain) {
	require(["scripts/locales/bootstrap-datepicker.pt-BR",
	         "scripts/jquery.maskedinput",
	         "scripts/jquery.treegrid.bootstrap3",
	         "scripts/jquery.maskMoney.min",
	         "scripts/languages.min"
	]);
	applicationMain.load(requireConfig, selectedModule);
});


