$(document).ready(function () {
    document.getElementById("profile").addEventListener("click", function () {

        $.ajax({
            url: "../backend/profile.php",
            method: "GET",
            dataType: 'json',
            success: function (response) {
                var names = response.names;
                var email = response.email;
                var password = response.password;
                var profile = document.getElementById("userAccountInfo");
                profile.innerHTML = `
                <p>Name: ${names}</p>
                <p>Email: ${email}</p>
                <p>Password: ${password}</p>
                `

                console.log(response)
            }
        })
    })

})