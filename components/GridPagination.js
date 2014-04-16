define(function () {

	var currentPage = 0;

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
			if (i == _this.currentPage) {
				$(row).addClass("active");
			}
			var link = document.createElement("a");

			$(link).html(i+1);

			$(link).addClass("pagination-item");
			$(link).click(function (event) {
				_this.currentPage = $(event.target).text() - 1;
				config.onPageChange();
			});

			$(row).append(link);
			$(pagination).append(row);
		}
	}

	var _this = {
			createPagination: createPagination,
			currentPage : currentPage
	};

	return _this;
});