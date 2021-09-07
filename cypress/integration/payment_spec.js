describe("Payment", () => {
  it("User Can Make Payment", () => {
    //Login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    //Check account Balance
    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      oldBalance = $balance.text();
    });
    cy.findByRole("button", { name: /new/i, hidden: true }).click();
    cy.findByText(/devon becker/i).click();
    cy.findByPlaceholderText(/amount/i).type("50");
    cy.findByPlaceholderText(/add a note/i).type("Food");
    cy.findByRole("button", { name: /pay/i }).click();
    cy.findByRole("button", { name: /return to transactions/i, hidden: true }).click();
    cy.findByRole("tab", { name: /mine/i, hidden: true }).click();
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(50));
    });
  });
});
