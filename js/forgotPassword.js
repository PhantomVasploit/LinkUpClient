const email = document.querySelector('#email')
const emailError = document.querySelector('.email-error')

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

    axios.post('http://127.0.0.1:8080/api/link-up/v1/forgot-password', 
    {
        email: email.value
    },
    {
        'Content-Type': 'application/json'
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

        window.location.href = `./resetToken.html?email=${email.value}`
    })
    .catch((e)=>{
        console.log(e.message);
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })
})