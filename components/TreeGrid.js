define(["components/Grid"], 
function (grid){
	
	function create (config) {
		grid.create(config);
		_this.config = config;
		$("#" +_this.config.idTable).removeClass("table-striped");
	}
	
	function fill (data, config) {
		if (config)
			_this.config = config;
		grid.clear(_this.config);
		grid.createTBody(_this.config);
	
		_this.globalCount = 0;
		_this.data = data;
		for (var i = 0; i < data.length; i++) {
			_this.globalCount ++;
			var className = "treegrid-"+_this.globalCount + (" "+ getDefaultRowStyleClass());
		
			var childs = data[i][_this.config.varChild];
			if (childs.length > 0)
				className += getParentRowStyle();
			
			grid.addRowData (data[i], _this.config, className);
			
			if (childs)
				fillChilds(childs, _this.globalCount);
			
		}
		$("#" +_this.config.idTable).treegrid();
	}
	
	function fillChilds (childs, parent) {
		for (var i = 0; i < childs.length ; i++) {
			_this.globalCount ++;
			var className = "treegrid-"+_this.globalCount + " treegrid-parent-"+parent + (" "+ getDefaultRowStyleClass()) ;

			var childsOther = childs[i][_this.config.varChild];			
			if (childsOther.length > 0)
				className += getParentRowStyle();
			
			grid.addRowData (childs[i], _this.config, className);
	
			if (childsOther)
				fillChilds(childsOther, _this.globalCount);
		}
	} 
	
	function getSelecteds () {
		var selecteds = new Array();
		var data = _this.data.slice(0); 
		for (var i = 0; i < data.length; i++) {
			var row = data[i];
			var childrens = getChildrenSelected(row);
			row.childrens = childrens;
			if (isRowSelected(data[i]) || childrens.length > 0)
				selecteds.push(row);
		}
		return selecteds;
	}
	
	function getChildrenSelected (row) {
		var selecteds = new Array();
		for (var i = 0; i < row.childrens.length; i++) {
			var child = row.childrens[i];
			var childrens = getChildrenSelected(child);
			child.childrens = childrens;
			if (isRowSelected(child) || childrens.length > 0)
				selecteds.push(child);
		}
		return selecteds;
	}
	
	
	function isRowSelected (row) {
		return $("#row_"+row.id).hasClass(getDefaultRowStyleClass());
	}
	
	function toggleClass (row) {
		$("#row_"+row.id).toggleClass(getDefaultRowStyleClass());
	}
	
	function getDefaultRowStyleClass () {
		if (_this.config.defaultRowStyle) 
			return _this.config.defaultRowStyle;
		return "";
	}
	
	function getParentRowStyle () {
		if (_this.config.haveParentRowStyle)
			return " row-parent";
		return "";
	}

	_this = {
		create : create,
		fill : fill,
		toggleClass : toggleClass,
		getSelecteds : getSelecteds
	};
	
	return _this;
});