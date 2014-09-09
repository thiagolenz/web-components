define([],{
	config : {
	    delimiters: {
	        thousands: '.',
	        decimal: ','
	    },
	    abbreviations: {
	        thousand: 'mil',
	        million: 'milhões',
	        billion: 'b',
	        trillion: 't'
	    },
	    ordinal : function (number) {
	        return number === 1 ? 'er' : 'ème';
	    },
	    currency: {
	        symbol: 'R$ '
	    }
	}
});






