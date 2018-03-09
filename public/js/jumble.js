var game = sessionStorage.getItem("game");
console.log(game);
var language = sessionStorage.getItem("lang");
console.log(language);
var difficulty = sessionStorage.getItem("diff");
console.log(difficulty);
var wordArray = sessionStorage.getItem("wordArr").split(",")
console.log(wordArray);


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
 for (var i = 0; i < newWordArr.length; i++) {
     if (newWordArr[i] === wordArray[i]) {
         shuffleWord(newWordArr[i])
     }
 }
 console.log(newWordArr);
 newWordArr.forEach(elem => $("#jumble").append("<div id='word" + newWordArr.indexOf(elem) + "'>" + elem + "</div> <div class='correct' id='correct" + newWordArr.indexOf(elem) + "'> </div> <div> <form> <input class='form-control jumbleform' id='jumbleGuess" + newWordArr.indexOf(elem) + "' placeholder='Unscramble here'></input> </form> </div> <button class='checkBtn' id='btn" + newWordArr.indexOf(elem) + "'> </button>"));

//  This onclick function checks if the user has un-scrambled the word correctly
     $(".checkBtn").on("click", function () {
         for (let i = 0; i < wordArray.length; i++) {
         if ($("#jumbleGuess" + [i]).val() === wordArray[i]) {
             $("#correct" + [i]).text(" Correct!");
             checkWin();
         }
     }
 });

var checkWin = function(){
    var win = true;
    for(var i=0;i<wordArray.length;i++){
        if($("#correct" + [i]).text() !== " Correct!"){
            win = false;    };
    }
    if(win){$("#winJBModal").modal("show");};
};

$(document).on("click","#modalJBClose",function(){
    $("#winJBModal").modal("hide");
});

 // This onclick function takes the user input and runs our ajax call to Yandex's API to find a translation to english for it
 $("#wordSearchBtn").on("click", function () {
     event.preventDefault();
     $("#lookup").text("");
     var searchWord = $("#wordInput").val();
    //  var langCode = "es"
     queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + searchWord + "&lang=" + language + "-en";
     $.ajax({
         url: queryURL,
         type: "GET",
         dataType: "json",
     }).then(function (response) {
         if(response.text[0] !== searchWord){
         $("#lookup").append("<div> Translation: " + response.text[0] + "</div>")
         console.log(response.text[0])
         }
         else{
            $("#lookup").append("<div> No translation found for: " + searchWord + "</div>")
         }
     }).catch(function (response){
        $("#lookup").append("<div> No translation found </div>")
     })
 });