var jieba = require('nodejieba');

// extract keywords
exports.getKeywords = function(str) {
	var n = 20; //select the word that weight are top 20
	jieba.load({
		idfDict: jieba.DEFAULT_IDF_DICT
	});
	var result = jieba.extract(str, n);
	return result;
}
