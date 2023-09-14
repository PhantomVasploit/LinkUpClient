const main = document.querySelector('main')
const email = document.querySelector('#email')
const loader = document.querySelector('.loader')
const lastName = document.querySelector('#last-name')
const firstName = document.querySelector('#first-name')

const emailError = document.querySelector('.email-error')
const lastNameError = document.querySelector('.last-name-error')
const firstNameError = document.querySelector('.first-name-error')
let profilePictureUrl = ''
let isProfilePictureUploaded = false

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

loader.style.display = "none"

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

document.querySelector('#sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault()

    //data sanitization
    if (firstName.value === '' || firstName.value === null || firstName.value === undefined) {
        firstName.style.border = "1px solid red"
        firstNameError.innerHTML = "Please enter your first name"
        firstNameError.style.color = "red"
    }else if (!isProfilePictureUploaded) {
        handleSubmissionError("Profile picture is still uploading")
    } else if (lastName.value === '' || lastName.value === null || lastName === undefined) {
        lastName.style.border = "1px solid red"
        lastNameError.innerHTML = "Please enter your last name"
        lastNameError.style.color = "red"
    }else if (email.value === '' || email.value === null || email.value === undefined) {
        email.style.border = "1px solid red"
        emailError.innerHTML = "Please enter your email address"
        emailError.style.color = "red"
    }else{
        axios.post('http://127.0.0.1:8080/api/link-up/v1/register',
        {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            profilePicture: profilePictureUrl
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            window.location.href = `./setNewPassword.html?email=${email.value}`
        })
        .catch((e) => {
            if (!e.response) {
                handleSubmissionError(e.message)
            } else {
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



