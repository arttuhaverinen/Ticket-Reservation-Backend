describe("template spec", () => {
	beforeEach(() => {
		//cy.wait(5000); // Wait for 5 seconds to give Vite time to start
		//cy.visit("http://host.docker.internal:5173/register");
		//cy.visit("http://localhost:3000");

		cy.visit("http://localhost:5173");
		//cy.request("http://test-client-vite:5173").then((response) => {
		//	console.log(response);
		//});
		cy.wait(5000);

		cy.screenshot("fullpage", { capture: "fullPage" });
	});
	it("should have the navbar", () => {
		//cy.get('[data-testid="register-username-label"]').type("");
		cy.get('[data-testid="navbar"]').should("exist");
	});
	it("posts will load", () => {
		cy.wait(5000);
		//cy.get('[data-testid="register-username-label"]').type("");
		cy.get('[data-testid="post-div"]').should("exist");
	});
});
