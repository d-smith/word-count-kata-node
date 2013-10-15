var wordCounter = require('./words')

var doneCallback = function(top25) {
    console.dir(top25)
}

var myCounter = wordCounter('./war_and_peace.txt', doneCallback);
myCounter.countWords();