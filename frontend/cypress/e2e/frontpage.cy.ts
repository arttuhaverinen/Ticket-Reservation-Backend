describe("template spec", () => {
	beforeEach(() => {
		cy.wait(5000); // Wait for 5 seconds to give Vite time to start
		//cy.visit("http://host.docker.internal:5173/register");
		//cy.visit("http://localhost:5173");
		cy.visit("http://test-client-vite:5173", { failOnStatusCode: false });
		cy.request("http://test-client-vite:5173").then((response) => {
			console.log(response);
		});

		cy.screenshot("register-page");
	});
	it("passes", () => {
		//cy.get('[data-testid="register-username-label"]').type("");
		cy.get('[data-testid="navbar"]').should("exist");
	});
});
