var stateFun = (function () {
    var state = {}
    $(document).on("click", ".lang", function () {
        var langState = $(this).val();
        state.language = langState
        sessionStorage.setItem("lang", langState);
    });
    $(document).on("click", ".game", function () {
        var gameState = $(this).val();
        state.game = gameState;
        sessionStorage.setItem("game", gameState);
    });
    $(document).on("click", ".diff", function () {
        var diffState = $(this).val();
        state.difficulty = diffState;
        sessionStorage.setItem("diff", diffState);
    });

    $(document).on("click", "#playBtn", function () {
        if (!state.game || !state.language || !state.difficulty) {
            console.log("please select a language, game, and difficulty level before proceeding")
        }
        else if (state.game === "jumble") {
            $("#playBtn").attr("href", "jumble.html");
            window.location.replace($("#playBtn").attr(("href")));
            console.log("go 2 game");
        }
        else if (state.game === "ws") {
            $("#playBtn").attr("href", "wordsearch.html");
            // window.location.replace($("#playBtn").attr(("href")));
            console.log("go 2 game")
        }
        else {
            $("#playBtn").attr("href", "hangman.html");
            // window.location.replace($("#playBtn").attr(("href")));
            console.log("go 2 game")
        }
        var urlLang;
        if (state.language === "fr") {
            urlLang = "french"
        }
        else if (state.language === "es") {
            urlLang = "spanish"
        }
        else {
            urlLang = "german"
        }
        $.get("api/" + urlLang + "/" + state.difficulty, function (data) {
                console.log(data)
                var positionArr = [];
                for (var i = 0; i < 10; i++){
                    positionArr[i] = Math.floor(Math.random() * Math.floor(100));
                    // console.log(positionArr)
                }
                var wordArr = [];
                for (var i = 0; i < 10; i++){
                    wordArr[i] = data[positionArr[i]].Word
                }
                sessionStorage.setItem("wordArr", wordArr);
        });
    });
})();

