//

const renderDOM = require("./helpers");
let dom;
let document;

describe("Render Testing", () => {
  beforeEach(async () => {
    dom = await renderDOM("index.html");
    document = await dom.window.document;
  }); 

  describe("Render Home", () => {
    
    it("create mainframe div", () => {
      const element = document.querySelector("#mainFrame")
      expect(element).toBeTruthy
    })
    
    it("create homeContainer mainframe", () => {
      const element = document.querySelector(".main-frame")
      expect(element).toBeTruthy
    })
    
    it("create h2 element with text with text \"Crush your goals\"", () => {
      const element = document.querySelector("h2")
      expect(element).toBeTruthy && expect(element.textContent).toBe("Crush your goals")
    })

    it("create h3 element with text with text \"Login to start now!\"", () => {
      const element = document.querySelector("h3")
      expect(element).toBeTruthy && expect(element.textContent).toBe("Login to start now!")
    })
    

  }); // end render home

  describe("Render Login Form", () => {
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

    describe("Render Register Form", () => {
      // it("displays a title when the login button is clicked", () => {
      //   const btn = document.querySelector("#login");
      //   btn.dispatchEvent(new dom.window.Event("click"));
      //   const div = document.querySelector("h2");
      //   expect(div.innerHTML).toContain("Welcome back to your Roo-tine");
      // });

      // it("displays login form when the login button is clicked", () => {
      //   const btn = document.querySelector("#login");
      //   btn.dispatchEvent(new dom.window.Event("click"));
      //   const logindiv = document.querySelector("#loginForm");
      //   expect(logindiv).toBeTruthy();
      // });
    }); // end reg form
  });
});
