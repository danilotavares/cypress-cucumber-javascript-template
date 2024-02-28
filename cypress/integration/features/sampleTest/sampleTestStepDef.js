/// <reference types="Cypress" />
import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps"; // have to import these, so that cypress can recognise cucumber keywords

Given("We visit knoldus Website", function(){ // we can make an anonymus function as well here, use "()=>" instead of function() 
cy.visit("https://www.knoldus.com/home")
})

When("We click on blogs and search for cypress",()=>{
    cy.contains("Blog").invoke("removeAttr","target").click({force: true}) // using {force: true} as the element is being overlapped by some other webElement
    // we have used here, .invoke, it enables cypress to use jquery functions and to remove attribute we used removeAttr() which is a jquery function.
    cy.wait(1000)
    cy.get("#tophead > div > a").click() // to click on search option
    cy.wait(1000)
    cy.get("input[placeholder='Search …']").type("cypress{enter}") // to search for 'cypress' and then pressing enter.
})

And("Open the blog Cypress-101",function(){
    cy.contains("Cypress – 101").click() // to click on the desired blog
})

Then("assert",()=>{
    cy.url().should("include","https://blog.knoldus.com/cypress-101/") // to assert that we succesfully move to the redirected url
})
