describe("APP TESTS", () => {
  const name = "the 1";
  const link = "https://www.youtube.com/watch?v=KsZ6tROaVOQ";
  const baseUrl = "http://localhost:3001/";

  it("should create a recommendation and vote successfully", () => {
    cy.visit(baseUrl);

    cy.get("#name").type(name);
    cy.get("#link").type(link);

    cy.intercept("http://localhost:5000/recommendations").as("createRecommendation");

    cy.get("#submit").click();

    cy.wait("@createRecommendation");

    cy.contains(name).parent().find("#arrow-up").click();

    cy.contains(name).parent().find("#arrow-up").next().should("have.text", "1");

    cy.contains(name).parent().find("#arrow-down").click();

    cy.contains(name).parent().find("#arrow-down").prev().should("have.text", "0");
  });

  it("should navigate successfully between pages,", () => {
    cy.visit(baseUrl);

    cy.contains("Top").click();

    cy.url().should("equal", "http://localhost:3001/top");
    
    cy.contains("Random").click();

    cy.url().should("equal", "http://localhost:3001/random");
    
    cy.contains("Home").click();

    cy.url().should("equal", "http://localhost:3001/");
  });
});