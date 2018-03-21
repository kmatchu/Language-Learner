$(document).ready(function () {
    var loginForm = $("#loginInfo");
    var signupForm = $("#signupForm");

    /**
     * amie.js code
     */
    var loop = true;
    var easing = 'linear';
    var direction = 'alternate';
    anime({
        targets: '.ball',
        translateX: 235,
        translateY: 12.5,
        easing,
        loop,
        direction,
    })
    var ballTimeline = anime.timeline({
        loop,
        direction
    })
    var bar2Timeline = anime.timeline({
        loop,
        direction
    })
    var bar1Timeline = anime.timeline({
        loop,
        direction
    })
    ballTimeline
        .add({
            targets: '.ball',
            translateY: 10,
            translateX: 235,
            easing
        }).add({
            targets: '.ball',
            translateY: 0,
            translateX: 0,
            easing
        }).add({
            targets: '.ball',
            translateY: '-10',
            translateX: 235,
            easing
        })
    bar2Timeline
        .add({
            targets: '.bar2',
            translateY: 10,
            easing,
        }).add({
            targets: '.bar2',
            translateY: 0,
            easing,
        }).add({
            targets: '.bar2',
            translateY: '-10',
            easing,
        })
    bar1Timeline
        .add({
            targets: '.bar1',
            translateY: '-10',
            easing,
        }).add({
            targets: '.bar1',
            translateY: 0,
            easing,
        }).add({
            targets: '.bar1',
            translateY: 10,
            easing,
        })

    $(loginForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        console.log("in login");
        let usernameInput = $("#loginusername");
        // var emailInput = $("#email");
        let passwordInput = $("#loginpassword");

        // Wont submit the post if we are missing any fields
        if (!usernameInput.val().trim() || !passwordInput.val().trim()) {
            $("#loginerror").text("Please fill in all fields.");
            return;
        }

        var newLogin = {
            username: usernameInput.val().trim(),
            password: passwordInput.val()
        };

        findUser(newLogin);
    });

    $(signupForm).on("submit", function handleSignup(event) {
        event.preventDefault();
        console.log("in submit");
        let usernameInput = $("#suusername");
        let emailInput = $("#suemail");
        let passwordInput = $("#supwd");
        let rptPwdInput = $("#supwdrpt");

        if (!usernameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
            $("#supwdrpterr").text("Please fill in all fields.");
            return;
        }
        else {
            if (passwordInput.val().trim() !== rptPwdInput.val().trim()) {
                $("#supwdrpterr").text("Passwords don't match");
                return;
            }
            else {
                // Checks if username already exists and if it does, returns an error to user
                // else continues with creation of user account in database
                $.get("/api/login/").then(
                    function (data) {
                        let found = false;

                        for (let i = 0; i < data.length; i++) {
                            if (data[i].username === usernameInput.val().trim()) {
                                found = true;
                            }
                        }

                        if (found) {
                            $("#sunamerr").text("Username already exists. Please choose another one");
                            return;
                        }
                        else {
                            // Constructing a newLogin object to hand to the database
                            var newLogin = {
                                email: emailInput.val().trim(),
                                username: usernameInput.val().trim(),
                                password: passwordInput.val(),
                                progress: "1;5%;0;0;0;"
                            };

                            submitPost(newLogin);
                        }
                    }
                )
            }
        }
    });

    // Submits a new post
    function submitPost(Login) {
        $.post("/api/login/", Login, function (data) {
            $("#userInfo").text(Login.username);
            $("#signupModal").modal("hide");
            $("#suusername").val("");
            $("#suemail").val("");
            $("#supwd").val("");
            $("#supwdrpt").val("");

            $("#sunamerr").text("");
            $("#suemailerr").text("");
            $("#supwdrpterr").text("");
            localStorage.setItem("user", Login.username);
            localStorage.setItem("progress", Login.progress);
            window.location.href = "/home";

        });
    };

    $(".guestlink").on("click", function () {
        localStorage.setItem("user", "guest");
        localStorage.setItem("progress", "1;5%;0;0;0");
        // currentLevel;progresspercent;hangmanwins;jumblewins;wordsearchwins
        window.location.href = "/home";
    });

    function findUser(Login) {
        $.get("/api/login/").then(function (data) {
            let found = false;
            let guess = false;
            let prog = "";

            for (var i = 0; i < data.length; i++) {
                if (data[i].username === Login.username) {

                    found = true;
                    if (data[i].password !== Login.password) {
                        $("#loginerror").text("Wrong password");
                        return;
                    }
                    else {
                        guess = true;
                        prog = data[i].progress;
                        break;
                    }

                }
            }
            if (found && guess) {
                console.log("Found");
                $("#userInfo").text(Login.username);
                localStorage.setItem("user", Login.username);
                localStorage.setItem("progress", prog);
                $("#loginModal").modal("hide");
                $("#loginusername").val("");
                $("#loginpassword").val("");
                $("#loginerror").text("");
                window.location.href = "/home";
            }
            else {
                $("#loginerror").text("Username doesn't match anyone in our database");
            }
        });
    }


});