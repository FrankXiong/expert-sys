var nools = require('nools');
var _ = require('underscore');
var flow = nools.compile(require.resolve("../rule/diagnosis.nools"));
var UserCase = flow.getDefined('UserCase');

exports.diagnosis = function(u) {
	var d, a;
	var fires = [];
	return flow.getSession(new UserCase(u))
		.on("diagnosis", function(result) {
			d = result;
		})
		.on("advise", function(result) {
			a = result;
		})
		.match().then(function() {
			if (d && a) {
				return {
					uid: d.uid,
					conclusion: d.conclusion,
					reliability: d.reliability,
					advise: a.advise
				}
			} else {
				return {
					uid: u.uid,
					conclusion: '暂无诊断结果',
					advise: '无'
				}
			}
		});
}
