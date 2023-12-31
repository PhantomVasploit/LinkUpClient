const email = document.querySelector('#email')
const emailError = document.querySelector('.email-error')
const password = document.querySelector('#password')
const passwordError = document.querySelector('.password-error')

//function to handle error on submission
function handleSubmissionError(message){
    Toastify({
        text: message,
        duration: 3000,  
        style: {
            background: '#f44336'
        },
        close: true,
        stopOnFocus: true,
        gravity: "top", 
        position: "center", 
    }).showToast();
}

email.addEventListener('input', ()=>{
    email.style.border = '1px solid white'
    emailError.innerHTML = ""
    emailError.style.color = "#000000"
})

password.addEventListener('input', ()=>{
    password.style.border = "1px solid white"
    passwordError.innerHTML = ""
    passwordError.style.color = "#000000"
})

document.querySelector('#sign-in-form').addEventListener('submit', (e)=>{
    e.preventDefault()

    //data sanitizarion
    if(email.value === '' || email.value === null || email.value === undefined){
        email.style.border = "1px solid red"
        emailError.innerHTML = "Please provide your email address"
        emailError.style.color = "red"
    }else if(password.value === '' || password.value === null || password.value === undefined){
        password.style.border = "1px solid red"
        passwordError.innerHTML = "Please enter your password"
        passwordError.style.color = "red"
    }else{
        axios.post('http://127.0.0.1:8080/api/link-up/v1/login', 
        {
            email: email.value,
            userPassword: password.value
        },
        {

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
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            window.location.href = './home.html'
        })
        .catch((e)=>{
            console.log(e);
            if(!e.response){
                handleSubmissionError(e.message)
            }else if(e.response.status == 403){
                window.location.href = './restoreAccount.html'
            }else{
                handleSubmissionError(e.response.data.error)
            }
        })
    }
    
})