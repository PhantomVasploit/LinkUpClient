const email = document.querySelector('#email')
const emailError = document.querySelector('.email-error')

document.querySelector('#forgot-password-form').addEventListener('submit', (e)=>{    
    e.preventDefault()

    if(email.value === '' || email.value === null || email.value === undefined){
        email.style.border = "1px solid red"
        emailError.innerHTML = "Please enter the email you registered with."
        emailError.style.color = "red"
    }

    email.addEventListener('input', ()=>{
        email.style.border = "1px solid white"
        emailError.innerHTML = ""
        emailError.style.color = "#000000"
    })

    // window.location.href = './resetToken.html'
})