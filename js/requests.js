async function sendNewUser(e) {
  e.preventDefault();
  const signupContainer = document.getElementsByClassName("signup-frame");
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
