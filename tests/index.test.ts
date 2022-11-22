import { parseNull, parseString } from "../src/utilities/parsers";

describe("Testing parsers", () => {
  describe("Parsing strings", () => {
    test('Removing " from "Hello World!"', () => {
      expect(parseString('"Hello World!"')).toBe("Hello World!");
    });
    test("Don't change Hello World!", () => {
      expect(parseString("Hello World!")).toBe("Hello World!");
    });
  });
  test("Parse null from (null)", () => {
    expect(parseNull("(null)")).toBeNull();
  });
});
