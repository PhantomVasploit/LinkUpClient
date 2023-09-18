///<reference types="Cypress"/>

describe('deactivate account test suites', ()=>{
    it('should display error message if no value is provided', ()=>{
        cy.deactivateAccountWithNoFormValues()
    })
    it('should display errors if user provides wrong password', ()=>{
        cy.deactivateAccountWithWrongPassword()
    })
    // it('should navigate to login if user enters the right password', ()=>{
    //     cy.deactivateAccountWithCorrectPassword()
    // })
    it('should not display side image at viewport of max-width of 800px or below', ()=>{
        cy.hideDeactivateAcountSideImage()
    })
})