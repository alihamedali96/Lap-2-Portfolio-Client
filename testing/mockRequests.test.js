
const renderDOM = require("./helpers");
let dom;
let document;


describe("Something else", () => {
  beforeEach(async () => {
    dom = await renderDOM("index.html");
    document = await dom.window.document;
  });
});
