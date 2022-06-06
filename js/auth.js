async function sendNewUser(e) {
  e.preventDefault();
  console.log(e);
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    // Clearing inputs
    console.log(options);
    clearInputs();

    const response = await fetch("http://localhost:3000/users", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function requestLogin(e) {
  e.preventDefault(e);
  try {
    const options = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    console.log(options);
    clearInputs();
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
module.exports = sendNewUser;
module.exports = requestLogin;
