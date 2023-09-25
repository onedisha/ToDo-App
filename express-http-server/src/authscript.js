const loginForm = document.querySelector("#login-form");
const modeChange = document.querySelector("#mode-change-auth");
const body = document.body;

modeChange.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const img = document.querySelector("#mode-img");
    if(img.title == "dark-mode"){
        console.log(img.src);
        img.src="images/sun.png";
        img.title= "light-mode";
    }
    else{
        img.src= "images/moon.png";
        img.title= "dark-mode";
    } 
})

function createForm(){
    const details = 
    `
    <p class="form-column hide" id="f-name">First Name: </p>
    <input class="form-input hide" id="first-name" type="text" name="firstname">
    <br>
    <p class="form-column hide" id="l-name">Last Name: </p>
    <input class="form-input hide" id="last-name" type="text" name="lastname">
    <br>        
    <p class="form-column" id="email">Email: </p>
    <input class="form-input" id="e-mail" type="text" name="e-mail">
    <br>
    <p class="form-column" id="p-word">Password: </p>
    <input class="form-input" id="pass-word" type="password" name="password">
    <br>
    <br>
    <button id="login-btn">Login</button>
    <button class="hide" id="signup-btn">Signup</button>
    <br><br>
    <button class="form-btn" id="new-account-btn">Create a new account?</button>
    <button class="form-btn hide" id="alr-account-btn">Already have an account?</button>
    <br>
    <button class="form-btn" id="forgot-pw-btn">Forgot Password?</button>
    `
    loginForm.innerHTML = details;
}

createForm();

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const fName = document.querySelector("#f-name");
const lName = document.querySelector("#l-name");
const eMail = document.querySelector("#e-mail");
const passWord = document.querySelector("#pass-word");
const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");
const newAccountBtn = document.querySelector("#new-account-btn");
const alrAccountBtn = document.querySelector("#alr-account-btn");
const forgotPwBtn = document.querySelector("#forgot-pw-btn");

newAccountBtn.addEventListener("click",() => {
    firstName.classList.toggle("hide");
    lastName.classList.toggle("hide");
    fName.classList.toggle("hide");
    lName.classList.toggle("hide");
    loginBtn.classList.toggle("hide");
    signupBtn.classList.toggle("hide");
    newAccountBtn.classList.toggle("hide");
    alrAccountBtn.classList.toggle("hide");  
    forgotPwBtn.classList.toggle("hide");
});

alrAccountBtn.addEventListener("click",() => {
    firstName.classList.toggle("hide");
    lastName.classList.toggle("hide");
    fName.classList.toggle("hide");
    lName.classList.toggle("hide");
    loginBtn.classList.toggle("hide");
    signupBtn.classList.toggle("hide");
    newAccountBtn.classList.toggle("hide");
    alrAccountBtn.classList.toggle("hide"); 
    forgotPwBtn.classList.toggle("hide");
});

function signup(){
    const firstname = firstName.value;
    const lastname = lastName.value;
    const email = eMail.value;
    const password = passWord.value;
    fetch('/signup', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstname, lastname, email, password})
    })
    .then(res => res.json())
    .then(d => {
        window.location.replace('/');
        console.log(d);
;    })
    .catch(err => alert(`unknown error: ${err}`)) 
}

function login(){
    const email = eMail.value;
    const password = passWord.value;
    fetch('/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(d => {
        window.location.replace('/');
        console.log(d);
    })
    .catch(err => console.error(`unknown error: ${err}`))
}

signupBtn.addEventListener("click", signup);
loginBtn.addEventListener("click", login);