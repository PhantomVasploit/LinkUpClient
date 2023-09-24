///<reference types="Cypress"/>

describe('Home Page Test Suites', ()=>{
    it('should hide followings section at a max-width of 1024px or below', ()=>{
        cy.homeFollowersHidden()
    })
    it('should navigate to profile page when the profile link is clicked', ()=>{
        cy.homeProfileLink()
    })
    it('should navigate to liked posts page when the liked posts link is clicked', ()=>{
        cy.homeLikedPostsLink()
    })
    it('should search a posts for instance search a post with content including software', ()=>{
        cy.homeSearchPost()
    })
    it('should search followings for instance search a user with name Elvis', ()=>{
        cy.homeSearchFollowing()
    })
    it('should navigate to user profile', ()=>{
        cy.homeToPostPage()
    })
    it('should navigate to post page', ()=>{
        cy.homeToPostPage()
    })
    it('should like post', ()=>{
        cy.likePost()
    })
    it('should display error when liking an already liked post', ()=>{
        cy.likeAlreadyLikedPost()
    })
    it('should post a comment on a post', ()=>{
        cy.postComment()
    })
    it('should navigate to edit profile page', ()=>{
      cy.profileToEditProfilePage()
    })
    it('should navigate to deactivate account page', ()=>{
        cy.profileToDeactivateAccountPage()
    })
    it('should delete post', ()=>{
        cy.deletePost()
    })
    it('should create a new post', ()=>{
        cy.createNewPost()
    })
    it('should update post', ()=>{
        cy.updatePost()
    })
    it('should update profile', ()=>{
        cy.updateProfile()
    })
    it('should delete comment', ()=>{
        cy.deleteComment()
    })
})