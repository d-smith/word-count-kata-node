var fs = require('fs')
var liner = require('./liner')
var _ = require('underscore')


var wordCounter = function(filepath) {
    var that = {
        wordCount: {}
    };

    that.doCount = function() {
        var line
        while(line = liner.read()) {
            var split = line.match(/\S+/g)
            if(split == null) continue;

            for(var i = 0; i < split.length; i++) {
                var currWord = split[i];
                var currCount = that.wordCount[currWord];
                if(typeof currCount === 'number') that.wordCount[currWord] = currCount + 1;
                else that.wordCount[currWord] = 1;
            }
        }
    }

    that.manipulateData = function() {
        var zipped = _.pairs(that.wordCount);
        var sorted = _.sortBy(zipped, function(pair) { return -1 * pair[1]; } );
        console.dir(sorted.slice(0,25));
    }

    that.countWords = function() {
        liner.on('readable', that.doCount);
        liner.on('end', that.manipulateData);
        var source = fs.createReadStream(filepath);
        source.pipe(liner);  
    }

    return that;
}

var myCounter = wordCounter('./war_and_peace.txt');
myCounter.countWords();



