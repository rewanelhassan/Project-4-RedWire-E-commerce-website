let firstname = document.getElementById("fname");
let lastname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("pwd");
let regbtn = document.getElementById("regbtn");
 

regbtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        firstname.value === "" ||
        lastname.value === "" ||
        email.value === "" ||
        password.value === ""
    ) {
        alert("Please fill the data!!");
    } else {
        localStorage.setItem("firstname", firstname.value);
        localStorage.setItem("lastname", lastname.value);
        localStorage.setItem("username", firstname.value + lastname.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
         alert("Account created successfully!");

        setTimeout(() => {
            window.location = "login.html";
        }, 1500);
    }
});