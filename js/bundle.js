(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const API_URL = require("./url");

async function requestLogin(e) {
  e.preventDefault(e);
  console.log("hello from login");
  try {
    const options = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    console.log(options);
    clearInputs();
    const response = await fetch(`${API_URL}/users/login`, options);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function newUser(e) {
  e.preventDefault();
  console.log(JSON.stringify(Object.fromEntries(new FormData(e.target))));
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };

    const response = await fetch(`${API_URL}/users`, options);
    const data = await response.json();
    console.log(data);
    // Clearing inputs
    clearInputs();
    // Thank you message
    signupMsg(data);

    return data;
  } catch (err) {
    signupErr();
    console.log(err);
  }
}

function clearInputs() {
  const textbox = document.getElementsByClassName("text-input");
  for (let i = 0; i < textbox.length; i++) {
    textbox[i].value = "";
  }
}

function signupMsg(data) {
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const signTitle = document.querySelector("#signupTitle");
  signTitle.textContent = `Thank you for signing up ${name}!`;
  const signMsg = document.querySelector("#signupText");
  signMsg.textContent = `Your username is ${data.username}`;
}

function signupErr() {
  const header = document.querySelector("#signupTitle");
  header.textContent = "Username already exists";
  const errMsg = document.querySelector("#signupText");
  errMsg.textContent = "Please try a different username";
}
module.exports = {
  requestLogin,
  newUser,
};

},{"./url":5}],2:[function(require,module,exports){
const auth = require("./auth");
const requestLogin = auth.requestLogin;
const newUser = auth.newUser;

const getAllHabits = require("./requests");

const mainFrame = document.getElementById("mainframe");

// Reset hash and homepage content
function resetMainFrame() {
  while (mainFrame.firstChild) {
    mainFrame.removeChild(mainFrame.lastChild);
  }
  console.log("elements destroyed");
}

// ==================================================================
// render Home page
function renderHome() {
  console.log("rendering home");
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
  loginButton.addEventListener("click", renderLogin);

  // Sign up button
  const signupButton = document.createElement("button");
  signupButton.id = "signup";
  signupButton.textContent = "Sign Up";
  signupButton.className = "btn";
  signupButton.addEventListener("click", renderSignup);

  // Append elements for homepage
  homeContainer.append(homeTitle, homeText, loginButton, signupButton);
  mainFrame.append(homeContainer);
}

// ==================================================================
// make render login form
function renderSignup() {
  console.log("rendering signup page");
  resetMainFrame();
  try {
    if (form) {
      console.log("form still exists", form);
    }
  } catch (err) {
    console.error(err);
  }
  // window.location.hash = "register";

  const signupframe = document.createElement("div");
  signupframe.className = "signup-frame";

  const signupHeader = document.createElement("div");
  signupHeader.className = "signup-header";

  const signupMain = document.createElement("div");
  signupMain.className = "signup-main";

  const signupTitle = document.createElement("h2");
  signupTitle.textContent = "It is your time to find a Roo-tine";
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
  console.log(console.log(document.querySelectorAll("form")));
} // end of form

// ==================================================================
// make render reg form
function renderLogin() {
  console.log("rendering login page");
  resetMainFrame();
  // window.location.hash = "login";

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
  console.log(console.log(document.querySelectorAll("form")));
} // end of form

// ==================================================================
// render more stuff
async function renderFeed(e) {
  e.preventDefault();
  resetMainFrame();
  ////////////////////////////// Create Div with Create Button/Logoutbutton
  const feed = document.createElement("div");
  feed.id = "feed";
  const header = document.createElement("div");
  header.className = "feed-header";
  const title = document.createElement("h1");
  title.className = "feed-title";
  title.textContent = `Welcome back ${localStorage.getItem("username")}!}`;
  const createButton = document.createElement("button");
  createButton.className = "btn";
  createButton.id = "create-btn";
  createButton.value = "New Habit";
  createButton.addEventListener("click", openHabitModal);
  console.log(feed, header, title, createButton);

  ////////////////////////////// Listing all the Habits
  // An array of habits
  const habits = await getAllHabits();
  // Write a func which with create a card for each habit
  const renderHabits = (habitData) => {
    //Create
    const card = document.createElement("div");
    card.className = "habit-card";
    const symbol = document.createElement("img");
    symbol.className = "habit-icon";
    const textContainer = document.createElement("div");
    textContainer.className = "habit-text-container";
    const habitTitle = document.createElement("h3");
    habitTitle.className = "habit-title";
    habitTitle.textContent = habitData.habit_name;
    const habitFreq = document.createElement("p");
    habitFreq.className = "habit-freq";
    habitFreq.textContent = habitData.frequency;
    const habitCheck = document.createElement("input");
    habitCheck.className = "habit-checkbox";
    habitCheck.id = `habit-${habitData.id}`;
    habitCheck.setAttribute("type", "checkbox");

    //Append
    textContainer.append(habitTitle, habitFreq);
    card.append(symbol, textContainer, habitCheck);
    header.append(title, createButton);
    feed.append(header, card);
  };

  habits.forEach(renderHabits);
  main.appendChild(feed);
}
const bypassBtn = document.getElementById("bypass");
bypassBtn.addEventListener("click", renderFeed);

function openHabitModal(e) {
  e.preventDefault();
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
module.exports = { renderHome, renderSignup, renderLogin };

},{"./auth":1,"./requests":3}],3:[function(require,module,exports){
const API_URL = require("./url");

async function getAllHabits() {
  try {
    const response = await fetch(`${API_URL}/habits`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}
module.exports = getAllHabits;

},{"./url":5}],4:[function(require,module,exports){
const render = require("./render");
const auth = require("./auth");

document.addEventListener("DOMContentLoaded", (e) => {
  render.renderHome(e);
});

},{"./auth":1,"./render":2}],5:[function(require,module,exports){
module.exports = "https://rooteen.herokuapp.com";

},{}]},{},[4]);
