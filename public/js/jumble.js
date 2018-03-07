//  This section contains the array of words to scramble (wordArr) and then scrambles each word in the array (newWordArr)
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
console.log(newWordArr);
newWordArr.forEach(elem => $("#jumble").append("<div id='word" + newWordArr.indexOf(elem) + "'>" + elem + "</div> <div> <form> <input class='form-control' id='jumbleGuess" + newWordArr.indexOf(elem) + "' placeholder='Unscramble here'></input> </form> </div> <button class='checkBtn' id='btn" + newWordArr.indexOf(elem) + "'> </button>"));

// UPDATE
// This onlcick function will check if the guessed word (#jumbleGuess[i]) matches the correct word (wordArr[i])
$(".checkBtn").on("click", function () {
    event.preventDefault();
    for (var i = 0; i < wordArr.length; i++) {
        if ($("#jumbleGuess" + [i]).val() === wordArr[i]) {
            console.log(true);
        }
        else {
            console.log(false);
        }
    }
});

// This onclick function takes the user input and runs our ajax call to Yandex's API to find a translation to english for it
$("#wordSearchBtn").on("click", function () {
    event.preventDefault();
    $("#lookup").text("");
    var searchWord = $("#wordInput").val();
    var langCode = "es"
    queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + searchWord + "&lang=" + langCode + "-en";
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json",
    }).then(function (response) {
        $("#lookup").append("<div> Translation: " + response.text[0] + "</div>")
        console.log(response.text[0])
    });
});