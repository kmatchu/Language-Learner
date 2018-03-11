$(document).ready(function () {
    var loginForm = $("#loginInfo");

    // $(".item").on("click", function() {
    //     $(".carousel").carousel("pause");
    // });

    function hideLinks() {
        // USER DATA exists in localstorage
        if (localStorage.getItem("user") !== null) {
            $(".signuplink").addClass("hidden");
            $(".loginlink").addClass("hidden");
            $(".guestlink").addClass("hidden");
            $(".welcomemsg").removeClass("hidden");

            username = localStorage.getItem("user");
            $("#userInfo").text(username);
        }
        else {
            $(".welcomemsg").addClass("hidden");
            $(".signuplink").removeClass("hidden");
            $(".loginlink").removeClass("hidden");
            $(".guestlink").removeClass("hidden");
        }   
    }

    hideLinks();

    $(".loginSubmit").on("click", function handleFormSubmit(event) {
        event.preventDefault();
        var usernameInput = $("#loginusername");
        // var emailInput = $("#email");
        var passwordInput = $("#loginpassword");
        var loggedUser;

        // Wont submit the post if we are missing any fields
        if (!usernameInput.val().trim() || !passwordInput.val().trim()) {
             $("#loginerror").text("please fill in all fields");
            return;
        }
        // Constructing a newLogin object to hand to the database
        var newLogin = {
            // email: emailInput.val().trim(),
            // email: "codi@codi.com",
            username: usernameInput.val().trim(),
            password: passwordInput.val()
        };

        console.log(newLogin);
        // submitPost(newLogin);
        findUser(newLogin);
    });

    // Submits a new post
    // function submitPost(Login) {
    //     $.post("/api/home/", Login, function () {
    //     });
    // }

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
                    window.location.href = "home.html";
                }
            }

        });
    };

});