$(document).ready(function() {
    function hideLinks() {
        // USER DATA exists in localstorage
        if (localStorage.getItem("user") !== null) {
            $(".signuplink").addClass("hidden");
            $(".loginlink").addClass("hidden");
            $(".guestlink").addClass("hidden");
            $(".welcomemsg").removeClass("hidden");
            $(".logoutlink").removeClass("hidden");

            username = localStorage.getItem("user");
            $("#userInfo").text(username);
        }
        else {
            $(".welcomemsg").addClass("hidden");
            $(".logoutlink").addClass("hidden");
            $(".signuplink").removeClass("hidden");
            $(".loginlink").removeClass("hidden");            
            $(".guestlink").removeClass("hidden");
        }
    }

    hideLinks();

    $(".logoutlink").on("click", function()  {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
});