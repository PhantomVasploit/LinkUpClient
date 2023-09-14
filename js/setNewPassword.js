const otp = document.querySelector('#otp')
const newPassword = document.querySelector('#new-password')
const confrimPassword = document.querySelector('#confirm-password')

const otpError = document.querySelector('.otp-error')
const newPasswordError = document.querySelector('.new-password-error')
const confrimPasswordError = document.querySelector('.confirm-password-error')

const urlParams = new URLSearchParams(window.location.search)
const email = urlParams.get('email')

function handleSubmissionError(message) {
    Toastify({
        text: message,
        duration: 30000,
        style: {
            background: '#f44336'
        },
        close: true,
        stopOnFocus: true,
        gravity: "top",
        position: "center",
    }).showToast();
}

document.querySelector('#set-new-password').addEventListener('submit', (e)=>{
    e.preventDefault()

    if(otp.value === '' || otp.value === null || otp.value === undefined ){
        otp.style.border = "1px solid red"
        otpError.innerHTML = "Please enter your one time password"
        otpError.style.color = "red"
    }else if(newPassword.value === '' || newPassword.value === null || newPassword.value === undefined){
        newPassword.style.border = "1px solid red"
        newPasswordError.innerHTML = "Please enter your new password"
        newPasswordError.style.color = "red"
    }else if(confrimPassword.value === "" || confrimPassword.value === null || confrimPassword.value === undefined){
        confrimPassword.style.border = "1px solid red"
        confrimPasswordError.innerHTML = "Please confrim your password"
        confrimPasswordError.style.color = "red"
    }else if(confrimPassword.value !== newPassword.value){
        confrimPassword.style.border = "1px solid red"
        confrimPasswordError.innerHTML = "Passwords don't match"
        confrimPasswordError.style.color = "red"
    }else{
        axios.post('http://127.0.0.1:8080/api/link-up/v1/verify-user',
        {
            email,
            userPassword: otp.value,
            newPassword: newPassword.value
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            Toastify({
                text: response.data.message,
                backgroundColor: "#4caf50", 
                duration: 3000,
                close: true,
                gravity: "top",
                position: "success",
            }).showToast();
            window.location.href = './login.html'
        })
        .catch((e)=>{
            if(!e.response){
                handleSubmissionError(e.message)
            }else if(e.response.status == 403){
                window.location.href = `../../customer/html/reactivateAccount.html?email=${email.value}`
            }else{
                handleSubmissionError(e.response.data.error)
            }
        })
    }

    otp.addEventListener('input', ()=>{
        otp.style.border = "1px solid white"
        otpError.innerHTML = ""
        otpError.style.color = "#000000"
    })

    

    newPassword.addEventListener('input', ()=>{
        newPassword.style.border = "1px solid white"
        newPasswordError.innerHTML = ""
        newPasswordError.style.color = "#000000"
    })

    

    confrimPassword.addEventListener('input', ()=>{
        confrimPassword.style.border = "1px solid white"
        confrimPasswordError.innerHTML = ""
        confrimPasswordError.style.color = "#000000"
    })

})