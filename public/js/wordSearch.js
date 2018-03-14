var checkArr = sessionStorage.getItem("wordArr").split(",")
var useArr = [];
for(var i=0;i<checkArr.length;i++){
    if(checkArr[i].length<7){
        useArr.push(checkArr[i]);
    };
};

if(useArr.length>6){
    useArr = useArr.splice(0,6);
};

var langCode = sessionStorage.getItem("lang");
console.log(useArr);

var boxWS = $("<div>").addClass("boxWS unoccupied wrong");


var runAjax = function(counter){
    queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + useArr[counter] + "&lang=" + langCode + "-en";
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json",
    }).then(function (response) {
        if (response.text[0] !== useArr[counter]) {
            $(".word" + counter).attr("title", response.text[0]);
            $(".word" + counter).css( 'cursor', 'help' )
        }
        else {
            $(".word" + counter).attr("title", "Hint unavailable")
            $(".word" + counter).css( 'cursor', 'help' )
        };
}).done($('[data-toggle="tooltip"]').tooltip());
};

for(var i=0;i<useArr.length;i++){
    $(".word" + i).text(useArr[i]);
    runAjax(i);
};


var displArr = [
    [$(boxWS).clone().addClass("topleft"),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone().addClass("topright")],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone().addClass("bottomleft"),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone().addClass("bottomright")]
];

var makeWordsSplit = function(wordArr){
    var wordSpli = [];
    for (var i=0;i<wordArr.length;i++){
    var spliArr = wordArr[i].split("");
    wordSpli.push(spliArr); };
    return wordSpli;  };

var renderGrid = function(){
    for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
    $(".boxy" + i).append(displArr[i][j]);  };
};  };

renderGrid();
var spawn = function(){
var rand1 = Math.floor(Math.random()*8);
var rand2 = Math.floor(Math.random()*8);
return [rand1,rand2];  };

var randDirection = function(){
    var value = Math.floor(Math.random()*4);
    if(value === 3){    return "left"}
    else if (value === 2){  return "right"}
    else if (value === 1){  return "up"}
    else{   return "down"}
}

var checkField = function(inputWordArr){
    var spawnSpot = spawn();
    var direction = randDirection();
    var empty = true;
  
    switch (direction){
        case "left":
        if((spawnSpot[1]-inputWordArr.length)<0){
            checkField(inputWordArr);
        }
        else{
        for (var i=0;i<inputWordArr.length;i++){
            if(!($(displArr[spawnSpot[0]][spawnSpot[1]-i]).hasClass("unoccupied"))){
                console.log("Occupied");
                empty = false;
            };
        };
        if(empty){
            for (var i=0;i<inputWordArr.length;i++){
            $(displArr[spawnSpot[0]][spawnSpot[1]-i]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")    };
        }
        else{
            empty = true;
            checkField(inputWordArr)};  };
        break;

        case "right":
        if((spawnSpot[1]+inputWordArr.length)>7){
            checkField(inputWordArr);
        }
        else{
        for (var i=0;i<inputWordArr.length;i++){
            if(!($(displArr[spawnSpot[0]][spawnSpot[1]+i]).hasClass("unoccupied"))){
                console.log("Occupied");
                empty = false;
            };
        };
            if(empty){
                for (var i=0;i<inputWordArr.length;i++){
                $(displArr[spawnSpot[0]][spawnSpot[1]+i]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")    };
            }
            else{
                empty = true;
                checkField(inputWordArr)};  };
        break;

        case "up":
        if((spawnSpot[0]-inputWordArr.length)<0){
            checkField(inputWordArr);
        }
        else{
        for (var i=0;i<inputWordArr.length;i++){
            if(!($(displArr[spawnSpot[0]-i][spawnSpot[1]]).hasClass("unoccupied"))){
                console.log("Occupied");
                empty = false;
            };
        };
            if(empty){
                for (var i=0;i<inputWordArr.length;i++){
                $(displArr[spawnSpot[0]-i][spawnSpot[1]]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")    };
            }
            else{
                empty = true;
                checkField(inputWordArr)};  };
        break;

        case "down":
        if((spawnSpot[0]+inputWordArr.length)>7){
            checkField(inputWordArr);
        }
        else{
        for (var i=0;i<inputWordArr.length;i++){
            if(!($(displArr[spawnSpot[0]+i][spawnSpot[1]]).hasClass("unoccupied"))){
                console.log("Occupied");
                empty = false;
            };
        };
            if(empty){
                for (var i=0;i<inputWordArr.length;i++){
                $(displArr[spawnSpot[0]+i][spawnSpot[1]]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")    };
            }
            else{
                empty = true;
                checkField(inputWordArr)};  };
        break;
        
        default:
            console.log("error");
    }

};


for (var i=0;i<makeWordsSplit(useArr).length;i++){
    checkField(makeWordsSplit(useArr)[i]);  }

var renderFiller = function(){
    for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
    if($(displArr[i][j]).hasClass("unoccupied")){
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        var letter = alphabet[Math.floor(Math.random()*26)];
        $(displArr[i][j]).text(letter).removeClass("unoccupied");  };
};  };  };
renderFiller();

var currentGuess = []
var displayArray = []

$(document).on("click",".clicker", function(){
    currentGuess.push($(this).text());
    $(this).addClass("highlight");
    for (var i=0;i<makeWordsSplit(useArr).length;i++){
        if(makeWordsSplit(useArr)[i].toString() === currentGuess.toString()){
        $(".highlight").addClass("correct").removeClass("clicker").removeClass("highlight");
        $(".word" + i ).addClass("greenText").text(currentGuess.toString().replace(/,/g,"")).removeClass("fadedText");
        // displayArray.push(currentGuess.toString().replace(/,/g,""));
        // $(".foundWords").text(displayArray.toString());
        currentGuess = [];
        if(!$(".clicker").length){
            $("#winWSModal").modal("show");;
        };
        }
    }
});

$(document).on("click","#modalWSClose",function(){
    $("#winWSModal").modal("hide");
});

$(document).on("click",".wrong",function(){
    $(".highlight").removeClass("highlight").addClass("flashWrong");
    currentGuess = [];
    setTimeout(function(){$(".flashWrong").removeClass("flashWrong");},250);
})

$(document).on("click",".highlight",function(){
    $(".highlight").removeClass("highlight").addClass("flashWrong");
    currentGuess = [];
    setTimeout(function(){$(".flashWrong").removeClass("flashWrong");},250);
})

