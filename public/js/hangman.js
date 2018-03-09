var winWordsArr = sessionStorage.getItem("wordArr").split(",")
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



var begin = function (event) {
    var guess = (event.key).toLowerCase();
    var isMatch = false;
    if (allGuess.includes(guess)) {
    } else { allGuess.push(guess); }
    for (var i = 0; i < winWordRand.length; i++) {
        if (winWordRand.includes(guess) && lives > 0) {
            if (winWordRand[i] === guess){
                uArr[i] = guess;
            }
            wordDisplay.innerText = uArr.join(" ");
            isMatch = true;
        }
    }
    if (!wordDisplay.innerText.includes("_")) {
        allGuess = [];
        lives = 7;
        wins = wins + 1;
        winWordRand = winWordsArr[Math.floor(Math.random() * winWordsArr.length)];
        winWordLetArr = winWordRand.split("");
        uArr = (winWordLetArr.fill(" _ ", 0));
        replace = wordDisplay.innerText = uArr.join(" ");
        $("#winHMModal").modal("show");
    }
    if (!isMatch) {
        lives--;
        if (lives === 0) {
            losses = losses + 1;
            lives = 7;
            allGuess = [];
            winWordRand = winWordsArr[Math.floor(Math.random() * winWordsArr.length)];
            winWordLetArr = winWordRand.split("");
            uArr = (winWordLetArr.fill(" _ ", 0));
            replace = wordDisplay.innerText = uArr.join(" ");
        }
    }

    $("#guessesRemain").text(lives);
    $("#win").text(wins);
    $("#loss").text(losses);
    $("#guessedLetters").text(allGuess);
    // This onclick function takes the user input and runs our ajax call to Yandex's API to find a translation to english for it
//  $("#wordSearchBtn").on("click", function () {
    // event.preventDefault();
    // $("#lookup").text("");
   var language = sessionStorage.getItem("lang");
   queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + winWordRand + "&lang=" + language + "-en";
   $.ajax({
       url: queryURL,
       type: "GET",
       dataType: "json",
   }).then(function (response) {
       if(response.text[0] !== winWordRand){
       $("#lookup").text("Translation: " + response.text[0])
       console.log(response.text[0])
       }
    //    else{
    //       $("#lookup").text("No translation found for: " + winWordRand)
    //    }
   }).catch(function (response){
      $("#lookup").text("No translation found")
   })
// });
}
$("body").on("keyup", begin);

$(document).on("click","modalHMClose",function(){
    $("#winHMModal").modal("hide");
})
