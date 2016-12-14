var fs = require('fs');
var path = require('path');
var readLineStream = require('lei-stream').readLine;
var writeLineStream = require('lei-stream').writeLine;

function generateNools(rule) {
  var noolText = '';
  if (rule) {
    // TODO: compute match rate
    noolText = `
rule ${rule.name} {
  when {
    p: UserCase p.emotion.name in ["${rule.premise[0].name}"] && p.emotion.value >= ${rule.premise[0].value} && p.body.name in ["${rule.premise[1].name}"] && p.body.value >= ${rule.premise[1].value} && p.behavior.name in ["${rule.premise[2].name}"] && p.behavior.value >= ${rule.premise[2].value} {name: n};
  }
  then {
    var d = new Diagnosis({name : n, conclusion : "${rule.conclusion}", reliability: ${rule.reliability}});
    emit("diagnosis", d);
    assert(d);
  }
}
rule ${rule.aname} {
  when {
      d : Diagnosis d.conclusion in ["${rule.conclusion}"] {name : n};
  }
  then {
      var t = new Advise({name : n, advise : "${rule.advise}"});
      emit("advise", t);
      assert(t);
  }
}`;
  }
  return noolText;
}

function readFile(source, cb) {
  var sourceData = '';
  var s = readLineStream(fs.createReadStream(source), {
    // 换行符，默认\n
    newline: '\n',
    // 是否自动读取下一行，默认false
    autoNext: true,
  });
  // 读取到一行数据时触发data事件
  s.on('data', function (data) {
    console.log('line61: '+data);
    sourceData += data + '\n';
    s.next();
  });
  s.on('end', function () {
    cb(sourceData);
  });
}

// streaming read & write file
// TODO: add file lock
function writeFile(target, text, cb) {
  var s = writeLineStream(fs.createWriteStream(target), {
    newline: '\n',
    // 缓存的行数，默认为0（表示不缓存），此选项主要用于优化写文件性能，
    // 当数量缓存的内容超过该数量时再一次性写入到流中，可以提高写速度
    cacheLines: 10
  });
  s.write(text);
  s.end(function () {
    console.log('write end');
  });
  // check data be wroted in file
  fs.readFile(target, 'utf8', function(err, data){
    if (err) {
      throw err;
    } else {
      console.log('write file success');
      console.log(data);
      cb(data);
    }
  });
}

// params
//source: Type:Object rule instance from rule db
exports.run = function(source, successCb, failCb) {
  var file = path.resolve('rule/diagnosis.nools');
  var newRuleText = generateNools(source);
  readFile(file, function(sourceData) {
    var ruleText = sourceData + '\n' + newRuleText;
    writeFile(file, ruleText, function(data) {
      if (data) {
        return successCb(data);
      } else {
        return failCb();
      }
    });
  });
}
