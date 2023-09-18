///<reference types="Cypress"/>

describe('Rest Password Test Suites', ()=>{
    it('should not display side image at viewport with max-width of 800px or below', ()=>{
        cy.hideRestPasswordSideImage()
    })

    it('should show error if user submits form with no values', ()=>{
        cy.restPassworWithNoValues()
    })
    it('should show error if user enters passwords that do not match', ()=>{
        cy.restPasswordWithDifferentPasswords()
    })
})