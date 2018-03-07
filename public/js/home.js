var stateFun = function () {
    var state = {
    }
    $(document).on("click", ".lang", function () {
        var langState = $(this).val();
        state.language = langState
        console.log(state)
    });

    $(document).on("click", ".game", function () {
        var gameState = $(this).val();
        state.game = gameState;
        console.log(state)
    });
    $(document).on("click", ".diff", function () {
        var diffState = $(this).val();
        state.difficulty = diffState;
        console.log(state)
    });

    $(document).on("click", "#playBtn", function () {
        if (!state.game || !state.language || !state.difficulty){
            console.log("please select a language, game, and difficulty level before proceeding")
        }
        else if (state.game === "jumble"){
            window.open($("#playBtn").attr(("href"), "jumble.html"));
            console.log("play j")
        }
        else if (state.game === "ws"){
            console.log("play ws")
        }
        else{
            console.log("play h")
        }
})
}
stateFun();
// module.exports = state;

