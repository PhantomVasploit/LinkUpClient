const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get('post_id')

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

    let user = localStorage.user
    const token = localStorage.token
    const postDiv = document.querySelector('.post')
    const comment = document.querySelector('#new-post')
    const handleNameEl = document.querySelector('#handleName')
    const commentListDiv = document.querySelector('.comment-list')
    const followingsDiv = document.querySelector('.user-container')
    const userLoggedInImg = document.querySelector('#userLoggedInImg')
    const loggedInUsernameEl = document.querySelector('#loggeInUserName')
    const loggedInUserImage = document.querySelector('#loggedInUserImage')

    function checkData(){
        if(!user || !token){
            window.location.href = './login.html'
        }
    }

    
    window.onload = checkData
    user = JSON.parse(localStorage.user)
    userLoggedInImg.src = user.avatar
    loggedInUserImage.src = user.avatar
    handleNameEl.innerHTML = '@' + user.first_name + "_"
    loggedInUsernameEl.innerHTML = user.first_name + " " + user.last_name
 
    
    document.querySelector('#closeModalBtn').addEventListener('click', ()=>{
        document.querySelector('#editModal').style.display = "none";
    })

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/post/${postId}`, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beaerer: ${token}`
        }
    })
    .then((response)=>{
        //user profile
        const userProfileDiv = document.createElement('div')
        userProfileDiv.classList.add('user-profile')
        const imageDiv = document.createElement('div')
        imageDiv.classList.add('image')
        imageDiv.style.borderRadius = "50%"
        const profilePicture = document.createElement('img')
        profilePicture.src = response.data.post.user_avatar
        profilePicture.style.borderRadius = "50%"
        imageDiv.appendChild(profilePicture) 
        userProfileDiv.appendChild(imageDiv) 
        const userProfileLink = document.createElement('a')
        userProfileLink.href = `./otherUserProfile.html?user_id=${response.data.post.user_id}`
        userProfileLink.style.textDecoration = "none"
        userProfileLink.appendChild(userProfileDiv)
        postDiv.appendChild(userProfileLink)

        //content
        const contentDiv = document.createElement('div')
        //title div
        contentDiv.classList.add('content')
        const titleDiv = document.createElement('div')
        titleDiv.classList.add('title')
        const usernameDiv = document.createElement('p')
        const boldDiv = document.createElement('strong')
        boldDiv .innerHTML = response.data.post.user_first_name + " "+ response.data.post.user_last_name
        usernameDiv.appendChild(boldDiv) 
        titleDiv.appendChild(usernameDiv)
        const icon = document.createElement('p')
        icon.innerHTML = '<iconify-icon icon="solar:verified-check-bold-duotone"></iconify-icon>'
        titleDiv.appendChild(icon)
        const userHandleNameEl = document.createElement('small')
        const userHandleName = '@ ' + response.data.post.user_first_name + '_'
        userHandleNameEl.innerHTML = userHandleName
        titleDiv.appendChild(userHandleNameEl)
        const postCreationTime = document.querySelector('small')
        contentDiv.appendChild(titleDiv)

        // info
        const infoDiv = document.createElement('div')
        infoDiv.classList.add('info')
        infoDiv.innerHTML = response.data.post.post_content
        contentDiv.appendChild(infoDiv)

        // info-image
        if(response.data.post.post_image){
            const infoImageDiv = document.createElement('div')
              infoImageDiv.classList.add("info-image")
              const postImage = document.createElement('img')
              postImage.src = response.data.post.post_image
              postImage.alt = 'post-image'

              postImage.addEventListener('dblclick', ()=>{
                axios.post(`http://127.0.0.1:8080/api/link-up/v1/post/like/${user.id}/${postId}`, {}, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Beaerer: ${token}`
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
        commentCount.innerHTML = response.data.post.comment_count
        commentsDiv.appendChild(commentIcon)
        commentsDiv.appendChild(commentCount)
        infoIconsDiv.appendChild(commentsDiv)
        const likesDiv = document.createElement('div')
        likesDiv.classList.add('likes')
        const likeIcon = document.createElement('p')
        likeIcon.innerHTML = '<iconify-icon width="25px" height="25px" class="icon" icon="iconamoon:heart-thin"></iconify-icon>'
        const likeCount = document.createElement('p')
        likeCount.innerHTML = response.data.post.like_count
        likesDiv.appendChild(likeIcon)
        likesDiv.appendChild(likeCount)
        // unlike conditional rendering
        axios.get(`http://127.0.0.1:8080/api/link-up/v1/post/like/${user.id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beaerer: ${token}`
            }
        })
        .then((response_2)=>{
            response_2.data.posts.forEach((likedPost)=>{
                if(likedPost.id == postId){
                    console.log(likedPost);
                    const unlikeDiv = document.createElement('div')
                    unlikeDiv.classList.add('unlike')
                    const unlikeEl = document.createElement('p')
                    unlikeEl.innerHTML = '<iconify-icon width="25px" height="25px" class="icon" icon="icon-park-outline:unlike"></iconify-icon>'
                    unlikeEl.style.color = 'white'
                    unlikeDiv.appendChild(unlikeEl)

                    unlikeDiv.addEventListener('click', ()=>{
                        console.log('clicked unlike');
                        axios.delete(`http://127.0.0.1:8080/api/link-up/v1/post/like/${user.id}/${postId}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Beaerer: ${token}`
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

                    infoIconsDiv.appendChild(unlikeDiv)
                }
            })
        })
        .catch((e)=>{
            if(!e.response){
                handleSubmissionError(e.message)
            }else{
                handleSubmissionError(e.response.data.error)
            } 
        })

        infoIconsDiv.appendChild(likesDiv)
        contentDiv.appendChild(infoIconsDiv)
        postDiv.appendChild(contentDiv)
    })
    .catch((e)=>{
        console.log(e);
        if(!e.response){
            handleSubmissionError(e.message)
        }else{
            handleSubmissionError(e.response.data.error)
        }
    })

    document.querySelector('#newCommentForm').addEventListener('submit', (e)=>{
        e.preventDefault()
        if(comment.value === '' || comment.value === null || comment.value === undefined){
            handleSubmissionError('Can not submit an empty comment')
        }else{
            axios.post(`http://127.0.0.1:8080/api/link-up/v1/comment/${postId}/${user.id}`, 
            {
                content: comment.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Beaerer: ${token}`
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
        }
    })

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/comments/${postId}`, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beaerer: ${token}`
        }
    })
    .then((response)=>{
        response.data.comments.forEach((commentDetail)=>{
            
            const cmtDiv = document.createElement('div')
            cmtDiv.classList.add("cmnt")
            const profileDiv = document.createElement('div')
            profileDiv.classList.add('profile')
            const profileImgDiv = document.createElement('img')
            profileImgDiv.src = commentDetail.user_avatar
            profileDiv.style.borderRadius = "50%"
            profileImgDiv.style.borderRadius = "50%"
            profileDiv.appendChild(profileImgDiv)
            cmtDiv.appendChild(profileDiv)

            const cmtContentDiv = document.createElement('div')
            cmtContentDiv.classList.add('content')
            const titleEl = document.createElement('div')
            titleEl.classList.add('title')
            const strongEl = document.createElement('strong')
            strongEl.innerHTML = commentDetail.user_first_name + " " + commentDetail.user_last_name
            const pEl = document.createElement('p')
            pEl.appendChild(strongEl)
            titleEl.appendChild(pEl)
            const handleUserNameEl = document.createElement('small')
            handleUserNameEl.innerHTML = '@'+commentDetail.user_first_name+'_'
            titleEl.appendChild(handleUserNameEl)
            cmtContentDiv.appendChild(titleEl)

            const infoEl = document.createElement('div')
            infoEl.classList.add('info')
            const infoPEl = document.createElement('p')
            infoPEl.innerText = commentDetail.comment_content
            infoEl.appendChild(infoPEl)
            cmtContentDiv.appendChild(infoEl)

            cmtDiv.appendChild(cmtContentDiv)

            if(user.id == commentDetail.user_id){
                cmtContentDiv.style.cursor = "pointer"
                cmtDiv.addEventListener('click', ()=>{
                    document.querySelector('#editModal').style.display = "block";
                    const commentToUpdate = document.querySelector('#comment-update')
                    commentToUpdate.value = commentDetail.comment_content

                    document.querySelector('.post-input').addEventListener('submit', (e)=>{
                        e.preventDefault()
                        axios.put(`http://127.0.0.1:8080/api/link-up/v1/comment/${user.id}/${commentDetail.comment_id}`,
                        {
                            content: commentToUpdate.value
                        }, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Beaerer: ${token}`
                            }
                        })
                        .then((response)=>{
                            window.location.reload()
                        })
                        .catch((e)=>{
                            console.log(e);
                            if(!e.response){
                                handleSubmissionError(e.message)
                            }else{
                                handleSubmissionError(e.response.data.error)
                            }
                        })
                    })
                    
                    document.querySelector('#deleteIcon').addEventListener('click', ()=>{
                        axios.delete(`http://127.0.0.1:8080/api/link-up/v1/comment/${user.id}/${commentDetail.comment_id}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Beaerer: ${token}`
                            }
                        })
                        .then((response)=>{
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
                })
            }

            commentListDiv.appendChild(cmtDiv)

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

    document.querySelector("#logout-text").addEventListener('click', ()=>{
        localStorage.token = ''
        localStorage.user = ''
        window.location.href = './login.html'
    })

    axios.get(`http://127.0.0.1:8080/api/link-up/v1/user/followings/${user.id}`, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beaerer: ${token}`
        }
    })
    .then((response)=>{
          response.data.following.forEach((user)=>{
            const followerDiv = document.createElement('div')
            followerDiv.classList.add('follower')

            const userProfilePicDiv = document.createElement('div')
            userProfilePicDiv.classList.add('image')
            const profilePicEl = document.createElement('img')
            profilePicEl.src = user.following_avatar
            profilePicEl.style.borderRadius = "50%"
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
            profilePageLinkEl.href = `./otherUserProfile.html?user_id=${user.following_id}`
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
                'Content-Type': 'application/json',
                'Authorization': `Beaerer: ${token}`
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
                    const profilePicEl = document.createElement('img')
                    profilePicEl.src = user.following_avatar
                    profilePicEl.style.borderRadius = "50%"
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
                    profilePageLinkEl.href = `./otherUserProfile.html?user_id=${user.following_id}`
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