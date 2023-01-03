import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  act,
  cleanup
} from "@testing-library/svelte";
import EmailRibbon from "./EmailRibbon.svelte";

describe("Email Ribbon", () => {
  afterEach(() => {
    cleanup();
  }); // Default on import: runs it after each test.
  test("shows email form on first render", () => {
    let emailAddress: string = "";
    let addEmailFunc = async function (email: string) {
      emailAddress = email;
    };
    render(EmailRibbon, { addEmailFunc: addEmailFunc });

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeVisible();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("see thank you message an submitting email", async () => {
    let emailAddress: string = "";
    let actaulEmailAddress = "test@ttttest.sss";
    let addEmailFunc = async function (email: string) {
      emailAddress = email;
    };
    render(EmailRibbon, { addEmailFunc: addEmailFunc });

    const emailInput = screen.getByRole("textbox");
    await act(() =>
      fireEvent.input(emailInput, { target: { value: actaulEmailAddress } })
    );

    const button = screen.getByText("Signup");
    expect(button).toBeVisible();

    await fireEvent.click(button);

    const thanksMsg = screen.getByText("Want to submit another email?");
    expect(thanksMsg).toBeVisible;

    const anotherButton = screen.getByText("Another Email");
    expect(anotherButton).toBeVisible();
    expect(emailAddress).toEqual(actaulEmailAddress);
  });

  test("submit another email after submitting an email", async () => {
    let emailAddress: string = "";
    let actaulEmailAddress = "test@ttttest.sss";
    let addEmailFunc = async function (email: string) {
      emailAddress = email;
    };
    render(EmailRibbon, { addEmailFunc: addEmailFunc });

    const emailInput = screen.getByRole("textbox");
    await act(() =>
      fireEvent.input(emailInput, { target: { value: actaulEmailAddress } })
    );

    const button = screen.getByText("Signup");
    expect(button).toBeVisible();

    await fireEvent.click(button);

    const anotherButton = screen.getByText("Another Email");
    await fireEvent.click(anotherButton);

    const inputElement = screen.getByPlaceholderText("you@example.com");
    expect(inputElement).toBeVisible();

    const signUpButton = screen.getByText("Signup");
    expect(signUpButton).toBeVisible();

    expect(emailAddress).toEqual(actaulEmailAddress);
  });
});
