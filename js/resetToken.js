const token = document.querySelector('#token')
const tokenError = document.querySelector('.token-error')

document.querySelector('#reset-token-form').addEventListener('click', (e)=>{
    e.preventDefault(e)

    if(token.value === '' || token.value === null || token.value === undefined){
        token.style.border = "1px solid red"
        tokenError.innerHTML = "Please enter the token you got from your email"
        tokenError.style.color = "red"
    }

    token.addEventListener('input', ()=>{
        token.style.border = "1px solid white"
        tokenError = ""
        tokenError.style.color = "#000000"
    })

    window.location.href = './setNewPassword.html'
})