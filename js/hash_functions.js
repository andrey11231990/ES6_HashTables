/**
 * Hash functions for string.
 */


/**
 * Polynomial function.
 * @param  {String} string Key, from which we want to get hash.
 * @return {Number} Hash value.
 */
export function getHashByPolynom(string) {
	var hash = 0;
	var pow = string.length;
	// for english one of the most usefull numbers is 33, 37, 39, 41
	var constant = 33;
	for (var i = 0; i < string.length; i++) {
		hash += string.charCodeAt(i) * Math.pow(constant, pow);
		hash |= 0;
		pow--;
	}
	return hash;
}



/**
 * Cyclic shift function.
 * @param  {String} string Key, from which we want to get hash.
 * @return {Number} Hash value.
 */
export function getHashByCyclicShift(string) {
	var hash = 0;
	var shift = 5;
	for (var i = 0; i < string.length; i++) {
		hash = hash << shift;
		hash += string.charCodeAt(i);
	}
	return hash;
}
/**
 * One more cyclic shift function.
 * Link - http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.
 * @return {Number} Hash code.
 */
export function getHashCodeByCyclicShift(string) {
	var hash = 0, i, chr, len;
	if (string.length === 0) return hash;
	for (i = 0, len = string.length; i < len; i++) {
		chr   = string.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
