let email=document.getElementById("email")
let password=document.getElementById("pwd")
let logbtn=document.getElementById("logbtn") 

let getemail=localStorage.getItem("email")
let getpassword=localStorage.getItem("password")

logbtn.addEventListener("click",function(e){
    e.preventDefault();
     if(email.value ===""|| password.value===""){
        alert("Please fill the data")
     }else{
        if(getemail&&getemail.trim()===email.value.trim() && getpassword&&getpassword.trim()===password.value.trim()){
             setTimeout(() =>{
                 window.location = "index.html"

            },1000)
        }
        else{
            alert("Email or Password in wrong")
        }
     }
})




 
// function toggleForms() {
//     const loginForm = document.getElementById('active-form');
//     const registerForm = document.getElementById('hidden-form');

//     if (loginForm.style.display === "none") {
//         loginForm.style.display = "block";
//         registerForm.style.display = "none";
//     } else {
//         loginForm.style.display = "none";
//         registerForm.style.display = "block";
//     }
// }