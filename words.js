var fs = require('fs')
var liner = require('./liner')
var _ = require('underscore')

var countWords = function() {
    var line
    while(line = liner.read()) {
        var split = line.match(/\S+/g)
        if(split == null) continue;

        for(var i = 0; i < split.length; i++) {
            var currWord = split[i];
            var currCount = wordCount[currWord];
            if(typeof currCount === 'number') wordCount[currWord] = currCount + 1;
            else wordCount[currWord] = 1;
        }
    }
}

var manipulateData = function() {
    var zipped = _.pairs(wordCount);
    var sorted = _.sortBy(zipped, function(pair) { return -1 * pair[1]; } );
    console.dir(sorted.slice(0,25));
}

liner.on('readable', countWords);
liner.on('end', manipulateData);

var wordCount = new Object();
var source = fs.createReadStream('./war_and_peace.txt')
source.pipe(liner)

