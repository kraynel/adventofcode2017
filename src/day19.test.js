const { getLetters } = require("./day19");
const fs = require("fs");

describe("getLetters", () => {
  it("should getLetters", () => {
    expect(
      getLetters(`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+`).letters
    ).toBe("ABCDEF");
  });

  it("should get the value", done => {
    fs.readFile("inputs/day19.txt", "utf8", (err, data) => {
      expect(getLetters(data).letters).toMatchSnapshot();
      done();
    });
  });
});

describe("getSteps", () => {
  it("should getLetters", () => {
    expect(
      getLetters(`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+`).steps
    ).toBe(38);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day19.txt", "utf8", (err, data) => {
      expect(getLetters(data).steps).toMatchSnapshot();
      done();
    });
  });
});
