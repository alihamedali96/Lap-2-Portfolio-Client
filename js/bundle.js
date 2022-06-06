(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        const sendNewUser = require("./requests");

        const mainFrame = document.getElementById("mainframe");

        // Reset hash and homepage content
        function resetMainFrame() {
          window.location.hash = "";
          mainFrame.innerHTML = "";
        }

        // render Home page
        function renderHome() {
          resetMainFrame();

          /// Create Text Elements and layout
          const homeContainer = document.createElement("div");
          homeContainer.className = "main-frame";
          const homeTitle = document.createElement("h2");
          homeTitle.textContent = "Crush your goals";
          const homeText = document.createElement("h3");
          homeText.textContent = "Login to start now!";

          // Login Button
          const loginButton = document.createElement("button");
          loginButton.id = "login";
          loginButton.textContent = "Login";
          loginButton.className = "btn";
          loginButton.addEventListener("click", (e) => {
            renderLogin(e);
          });

          // Sign up button
          const signupButton = document.createElement("button");
          signupButton.id = "signup";
          signupButton.textContent = "Sign Up";
          signupButton.className = "btn";
          signupButton.addEventListener("click", (e) => {
            renderSignup(e);
          });
          // Append elements for homepage
          homeContainer.append(homeTitle, homeText, loginButton, signupButton);
          mainFrame.append(homeContainer);
        }

        // make render reg form
        function renderLogin(e) {
          e.preventDefault();
          resetMainFrame();

          const loginframe = document.createElement("div");
          loginframe.className = "login-frame";

          const loginHeader = document.createElement("div");
          loginHeader.className = "login-header";

          const loginMain = document.createElement("div");
          loginMain.className = "login-main";

          const loginTitle = document.createElement("h2");
          loginTitle.textContent = "Welcome back to your Roo-tine";
          const loginText = document.createElement("h3");
          loginText.textContent = "Please login in";

          loginHeader.append(loginTitle, loginText);
          // Set up form with fields
          const fields = [
            {
              tag: "label",
              attribute: {
                for: "username",
                id: "username",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "text",
                name: "username",
                placeholder: "Enter a username",
                class: "text-input",
                id: "name-input",
              },
            },
            {
              tag: "label",
              attribute: {
                for: "password",
                id: "password",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "password",
                name: "password",
                placeholder: "Enter a password",
                class: "text-input",
                id: "pass-input",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "submit",
                name: "submit",
                value: "Login",
                class: "login-btn btn",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "button",
                name: "back",
                title: "Go Back",
                value: "Go Back",
                class: "Back-btn btn",
                id: "login-back",
              },
            },
          ];
          const form = document.createElement("form");

          form.id = "loginForm";
          //   form.class = "login-frame";
          fields.forEach((f) => {
            let field = document.createElement(f.tag);

            Object.entries(f.attribute).forEach(([a, v]) => {
              field.setAttribute(a, v);
              let words = field.id.split("!");
              // getting each word capitlaised
              if (field.id) {
                for (let i = 0; i < words.length; i++) {
                  words[i] = words[i][0].toUpperCase() + words[i].substring(1);
                }
              }
              // set textcontent of label to the id we modified
              const label = words.join(" ");
              if (field.id) {
                field.textContent = label;
              }

              loginMain.appendChild(field);
            });
          });
          form.append(loginHeader, loginMain);
          form.addEventListener("submit", (e) => {
            e.preventDefault();
          });
          loginframe.appendChild(form);
          mainFrame.appendChild(loginframe);
        }

        // make render login form
        function renderSignup(e) {
          e.preventDefault();
          resetMainFrame();

          const signupframe = document.createElement("div");
          signupframe.className = "signup-frame";

          const signupHeader = document.createElement("div");
          signupHeader.className = "signup-header";

          const signupMain = document.createElement("div");
          signupMain.className = "signup-main";

          const signupTitle = document.createElement("h2");
          signupTitle.textContent = "It is your time to find a Roo-tine";
          const signupText = document.createElement("h3");
          signupText.textContent = "Please fill in your details below";

          signupHeader.append(signupTitle, signupText);
          // Set up form with fields
          const fields = [
            {
              tag: "label",
              attribute: {
                for: "username",
                id: "username:",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "text",
                name: "username",
                placeholder: "Enter a username",
                class: "text-input",
              },
            },
            {
              tag: "label",
              attribute: {
                for: "email",
                id: "email:",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "email",
                name: "email",
                placeholder: "Enter your email",
                class: "text-input",
              },
            },
            {
              tag: "label",
              attribute: {
                for: "password",
                id: "password:",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "password",
                name: "password",
                placeholder: "Enter a password",
                class: "text-input",
              },
            },
            {
              tag: "label",
              attribute: {
                for: "passwordConfirmation",
                id: "confirm!password:",
                class: "label",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "password",
                name: "passwordConfirmation",
                placeholder: "Enter your password again",
                class: "text-input",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "button",
                name: "back",
                title: "Go Back",
                value: "Go Back",
                class: "Back-btn btn",
                id: "signup-back",
              },
            },
            {
              tag: "input",
              attribute: {
                type: "submit",
                name: "submit",
                value: "Create User",
                class: "signup-btn btn",
              },
            },
          ];
          const form = document.createElement("form");
          form.id = "registerForm";
          form.class = "login-frame";
          fields.forEach((f) => {
            let field = document.createElement(f.tag);

            Object.entries(f.attribute).forEach(([a, v]) => {
              field.setAttribute(a, v);
              let words = field.id.split("!");
              // getting each word capitlaised
              if (field.id) {
                for (let i = 0; i < words.length; i++) {
                  words[i] = words[i][0].toUpperCase() + words[i].substring(1);
                }
              }
              // set textcontent of label to the id we modified
              const label = words.join(" ");
              if (field.id) {
                field.textContent = label;
              }

              signupMain.appendChild(field);
            });
          });

          form.append(signupHeader, signupMain);
          form.addEventListener("submit", sendNewUser);
          signupframe.appendChild(form);
          mainFrame.appendChild(signupframe);
        }

        // Back button on either login/logout
        document.addEventListener("click", function (e) {
          if (
            (e.target && e.target.id == "signup-back") ||
            (e.target && e.target.id == "login-back")
          ) {
            renderHome();
          }
        });

        module.exports = { renderHome, renderSignup };
      },
      { "./requests": 2 },
    ],
    2: [
      function (require, module, exports) {
        async function sendNewUser(e) {
          e.preventDefault();
          const signupContainer =
            document.getElementsByClassName("signup-frame");
          console.log(signupContainer);

          try {
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
            };
            console.log(options);
            // const response = await fetch("http://localhost:3000/users", options);
            // const data = await response.json();
            console.log(signupContainer);
            signupContainer.innerHTML = "";
          } catch (err) {
            console.log(err);
          }
        }

        module.exports = sendNewUser;
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        const req = require("./requests");
        const render = require("./render");

        document.addEventListener("DOMContentLoaded", (e) => {
          render.renderHome(e);
        });
      },
      { "./render": 1, "./requests": 2 },
    ],
  },
  {},
  [3]
);
