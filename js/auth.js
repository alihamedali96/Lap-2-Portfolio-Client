const API_URL = require("./url");
const renderFeed = require("./render");

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
    if (data.err) {
      throw Error(data.err);
    }
    login(data);
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

function login(data) {
  localStorage.setItem("username", data.user);
  renderFeed();
}
module.exports = {
  requestLogin,
  newUser,
};
