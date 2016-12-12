var nools = require('nools');

var UserCase = function(uid, emotion, body, behaviour, habit) {
  this.uid = uid;
  this.emotion = emotion;
  this.body = body;
  this.behaviour = behaviour;
  this.habit = habit;
}

var Conclusion = function(uid, content, reliability) {
  this.uid = uid;
  this.content = content;
  this.reliability = reliability;
}

var Advise = function(uid, content) {
  this.uid = uid;
  this.content = content;
}

var flow = nools.flow('Diagnosis', function(flow) {

})
