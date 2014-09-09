define([],{
	root : {
		config : {
		    delimiters: {
		        thousands: ' ',
		        decimal: ','
		    },
		    abbreviations: {
		        thousand: 'k',
		        million: 'm',
		        billion: 'b',
		        trillion: 't'
		    },
		    ordinal : function (number) {
		    	return "º";
		    },
		    currency: {
		        symbol: '$'
		    }
		}
	},
	"pt-br" : true
});