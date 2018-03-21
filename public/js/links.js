var progress = localStorage.getItem("progress");

// set progress bar
const updateProgress = () => {
    if (progress) {
        let currentLevel = parseInt(progress.split(";")[0]);
        let percent = progress.split(";")[1];
        let nextLevel = currentLevel + 1;
        $(".progress").width(percent);
        $("#currentLevel").text(currentLevel);
        $("#nextLevel").text(nextLevel);
    }
}

$(document).ready(function () {

    updateProgress();

    $("#logo").on("click", function () {
        console.log("clicked");
        if (localStorage.getItem("user") !== null) {
            window.location.href = "/home";
        }
        else {
            window.location.href = "/";
        }
    });

    function hideLinks() {
        // USER DATA exists in localstorage
        if (localStorage.getItem("user") !== null) {
            $(".signuplink").addClass("hidden");
            $(".welcomemsg").removeClass("hidden");
            $(".logoutlink").removeClass("hidden");

            username = localStorage.getItem("user");
            $("#userInfo").text(username);
        }
        else {
            $(".welcomemsg").addClass("hidden");
            $(".logoutlink").addClass("hidden");
            $(".signuplink").removeClass("hidden");
        }
    }

    hideLinks();

    $(".logoutlink").on("click", function () {
        let user = localStorage.getItem("user");
        localStorage.removeItem("user");
        if(user !== "guest") {
            localStorage.removeItem("progress");
        }
        window.location.href = "/";
    });
});