var starting = ["hello","kevin","crap","shit"];
// var starting = ["hello","kevin","crap","shit","lorem","libero","tortor","terminal","output","problems","french","package","wire","color"];
var boxWS = $("<div>").addClass("col-md-1 boxWS unoccupied wrong");
// console.log(boxWS);
// console.log(JSON.stringify(boxWS));
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

// console.log($(displArr[0][-2]));
var makeWordsSplit = function(wordArr){
    var wordSpli = [];
    for (var i=0;i<wordArr.length;i++){
    var spliArr = wordArr[i].split("");
    wordSpli.push(spliArr); };
    return wordSpli;  };

console.log(makeWordsSplit(starting));

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
    console.log(spawnSpot);
    console.log(direction);
    // console.log($(obj).text());
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

for (var i=0;i<makeWordsSplit(starting).length;i++){
    checkField(makeWordsSplit(starting)[i]);
    console.log("LOg", makeWordsSplit(starting).length);
}

var renderFiller = function(){
    for(var i=0;i<12;i++){
    for(var j=0;j<12;j++){
    if($(displArr[i][j]).hasClass("unoccupied")){
        $(displArr[i][j]).text("!!").removeClass("unoccupied")  };
};  };  };
renderFiller();

var currentGuess = []
$(document).on("click",".clicker", function(){
    currentGuess.push($(this).text());
    $(this).addClass("highlight");
    for (var i=0;i<makeWordsSplit(starting).length;i++){
        if(makeWordsSplit(starting)[i].toString() === currentGuess.toString()){
        $(".highlight").addClass("correct");
        currentGuess = [];
        }
    }
    console.log(currentGuess);
});

$(document).on("click",".wrong",function(){
    $(".highlight").removeClass("highlight");
    currentGuess = [];
})
// console.log(makeWordsSplit(starting)[0].toString());

// if($(".clicker") === $(".correct")){
//     console.log("You win!");
// };