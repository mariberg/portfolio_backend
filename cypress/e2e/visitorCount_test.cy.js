/// <reference types="cypress" />


describe('Returns an updated value from database', () => {
  it('fetches visitorCount', () => {
    cy.request('POST', '/')
      .then((resp) => {
        const data = resp.body;

        expect(resp.status).to.eq(200)

        expect(data.Attributes.numberOfVisitors).to.not.be.oneOf([null, "", undefined])
      })
  })
})