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

Cypress.Commands.add('loginDataSanitization', ()=>{
    cy.get('#email')
    cy.get('#password')
    cy.get('#login-btn').click()
})

Cypress.Commands.add('registrationErrorHandling', ()=>{
    cy.visit('/register.html')
    cy.get('#registrationBtn').click()
    cy.get('.first-name-error').should('contain', 'Please enter your first name')
    cy.get('.last-name-error').should('contain', 'Please enter your last name')
    cy.get('.email-error').should('contain', 'Please enter your email address')
    cy.get('.password-error').should('contain', 'Please enter your password')
    cy.location('pathname').should('equal', '/html/register.html')
})

Cypress.Commands.add('forgotPasswordErrorHandling', ()=>{
    cy.visit('/forgotPassword.html')
    cy.get('#confirm-email-btn').click()
    cy.location('pathname').should('equal', '/html/forgotPassword.html')
    cy.get('.email-error').should('contain', 'Please enter the email you registered with.')
})

Cypress.Commands.add('resetTokenErrorHandling', ()=>{
    cy.visit('/resetToken.html')
    cy.get('#reset-token-btn').click()
    cy.get('.token-error').should('contain', 'Please enter the token you got from your email')
    cy.location('pathname').should('equal', '/html/resetToken.html')

})

Cypress.Commands.add('setNewPasswordEmptyInputErrorHandling', ()=>{
    cy.visit('/setNewPassword.html')
    cy.get("#set-new-pwd-btn").click()
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
    cy.get('.new-password-error').should('contain', 'Please enter your new password')
    cy.get('.confirm-password-error').should('contain', 'Please confrim your password')
})

Cypress.Commands.add('setNewPasswordUnmatched', ()=>{
    cy.visit('/setNewPassword.html')
    cy.get('#new-password').type('test1234.')
    cy.get('#confirm-password').type('test678.')
    cy.get('#set-new-pwd-btn').click()
    cy.location('pathname').should('equal', '/html/setNewPassword.html')
    cy.get('.confirm-password-error').should('contain', "Passwords don't match")
})