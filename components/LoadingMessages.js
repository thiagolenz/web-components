define(["i18n!components/nls/loading", "htmlLoader"], function (i18ns, htmlLoader){
	
	function loading (options) {
		console.log(i18ns.loading);
		if (!options)
			options = {};
		if (options.inModal)
			insideModalLoading();			
		else
			modalLoading();
	}
	
	function modalLoading () {
		if ($("#loadingContainer").length == 0) {
			var element = document.createElement("div");
			element.id = "loadingContainer";
			$("body").prepend(element);
		} 
		upProcessLoading();
		if (window.loadingProcessCount == 1)
			htmlLoader.load({
				container: "#loadingContainer",
				file: "components/templates/DialogLoading.html",
				i18n : i18ns
			});
	}
	
	function upProcessLoading () {
		if (window.loadingProcessCount == undefined)
			window.loadingProcessCount = 0;
		window.loadingProcessCount++;
	}
	
	function insideModalLoading () {
		var height = $(".modal-content").css("height");
		var width = $(".modal-content").css("width");
		var loadingDiv = document.createElement("div");
		loadingDiv.id = "loading-message-content";
		$(loadingDiv).css("height", height);
		$(loadingDiv).css("width", width);
		$(loadingDiv).addClass("loading-inside-modal");
		
		$(".modal-content").prepend(loadingDiv);
		
		htmlLoader.load({
			container: "#"+loadingDiv.id,
			file: "components/templates/DialogLoadingInsideModal.html",
			i18n: i18ns
		});
	}
	
	
	function hideLoading (options) {
		if (!options)
			options = {};
		if (options.inModal)
			hideInsideModalLoading();
		else 
			hideModalLoading();
	}
	
	function hideInsideModalLoading () {
		$("#loading-message-content").remove();		
	}
	
	function hideModalLoading () {
		downProcessLoading();
		if (window.loadingProcessCount == 0)
			$("#loadingContainer").empty();
	}
	
	function downProcessLoading () {
		window.loadingProcessCount--;
	}
	
	return {
		loading : loading,
		hideLoading : hideLoading
	};
});