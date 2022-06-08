const API_URL = require("./url");
const getAllHabits = require("./requests");

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
  renderfeed(data);
}
async function renderfeed(data) {
  const mainframe = document.getElementById("mainframe");
  while (mainframe.firstChild) {
    mainframe.removeChild(mainframe.lastChild);
  }
  // resetMainFrame();
  const main = document.querySelector("#userframe");
  ////////////////////////////// Create Div with Create Button/Logoutbutton
  const feed = document.createElement("div");
  feed.id = "feed";
  const header = document.createElement("div");
  header.className = "feed-header";
  const title = document.createElement("h1");
  title.className = "feed-title";
  title.textContent = `Welcome back ${data.name}!`;
  const createButton = document.createElement("button");
  createButton.className = "btn";
  createButton.id = "create-btn";
  createButton.textContent = "New Habit";
  createButton.addEventListener("click", openHabitModal);

  ////////////////////////////// Listing all the Habits
  // An array of habits
  const habits = await getAllHabits(data.id);
  // Write a func which with create a card for each habit
  const renderHabits = (habitData) => {
    //Create

    const card = document.createElement("div");
    card.className = "habit-card";
    card.setAttribute("id", `habit-card-${habitData.id}`);
    card.addEventListener("click", (e) => {
      openHabitInstance(e);
    });
    const symbol = document.createElement("img");
    symbol.className = "habit-icon";

    const textContainer = document.createElement("div");
    textContainer.className = "habit-text-container";
    const habitTitle = document.createElement("h3");
    habitTitle.className = "habit-title";
    habitTitle.textContent = habitData.habit_name;
    const habitFreq = document.createElement("p");
    habitFreq.className = "habit-freq";
    habitFreq.textContent = `Repeat every ${habitData.frequency.days} days`;

    //Append
    textContainer.append(habitTitle, habitFreq);
    card.append(symbol, textContainer);
    header.append(title, createButton);
    feed.append(card);
  };

  habits.forEach(renderHabits);
  main.append(header, feed);
}

function openHabitModal(e) {
  e.preventDefault();
}

// ========================= functionality of each habit

async function openHabitInstance(e) {
  const habitId = e.currentTarget.id.slice(-1);
  console.log(habitId);

  const r = await fetch(`${API_URL}/habit-instances/${habitId}`);
  const instance = await r.json();
  const p = await fetch(`${API_URL}/habits/${habitId}`);
  const habit = await p.json();

  renderHabitInstance(instance, habit);
  // const response = await fetch(`${API_URL}/habit-instances/${habitId}`);
  // const data = await response.json();
  // console.log(data);

  // renderHabitInstance()
}

// ========================= Create display for each habit

function renderHabitInstance(instance, habit) {
  console.log("hello from habit instance");
  console.log(instance, habit);
  // Modal setup
  const userframe = document.querySelector("#instance-modal");
  const habitModal = document.createElement("div");
  habitModal.className = "modal";
  // Header
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = `Update ${habit.habit_name}`;

  // complete div
  const completeContainer = document.createElement("div");
  completeContainer.className = "completeContainer";
  const completeText = document.createElement("p");
  completeText.className = "completeText";
  completeText.textContent = `Check Off ${habit.habit_name}`;
  const completeCheck = document.createElement("input");
  completeCheck.className = "habit-checkbox";
  completeCheck.setAttribute("type", "checkbox");
  completeContainer.append(completeText, completeCheck);

  // frequency
  const frequencyContainer = document.createElement("div");
  frequencyContainer.className = "frequencyContainer";
  const frequencyText = document.createElement("p");
  frequencyText.className = "frequencyText";
  frequencyText.textContent = `Repeat habit every ${habit.frequency.days} days`;
  const frequencyButton = document.createElement("button");
  frequencyButton.className = "frequency-button btn";
  frequencyButton.textContent = `Change Frequency`;
  frequencyContainer.append(frequencyText, frequencyButton);

  //Streak
  const streakMsg = document.createElement("p");
  streakMsg.textContent = `Your current streak is ...`;

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "ButtonContainer";
  const buttonClose = document.createElement("button");
  buttonClose.className = "btn";
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener("click", () => {
    console.log("Close button clicked");
  });
  const buttonDelete = document.createElement("button");
  buttonDelete.className = "Button-button btn";
  buttonDelete.textContent = `Change Button`;
  buttonDelete.addEventListener("click", () => {
    console.log("Delete button clicked");
  });
  buttonContainer.append(buttonClose, buttonDelete);

  habitModal.append(
    modalTitle,
    completeContainer,
    frequencyContainer,
    streakMsg,
    buttonContainer
  );
  userframe.append(habitModal);
}

module.exports = {
  requestLogin,
  newUser,
};
