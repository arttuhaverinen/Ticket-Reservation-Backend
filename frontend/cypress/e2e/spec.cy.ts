describe("template spec", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173/register");
	});
	it("passes", () => {
		cy.get('[data-testid="register-username-label"]').should("exist");
	});
});
