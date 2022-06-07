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
    const response = await fetch(`${API_URL}/users`, options);
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
    // Clearing inputs
    clearInputs();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function clearInputs() {
  const textbox = document.getElementsByClassName("text-input");
  console.log(textbox);
  for (let i = 0; i < textbox.length; i++) {
    textbox[i].value = "";
  }
}

module.exports = { 
  requestLogin,
  newUser
}
