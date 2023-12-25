"use strict"
let name = document.querySelector(".name");
let email = document.querySelector(".email");
let pass = document.querySelector(".pass");
const login = document.querySelector("#login");
const reg = document.querySelector("#Register");
const logout = document.querySelector("#logout");
let usersList = JSON.parse(localStorage.getItem("users")) || [];

if (login) {
    login.addEventListener('click', () => {
        loginUser();
    })
}
if (reg) {
    reg.addEventListener('click', () => {
        regUser();
    })

}
if (logout) {
    logout.addEventListener('click', () => {
        userLogout();
    })


}
document.addEventListener("DOMContentLoaded", () => { welcome(); });

function regUser() {
    let user = {
        name: name.value,
        email: email.value,
        pass: pass.value,
    }
 
    if (user.pass === "" || user.name === "" || user.email === "") {
        document.querySelector("#regValidate").innerHTML = `<span id="regValidate" class="text-danger fw-bolder">All inputs are required</span>`;
        document.querySelector("#emailExist").classList.replace("d-block", "d-none");
        document.querySelector("#emailInvalid").classList.replace("d-block", "d-none");
        return;
    }

    if (!emailvalidation()) {
        document.querySelector("#regValidate").classList.replace("d-block", "d-none")
        document.querySelector("#emailInvalid").classList.replace("d-none", "d-block");
        document.querySelector("#emailExist").classList.replace("d-block", "d-none");
        return;
    }
    if (emailexist(user.email, usersList)) {
        document.querySelector("#emailExist").classList.replace("d-none", "d-block");
        document.querySelector("#emailInvalid").classList.replace("d-block", "d-none");
        return;
    }
    document.querySelector("#regValidate").classList.replace("d-none", "d-block")

    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    document.querySelector("#emailExist").classList.replace("d-block", "d-none");
    document.querySelector("#emailInvalid").classList.replace("d-block", "d-none");
    document.querySelector("#regValidate").innerHTML = `Success.. Go to the login page to login`;
    clearForm();
}





function emailexist(email) {
    for (let i = 0; i < usersList.length; i++) {
        const element = usersList[i];
        if (element.email.toLowerCase() == email.toLowerCase())
            return true;

    }
}
function loginUser() {
    let user = {
        email: email.value,
        pass: pass.value
    }
    for (let i = 0; i < usersList.length; i++) {
        const element = usersList[i];

        if (emailexist(user.email) && element.pass === user.pass) {
            localStorage.setItem("nameOfUser", element.name);
            goToWelcome();

        }
        else if (user.email == "" || user.pass == "") {
            document.querySelector("#loginCheck").innerHTML = `All inputs req.`

        }
        else {
            document.querySelector("#loginCheck").innerHTML = `invalid email or pass`


        }

    }
}
function goToWelcome() {
    login.innerHTML = window.location.assign("./welcome.html");

}

function welcome() {
    if (window.location.pathname.includes("welcome.html")) {
        let username = localStorage.getItem("nameOfUser");
        if (username) {
            document.getElementById("welcomeBorder").innerHTML = "Welcome " + username;
        }
    }
}

function userLogout() {
    login.innerHTML = window.location.assign("./index.html");
    localStorage.removeItem("nameOfUser");
}

function emailvalidation() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = regex.test(email.value);

    return isValid;

}
function clearForm(){
    name.value="";
    pass.value="";
    email.value="";
    }