const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

const firstNameError = document.querySelector('.first-name-error')
const lastNameError = document.querySelector('.last-name-error')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')

document.querySelector('#sign-up-form').addEventListener('submit', (e)=>{
    e.preventDefault()

    //data sanitization
    if(firstName.value === '' || firstName.value === null || firstName.value === undefined){
        firstName.style.border = "1px solid red"
        firstNameError.innerHTML = "Please enter your first name"
        firstNameError.style.color = "red"
    }

    firstName.addEventListener('input', ()=>{
        firstName.style.border = "1px solid white"
        firstNameError.innerHTML = ""
        firstNameError.style.color = "#000000"
    })

    if(lastName.value === '' || lastName.value === null || lastName === undefined){
        lastName.style.border = "1px solid red"
        lastNameError.innerHTML = "Please enter your last name"
        firstNameError.style.color = "red"
    }

    lastName.addEventListener('input', ()=>{
        lastName.style.border = "1px solid white"
        lastNameError.innerHTML = ""
        lastNameError.style.color = "#000000"
    })

    if(email.value === '' || email.value === null || email.value === undefined){
        email.style.border = "1px solid red"
        emailError.innerHTML = "Please enter your email address"
        emailError.style.color = "red"
    }

    email.addEventListener('input', ()=>{
        email.style.border = "1px solid white"
        emailError.innerHTML = ""
        emailError.style.color = "#000000"
    })

    if(password.value === '' || password.value === null || password.value === undefined){
        password.style.border = "1px solid red"
        passwordError.innerHTML = "Please enter your password"
        passwordError.style.color = "red"
    }

    password.addEventListener('input', ()=>{
        password.style.border = "1px solid white"
        passwordError.innerHTML = ""
        passwordError.style.color = "#000000"
    })

    window.location.href = './login.html'
})