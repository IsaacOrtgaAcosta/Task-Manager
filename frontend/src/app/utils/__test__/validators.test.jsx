import { emailValidation, passwordValidation } from "../validators";

describe('validators', () => {
    test("returns true for a valid email", () => {
        expect(emailValidation("testemail@gmail.com")).toBe(true);
    });

    test("returns false for an invalid email", () => {
        expect(emailValidation("testemail.com")).toBe(false);
    });

    test("returns true for a valid password", () => {
        expect(passwordValidation("abc123")).toBe(true);
    });

    test("returns false for a password without number", () => {
        expect(passwordValidation("abc")).toBe(false);
    })
})