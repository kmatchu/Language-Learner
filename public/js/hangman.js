var winWordsArr = sessionStorage.getItem("wordArr").split(",")
var language = sessionStorage.getItem("lang");
var difficulty = sessionStorage.getItem("diff");
var wordDisplay = document.querySelector("#guessBlanks")
var winWordRand = winWordsArr[Math.floor(Math.random() * winWordsArr.length)];
var winWordLetArr = winWordRand.split("");
var uArr = (winWordLetArr.fill(" _ ", 0));
var replace = wordDisplay.innerText = uArr.join(" ");
var lives = 7;
var wins = 0;
var losses = 0;
var allGuess = [];
var isMatch = false;

// following code comes from Stack Overflow
var translate_re = /[¹²³áàâãäåaaaÀÁÂÃÄÅAAAÆccç©CCÇÐÐèéê?ëeeeeeÈÊË?EEEEE€gGiìíîïìiiiÌÍÎÏ?ÌIIIlLnnñNNÑòóôõöoooøÒÓÔÕÖOOOØŒr®Ršs?ßŠS?ùúûüuuuuÙÚÛÜUUUUýÿÝŸžzzŽZZ]/g;
var translate = {
    "¹": "1", "²": "2", "³": "3", "á": "a", "à": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "a": "a", "a": "a", "a": "a", "À": "a", "Á": "a", "Â": "a", "Ã": "a", "Ä": "a", "Å": "a", "A": "a", "A": "a",
    "A": "a", "Æ": "a", "c": "c", "c": "c", "ç": "c", "©": "c", "C": "c", "C": "c", "Ç": "c", "Ð": "d", "Ð": "d", "è": "e", "é": "e", "ê": "e", "?": "e", "ë": "e", "e": "e", "e": "e", "e": "e", "e": "e",
    "e": "e", "È": "e", "Ê": "e", "Ë": "e", "?": "e", "E": "e", "E": "e", "E": "e", "E": "e", "E": "e", "€": "e", "g": "g", "G": "g", "i": "i", "ì": "i", "í": "i", "î": "i", "ï": "i", "ì": "i", "i": "i",
    "i": "i", "i": "i", "Ì": "i", "Í": "i", "Î": "i", "Ï": "i", "?": "i", "Ì": "i", "I": "i", "I": "i", "I": "i", "l": "l", "L": "l", "n": "n", "n": "n", "ñ": "n", "N": "n", "N": "n", "Ñ": "n", "ò": "o",
    "ó": "o", "ô": "o", "õ": "o", "ö": "o", "o": "o", "o": "o", "o": "o", "ø": "o", "Ò": "o", "Ó": "o", "Ô": "o", "Õ": "o", "Ö": "o", "O": "o", "O": "o", "O": "o", "Ø": "o", "Œ": "o", "r": "r", "®": "r",
    "R": "r", "š": "s", "s": "s", "?": "s", "ß": "s", "Š": "s", "S": "s", "?": "s", "ù": "u", "ú": "u", "û": "u", "ü": "u", "u": "u", "u": "u", "u": "u", "u": "u", "Ù": "u", "Ú": "u", "Û": "u", "Ü": "u",
    "U": "u", "U": "u", "U": "u", "U": "u", "ý": "y", "ÿ": "y", "Ý": "y", "Ÿ": "y", "ž": "z", "z": "z", "z": "z", "Ž": "z", "Z": "z", "Z": "z"
};

makeSortString = (function () {
    return function (s) {
        return (s.replace(translate_re, function (match) { return translate[match]; }));
    }
})();

var winWordRandNA = makeSortString(winWordRand);
console.log(winWordRandNA, "wwrna")
//

/**
 *  This function runs an ajax call to the Yandex API to look up the english translation of the inputted word
 * @param {string} winWordRand - this is the word the user enters to look up
 * @param {string} langauge - this indicates to our queryURL which language we are translating from
 * @returns {string} response.text - this is the response we got from our ajax call
*/
var yandex = function () {
    queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + winWordRand + "&lang=" + language + "-en";
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json",
    }).then(function (response) {
        if (response.text[0] !== winWordRand) {
            $("#lookup").text("Translation: " + response.text[0])
            console.log(response.text[0])
        }
    }).catch(function (response) {
        $("#lookup").text("No translation found")
    });
};
yandex();

/**
 * This function renders our information to the page
 */
var render = function () {
    $("#guessesRemain").text(lives);
    $("#win").text(wins);
    $("#loss").text(losses);
    $("#guessedLetters").text(allGuess);
}
render();

/**
 * This function runs our game
 */
var begin = function (event) {
    var guess = (event.key).toLowerCase();
    var isMatch = false;

    if (allGuess.includes(guess)) {
        console.log("here");
        return;
    } else {
        allGuess.push(guess);
    }

    /**
     * This function checks to see whether the user's guess is in the winning word or not. If it is the letter appears where it should be in the word.
     * @param {string} - guess represents the user's guess
     * @param {array} - winWordRandNA is the winning word (without accents) split into an array
     * @param {array} - uArr is the array of _ representing the winning word
     */
    for (var i = 0; i < winWordRandNA.length; i++) {
        if (winWordRandNA.includes(guess) && lives > 0) {
            if (winWordRandNA[i] === guess) {
                if (winWordRand[i].match(translate_re)) {
                    console.log(winWordRand[i]);
                    uArr[i] = winWordRand[i];
                }
                else {
                    uArr[i] = guess;
                }
            }
            wordDisplay.innerText = uArr.join(" ");
            isMatch = true;
        }
    }
    if (!wordDisplay.innerText.includes("_")) {
        allGuess = [];
        lives = 7;
        wins = wins + 1;

        if (wins === 10) {
            $("#winModal").modal("show");
        }
        else {
            winWordsArr.splice(winWordsArr.indexOf(winWordRand), 1);
            winWordRand = winWordsArr[Math.floor(Math.random() * winWordsArr.length)];
            winWordRandNA = makeSortString(winWordRand);
            winWordLetArr = winWordRandNA.split("");
            uArr = (winWordLetArr.fill(" _ ", 0));
            replace = wordDisplay.innerText = uArr.join(" ");
        }

    }
    if (!isMatch) {
        lives--;
        if (lives === 0) {
            losses = losses + 1;
            lives = 7;
            allGuess = [];
            winWordRand = winWordsArr[Math.floor(Math.random() * winWordsArr.length)];
            winWordRandNA = makeSortString(winWordRand);
            winWordLetArr = winWordRandNA.split("");
            uArr = (winWordLetArr.fill(" _ ", 0));
            replace = wordDisplay.innerText = uArr.join(" ");
        }
    }
    render();
    yandex();

    /**
     * This onclick function directs the user to the home page
    */
    $(".returnHomeBtn").on("click", function () {
        console.log("click");
        window.location.href = "home.html";
    });

    /**
     * This onclick function runs a get request to get a new array of words for the user and stores them in session storage then reloads this page
    */
    $(".playAgainBtn").on("click", function () {
        console.log("click");
        var urlLang;
        if (language === "fr") {
            urlLang = "french"
        }
        else if (language === "es") {
            urlLang = "spanish"
        }
        else if (language === "it") {
            urlLang = "italian"
        }
        else {
            urlLang = "german"
        }
        var positionArr = [];
        var wordArr = [];
        $.get("api/" + urlLang + "/" + difficulty, function (data) {
            for (var i = 0; i < 10; i++) {
                positionArr[i] = Math.floor(Math.random() * Math.floor(100));
                // console.log(positionArr)
            }
            for (var i = 0; i < 10; i++) {
                wordArr[i] = data[positionArr[i]].Word
            }
            sessionStorage.setItem("wordArr", wordArr);
        }).done(function () {
            window.location.reload(true);
        })
    })
};
$("body").on("keyup", begin);

