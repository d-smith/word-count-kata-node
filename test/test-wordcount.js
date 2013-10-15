var assert = require('assert');
var wordCountModule = require('../words')


var callback = function(words) {
    console.log(words);
    var highestCount = words[0][0];
    assert.equal('C', highestCount);
}

var counter = wordCountModule('./test1.txt', callback);
counter.countWords();
