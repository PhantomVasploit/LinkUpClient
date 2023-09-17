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
    cy.get('#email').type('paul.nyamawi99@gmail.com')
    cy.get('#password').type('dnfjhghkjgbjnh')
    cy.get('#login-btn').click()
    cy.get('[aria-live="polite"]').should('contain', 'Invalid login credentials')
})

Cypress.Commands.add('loginWithRightCredentials', ()=>{
    cy.visit('/login.html')
    cy.get('#email').type('paul.nyamawi99@gmail.com')
    cy.get('#password').type('pajoy9903')
    cy.get('#login-btn').click()
    cy.location('pathname').should('equal', '/html/home.html')
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
    cy.get('#email').type('paul.nyamawi99@gmail.com')
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
    cy.get('#email').type('paul.nyamawi99@gmail.com')
    cy.get("#profile-picture-label").selectFile('./cypress/fixtures/user.png')
    cy.wait(4000)
    cy.get('#registrationBtn').click()
    cy.wait(10000)
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
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
    cy.get('#email').type('paul.nyamawi99@gmail.com')
    cy.get('#confirm-email-btn').click()
    cy.wait(8000)
    cy.location('pathname').should('equal', '/html/resetToken.html')
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

// deactivate account test commands
Cypress.Commands.add('deactivateAccountWithNoFormValues', ()=>{
    cy.visit('/deactivateAccount.html')
    
})
