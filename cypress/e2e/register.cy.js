///<reference types="Cypress"/>

describe('register test suite', ()=>{

    it('should display error messages when the field have no values', ()=>{
        cy.registrationErrorHandling()
    })

    it('should navigate to login page if "Have an account? Sign in" text is clicked ', ()=>{
        cy.visit('/register.html')
        cy.get('#loginNavigation').click()
        cy.location('pathname').should('not.equal', '/register')
        cy.location('pathname').should('equal', '/html/login.html')
    })
    
})