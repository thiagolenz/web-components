define(["components/GridPagination", 
        "components/ToggleButton"],
function (gridPagination, toggleButton) {
		
	function create (config) {
		createTableTag(config);
	}
	
	function createTableTag (config) {
		var divResponsible = createResponsibleDiv(config);
		
		var table = document.createElement("table");
		table.id = config.idTable;
		$(table).addClass("table table-bordered table-striped");
		$(table).append(createHeader(config));
		if (config.canSelectRow) {
			$(table).on('click', 'tbody tr', function(event) {
			    $(this).addClass('info').siblings().removeClass('info');
			    if (config.onRowSelect) {
			    	var table = $(this).closest("table") [0];
			    	var index = $("tr", table).index(this) ;
			    	var row = _this.data[table.id][index - 1];
			    	config.onRowSelect(row);
			    }
			});
		}
		$(divResponsible).append(table);
		$("#"+config.placeAt).html(divResponsible);
	}
	
	function createResponsibleDiv (config) {
		var divResponsible = document.createElement("div");
		divResponsible.className = "table-responsive";
		if (config.scrollHeightSize) {
			$(divResponsible).css("height", config.scrollHeightSize);
			$(divResponsible).css("overflow-y", "scroll");
		}
		return divResponsible;
	}
	
	function createHeader (config) {
		var head = document.createElement("thead");
		var tr = document.createElement("tr");
		for (var i = 0 ; i< config.columns.length; i++)
			$(tr).append(createColumnHeader(config.columns[i]));
		$(head).append(tr);
        return head;
	}
	
	function createColumnHeader (column) {
		var th = document.createElement("th");
		$(th).css("width", column.width);
		$(th).html(column.label);
		return th;
	} 
	
	function resetPagination (config) {
		gridPagination.resetPagination(config.placeAt);
	}
	
	function fill (result, config) {
		var data = result.dataList;
		clear(config);
		createTBody(config);
		var tbody = $("#"+config.idTable).find("tbody");
		for (var i = 0 ; i < data.length ; i++) 
			$(tbody).append(createRow(data[i], config));
		
		gridPagination.createPagination({
			container: config.placeAt,
			totalRows : result.totalRecordsCount,
			rowPerPage : config.recordsRange,
			onPageChange : config.onPageChange
		});
	}
	
	function addRowData (data, config, rowClass) {
		var tbody = $("#"+config.idTable).find("tbody"); 
		$(tbody).append(createRow(data, config, rowClass));
	}
	
	function createTBody (config) {
		var tbody = document.createElement("tbody");
		$("#"+config.idTable).append(tbody);
	}
	
	function createRow (data, config, rowClass) {
		var tr = document.createElement("tr");
		tr.id = "row_"+data.id;
		_this.data[config.idTable].push(data);
		$(tr).addClass(rowClass);
		for (var j = 0 ; j < config.columns.length ; j++) {
			var td = document.createElement("td");
			var content = createOtherCellContent(j, data, config);
	
			if (content == null)
				content = data[config.columns[j].field];
			
			$(td).html(content);
			$(tr).append(td);
		}
		return tr;
	} 
	
	function createOtherCellContent (columnIndex, row, config) {
		var columnConfig = config.columns[columnIndex];
		var content = null;
		
		if (isButton (columnIndex, columnConfig, row)) 
			content = createButtonContent(columnIndex, columnConfig, row);
		else if (isCustomContent(columnConfig.customContent))
			content = getCustomContent(columnIndex, columnConfig, row);
		else if (isCheckbox (columnIndex, columnConfig, row))
			content = createCheckboxContent(columnIndex, columnConfig, row);
		return content;
	}
	
	function createButtonContent (columnIndex, columnConfig, row) {
		var button = document.createElement("button");
		button.className = "btn " + columnConfig.className;
			button.innerHTML = getContentLabel(columnIndex, columnConfig, row);
		$(button).on("click", function () { 
			columnConfig.onClick(row);
		});
		return button;
	}
	
	function isButton (columnIndex, columnConfig, row) {
		if (typeof columnConfig.isButton == 'function') 
			return columnConfig.isButton (row, columnIndex);
		else 
			return columnConfig.isButton;
	}
	
	function isCheckbox (columnIndex, columnConfig, row) {
		if (typeof columnConfig.isCheckbox == 'function') 
			return columnConfig.isCheckbox (row, columnIndex);
		else 
			return columnConfig.isCheckbox;
	}
	
	function getContentLabel (columnIndex, columnConfig, row) {
		if (typeof columnConfig.contentLabel == 'function') 
			return columnConfig.contentLabel (row, columnIndex);
		else 
			return columnConfig.contentLabel;
	}
	
	function isCustomContent (customContent) {
		return typeof customContent == 'function' || customContent != null;
	}
	
	function getCustomContent (columnIndex, columnConfig, row) {
		if (typeof columnConfig.customContent == 'function') 
			return columnConfig.customContent (row, columnIndex);
		else 
			return columnConfig.customContent;
	}
	
	function createCheckboxContent (columnIndex, columnConfig, row) {
		var div = document.createElement("div");
		var yesNo = toggleButton.create ({
			name : "name_"+ row.id,
			varname : "description",
			defaultValue: columnConfig.defaultValue,
			data : columnConfig.data,
			onChange : function (value) {
				if (columnConfig.onChange)
					columnConfig.onChange(value, row);
			}
 		});
		if (columnConfig.defaultValue) 
			toggleButton.setSelected("name_"+row.id , columnConfig.defaultValue);
		$(div).append(yesNo);
		$(div).append(row[columnConfig.field]);
		return div;
	}
	
	function clear (config) {
		$("#"+config.idTable).find('tbody').remove();
		_this.data[config.idTable] = new Array();
	} 
	
	function getSearchHeaders (config) {
		return {
			"bd-pagination-currentpage": gridPagination.getCurrentPage(config.placeAt),
			"bd-pagination-recordsrange": config.recordsRange ? config.recordsRange : 10
		};
	}
	
	var _this = {
		create : create,
		fill : fill,
		clear : clear,
		getSearchHeaders: getSearchHeaders,
		resetPagination : resetPagination,
		createTBody : createTBody,
		addRowData : addRowData,
		data: {},
	};
	
	return _this;
});