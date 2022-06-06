// const signupForm = document.getElementById("signupForm");
// const loginForm = document.getElementById("loginForm");
const mainFrame = document.getElementById("mainframe");
document.addEventListener("DOMContentLoaded", (e) => {
  renderHome();
});
// registerButton.addEventListener("click", navigateRegForm);
// loginButton.addEventListener("click", navigateRegForm);

// render Home page

function renderHome() {
  const homeContainer = document.createElement("div");
  homeContainer.className = "main-frame";
  const homeTitle = document.createElement("h2");
  const homeText = document.createElement("h3");
  const loginButton = document.createElement("btn");
  loginButton.id = "login";
  const signupButton = document.createElement("btn");
  signupButton.id = "signup";

  homeContainer.append(homeTitle, homeText, loginButton, signupButton);
  mainFrame.append(homeContainer);
}
// make render reg form

// make render login form
function navigateRegForm() {
  window.location.hash = `register`;
  console.log(window.location);
}

function renderRegForm() {
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
        id: "password!confirmation:",
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
        type: "submit",
        name: "submit",
        value: "Create User",
        class: "signup-btn btn",
      },
    },
  ];
  const form = document.createElement("form");
  fields.forEach((f) => {
    let field = document.createElement(f.tag);
    // Object.entries method returns an array of a givne object's own enumerable string-keyed property [key, value pairs]
    // [[type, text], [name, username], [placeholder, Username]]
    // [[a, v], [a, v], [a, v], [a, v]]
    Object.entries(f.attribute).forEach(([a, v]) => {
      // So here we are looping over each [key,value] pair setting an attribute and value
      // field.setAttribute('type', 'text')
      field.setAttribute(a, v);

      // getting our labels by using id of each label

      let words = field.id.split("!");
      // Cap each word
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
      form.id = "registerForm";
      form.appendChild(field);
    });
  });
  //   form.addEventListener('submit', registerUser)
  loginCard.appendChild(form);
}

// signupForm.addEventListener("submit", sendNewUser);
// async function sendNewUser(e) {
//     e.preventDefault();
//     const signupContainer = document.getElementsByClassName("signup-frame");
//     console.log(signupContainer);

//     try {
//       const options = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
//       };
//       console.log(options);
//       // const response = await fetch("http://localhost:3000/users", options);
//       // const data = await response.json();
//       console.log(signupContainer);
//       signupContainer.innerHTML = "";
//     } catch (err) {
//       console.warn(err);
//       signupContainer.innerHTML = "";
//       const errorTitle = document.createElement("h3");
//       errorTitle.id = errorTitle;
//       errorTitle.textContent = "Oh Dear, Something went wrong :(";
//       const errorMessage = document.createElement("p");
//       errorMessage.id = errorMessage;
//       errorMessage.textContent = `Error: ${err}`;
//       signupContainer.append(errorTitle, errorMessage);
//     }
//     signupContainer.innerHTML = "";
//   }
