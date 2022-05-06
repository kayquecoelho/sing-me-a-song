describe("APP TESTS", () => {
  const name = "the 1";
  const link = "https://www.youtube.com/watch?v=KsZ6tROaVOQ";
  const baseUrl = "http://localhost:3000/";

  beforeEach(() => cy.resetDatabase());

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
    
    cy.intercept("/recommendations/top/10").as("topTrendsRequest");

    cy.contains("Top").click();

    cy.wait("@topTrendsRequest");

    cy.url().should("equal", "http://localhost:3000/top");

    cy.intercept("/recommendations/random").as("randomRequest");

    cy.contains("Random").click();

    cy.wait("@randomRequest");

    cy.url().should("equal", "http://localhost:3000/random");
    
    cy.intercept("/recommendations").as("home");;

    cy.contains("Home").click();

    cy.wait("@home");

    cy.url().should("equal", "http://localhost:3000/");
  });
});