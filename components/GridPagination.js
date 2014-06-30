define(function () {

	function createPagination (config) {
		var pagination = createGroupPagination(config.container);
		createItemPagination(config, pagination);
		clear(config);
		$("#"+config.container).append(pagination);
	}
	
	function clear (config) {
		$("#"+config.container + " .pagination").remove();
	}

	function createGroupPagination (container) {
		var pagination = document.createElement("ul");
		$(pagination).addClass("pagination");
		return pagination;
	}

	function createItemPagination (config, pagination) {
		var numberPages = config.totalRows / config.rowPerPage;
		for (var i = 0 ; i < numberPages ; i++) {
			var row = document.createElement("li");
			if (i == _this.getCurrentPage(config.container)) {
				$(row).addClass("active");
			}
			var link = document.createElement("a");

			$(link).html(i+1);

			$(link).addClass("pagination-item");
			$(link).click(function (event) {
				var page =  $(event.target).text() - 1;
				setCurrentPage(config, page);
				config.onPageChange();
			});

			$(row).append(link);
			$(pagination).append(row);
		}
	}
	
	function setCurrentPage (config, page) {
		$($("#"+config.container)).attr("data-currentpage", page);
	}
	
	function getCurrentPage (container) {
		var page = $($("#"+container)).attr("data-currentpage");
		page = page ? page : 0;
		return page;
	}
	
	function resetPagination (container) {
		$("#"+container).attr("data-currentpage", 0);
	}

	var _this = {
			createPagination: createPagination,
			getCurrentPage : getCurrentPage,
			resetPagination : resetPagination
	};

	return _this;
});