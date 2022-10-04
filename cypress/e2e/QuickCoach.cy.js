const {username, lorem} = require('../../credentials.json')



describe('Open page', () => {
  beforeEach(()=>{
    cy.visit(Cypress.env('path'))
    cy.viewport(1920, 1080)
    cy.get('input:first').type(username)
    cy.get('button').click()
    if(Cypress.env('type') === 'local'){
      cy.get('#code').then( (el)=>{
      cy.get('#code').click()
      const text = el.text()
      const numRegex = /(\d+)/g;
      const code = text.match(numRegex)[0];
      cy.log(code)
      cy.get('input:first').type(code)})
    } else {
      cy.pause()
    }
    cy.get('button:first').click()
  })
  
  it('Create new workout', () => {
    cy.contains('Create a Plan').click()
    cy.contains('OK').click()
    const optionsMenuIcon = cy.get('[data-testid="MoreVertIcon"]')
    optionsMenuIcon.first().click()
    
    const supersetButton = cy.contains('Create Superset')
    supersetButton.click()
    supersetButton.should('be.disabled')
  
    const addRowButton = cy.contains('Add a new row')
    addRowButton.click().should('be.disabled')
    cy.wait(2000)
    addRowButton.should('be.enabled')
  })
  
  it.only('Create workout and completed it', () => {
      cy.contains( 'Create a Plan' ).click()
      cy.contains( 'OK' ).click()
      cy.get( 'input[name="title"]' ).type( 'Cypress Test Workout' )
      // create a new supersets
      let optionsMenuIcon = cy.get( '[data-testid="MoreVertIcon"]' )
      optionsMenuIcon.eq( 0 ).click()
      let supersetButton = cy.contains( 'Create Superset' )
      supersetButton.click()
      optionsMenuIcon = cy.get( '[data-testid="MoreVertIcon"]' )
      optionsMenuIcon.eq( 1 ).click()
      supersetButton = cy.contains( 'Create Superset' )
      supersetButton.click()
      cy.wait( 2000 )
      // add a new row to the first superset
      let addRowButton = cy.get( '[data-testid="AddCircleOutlineIcon"]' )
      addRowButton.eq( 0 ).click()
      cy.wait( 2000 )
      // add a new row to the second superset
      addRowButton = cy.get( '[data-testid="AddCircleOutlineIcon"]' )
      addRowButton.eq( 1 ).click()
      cy.wait( 2000 )
      //fill the first row
      cy.get( 'input[id="movementField"]' ).each( ( el, index, list ) => {
        cy.get( 'input[id="movementField"]' ).eq( index ).type( 'pr' )
        cy.contains( 'press' ).click()
        cy.get( 'input[id="movementField"]' ).eq( index ).click().tab().type( '1' ).tab().type( '2' ).tab().type( '3' ).tab()
      } )
      // test drag and drop
        cy.get( '[alt="drag"]' ).eq( 0 )
            .trigger( 'mousedown' )
            .trigger('mousemove', { clientX: 0, clientY: 500 })
            .trigger('mouseup')
      
      // publish the workout
      cy.contains( 'Publish plan' ).click()
      cy.get( '[id=tags-outlined]' ).last().click()
      cy.contains( 'cypress testing' ).click()
      cy.contains( 'Publish and finish' ).click()
      
      // complete the workout
      cy.visit( `${Cypress.env('userPath')}` )
      cy.viewport( 414, 896 )
      cy.contains( 'Cypress Test Workout' ).first().click()
      cy.get( '[placeholder="Result"]' ).each( ( el, index, list ) => {
        cy.get( '[placeholder="Result"]' ).eq( index ).type( `res ${ index }` ).tab()
      } )
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
        cy.get('[type="checkbox"]').eq( index ).click()
      })
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
          cy.get('[type="checkbox"]').eq( index ).click()
      })
      
      cy.get( '[placeholder="Result"]' ).each( ( el, index, list ) => {
          cy.get( '[placeholder="Result"]' ).eq( index ).type( `res ${ index }` ).tab()
      } )
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
          cy.get('[type="checkbox"]').eq( index ).click()
      })
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
          cy.get('[type="checkbox"]').eq( index ).click()
      })
    
    
      cy.get( '[placeholder="Result"]' ).each( ( el, index, list ) => {
          cy.get( '[placeholder="Result"]' ).eq( index ).type( `res ${ index }` ).tab()
      } )
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
          cy.get('[type="checkbox"]').eq( index ).click()
      })
    
      cy.get('[type="checkbox"]').each( ( el, index, list ) => {
          cy.get('[type="checkbox"]').eq( index ).click()
      })
    
      // cy.contains( 'Finish plan' ).click()
      // cy.contains( 'Provide feedback' ).click()
      // cy.get( 'textarea' ).type( lorem )
      // cy.contains( 'Continue to post' ).click()
      // cy.wait( 2000 )
      // cy.contains( 'Submit survey' ).click()
      // cy.contains( 'Finish' ).click()
      // cy.visit( `${Cypress.env('path')}main` )
      // cy.viewport( 1920, 1080 )
    
  })
  
  // it.only('Clean workouts', () => {
  //   cy.get('[src="https://res.cloudinary.com/workouts/image/upload/v1/resources/images/bolt?_a=ATO2BAA0"]').eq(0).click()
  //   cy.get('[alt="remove"]').each((el)=>{
  //     cy.wrap(el).click()
  //     cy.get('[type="button"]').contains('Delete').click()
  //   })
  // })
  
  
  // it('test workout clicks', () =>{
  // })
  
  it('Add new client', () => {
    cy.contains('Add a new client').click()
    cy.contains('Add a Client').click()
    cy.get('input[name="firstName"]').type(`cypress`)
    cy.get('input[name="lastName"]').type(`testing`)
    cy.get('input[name="phone"]').type(`1234567890`)
    cy.get('input[name="email"]').type(`cypress-testing@gmail.com`)
    cy.get('textarea[name="objective"]').type(lorem)
    cy.contains('Create client').click()
  })
})


//function to generate a random hash for the client name to avoid duplicates 10 characters long
function randomHash() {
  return Math.random().toString(36).substring(2, 10);
}
