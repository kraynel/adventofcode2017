const { getHash, getHash2 } = require("./day1");
const fs = require("fs");

describe("getHash", () => {
  it("should solve example hash 1", () => {
    expect(getHash("1122")).toBe(3);
  });

  it("should solve example hash 2", () => {
    expect(getHash("1111")).toBe(4);
  });

  it("should solve example hash 3", () => {
    expect(getHash("1234")).toBe(0);
  });

  it("should solve example hash 4", () => {
    expect(getHash("91212129")).toBe(9);
  });

  it("should give the answer", done => {
    fs.readFile("inputs/day1.txt", "utf8", (err, data) => {
      expect(getHash(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("getHash2", () => {
  it("should solve example hash 1", () => {
    expect(getHash2("1212")).toBe(6);
  });

  it("should solve example hash 2", () => {
    expect(getHash2("1221")).toBe(0);
  });

  it("should solve example hash 3", () => {
    expect(getHash2("123425")).toBe(4);
  });

  it("should solve example hash 4", () => {
    expect(getHash2("123123")).toBe(12);
  });

  it("should solve example hash 5", () => {
    expect(getHash2("12131415")).toBe(4);
  });

  it("should give the answer", done => {
    fs.readFile("inputs/day1.txt", "utf8", (err, data) => {
      expect(getHash2(data)).toMatchSnapshot();
      done();
    });
  });
});
