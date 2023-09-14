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
    const postsDiv = document.querySelector('.post')
    const handleNameEl = document.querySelector('#handleName')
    const followingsDiv = document.querySelector('.user-container')
    const loggedInUsernameEl = document.querySelector('#loggeInUserName')
    const loggedInUserImage = document.querySelector('#loggedInUserImage')
    

    const token = localStorage.token 
    let user = localStorage.user

    function checkData(){
        if(!user || !token){
            window.location.href = './login.html'
        }
    }

    window.onload = checkData
    user = JSON.parse(localStorage.user) 
    
    loggedInUserImage.src = user.avatar
    handleNameEl.innerHTML = '@' + user.first_name + "_"
    loggedInUsernameEl.innerHTML = user.first_name + " " + user.last_name

    document.querySelector('#imageProfile').src=user.avatar
    document.querySelector('#userName').innerHTML = user.first_name + " " + user.last_name
    document.querySelector('#profileLink').href = `./updateProfile.html?user_id=${user.id}`

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/user/post/${user.id}`, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response)=>{
        response.data.posts.forEach((post)=>{
            const postDiv = document.createElement('div')
            postDiv.classList.add('post-content')

            //user profile
            const userProfileDiv = document.createElement('div')
            
            const imageDiv = document.createElement('div')
            imageDiv.classList.add('image')
            imageDiv.style.borderRadius = "50%"
            const profilePicture = document.createElement('img')
            profilePicture.src = post.user_avatar
            profilePicture.style.borderRadius = "50%"
            imageDiv.appendChild(profilePicture) 
            postDiv.appendChild(imageDiv) 

            //content
            const contentDiv = document.createElement('div')
            contentDiv.classList.add('content')
            
            //title div
            const titleDiv = document.createElement('div')
            titleDiv.classList.add('name')
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
            commentIcon.innerHTML = '<iconify-icon width="25px" height="25px" class="icon" icon="iconamoon:comment-thin"></iconify-icon>'
            const commentCount = document.createElement('p')
            commentCount.innerHTML = post.comment_count
            commentsDiv.appendChild(commentIcon)
            commentsDiv.appendChild(commentCount)
            infoIconsDiv.appendChild(commentsDiv)
            const likesDiv = document.createElement('div')
            likesDiv.classList.add('likes')
            const likeIcon = document.createElement('p')
            likeIcon.innerHTML = '<iconify-icon width="25px" height="25px" class="icon" icon="iconamoon:heart-thin"></iconify-icon>'
            const likeCount = document.createElement('p')
            likeCount.innerHTML = post.like_count
            const deleteDiv = document.createElement('div')
            deleteDiv.classList.add('delete-post')
            const deleteIcon = document.createElement('p')
            deleteIcon.innerHTML ='<iconify-icon width="25px" height="25px" class="icon" icon="openmoji:delete"></iconify-icon>'
            deleteDiv.appendChild(deleteIcon)
            likesDiv.appendChild(likeIcon)
            likesDiv.appendChild(likeCount)
            infoIconsDiv.appendChild(deleteDiv)
            infoIconsDiv.appendChild(likesDiv)
            contentDiv.appendChild(infoIconsDiv)
            
            const singlePostLink = document.createElement('a')
            singlePostLink.href = `./post.html?post_id=${post.post_id}`
            singlePostLink.appendChild(contentDiv)
            singlePostLink.style.textDecoration = "none"
            singlePostLink.style.color = "white"
            postDiv.appendChild(singlePostLink)
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


    document.querySelector("#logout").addEventListener('click', ()=>{
        localStorage.token = ''
        localStorage.user = ''
        window.location.href = './login.html'
    })

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/user/followings/${user.id}`, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response)=>{
          response.data.following.forEach((user)=>{
            const followerDiv = document.createElement('div')
            followerDiv.classList.add('follower')

            const userProfilePicDiv = document.createElement('div')
            userProfilePicDiv.classList.add('image')
            const profilePicEl = document.querySelector('img')
            profilePicEl.src = user.following_avatar
            userProfilePicDiv.appendChild(profilePicEl)
            followerDiv.appendChild(userProfilePicDiv)

            const nameDiv = document.createElement('div')
            nameDiv.classList.add('name')
            const iconDiv = document.createElement('div')
            iconDiv.classList.add('icon')
            const boldNameEl = document.createElement('strong')
            boldNameEl.innerHTML = user.following_first_name + " " + user.following_last_name
            const nameEl = document.createElement('p')
            
            iconDiv.appendChild(nameEl)
            const verifiedEl = document.createElement('p')
            const handleNameDiv = document.createElement('small')
            handleNameDiv.innerHTML = "@" + user.following_first_name + "_"
            nameDiv.appendChild(handleNameDiv)
            nameEl.appendChild(boldNameEl)
            nameDiv.appendChild(iconDiv)
            followerDiv.appendChild(nameDiv)

            const viewProfileEl = document.createElement('div')
            viewProfileEl.classList.add('view-profile')
            const profilePageLinkEl = document.createElement('a')
            profilePageLinkEl.href = '#'
            const button = document.createElement('button')
            button.textContent = "Profile"
            profilePageLinkEl.appendChild(button)
            viewProfileEl.appendChild(profilePageLinkEl)
            followerDiv.appendChild(viewProfileEl)

            followingsDiv.appendChild(followerDiv)
          })
    })
    .catch((e)=>{
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

    document.querySelector('#search-user').addEventListener('input', ()=>{

        const searchTerm = document.querySelector('#search-user').value.toLowerCase()
        
        axios.get(`http://127.0.0.1:8080/api/link-up/v1/user/followings/${user.id}`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            const filtered = response.data.following.filter((user)=>{
                return user.following_first_name.toLowerCase().includes(searchTerm)
            })

            if(filtered){

                followingsDiv.innerHTML = ""
                filtered.forEach((user)=>{
                    const followerDiv = document.createElement('div')
                    followerDiv.classList.add('follower')
        
                    const userProfilePicDiv = document.createElement('div')
                    userProfilePicDiv.classList.add('image')
                    const profilePicEl = document.querySelector('img')
                    profilePicEl.src = user.following_avatar
                    userProfilePicDiv.appendChild(profilePicEl)
                    followerDiv.appendChild(userProfilePicDiv)
        
                    const nameDiv = document.createElement('div')
                    nameDiv.classList.add('name')
                    const iconDiv = document.createElement('div')
                    iconDiv.classList.add('icon')
                    const boldNameEl = document.createElement('strong')
                    boldNameEl.innerHTML = user.following_first_name + " " + user.following_last_name
                    const nameEl = document.createElement('p')
                    
                    iconDiv.appendChild(nameEl)
                    const verifiedEl = document.createElement('p')
                    const handleNameDiv = document.createElement('small')
                    handleNameDiv.innerHTML = "@" + user.following_first_name + "_"
                    nameDiv.appendChild(handleNameDiv)
                    nameEl.appendChild(boldNameEl)
                    nameDiv.appendChild(iconDiv)
                    followerDiv.appendChild(nameDiv)
        
                    const viewProfileEl = document.createElement('div')
                    viewProfileEl.classList.add('view-profile')
                    const profilePageLinkEl = document.createElement('a')
                    profilePageLinkEl.href = '#'
                    const button = document.createElement('button')
                    button.textContent = "Profile"
                    profilePageLinkEl.appendChild(button)
                    viewProfileEl.appendChild(profilePageLinkEl)
                    followerDiv.appendChild(viewProfileEl)
        
                    followingsDiv.appendChild(followerDiv)
                })
            }

        })
        .catch((e)=>{
            
            if(!e.response){
                handleSubmissionError(e.message)
            }else{
                handleSubmissionError(e.response.data.error)
            }   
        })
    })

})