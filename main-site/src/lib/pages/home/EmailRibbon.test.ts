import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/svelte";
import EmailRibbon from "./EmailRibbon.svelte";

describe("Email Ribbon", () => {
  test("shows email form on first render", () => {
    render(EmailRibbon);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeVisible();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("see thank you message an submitting email", async () => {
    render(EmailRibbon);

    const emailInput = screen.getByRole("textbox");
    await act(() =>
      fireEvent.input(emailInput, { target: { value: "test@ttttest.sss" } })
    );

    const button = screen.getByRole("button");

    await fireEvent.click(button);

    const thanksMsg = screen.getByText(
      "Thanks for signing up for notifications!"
    );
    expect(thanksMsg).toBeVisible;

    const anotherButton = screen.getByText("Another Email");
    expect(anotherButton).toBeVisible();
  });

  test("submit another email after submitting one", async () => {
    render(EmailRibbon);

    const emailInput = screen.getByRole("textbox");
    await act(() =>
      fireEvent.input(emailInput, { target: { value: "test@ttttest.sss" } })
    );

    const button = screen.getByRole("button");

    await fireEvent.click(button);

    const anotherButton = screen.getByText("Another Email");
    await fireEvent.click(anotherButton);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeVisible();

    const signupMsg = screen.getByText(
      "Interested in signing up for notifications?"
    );
    expect(signupMsg).toBeVisible;

    const signUpButton = screen.getByText("Signup");
    expect(signUpButton).toBeVisible();
  });
});
