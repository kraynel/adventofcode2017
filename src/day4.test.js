const {
  countPassphrase,
  countPassphrase2,
  isValid,
  isValid2
} = require("./day4");
const fs = require("fs");

describe("countPassphrase", () => {
  it("should check if is valid 1", () => {
    expect(isValid("aa bb cc dd ee")).toBeTruthy();
  });

  it("should check if is valid 2", () => {
    expect(isValid("aa bb cc dd aa")).toBeFalsy();
  });

  it("should check if is valid 3", () => {
    expect(isValid("aa bb cc dd aaa")).toBeTruthy();
  });

  it("should count correct passphrases", () => {
    expect(
      countPassphrase(`aa bb cc dd aaa
aa bb cc dd ee
aa bb cc dd aa`)
    ).toBe(2);
  });

  it("should log the correct value", done => {
    fs.readFile("inputs/day4.txt", "utf8", (err, data) => {
      expect(countPassphrase(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("countPassphrase2", () => {
  it("should check if is valid 1", () => {
    expect(isValid2("abcde fghij")).toBeTruthy();
  });

  it("should check if is valid 2", () => {
    expect(isValid2("abcde xyz ecdab")).toBeFalsy();
  });

  it("should check if is valid 3", () => {
    expect(isValid2("a ab abc abd abf abj")).toBeTruthy();
  });

  it("should check if is valid 4", () => {
    expect(isValid2("iiii oiii ooii oooi oooo")).toBeTruthy();
  });

  it("should check if is valid 5", () => {
    expect(isValid2("oiii ioii iioi iiio")).toBeFalsy();
  });

  it("should log the correct value", done => {
    fs.readFile("inputs/day4.txt", "utf8", (err, data) => {
      expect(countPassphrase2(data)).toMatchSnapshot();
      done();
    });
  });
});
