async function sendNewUser(e) {
  e.preventDefault();
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    // Clearing inputs
    const textbox = document.getElementsByClassName("text-input");
    for (let i = 0; i < textbox.length; i++) {
      textbox[i].value = "";
    }
    // const response = await fetch("http://localhost:3000/users", options);
    // const data = await response.json();
  } catch (err) {
    console.log(err);
  }
}

async function requestLogin(e) {
  e.preventDefault(e);
}

module.exports = sendNewUser;
