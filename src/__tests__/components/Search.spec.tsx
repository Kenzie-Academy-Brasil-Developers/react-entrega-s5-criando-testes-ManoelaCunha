import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
import Providers from "../../providers/index";

describe("Search Component", () => {
  //Testes Unitários
  test("should be able to render an input", () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/Insira o CEP/i)).toBeTruthy();
  });

  test("should let the button disabled when the input value is empty", () => {
    render(<Search />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  //Teste Integração
  test("should be able to look up an address", async () => {
    render(
      <Providers>
        <Search />
      </Providers>
    );

    const cepField = screen.getByPlaceholderText(/Insira o CEP/i);
    const buttonElement = screen.getByText(/Buscar pelo CEP/i);

    fireEvent.change(cepField, { target: { value: 13504252 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(cepField).toHaveValue(13504252);
    });
  });

  //Teste Integração - Cenário de Erro
  test("should not be able to look up an address with invalid cep", async () => {
    render(
      <Providers>
        <Search />
      </Providers>
    );

    const cepField = screen.getByPlaceholderText(/Insira o CEP/i);
    const buttonElement = screen.getByText(/Buscar pelo CEP/i);

    fireEvent.change(cepField, { target: { value: 135042 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(cepField).not.toHaveValue(13504252);
    });
  });
});
