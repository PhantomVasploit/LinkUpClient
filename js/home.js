document.addEventListener('DOMContentLoaded', function(){

    var firstPost = document.querySelector('main .main .posts .post:first-child');

    firstPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
})