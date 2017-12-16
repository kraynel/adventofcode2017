const { letsDance, letsDanceWithInput } = require("./day16");
const fs = require("fs");

describe("letsDance", () => {
  it("should dance", () => {
    expect(letsDance("s1,x3/4,pe/b", 5)).toBe("baedc");
  });

  it("should get the value", done => {
    fs.readFile("inputs/day16.txt", "utf8", (err, data) => {
      expect(letsDance(data)).toMatchSnapshot();
      done();
    });
  });

  it("should get the value", done => {
    fs.readFile("inputs/day16.txt", "utf8", (err, data) => {
      let val = letsDanceWithInput(data, "abcdefghijklmnop");
      let cycle = 1;
      while (val !== "abcdefghijklmnop") {
        val = letsDanceWithInput(data, val);
        cycle++;
      }

      const toLoop = 1e9 % cycle;

      val = letsDanceWithInput(data, "abcdefghijklmnop");
      for (let i = 0; i < toLoop - 1; i++) val = letsDanceWithInput(data, val);

      expect(val).toMatchSnapshot();
      done();
    });
  });
});
