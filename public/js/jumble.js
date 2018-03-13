var game = sessionStorage.getItem("game");
console.log(game);
var language = sessionStorage.getItem("lang");
console.log(language);
var difficulty = sessionStorage.getItem("diff");
console.log(difficulty);
var wordArray = sessionStorage.getItem("wordArr").split(",")
console.log(wordArray);

// // following code from Stack Overflow
makeSortString = (function() {
    var translate_re = /[¹²³áàâãäåaaaÀÁÂÃÄÅAAAÆccç©CCÇÐÐèéê?ëeeeeeÈÊË?EEEEE€gGiìíîïìiiiÌÍÎÏ?ÌIIIlLnnñNNÑòóôõöoooøÒÓÔÕÖOOOØŒr®Ršs?ßŠS?ùúûüuuuuÙÚÛÜUUUUýÿÝŸžzzŽZZ]/g;
    var translate = {
"¹":"1","²":"2","³":"3","á":"a","à":"a","â":"a","ã":"a","ä":"a","å":"a","a":"a","a":"a","a":"a","À":"a","Á":"a","Â":"a","Ã":"a","Ä":"a","Å":"a","A":"a","A":"a",
"A":"a","Æ":"a","c":"c","c":"c","ç":"c","©":"c","C":"c","C":"c","Ç":"c","Ð":"d","Ð":"d","è":"e","é":"e","ê":"e","?":"e","ë":"e","e":"e","e":"e","e":"e","e":"e",
"e":"e","È":"e","Ê":"e","Ë":"e","?":"e","E":"e","E":"e","E":"e","E":"e","E":"e","€":"e","g":"g","G":"g","i":"i","ì":"i","í":"i","î":"i","ï":"i","ì":"i","i":"i",
"i":"i","i":"i","Ì":"i","Í":"i","Î":"i","Ï":"i","?":"i","Ì":"i","I":"i","I":"i","I":"i","l":"l","L":"l","n":"n","n":"n","ñ":"n","N":"n","N":"n","Ñ":"n","ò":"o",
"ó":"o","ô":"o","õ":"o","ö":"o","o":"o","o":"o","o":"o","ø":"o","Ò":"o","Ó":"o","Ô":"o","Õ":"o","Ö":"o","O":"o","O":"o","O":"o","Ø":"o","Œ":"o","r":"r","®":"r",
"R":"r","š":"s","s":"s","?":"s","ß":"s","Š":"s","S":"s","?":"s","ù":"u","ú":"u","û":"u","ü":"u","u":"u","u":"u","u":"u","u":"u","Ù":"u","Ú":"u","Û":"u","Ü":"u",
"U":"u","U":"u","U":"u","U":"u","ý":"y","ÿ":"y","Ý":"y","Ÿ":"y","ž":"z","z":"z","z":"z","Ž":"z","Z":"z","Z":"z"
    };
    return function(s) {
        return(s.replace(translate_re, function(match){return translate[match];}) );
    }
})();

//

$(document).ready(function () {
    // event.preventDefault();
    //  This section contains the array of words to scramble (wordArray) and then scrambles each word in the array (newWordArr)
    function shuffleWord(word) {
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord += word.splice(word.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }

    var newWordArr = wordArray.map(elem => shuffleWord(elem));
    var wordArrayNA = wordArray.map(elem => makeSortString(elem));
    // console.log(wordArrayNA, "wana")

    for (var i = 0; i < newWordArr.length; i++) {
        if (newWordArr[i] === wordArray[i]) {
            shuffleWord(newWordArr[i])
        }
    }
    // console.log(newWordArr);

    // let buttonCreate = "";

    newWordArr.forEach(elem => $("#jumble").append("<div class='wordCol col-md-4'>" +
        "<div id='word" + newWordArr.indexOf(elem) + "'>" +
        elem + "</div> <div> <form> <input class='form-control jumbleform' id='jumbleGuess" +
        newWordArr.indexOf(elem) + "' placeholder='Unscramble here'></input> </form> </div>" +
        "</div>"));


    //  This onclick function checks if the user has un-scrambled the word correctly
    $(".jumbleform").on("blur", function (e) {
            let pos = $(this).attr("id").slice(11);
            let userGuess = $(this).val().toLowerCase();

            if ($("#jumbleGuess" + [pos]).val().toLowerCase() === wordArrayNA[pos]) {
                // $("#correct" + [i]).text(" Correct!");

                $(this).removeClass("incorrect");
                $(this).addClass("correct");
                $(this).attr("readonly", "readonly");                
                $(this).css("background-color", "green")
                      
                checkWin();
            }
            else {
                $(this).addClass("incorrect");
            }
        // }
    });


    var checkWin = function () {
        var win = true;
        for (var i = 0; i < wordArray.length; i++) {
            if (!$("#jumbleGuess" + [i]).hasClass("correct")) {
                win = false;
            };
        }
        if (win) { $("#winJBModal").modal("show"); };
    };

    // $(document).on("click", "#modalJBClose", function () {
    //     $("#winJBModal").modal("hide");
    // });

    // This onclick function takes the user input and runs our ajax call to Yandex's API to find a translation to english for it
    $("#wordSearchBtn").on("click", function () {
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
});