import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../LoginPage";
import { login } from "../../../api/auth.api";

const mockNavigate = jest.fn();
const mockSaveSession = jest.fn();

jest.mock("../../../api/auth.api", () => ({
  login: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../providers/AuthProvider", () => ({
  useAuth: () => ({
    login: mockSaveSession,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("logs in and navigates to /tasks when credentials are valid", async () => {
    login.mockResolvedValue({ token: "fake-token", user: { id: 1 } });

    render(<LoginPage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/email/i, { selector: "input" }),
      "test@test.com",
    );

    await user.type(
      screen.getByLabelText(/password/i, { selector: "input" }),
      "abc123",
    );

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(login).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "abc123",
    });

    expect(mockSaveSession).toHaveBeenCalledWith({
      token: "fake-token",
      user: { id: 1 },
    });

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  test("does not call login if email is invalid", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/email/i, { selector: "input" }),
      "bademail",
    );
    await user.type(
      screen.getByLabelText(/password/i, { selector: "input" }),
      "abc123",
    );

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(login).not.toHaveBeenCalled();
  });

  test("does not call login if password is invalid", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/email/i, { selector: "input" }),
      "test@test.com",
    );
    await user.type(
      screen.getByLabelText(/password/i, { selector: "input" }),
      "abc",
    );

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(login).not.toHaveBeenCalled();
  });
});
