function handleSubmissionError(message) {
    Toastify({
        text: message,
        duration: 3000,
        backgroundColor: "#f44336",
        close: true,
        stopOnFocus: true,
        gravity: "top",
        position: "center",
    }).showToast();
}

document.addEventListener('DOMContentLoaded', ()=>{

    const token = localStorage.token 
    let user = localStorage.user

    function checkData(){
        if(!user || !token){
            window.location.href = './login.html'
        }
    }

    window.onload = checkData
    user = JSON.parse(localStorage.user) 

    const postsDiv = document.querySelector('.posts')

    axios.get('http://127.0.0.1:8080/api/link-up/v1/posts', 
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
          
          response.data.posts.forEach((post)=>{
              console.log(post);  
              const postDiv = document.createElement('div')
              postDiv.classList.add('post')

              //user profile
              const userProfileDiv = document.createElement('div')
              userProfileDiv.classList.add('user-profile')
              const imageDiv = document.createElement('div')
              imageDiv.classList.add('image')
              imageDiv.style.borderRadius = "50%"
              const profilePicture = document.createElement('img')
              profilePicture.src = post.user_avatar
              profilePicture.style.borderRadius = "50%"
              imageDiv.appendChild(profilePicture) 
              userProfileDiv.appendChild(imageDiv) 
              postDiv.appendChild(userProfileDiv)

              //content
              const contentDiv = document.createElement('div')
              //title div
              contentDiv.classList.add('content')
              const titleDiv = document.createElement('div')
              titleDiv.classList.add('title')
              const usernameDiv = document.createElement('p')
              const boldDiv = document.createElement('strong')
              boldDiv .innerHTML = post.user_first_name + " "+ post.user_last_name
              usernameDiv.appendChild(boldDiv) 
              titleDiv.appendChild(usernameDiv)
              const icon = document.createElement('p')
              icon.innerHTML = '<iconify-icon icon="solar:verified-check-bold-duotone"></iconify-icon>'
              titleDiv.appendChild(icon)
              const userHandleNameEl = document.createElement('small')
              const userHandleName = '@ ' + post.user_first_name + '_'
              userHandleNameEl.innerHTML = userHandleName
              titleDiv.appendChild(userHandleNameEl)
              const postCreationTime = document.querySelector('small')
              const creationDate = new Date(post.post_created_at).toLocaleDateString()
              postCreationTime.innerHTML = creationDate 
              console.log(postCreationTime);
              titleDiv.appendChild(postCreationTime)
              contentDiv.appendChild(titleDiv)

              // info
              const infoDiv = document.createElement('div')
              infoDiv.classList.add('info')
              infoDiv.innerHTML = post.post_content
              contentDiv.appendChild(infoDiv)

              // info-image
              if(post.post_image){
                  const infoImageDiv = document.createElement('div')
                    infoImageDiv.classList.add("info-image")
                    const postImage = document.createElement('img')
                    postImage.src = post.post_image
                    postImage.alt = 'post-image'
                    infoImageDiv.appendChild(postImage)
                    contentDiv.appendChild(infoImageDiv)
              }

              //info-icons
              const infoIconsDiv = document.createElement('div')
              infoIconsDiv.classList.add('info-icons')
              const commentsDiv = document.createElement('div')
              commentsDiv.classList.add('comments')
              const commentIcon = document.createElement('p')
              commentIcon.innerHTML = '<iconify-icon width="30px" height="30px" class="icon" icon="iconamoon:comment-thin"></iconify-icon>'
              const commentCount = document.createElement('p')
              commentCount.innerHTML = post.comment_count
              commentsDiv.appendChild(commentIcon)
              commentsDiv.appendChild(commentCount)
              infoIconsDiv.appendChild(commentsDiv)
              const likesDiv = document.createElement('div')
              likesDiv.classList.add('likes')
              const likeIcon = document.createElement('p')
              likeIcon.innerHTML = '<iconify-icon width="30px" height="30px" class="icon" icon="iconamoon:heart-thin"></iconify-icon>'
              const likeCount = document.createElement('p')
              likeCount.innerHTML = post.like_count
              likesDiv.appendChild(likeIcon)
              likesDiv.appendChild(likeCount)
              infoIconsDiv.appendChild(likesDiv)
              contentDiv.appendChild(infoIconsDiv)
              
              postDiv.appendChild(contentDiv)
              postsDiv.appendChild(postDiv)
          })


    })
    .catch((e)=>{
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

})

let postImage = ''
const postContent = document.querySelector('#new-post')
let isPostImageUploaded = false

document.querySelector('#post-image').addEventListener('change', (e)=>{
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
                console.log(response);
                postImage = response.url
                isPostImageUploaded = true
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



document.querySelector('.post-input').addEventListener('submit', (e)=>{
    e.preventDefault()

    if(!isPostImageUploaded){
        handleSubmissionError('Post Picture uploading...')
    }

    axios.post('http://127.0.0.1:8080/api/link-up/v1/post/1', 
    {
        image: postImage,
        content: postContent.value
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
          window.location.reload()
    })
    .catch((e)=>{
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

})

document.querySelector("#logout").addEventListener('click', ()=>{
    localStorage.token = ''
    localStorage.user = ''
    window.location.href = './login.html'
})