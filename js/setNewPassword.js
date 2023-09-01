const newPassword = document.querySelector('#new-password')
const newPasswordError = document.querySelector('.new-password-error')
const confrimPassword = document.querySelector('#confirm-password')
const confrimPasswordError = document.querySelector('.confirm-password-error')

document.querySelector('#set-new-password').addEventListener('submit', (e)=>{
    e.preventDefault()

    if(newPassword.value === '' || newPassword.value === null || newPassword.value === undefined){
        newPassword.style.border = "1px solid red"
        newPasswordError.innerHTML = "Please enter your new password"
        newPasswordError.style.color = "red"
    }

    newPassword.addEventListener('input', ()=>{
        newPassword.style.border = "1px solid white"
        newPasswordError.innerHTML = ""
        newPasswordError.style.color = "#000000"
    })

    if(confrimPassword.value === "" || confrimPassword.value === null || confrimPassword.value === undefined){
        confrimPassword.style.border = "1px solid red"
        confrimPasswordError.innerHTML = "Please confrim your password"
        confrimPasswordError.style.color = "red"
    }else if(confrimPassword.value !== newPassword.value){
        confrimPassword.style.border = "1px solid red"
        confrimPasswordError.innerHTML = "Passwords don't match"
        confrimPasswordError.style.color = "red"
    }

    confrimPassword.addEventListener('input', ()=>{
        confrimPassword.style.border = "1px solid white"
        confrimPasswordError.innerHTML = ""
        confrimPasswordError.style.color = "#000000"
    })

    // window.location.href = './login.html'
})