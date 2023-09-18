///<reference types="Cypress"/>

describe('forgot password test suite', ()=>{

    it('should display error message when user tries to submit a form with no values', ()=>{
        cy.forgotPasswordErrorHandling()
    })

    it('should display error message if email is not registered', ()=>{
        cy.forgotPasswordUnregisteredEmailAddress()
    })

    it('should navigate to reset password token page if user email is valid', ()=>{
        cy.forgotPasswordRegisteredEmailAddress()
    })

    it('should hide side image at a viewport with max-width at 800px or below', ()=>{
        cy.hideFogortPasswordSideImage()
    })
})