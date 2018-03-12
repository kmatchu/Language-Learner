$(document).ready(function () {
    var loginForm = $("#loginInfo");
    var signupForm = $("#signupForm");

    // $(".item").on("click", function() {
    //     $(".carousel").carousel("pause");
    // });

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

        console.log(newLogin);
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
            console.log("entered");
            $("#supwdrpterr").text("Please fill in all fields.");
            return;
        }
        else {
            if (passwordInput.val().trim() !== rptPwdInput.val().trim()) {
                $("#supwdrpterr").text("Passwords don't match");
                return;
            }
            else {
                // Constructing a newLogin object to hand to the database
                var newLogin = {
                    email: emailInput.val().trim(),
                    username: usernameInput.val().trim(),
                    password: passwordInput.val()
                };

                submitPost(newLogin);
            }
        }
    });

    // Submits a new post
    function submitPost(Login) {
        $.post("/api/login/", Login, function(data) {
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
            window.location.href = "home.html";

        });
    };

    $(".guestlink").on("click", function() {
        localStorage.setItem("user", "guest");
        window.location.href = "home.html";
    });

    function findUser(Login) {
        $.get("/api/login/", Login, function (data) {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].username !== Login.username)) {
                    $("#loginerror").text("Username doesn't match anyone in our database");
                }
                else if ((data[i].password !== Login.password)) {
                    $("#loginerror").text("Wrong password");
                }
                // else ((data[i].username === Login.username) && (data[i].password === Login.password)) {
                else {
                    console.log("Found");
                    $("#userInfo").text(Login.username);
                    $("#loginModal").modal("hide");
                    $("#loginusername").val("");
                    $("#loginpassword").val("");
                    $("#loginerror").text("");
                    localStorage.setItem("user", Login.username);
                    window.location.href = "/home";
                }
            }

        });
    };

});