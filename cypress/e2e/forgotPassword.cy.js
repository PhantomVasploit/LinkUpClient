///<reference types="Cypress"/>

describe('forgot password test suite', ()=>{

    it('should display error message when user tries to submit a form with no values', ()=>{
        cy.forgotPasswordErrorHandling()
    })

})