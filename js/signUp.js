$(document).ready(function () {
    document.getElementById("signUpForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var names = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        $.ajax({
            url: "../backend/signUp.php",
            method: "POST",
            data: {
                name: names,
                email: email,
                password: password
            },
            success: function (response) {
                console.log(response)
            },

            error: function (error) {
                console.log("Error:", error)
            }

        })


    })

})