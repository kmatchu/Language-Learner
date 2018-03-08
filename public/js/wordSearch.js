var useArr = sessionStorage.getItem("wordArr").split(",");
console.log(useArr);
var boxWS = $("<div>").addClass("col-md-1 boxWS unoccupied wrong");

var displArr = [
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()],
    [$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone(),$(boxWS).clone()]
];

var makeWordsSplit = function(wordArr){
    var wordSpli = [];
    for (var i=0;i<wordArr.length;i++){
    var spliArr = wordArr[i].split("");
    wordSpli.push(spliArr); };
    return wordSpli;  };

var renderGrid = function(){
    for(var i=0;i<12;i++){
    for(var j=0;j<12;j++){
    $(".boxy" + i).append(displArr[i][j]);  };
};  };

renderGrid();
var spawn = function(){
var rand1 = Math.floor(Math.random()*12);
var rand2 = Math.floor(Math.random()*12);
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
        if((spawnSpot[1]+inputWordArr.length)>11){
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
        if((spawnSpot[0]+inputWordArr.length)>11){
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
    for(var i=0;i<12;i++){
    for(var j=0;j<12;j++){
    if($(displArr[i][j]).hasClass("unoccupied")){
        $(displArr[i][j]).text("!!").removeClass("unoccupied")  };
};  };  };
renderFiller();

var currentGuess = []
var displayArray = []

$(document).on("click",".clicker", function(){
    currentGuess.push($(this).text());
    $(this).addClass("highlight");
    for (var i=0;i<makeWordsSplit(useArr).length;i++){
        if(makeWordsSplit(useArr)[i].toString() === currentGuess.toString()){
        $(".highlight").addClass("correct");
        displayArray.push(currentGuess.toString().replace(/,/g,""));
        $(".foundWords").text(displayArray.toString());
        currentGuess = [];
        }
    }
});

$(document).on("click",".wrong",function(){
    $(".highlight").removeClass("highlight");
    currentGuess = [];
})

$(document).on("click",".highlight",function(){
    $(".highlight").removeClass("highlight");
    currentGuess = [];
})

// if($(".clicker") === $(".correct")){
//     console.log("You win!");
// };