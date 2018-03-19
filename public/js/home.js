$(document).ready(function () {
    var username = "";
    
    var langDescr = {
       "french": "French is a Romance language of the Indo-European family. It is the official language in 29 countries across five different continents, and is estimated to have about 76 million native speakers.",
        "spanish": "The Spanish language, also called the Castilian language, is a Western Romance language that originated in the Castile region of Spain and today has hundreds of millions of native speakers around the world. It is usually considered the world's second-most spoken native language.",
        "german": "German is a West Germanic language that is mainly spoken in Central Europe. One of the major languages of the world, German is the first language of about 95 million people worldwide and the most widely spoken native language in the European Union.",
        "italian": "Italian is a romance language. It is the third most widely spoken first language in the European Union with 69 million native speakers and it is spoken as a second language by 16 million EU citizens.",
        // "afrikaans": "Afrikaans description goes here. " + loremIpsum,
        // "portugese": "Portugese description goes here. " + loremIpsum,
        // "hungarian": "Hungarian description goes here. " + loremIpsum,
        // "dutch": "Dutch description goes here. " + loremIpsum
    };

var stateFun = (function () {
    var state = {}
    $(document).on("click", ".lang", function () {        
        var langState = $(this).attr("value");
        let lang = $(this).attr("id");
        let langdescr = langDescr[lang];

        // CSS EFFECTS
        $(".lang > img").removeClass("selected");
        $(".lang > img").removeClass("unselected");
        $(".lang > img").addClass("unselected");
        $("#" + lang + " > img").removeClass("unselected");
        $("#" + lang + " > img").addClass("selected");        
        lang = lang[0].toUpperCase() + lang.slice(1);
        $("#langtitle").text(lang);
        $("#langdescr").text(langdescr);

        state.language = langState
        sessionStorage.setItem("lang", langState);
    });
    $(document).on("click", ".game", function () {
        var gameState = $(this).attr("value");

        // CSS EFFECTS
        $(".figure > img").removeClass("clicked");
        $(".figure > img").removeClass("unclicked");
        $(".figure > img").addClass("unclicked");
        $("#" + gameState + "sel").removeClass("unclicked");
        $("#" + gameState + "sel").addClass("clicked");

        state.game = gameState;
        sessionStorage.setItem("game", gameState);
    });
    $(document).on("click", ".diff", function () {
        var diffState = $(this).val();

        // CSS EFFECTS
        $(".diffSel > button").removeClass("chosen");
        $(".diffSel > button").removeClass("unchosen");
        $(".diffSel > button").addClass("unchosen");
        $("#" + diffState).removeClass("unchosen");
        $("#" + diffState).addClass("chosen");

        state.difficulty = diffState;
        sessionStorage.setItem("diff", diffState);
    });

    $(document).on("click", "#playBtn", function () {
        if (!state.game || !state.language || !state.difficulty) {
            $(".gameErr").text("Please select a language, game, and difficulty level before proceeding");
        }
        else{
        var urlLang;
        if (state.language === "fr") {
            urlLang = "french"
        }
        else if (state.language === "es") {
            urlLang = "spanish"
        }
        else if (state.language === "it") {
            urlLang = "italian"
        }
        else {
            urlLang = "german"
        }
        var positionArr = [];
        var wordArr = [];
        $.get("api/" + urlLang + "/" + state.difficulty, function (data) {
            // console.log(data)
            for (var i = 0; i < 10; i++) {
                positionArr[i] = Math.floor(Math.random() * Math.floor(100));
                // console.log(positionArr)
            }
            for (var i = 0; i < 10; i++) {
                wordArr[i] = data[positionArr[i]].Word
            }
            sessionStorage.setItem("wordArr", wordArr);
        }).done(function () {
            if (state.game === "jumble") {
                $("#playBtn").attr("href", "jumble.html");
                window.location.href = $("#playBtn").attr(("href"));
                // console.log("go 2 game");
            }
            else if (state.game === "ws") {
                $("#playBtn").attr("href", "wordsearch.html");
                window.location.href = $("#playBtn").attr(("href"));
                // console.log("go 2 game")
            }
            else {
                $("#playBtn").attr("href", "hangman.html");
                window.location.href = $("#playBtn").attr(("href"));
                // console.log("go 2 game")
            }
        }); };
    });
})();

});

