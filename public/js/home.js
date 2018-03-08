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
        }
        else if (state.game === "ws") {
            $("#playBtn").attr("href", "wordsearch.html");
            window.location.replace($("#playBtn").attr(("href")));
        }
        else {
            $("#playBtn").attr("href", "hangman.html");
            window.location.replace($("#playBtn").attr(("href")));
        }
    });
    
})();

