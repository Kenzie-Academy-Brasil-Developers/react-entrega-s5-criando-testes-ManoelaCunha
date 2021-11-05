context("Search", () => {
  it("Enters the landing page", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);
  });

  it("Search an address", () => {
    cy.viewport(1440, 900);

    cy.intercept("GET", `${13504252}`, {
      complemento: "",
      bairro: "Jardim Bela Vista",
      cidade: "Rio Claro",
      logradouro: "Avenida 30",
      estado_info: {},
      cep: 13504252,
      cidade_info: {},
      estado: "SP",
    });

    cy.get("input").type(13504252);
    cy.get("button").click();
  });
});
