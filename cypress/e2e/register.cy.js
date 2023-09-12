///<reference types="Cypress"/>

// import 'cypress-file-upload';


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

    // it('should navigate to set new password page once the registration is successful', ()=>{
    //     cy.registerUser()
    // })

    it('should display email already registered error when email being registered is alreday registered', ()=>{
        cy.registrationEmailAlreadyRegistered()
    })
    
})