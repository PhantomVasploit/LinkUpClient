///<reference types="Cypress"/>

describe('set new password test suites', ()=>{

    it('should display error messages when a user tries to submit empty input values', ()=>{

        cy.setNewPasswordEmptyInputErrorHandling()

    })

    it(`should display error message when the passwords don't match`, ()=>{
        cy.setNewPasswordUnmatched()
    })

    it('should hide side image at a viewport with max-width of 800px or below', ()=>{
        cy.hideSetNewPasswordSideImage()
    })

})