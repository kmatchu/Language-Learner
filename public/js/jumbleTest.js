var expect = require("chai").expect;

var wordArr = ["hola", "bien", "hablar", "escuchar", "aprender"];
function shuffleWord(word) {
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
        shuffledWord += word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}
var newWordArr = wordArr.map(elem => shuffleWord(elem));
for (var i = 0; i < newWordArr.length; i++) {
    if (newWordArr[i] === wordArr[i]) {
        shuffleWord(newWordArr[i])
    }
}

describe("shuffleWord", function () {
    it("should shuffle letters in a string", function () {
        expect(shuffleWord("computer")).to.not.equal("computer");
    });
    it("should throw when not passed a string", function () {
        expect(function () {
            shuffleWord(true);
        }).to.throw(Error);
    });
});
