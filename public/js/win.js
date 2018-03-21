var progress = localStorage.getItem("progress");
var user = localStorage.getItem("user");
    
    const won = function (game, difficulty) {
        let progress = localStorage.getItem("progress");
        // currentLevel;progresspercent;hangmanwins;jumblewins;wordsearchwins

        const EASY_WIN = 5;
        const MEDIUM_WIN = 10;
        const HARD_WIN = 15;

        let currentLevel = parseInt(progress.split(";")[0]);
        let percent = parseInt(progress.split(";")[1].split("%"));
        let hangmanWins = parseInt(progress.split(";")[2]);
        let jumbleWins = parseInt(progress.split(";")[3]);
        let wordsearchWins = parseInt(progress.split(";")[4]);

        let newProg = "";

        if(game === "hangman") {
            hangmanWins++;
        }
        if(game === "jumble") {
            jumbleWins++;
        }
        if(game === "wordsearch") {
            wordsearchWins++;
        }

        if(difficulty === "easy") {
            if(percent + EASY_WIN > 100) {
                currentLevel++;
                let nextLevel = currentLevel + 1;
                $("#currentLevel").text(currentLevel);
                $("#nextLevel").text(nextLevel);
                percent = (percent + EASY_WIN) - 100;
                percent = percent + "%";
            }
            else {
                percent = percent + EASY_WIN;
                percent = percent + "%";
            }
        }
        if(difficulty === "medium") {
            if(percent + MEDIUM_WIN > 100) {
                currentLevel++;                
                let nextLevel = currentLevel + 1;
                $("#currentLevel").text(currentLevel);
                $("#nextLevel").text(nextLevel);
                percent = (percent + MEDIUM_WIN) - 100;
                percent = percent + "%";
            }
            else {
                percent = percent + MEDIUM_WIN;
                percent = percent + "%";
            }
        }
        if(difficulty === "hard") {
            if(percent + HARD_WIN > 100) {
                currentLevel++;                
                let nextLevel = currentLevel + 1;
                $("#currentLevel").text(currentLevel);
                $("#nextLevel").text(nextLevel);
                percent = (percent + HARD_WIN) - 100;
                percent = percent + "%";
            }
            else {
                percent = percent + HARD_WIN;
                percent = percent + "%";
            }
        }

        newProg = currentLevel + ";" + percent + ";" + hangmanWins + ";" + jumbleWins + ";" + wordsearchWins;
        console.log("newprog, ", newProg);
        localStorage.setItem("progress", newProg);

        if(user !== "guest") {
            let login = {
                username: user,
                progress: newProg
            }
            $.post("/api/update", login, function(data) {
                console.log("got here");

            })
        }

        updateProgress();
    }
