//

const renderDOM = require("./helpers");
let dom;
let document;

describe("index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("index.html");
    document = await dom.window.document;
  });

  it("displays a title when the login button is clicked", () => {
    const btn = document.querySelector("#login");
    btn.dispatchEvent(new dom.window.Event("click"));
    const div = document.querySelector("h2");
    expect(div.innerHTML).toContain("Welcome back to your Roo-tine");
  });

  it("displays login form when the login button is clicked", () => {
    const btn = document.querySelector("#login");
    btn.dispatchEvent(new dom.window.Event("click"));
    const logindiv = document.querySelector("#loginForm");
    expect(logindiv).toBeTruthy();
  });
});
