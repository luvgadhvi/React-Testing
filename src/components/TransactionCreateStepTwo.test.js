import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("When all Fields are filled button button should be enable", async () => {
  render(<TransactionCreateStepTwo sender={{ id: 5 }} receiver={{ id: 5 }} />);
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
  userEvent.type(await screen.getByPlaceholderText(/amount/i), "50");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
  userEvent.type(await screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(await screen.getByPlaceholderText(/add a note/i), "Food");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
