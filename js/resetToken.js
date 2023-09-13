const token = document.querySelector('#token')
const error = document.querySelector('.error')

const urlParams = new URLSearchParams(window.location.search)
const email = urlParams.get('email')

function handleSubmissionError(message){
    Toastify({
        text: message,
        duration: 50000, 
        backgroundColor: "#f44336",
        close: true,
        stopOnFocus: true,
        gravity: "top", 
        position: "center", 
    }).showToast();
}

document.querySelector('#reset-token-form').addEventListener('submit', (e)=>{
    e.preventDefault(e)

    if(token.value === '' || token.value === null || token.value === undefined){
        token.style.border = "1px solid red"
        error.innerHTML = "Please enter the token you got from your email"
        error.style.color = "red"
    }

    token.addEventListener('input', ()=>{
        token.style.border = "1px solid white"
        error.innerHTML = ""
        error.style.color = "#000000"
    })

    axios.post('http://127.0.0.1:8080/api/link-up/v1/validate-reset-password-token', 
    {
        email: "paul.nyamawi99@gmail.com",
        resetPasswordToken: token.value  
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
        window.location.href = `./restPassword.html?email=${email}`
    })
    .catch((e)=>{
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

})