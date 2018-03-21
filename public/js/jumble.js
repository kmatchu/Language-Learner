var game = sessionStorage.getItem("game");
console.log(game);
var language = sessionStorage.getItem("lang");
console.log(language);
var difficulty = sessionStorage.getItem("diff");
console.log(difficulty);
var wordArray = sessionStorage.getItem("wordArr").split(",")
console.log(wordArray);

// following code comes from Stack Overflow
makeSortString = (function () {
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
    return function (s) {
        return (s.replace(translate_re, function (match) { return translate[match]; }));
    }
})();
//

$(document).ready(function () {
    /**
    *This function helps up scramble up the letters so that we can give them to the user to unscramble
    *@param {string} word - takes in the word we want to scramble
    *@returns {string} shuffledWord - returns the word we took in with its characters in a mixed up order
    */
    function shuffleWord(word) {
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord += word.splice(word.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }

    /**
    *These functions create new arrays from our original array of words
    *@param {array} wordArray - takes in the original array of words
    *@returns {array} newWordArray - returns a new array with words scrambled up
    *@returns {array} wordArrayNA - returns a new array with characters with accents replaced by that character without the accent
    */
    var newWordArr = wordArray.map(elem => shuffleWord(elem));
    var wordArrayNA = wordArray.map(elem => makeSortString(elem));
    for (var i = 0; i < newWordArr.length; i++) {
        if (newWordArr[i] === wordArray[i]) {
            shuffleWord(newWordArr[i])
        }
    }

    /**
    *This function dynamically places our scrambled words on the page with forms below for users to input their answers
    *@param {array} newWordArray - takes in the array of scrambled words
    *@returns returns multiple divs which display the scrambled word as well as a corresponding form for the user to type in the unscrambled word
    */
    newWordArr.forEach(elem => $("#jumble").append("<div class='wordCol col-md-4'>" +
        "<div id='word" + newWordArr.indexOf(elem) + "'>" +
        elem + "</div> <div> <form> <input class='form-control jumbleform' id='jumbleGuess" +
        newWordArr.indexOf(elem) + "' placeholder='Unscramble here'></input> </form> </div>" +
        "</div>"));

    $(".jumbleform").on("keydown", function (e) {
        if (e.which === 13) {
            e.preventDefault();
        }
    });

    /**
     * This function checks whether the user unscrambled the word correctly or not
     * @param {}
     */
    $(".jumbleform").on("blur", function (e) {
        let pos = $(this).attr("id").slice(11);
        let userGuess = $(this).val().toLowerCase();

        if ($("#jumbleGuess" + [pos]).val().toLowerCase() === wordArrayNA[pos]) {
            $(this).removeClass("incorrect");
            $(this).addClass("correct");
            $(this).attr("readonly", "readonly");
            $(this).css("background-color", "green")

            checkWin();
        }
        else {
            $(this).addClass("incorrect");
        }
    });

/**
 * This function checks to see when the user has won the game by unscrambling all words from our array correctly
 * @param {array} wordArray - our original array of words
 * @returns - when user has won the game this function triggers a modal to show
 */
    var checkWin = function () {
        var win = true;
        for (var i = 0; i < wordArray.length; i++) {
            if (!$("#jumbleGuess" + [i]).hasClass("correct")) {
                win = false;
            };
        }
        if (win) { 
            $("#winModal").modal("show"); 
            won("jumble", difficulty); // updates progress data for user
        };
    };

    /**
     *  This function runs an ajax call to the Yandex API to look up the english translation of the inputted word
     * @param {string} searchWord - this is the word the user enters to look up
     * @param {string} langauge - this indicates to our queryURL which language we are translating from
     * @returns {string} response.text - this is the response we got from our ajax call
    */
     $("#wordSearchBtn").on("click", function (event) {
        event.preventDefault();
        $("#lookup").text("");
        var searchWord = $("#wordInput").val();
        queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + searchWord + "&lang=" + language + "-en";
        $.ajax({
            url: queryURL,
            type: "GET",
            dataType: "json",
        }).then(function (response) {
            if (response.text[0] !== searchWord) {
                $("#lookup").append("<div> Translation: " + response.text[0] + "</div>")
                console.log(response.text[0])
            }
            else {
                $("#lookup").append("<div> No translation found for: " + searchWord + "</div>")
            }
        }).catch(function (response) {
            $("#lookup").append("<div> No translation found </div>")
        })
    });

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
                var spot = Math.floor(Math.random() * Math.floor(100));
                if(positionArr.indexOf(spot)!==-1){
                    i--;
                }
                else{
                    positionArr[i] = spot;
                };

            }
            for (var i = 0; i < 10; i++) {
                wordArr[i] = data[positionArr[i]].Word
            }
            sessionStorage.setItem("wordArr", wordArr);
        }).done(function () {
            window.location.reload(true);
        });
    });
});

