const auth = require("./auth");
const requestLogin = auth.requestLogin;
const newUser = auth.newUser;

const mainFrame = document.getElementById("mainframe");

// Reset hash and homepage content
function resetMainFrame() {
  while (mainFrame.firstChild) {
    mainFrame.removeChild(mainFrame.lastChild);
  }
}

// ==================================================================
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
  loginButton.className = "btn-1 btn";
  loginButton.addEventListener("click", renderLogin);

  // Sign up button
  const signupButton = document.createElement("button");
  signupButton.id = "signup";
  signupButton.textContent = "Sign Up";
  signupButton.className = "btn-2 btn";
  signupButton.addEventListener("click", renderSignup);

  // Append elements for homepage
  homeContainer.append(homeTitle, homeText, loginButton, signupButton);
  mainFrame.append(homeContainer);
}

// ==================================================================
// make render login form
function renderSignup() {
  resetMainFrame();

  const signupframe = document.createElement("div");
  signupframe.className = "signup-frame";

  const signupHeader = document.createElement("div");
  signupHeader.className = "signup-header";

  const signupMain = document.createElement("div");
  signupMain.className = "signup-main";

  const signupTitle = document.createElement("h2");
  signupTitle.textContent = "It is your time to find a Roo-teen";
  signupTitle.id = "signupTitle";
  const signupText = document.createElement("h3");
  signupText.textContent = "Please fill in your details below";
  signupText.id = "signupText";

  signupHeader.append(signupTitle, signupText);
  // Set up form with fields
  const signupFields = [
    {
      tag: "label",
      attribute: {
        for: "name",
        id: "name:",
        class: "label",
      },
    },
    {
      tag: "input",
      attribute: {
        type: "text",
        name: "name",
        placeholder: "Enter your name",
        class: "text-input",
        required: " ",
      },
    },
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
        required: " ",
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
        required: " ",
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
        required: " ",
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
        value: "Create User",
        class: "signup-btn btn",
        id: "signup-btn",
      },
    },
    // {
    //   tag: "label",
    //   attribute: {
    //     for: "passwordConfirmation",
    //     id: "password!confirmation:",
    //     class: "label",
    //   },
    // },
    // {
    //   tag: "input",
    //   attribute: {
    //     type: "password",
    //     name: "passwordConfirmation",
    //     placeholder: "Enter your password again",
    //     class: "text-input",
    //   },
    // },
  ];
  const form = document.createElement("form");

  form.id = "registerForm";
  form.class = "login-frame";

  signupFields.forEach((f) => {
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

  // *** Submit New User Button ***
  form.append(signupHeader, signupMain);
  form.onsubmit = "null";
  form.addEventListener("submit", newUser); // Adds newUser event to form onsubmit
  signupframe.appendChild(form);
  mainFrame.appendChild(signupframe);
} // end of form

// ==================================================================
// make render reg form
function renderLogin() {
  resetMainFrame();
  // window.location.hash = "login";

  const loginframe = document.createElement("div");
  loginframe.className = "login-frame";

  const loginHeader = document.createElement("div");
  loginHeader.className = "login-header";

  const loginMain = document.createElement("div");
  loginMain.className = "login-main";

  const loginTitle = document.createElement("h2");
  loginTitle.textContent = `Welcome back to your \n Roo-teen`;
  const loginText = document.createElement("h3");
  loginText.textContent = "Please login in";

  loginHeader.append(loginTitle, loginText);
  // Set up form with fields
  const loginFields = [
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
        required: " ",
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
        required: " ",
      },
    },
    {
      tag: "input",
      attribute: {
        type: "submit",
        value: "Login",
        class: "login-btn btn",
        id: "login-btn",
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
  loginFields.forEach((f) => {
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

  // *** Submit User Login Button ***

  form.append(loginHeader, loginMain);
  form.onsubmit = "null";
  form.removeEventListener("submit", newUser);
  form.addEventListener("submit", requestLogin); // Adds Event Listener for requestLogin
  loginframe.appendChild(form);
  mainFrame.appendChild(loginframe);
} // end of form

// ==================================================================
// render more stuff

// Back button on either login/logout
document.addEventListener("click", function (e) {
  if (
    (e.target && e.target.id == "signup-back") ||
    (e.target && e.target.id == "login-back")
  ) {
    renderHome();
  }
});
module.exports = {
  renderHome,
  renderSignup,
  renderLogin,
};
