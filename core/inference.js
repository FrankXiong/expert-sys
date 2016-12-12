var nools = require('nools');
var _ = require('underscore');
var flow = nools.compile(require.resolve("../rule/diagnosis.nools"));
var UserCase = flow.getDefined('UserCase');

exports.diagnosis = function(u) {
	var d, a;
	return flow.getSession(new UserCase(u))
		.on("diagnosis", function(result) {
			d = result;
		})
		.on("advise", function(result) {
			a = result;
		})
		.match().then(function() {
			if (d && a) {
        console.log('hhh');
				return {
					uname: d.name,
					conclusion: d.diagnosis,
					advise: a.advise
				}
			} else {
				return {
					msg: '暂无诊断结果'
				}
			}
		});
}
