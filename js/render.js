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

  const habitForm = document.createElement("form");
  habitForm.className = "habit-frame";
  const habit = document.createElement("input");
  habit.type ="text";
  habit.value ="am";
  const fruquency = document.createElement("input");
  habit.type ="select";
 // habit.options = 
 // habit.appendChild(new Option("date","date"));
  console.log(habit.value);

  //   <form class = "habit-frame">
//   <label for="fname">First name:</label><br>
//   <input type="text" id="fname" name="fname"><br>
//   <label for="lname">Last name:</label><br>
//   <input type="text" id="lname" name="lname">
// </form>

 // create habit Button
 const createButton = document.createElement("button");
 createButton.id = "create";
 createButton.textContent = "Create";
 createButton.className = "btn";
 createButton.addEventListener("click", renderLogin);

  habitForm.appendChild(habit);
  habitForm.appendChild(fruquency);
  habitForm.appendChild(createButton);



  // Append elements for homepage
  homeContainer.append(homeTitle, homeText, loginButton, signupButton,habitForm);
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

function createHabitModal(e) {
  e.preventDefault();
   //Habit form
   const habitForm = document.createElement("form");
   habitForm.className = "habit-frame";
   const habit = document.createElement("input");
   habit.type ="text";
   const fruquency = document.createElement("select");

   //   <form class = "habit-frame">
//   <label for="fname">First name:</label><br>
//   <input type="text" id="fname" name="fname"><br>
//   <label for="lname">Last name:</label><br>
//   <input type="text" id="lname" name="lname">
// </form>

   habitForm.appendChild(habit,fruquency);

}




module.exports = { renderHome, renderSignup, renderLogin };
