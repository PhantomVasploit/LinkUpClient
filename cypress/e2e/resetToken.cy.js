///<reference types="Cypress"/>

describe('reset token test suite', ()=>{

    it('should display error message if user provides an invalid token', ()=>{
        cy.resetTokenInvalidToken()
    })

    it('should display error message when no value is given', ()=>{
        cy.resetTokenErrorHandling()
    })

    it('should hide side image when viewport is at a max-width of 800px', ()=>{
        cy.hideResetPasswordTokenSideImage()
    })

    // it('should navigate to restPassword.html if token is valid', ()=>{
    //     cy.resetTokenValidToken()
    // })
})