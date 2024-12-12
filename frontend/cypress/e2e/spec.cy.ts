describe("template spec", () => {
	beforeEach(() => {
		//cy.visit("http://host.docker.internal:5173/register");
		//cy.visit("http://localhost:5173/register");
		cy.visit("http://test-client-vite:5173/register");
	});
	it("passes", () => {
		//cy.get('[data-testid="register-username-label"]').type("");
		cy.get('[data-testid="register-username-label"]').should("exist");
		cy.get('[data-testid="register-username-label"]').should("exist");
	});
});
