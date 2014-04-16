var requireConfig = {
		baseUrl: '.',
		paths: {
			bootstrap :  'scripts/bootstrap',
			datePicker : "scripts/bootstrap-datepicker",
			grid : "components/Grid",
			dialog : "components/Dialog",
			service : "components/Service",
			binding : "components/binding",
			formatter : "components/formatter",
			moment : "scripts/moment-with-langs",
			formDialog : "components/FormDialog",
			loadingMessages : "components/LoadingMessages",
			messages : "components/messages",
			confirmation: "components/confirmation",
			i18n : "scripts/i18n",
			htmlLoader: "components/HtmlLoader"
		},
		locale : navigator.language.toLowerCase()
};

require.config(requireConfig);


var parts = document.URL.split("#!");
var selectedModule = parts[1];

define(["modules/main/ApplicationMain", "bootstrap", "datePicker", ], function(applicationMain) {
	require(["scripts/locales/bootstrap-datepicker.pt-BR"]);
	applicationMain.load(requireConfig, selectedModule);
});