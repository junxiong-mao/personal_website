Array.prototype.indexOf = function(item) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === item) {
			return i;
		}
	}
	return -1;
}

Array.prototype.removeDuplicate = function() {
	var obj = {};
	var arr = [];
	this.forEach(function(value, index) {
		if (!obj[value]) {
			arr.push(value);
			obj[value] = true;
		}
	})
	return arr;
}

Array.prototype.getDuplicity = function() {
	var obj = {};
	var returnObj = {};
	this.forEach(function(value, index) {
		if (!obj[value]) {
			returnObj[value] = 1;
			obj[value] = true;
		} else {
			returnObj[value]++;
		}
	})
	return returnObj;
}