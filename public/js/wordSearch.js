let useArr = [];
const getWords = function () {
    let checkArr = sessionStorage.getItem("wordArr").split(",")

    for (var i = 0; i < checkArr.length; i++) {
        if (checkArr[i].length < 7) {
            useArr.push(checkArr[i]);
        };
    };

    if (useArr.length > 6) {
        useArr = useArr.splice(0, 6);
    };
    console.log(useArr);
};
getWords();

const setWordKey = function () {
    let runAjax = function (counter) {
        queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180305T185504Z.d82e099867176c62.926d780dfe710515cb00f16a16c48bd887c06819&%20&text=" + useArr[counter] + "&lang=" + sessionStorage.getItem("lang") + "-en";
        $.ajax({
            url: queryURL,
            type: "GET",
            dataType: "json",
        }).then(function (response) {
            if (response.text[0] !== useArr[counter]) {
                $(".word" + counter).attr("title", response.text[0]);
                $(".word" + counter).css('cursor', 'help')
            }
            else {
                $(".word" + counter).attr("title", "Hint unavailable")
                $(".word" + counter).css('cursor', 'help')
            };
        }).done($('[data-toggle="tooltip"]').tooltip());
    };

    for (var i = 0; i < useArr.length; i++) {
        $(".word" + i).text(useArr[i]);
        runAjax(i);
    };
}
setWordKey();

let displArr = [];
let makeGrid = function () {
    let boxWS = $("<div>").addClass("boxWS unoccupied wrong");
    displArr = [
        [$(boxWS).clone().addClass("topleft"), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone().addClass("topright")],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone()],
        [$(boxWS).clone().addClass("bottomleft"), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone(), $(boxWS).clone().addClass("bottomright")]
    ];

    const renderGrid = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                $(".boxy" + i).append(displArr[i][j]);
            };
        };
    };
    renderGrid();
};
makeGrid();

const makeWordsSplit = function (wordArr) {
    let wordSpli = [];
    for (var i = 0; i < wordArr.length; i++) {
        var spliArr = wordArr[i].split("");
        wordSpli.push(spliArr);
    };
    return wordSpli;
};

const spawn = function () {
    var rand1 = Math.floor(Math.random() * 8);
    var rand2 = Math.floor(Math.random() * 8);
    return [rand1, rand2];
};

const randDirection = function () {
    var value = Math.floor(Math.random() * 4);
    if (value === 3) { return "left" }
    else if (value === 2) { return "right" }
    else if (value === 1) { return "up" }
    else { return "down" }
}

const checkField = function (inputWordArr) {
    var spawnSpot = spawn();
    var direction = randDirection();
    var empty = true;

    switch (direction) {
        case "left":
            if ((spawnSpot[1] - inputWordArr.length) < 0) {
                checkField(inputWordArr);
            }
            else {
                for (var i = 0; i < inputWordArr.length; i++) {
                    if (!($(displArr[spawnSpot[0]][spawnSpot[1] - i]).hasClass("unoccupied"))) {
                        console.log("Occupied");
                        empty = false;
                    };
                };
                if (empty) {
                    for (var i = 0; i < inputWordArr.length; i++) {
                        $(displArr[spawnSpot[0]][spawnSpot[1] - i]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")
                    };
                }
                else {
                    empty = true;
                    checkField(inputWordArr)
                };
            };
            break;

        case "right":
            if ((spawnSpot[1] + inputWordArr.length) > 7) {
                checkField(inputWordArr);
            }
            else {
                for (var i = 0; i < inputWordArr.length; i++) {
                    if (!($(displArr[spawnSpot[0]][spawnSpot[1] + i]).hasClass("unoccupied"))) {
                        console.log("Occupied");
                        empty = false;
                    };
                };
                if (empty) {
                    for (var i = 0; i < inputWordArr.length; i++) {
                        $(displArr[spawnSpot[0]][spawnSpot[1] + i]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")
                    };
                }
                else {
                    empty = true;
                    checkField(inputWordArr)
                };
            };
            break;

        case "up":
            if ((spawnSpot[0] - inputWordArr.length) < 0) {
                checkField(inputWordArr);
            }
            else {
                for (var i = 0; i < inputWordArr.length; i++) {
                    if (!($(displArr[spawnSpot[0] - i][spawnSpot[1]]).hasClass("unoccupied"))) {
                        console.log("Occupied");
                        empty = false;
                    };
                };
                if (empty) {
                    for (var i = 0; i < inputWordArr.length; i++) {
                        $(displArr[spawnSpot[0] - i][spawnSpot[1]]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")
                    };
                }
                else {
                    empty = true;
                    checkField(inputWordArr)
                };
            };
            break;

        case "down":
            if ((spawnSpot[0] + inputWordArr.length) > 7) {
                checkField(inputWordArr);
            }
            else {
                for (var i = 0; i < inputWordArr.length; i++) {
                    if (!($(displArr[spawnSpot[0] + i][spawnSpot[1]]).hasClass("unoccupied"))) {
                        console.log("Occupied");
                        empty = false;
                    };
                };
                if (empty) {
                    for (var i = 0; i < inputWordArr.length; i++) {
                        $(displArr[spawnSpot[0] + i][spawnSpot[1]]).text(inputWordArr[i]).removeClass("unoccupied wrong").addClass("clicker")
                    };
                }
                else {
                    empty = true;
                    checkField(inputWordArr)
                };
            };
            break;

        default:
            console.log("error");
    }

};


for (var i = 0; i < makeWordsSplit(useArr).length; i++) {
    checkField(makeWordsSplit(useArr)[i]);
}

const renderFiller = function () {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ($(displArr[i][j]).hasClass("unoccupied")) {
                var alphabet = "abcdefghijklmnopqrstuvwxyz";
                var letter = alphabet[Math.floor(Math.random() * 26)];
                $(displArr[i][j]).text(letter).removeClass("unoccupied").addClass("wrong");
            };
        };
    };
};
renderFiller();

var currentGuess = [];

$(document).on("click", ".clicker", function () {
    currentGuess.push($(this).text());
    $(this).addClass("highlight");
    for (var i = 0; i < makeWordsSplit(useArr).length; i++) {
        if (makeWordsSplit(useArr)[i].toString() === currentGuess.toString()) {
            $(".highlight").addClass("wscorrect").removeClass("clicker").removeClass("highlight");
            $(".word" + i).addClass("greenText").text(currentGuess.toString().replace(/,/g, "")).removeClass("fadedText");
            currentGuess = [];
            if (!$(".clicker").length) {
                $("#winModal").modal("show");;
            };
        }
    }
});

$(document).on("click", "#modalWSClose", function () {
    $("#winModal").modal("hide");
});

$(document).on("click", ".wrong", function () {
    $(this).addClass("highlight");
    $(".highlight").removeClass("highlight").addClass("flashWrong");
    currentGuess = [];
    setTimeout(function () { $(".flashWrong").removeClass("flashWrong"); }, 250);
})

$(document).on("click", ".highlight", function () {
    $(".highlight").removeClass("highlight").addClass("flashWrong");
    currentGuess = [];
    setTimeout(function () { $(".flashWrong").removeClass("flashWrong"); }, 250);
})


$(document).ready(function () {
    $(".returnHomeBtn").on("click", function () {
        console.log("click");
        window.location.href = "home.html";
    });

    $(".playAgainBtn").on("click", function () {
        console.log("click");
        var language = sessionStorage.getItem("lang");
        var difficulty = sessionStorage.getItem("diff");
        var urlLang;
        switch (language){
            case "fr":
            urlLang = "french";
            break;

            case "es":
            urlLang = "spanish";
            break;

            case "it":
            urlLang = "italian"
            break;

            case "de":
            urlLang = "german";
            break;

            default:
            console.log("Error");
        }
   

        $.get("api/" + urlLang + "/" + difficulty, function (data) {
            var positionArr = [];
            var wordArr = [];
            for (var i = 0; i < 10; i++) {
                var spot = Math.floor(Math.random() * Math.floor(100));
                if(positionArr.indexOf(spot)!==-1){
                    i--;
                }
                else{
                    positionArr[i] = spot;
                };

                // console.log(positionArr)
            };
            for (var i = 0; i < 10; i++) {
                wordArr[i] = data[positionArr[i]].Word
            };
            sessionStorage.setItem("wordArr", wordArr);
        }).done(function () {
            window.location.reload(true);
        })
    })
});