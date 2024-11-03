describe("template spec", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/register");
	});
	it("passes", () => {
		//cy.get('[data-testid="register-username-label"]').type("");
		cy.get('[data-testid="register-username-label"]').should("exist");
		cy.get('[data-testid="register-username-label"]').should("exist");
	});
});
