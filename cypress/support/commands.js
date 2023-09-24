// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// login test suite commands
Cypress.Commands.add('loginDataSanitization', ()=>{
    cy.visit('/login.html')
    cy.get('#login-btn').click()
    cy.get('.email-error').should('contain', 'Please provide your email address')
})


Cypress.Commands.add('loginWithWrongEmailAddress', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('paul@gmail.com')
    cy.get('#password').type('dnfjhghkjgbjnh')
    cy.get('#login-btn').click()
    cy.get('[aria-live="polite"]').should('contain', 'Invalid login credentials')
})

Cypress.Commands.add('loginWithWrongPassword', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('dnfjhghkjgbjnh')
    cy.get('#login-btn').click()
    cy.get('[aria-live="polite"]').should('contain', 'Invalid login credentials')
})

Cypress.Commands.add('loginWithRightCredentials', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
})

Cypress.Commands.add('hideLoginSideImage', ()=>{
    cy.visit('/login.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})
//registration test suite commends
Cypress.Commands.add('registrationErrorHandling', ()=>{
    cy.visit('/register.html')
    cy.get('#registrationBtn').click()
    cy.get('.first-name-error').should('contain', 'Please enter your first name')
    cy.location('pathname').should('equal', '/html/register.html')
})

Cypress.Commands.add('registrationEmailAlreadyRegistered', ()=>{
    cy.visit('/register.html')
    cy.get('#first-name').type('Paul')
    cy.get('#last-name').type("Sanga")
    cy.get('#email').type('ekko@gmail.com')
    cy.get("#profile-picture-label").selectFile('./cypress/fixtures/user.png')
    cy.wait(4000)
    cy.get('#registrationBtn').click()
    cy.get('[aria-live="polite"]').contains('This email address is already registered')
})

Cypress.Commands.add('registerUser', ()=>{
    cy.visit('/register.html')
    cy.visit('/register.html')
    cy.get('#first-name').type('Paul')
    cy.get('#last-name').type("Sanga")
    cy.get('#email').type('ekko@gmail.com')
    cy.get("#profile-picture-label").selectFile('./cypress/fixtures/user.png')
    cy.wait(4000)
    cy.get('#registrationBtn').click()
    cy.wait(10000)
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
})

Cypress.Commands.add('hideRegisterSideImage', ()=>{
    cy.visit('/register.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})

// forgot password test suite commnads
Cypress.Commands.add('forgotPasswordErrorHandling', ()=>{
    cy.visit('/forgotPassword.html')
    cy.get('#confirm-email-btn').click()
    cy.location('pathname').should('equal', '/html/forgotPassword.html')
    // cy.get('[aria-live="polite"]').should('contain', '"email" is not allowed to be empty')
    cy.get('.email-error').should('contain', 'Please enter the email you registered with.')
})

Cypress.Commands.add('forgotPasswordUnregisteredEmailAddress', ()=>{
    cy.visit('/forgotPassword.html')
    cy.get('#email').type('p@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.location('pathname').should('equal', '/html/forgotPassword.html')
    cy.get('[aria-live="polite"]').should('contain', 'This email is not registered')  
})

Cypress.Commands.add('forgotPasswordRegisteredEmailAddress', ()=>{
    cy.visit('/forgotPassword.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.wait(8000)
    cy.location('pathname').should('equal', '/html/resetToken.html')
})

Cypress.Commands.add('hideFogortPasswordSideImage', ()=>{
    cy.visit('/forgotPassword.html')
    cy.viewport(768, 708)
    cy.get(".side-image").should('have.css', 'display', 'none')
})

//reset password token test suite commands
Cypress.Commands.add('resetTokenErrorHandling', ()=>{
    cy.visit('/resetToken.html')
    cy.get('#reset-token-btn').click()
    cy.location('pathname').should('equal', '/html/resetToken.html')
    cy.get('.error').should('contain', 'Please enter the token you got from your email')
})

Cypress.Commands.add('resetTokenInvalidToken', ()=>{
    cy.visit('/resetToken.html')
    cy.get('#token').type('invalid token')
    cy.get('#reset-token-btn').click()
    cy.location('pathname').should('equal', '/html/resetToken.html')
})

Cypress.Commands.add('resetTokenValidToken', ()=>{
    cy.visit('/resetToken.html')
    cy.get('#token').type('87871ee36f908de0')
    cy.get('#reset-token-btn').click()
    cy.location('pathname').should('contain', '/html/restPassword.html')
})

Cypress.Commands.add('hideResetPasswordTokenSideImage', ()=>{
    cy.visit('/resetToken.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})

//verify user account test commands
Cypress.Commands.add('setNewPasswordEmptyInputErrorHandling', ()=>{
    cy.visit('/setNewPassword.html')
    cy.get("#set-new-pwd-btn").click()
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
    cy.get('.otp-error').should('contain', 'Please enter your one time password')
})

Cypress.Commands.add('setNewPasswordUnmatched', ()=>{
    cy.visit('/setNewPassword.html')
    cy.get('#otp').type('khghhdfhj')
    cy.get('#new-password').type('test1234.')
    cy.get('#confirm-password').type('test678.')
    cy.get('#set-new-pwd-btn').click()
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
    cy.get('.confirm-password-error').should('contain', "Passwords don't match")
})

Cypress.Commands.add('hideSetNewPasswordSideImage', ()=>{
    cy.visit('/setNewPassword.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})

// deactivate account test commands
Cypress.Commands.add('deactivateAccountWithNoFormValues', ()=>{
    cy.visit('/deactivateAccount.html')
    cy.get('#deactivation-btn').click()
    cy.get('.password-error').should('contain', 'Please enter your password')
})

Cypress.Commands.add('deactivateAccountWithCorrectPassword', ()=>{
    cy.visit('/deactivateAccount.html?email=paulsanganyamawi@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#deactivation-btn').click()
    cy.location('pathname').should('equal', '/html/login.html')
})
Cypress.Commands.add('deactivateAccountWithWrongPassword', ()=>{
    cy.visit('/deactivateAccount.html?email=ekko@gmail.com')
    cy.get('#password').type('wrongPassword')
    cy.get('#deactivation-btn').click()
    cy.location('pathname').should('equal', '/html/deactivateAccount.html')
    cy.get('[aria-live="polite"]').should('contain', 'Authentication failed')
})

Cypress.Commands.add('hideDeactivateAcountSideImage', ()=>{
    cy.visit('/deactivateAccount.html?email=ekko@gmail.com')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})


// restore account test commands
Cypress.Commands.add('hideRestoreAccountSideImage', ()=>{
    cy.visit('/restoreAccount.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})

Cypress.Commands.add('restoreAccountWrongEmail', ()=>{
    cy.visit('/restoreAccount.html')
    cy.get('#email').type('p@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.get('[aria-live="polite"]').should('contain', 'This email is not registered')
    cy.location('pathname').should('equal', '/html/restoreAccount.html')
})

Cypress.Commands.add('restoreAccountCorrectEmail', ()=>{
    cy.visit('/restoreAccount.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.location('pathname').should('equal', '/html/login.html')
})

Cypress.Commands.add('restoreAccountWithNoValues', ()=>{
    cy.visit('/restoreAccount.html')
    cy.get('#confirm-email-btn').click()
    cy.get('.email-error').should('contain', 'Please enter the email you registered with.')
    cy.location('pathname').should('equal', '/html/restoreAccount.html')
})

Cypress.Commands.add('restoreAccountActiveAccount', ()=>{
    cy.visit('/restoreAccount.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.location('pathname').should('equal', '/html/restoreAccount.html')
    cy.get('[aria-live="polite"]').should('contain', 'User account is active')
})

//rest Password test commands
Cypress.Commands.add('hideRestPasswordSideImage', ()=>{
    cy.visit('/restPassword.html')
    cy.viewport(768, 708)
    cy.get('.side-image').should('have.css', 'display', 'none')
})

Cypress.Commands.add('restPassworWithNoValues', ()=>{
    cy.visit('/restPassword.html')
    cy.get('#set-new-pwd-btn').click()
    cy.location('pathname').should('equal', '/html/restPassword.html')
    cy.get('.new-password-error').should('contain', 'Please enter your new password')
})

Cypress.Commands.add('restPasswordWithDifferentPasswords', ()=>{
    cy.visit('/restPassword.html')
    cy.get('#new-password').type('Test@12345.')
    cy.get('#confirm-password').type('Test@67890')
    cy.get('#set-new-pwd-btn').click()
    cy.get('.confirm-password-error').should('contain', "Passwords don't match")
})

// home test commands
Cypress.Commands.add('homeFollowersHidden', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.viewport(1024, 942)
    cy.get('.followers').should('have.css', 'display', 'none')
})

Cypress.Commands.add('homeProfileLink', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.location('pathname').should('equal', '/html/profile.html')
})

Cypress.Commands.add('profileToEditProfilePage', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/profile.html')
    cy.get('#profileLink').click()
    cy.location('pathname').should('equal', '/html/updateProfile.html')
})

Cypress.Commands.add('profileToDeactivateAccountPage', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/profile.html')
    cy.get('#deactivateAccount').click()
    cy.location('pathname').should('equal', '/html/deactivateAccount.html')
})

Cypress.Commands.add('deletePost', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/profile.html')
    cy.get('.likes').eq(1).click()
})

Cypress.Commands.add('homeLikedPostsLink', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#likedPostLink').click()
    cy.location('pathname').should('equal', '/html/likedPosts.html')
})

Cypress.Commands.add('homeSearchPost', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.search-post').type('Software')
    cy.get('.posts').should('contain', 'Software Developer')
})

Cypress.Commands.add('homeSearchFollowing', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#search-user').type('Elvis')
    cy.get('.user-container').should('contain', 'Elvis Gisiora')
})

Cypress.Commands.add("homeToOtherUserPage", ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').first().click()
    cy.location('pathname').should('equal', '/html/otherUserProfile.html')
})

Cypress.Commands.add("homeToPostPage", ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').eq(1).click()
    cy.location('pathname').should('equal', '/html/post.html')
})

Cypress.Commands.add('likePost', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').eq(1).click()
    cy.location('pathname').should('equal', '/html/post.html')
    cy.get('.info-image img').dblclick()
})

Cypress.Commands.add('likeAlreadyLikedPost', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').eq(1).click()
    cy.location('pathname').should('equal', '/html/post.html')
    cy.get('.info-image img').dblclick()
    cy.get('[aria-live="polite"]').should('contain', 'User already liked the post')
})

Cypress.Commands.add('postComment', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').eq(1).click()
    cy.location('pathname').should('equal', '/html/post.html')
    cy.get('#new-post').type('Beautiful night sky')
    cy.get('#commentBtn').click()
    cy.get('.comment-list').should('contain', 'Beautiful night sky')
})

Cypress.Commands.add("createNewPost", ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#new-post').type('From Powder to Jinx')
    cy.get('#post-image-icon').click().selectFile('./cypress/fixtures/jinx.jpg')
    cy.wait(5000)
    cy.get('#new-post-btn').click()
    cy.get('.posts').should('contain', 'From Powder to Jinx')
})

Cypress.Commands.add('updatePost', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.location('pathname').should('equal', '/html/profile.html')
    cy.get('#editModal').should('have.css', 'display', 'none')
    cy.get('.comments').eq(1).click()
    cy.get('#editModal').should('have.css', 'display', 'block')
    cy.get('#closeModalBtn').click()
    cy.get('#editModal').should('have.css', 'display', 'none')
    cy.get('.comments').eq(1).click()
    cy.get('#new-post').clear().type('Updated post')
    cy.get('#post-image-icon').click().selectFile('./cypress/fixtures/jinx.jpg')
    cy.wait(6000)
    cy.get('#update-post-btn').click()
    cy.get('.post').should('contain', 'Updated post')
})

Cypress.Commands.add('updateProfile', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('#profileLink').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/profile.html')
    cy.get('#profileLink').click()
    cy.location('pathname').should('equal', '/html/updateProfile.html')
    cy.get('#first-name').clear().type("Ekko")
    cy.get('#last-name').clear().type("Jinx")
    cy.get('#email').clear().type('ekko@gmail.com')
    cy.get('#profile-pic-icon').selectFile('./cypress/fixtures/jinx.jpg')
    cy.wait(7000)
    cy.get('#registrationBtn').click()
    cy.location('pathname').should('equal', '/html/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
})

Cypress.Commands.add('deleteComment', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('ekko@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.viewport(1440, 1010)
    cy.location('pathname').should('equal', '/html/home.html')
    cy.get('.post a').eq(1).click()
    cy.location('pathname').should('equal', '/html/post.html')
    cy.get('#editModal').should('have.css', 'display', 'none')
    cy.get('.comment-list .content').first().click()
    cy.get('#editModal').should('have.css', 'display', 'block')
    cy.get('#closeModalBtn').click()
    cy.get('#editModal').should('have.css', 'display', 'none')
    cy.get('.comment-list .content').first().click()
    cy.get('#deleteIcon').click()
})