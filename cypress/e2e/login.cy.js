///<reference types="Cypress"/>

describe('login test suit', () => {
  
  it('should display error message if user tries to submit an empty form', ()=>{
    cy.loginDataSanitization()
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

  it('should display error message when user user submits an unregistered email address', ()=>{
    cy.loginWithWrongEmailAddress()
  })

  it('should display error message when user submits an invalid password', ()=>{
    cy.loginWithWrongPassword()
  })

  it('should login in user and navigate to home if login is successful', ()=>{
    cy.loginWithRightCredentials()
  })

})