///<reference types="Cypress"/>

describe('login test suit', () => {
  
  it('should show error messages when ', () => {
    cy.visit('/login.html')
    cy.loginDataSanitization()
    cy.get('.email-error').should('contain', 'Please provide your email address')
    cy.get('.password-error').should('contain', 'Please enter your password')
  })

  it('should navigate to forgot password page if the forgot password text is clicked', ()=>{
    cy.visit('/login.html')
    cy.get('#forgot-pwd').click()
    cy.location('pathname').should('not.equal', '/login.html')
    cy.location('pathname').should('equal', '/html/forgotPassword.html')
  })

  it('should navigate to registration page when the "Dont you have an account? Sign up" text is clicked', ()=>{
    cy.visit('/login.html')
    cy.get('#registrationNavigation').click()
    cy.location('pathname').should('not.equal', '/login.html')
    cy.location('pathname').should('equal', '/html/register.html')
  })

})