
function checkWithOperator(comparer, value, operator) {
	switch(operator) {
	  case '>':
		return (comparer > value);
 	  case '<': 
		return (comparer < value);
	  case '=':
		return (comparer === value);
	  case '<=':
		return (comparer <= value);
	  case '>=':
		return (comparer >= value);
	  case '!=':
		return (comparer !== value);
	}
};