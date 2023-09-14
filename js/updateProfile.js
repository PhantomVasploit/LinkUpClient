const urlParams = new URLSearchParams(window.location.search)
const userId = urlParams.get('user_id')

function handleSubmissionError(message) {
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

    const email = document.querySelector('#email')
    const loader = document.querySelector('.loader')
    const lastName = document.querySelector('#last-name')
    const firstName = document.querySelector('#first-name')
    let profilePictureUrl = ''
    let isProfilePictureUploaded = false

    loader.style.display = "none"

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/user/${userId}`, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response)=>{
        firstName.value = response.data.user.first_name
        lastName.value = response.data.user.last_name
        email.value = response.data.user.email
    })
    .catch((e)=>{
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

    document.querySelector("#profile-picture").addEventListener('change', (e)=>{
    
        if(!isProfilePictureUploaded){
            loader.style.display = 'block'
        }
        
        const files = e.target.files
        if(files){
            const formData = new FormData()
            formData.append("file", files[0])
            formData.append("upload_preset", "Shopie")
            formData.append("cloud_name", "dx3mq7rzr")
    
    
    
            fetch('https://api.cloudinary.com/v1_1/dx3mq7rzr/image/upload', {
                method: "POST",
                body: formData
            })
            .then((res)=>{
                res.json()
                
                .then((response)=>{
                    profilePictureUrl = response.url
                    isProfilePictureUploaded = true
                    loader.style.display = "none"
                })
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
    

    document.querySelector('#profile-update-form').addEventListener('submit', (e)=>{
        
        e.preventDefault()

        //data sanitization
        if (firstName.value === '' || firstName.value === null || firstName.value === undefined) {
            firstName.style.border = "1px solid red"
            firstNameError.innerHTML = "Please enter your first name"
            firstNameError.style.color = "red"
        }else if (lastName.value === '' || lastName.value === null || lastName === undefined) {
            lastName.style.border = "1px solid red"
            lastNameError.innerHTML = "Please enter your last name"
            lastNameError.style.color = "red"
        }else if (email.value === '' || email.value === null || email.value === undefined) {
            email.style.border = "1px solid red"
            emailError.innerHTML = "Please enter your email address"
            emailError.style.color = "red"
        }else{
            axios.put(`http://127.0.0.1:8080/api/link-up/v1/user/${userId}`,
            {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                profilePicture: profilePictureUrl
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response)=>{
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

        firstName.addEventListener('input', () => {
            firstName.style.border = "1px solid white"
            firstNameError.innerHTML = ""
            firstNameError.style.color = "#000000"
        })

        

        lastName.addEventListener('input', () => {
            lastName.style.border = "1px solid white"
            lastNameError.innerHTML = ""
            lastNameError.style.color = "#000000"
        })

        

        email.addEventListener('input', () => {
            email.style.border = "1px solid white"
            emailError.innerHTML = ""
            emailError.style.color = "#000000"
        })


    })

})