///<reference types="Cypress"/>

describe('Restore Account Test suites', ()=>{

    it('should hide side image if viewport is at max-width of 800px or below', ()=>{
        cy.hideRestoreAccountSideImage()
    })

    it('should display error messages if user provides an unregistred email', ()=>{
        cy.restoreAccountWrongEmail()
    })

    // it('should navigate to login page if user provides correct email address', ()=>{
    //     cy.restoreAccountCorrectEmail()
    // })

    it('should display error message if user submits form with no values', ()=>{
        cy.restoreAccountWithNoValues()
    })
    it('should display error message if account is already active', ()=>{
        cy.restoreAccountActiveAccount()
    })
})