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

document.addEventListener('DOMContentLoaded', ()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const passwordError = document.querySelector('.password-error')

    const email = urlParams.get('email')
    const password = document.querySelector('#password')

    password.addEventListener('input', ()=>{
        password.style.border = "1px solid white"
        passwordError.innerHTML = ""
        passwordError.style.color = "#000000"
    })

    document.querySelector('#deactivation-form').addEventListener('submit', (e)=>{
        e.preventDefault()
        
        if(password.value === '' || password.value === null || password.value === undefined){
            password.style.border = "1px solid red"
            passwordError.innerHTML = "Please enter your password"
            passwordError.style.color = "red"
        }else{
            axios.post('http://127.0.0.1:8080/api/link-up/v1/deactivate-account',
            {
                email,
                userPassword: password.value
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
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                window.location.href = './login.html'
            })
            .catch((e)=>{
                if(!e.response){
                    handleSubmissionError(e.message)
                }else{
                    handleSubmissionError(e.response.data.error)
                }
            })

            
        }
    })
})