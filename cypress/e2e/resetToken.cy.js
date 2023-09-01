///<reference types="Cypress"/>

describe('reset token test suite', ()=>{

    it('should display error message when no value is given', ()=>{
        cy.resetTokenErrorHandling()
    })

})