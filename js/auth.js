const API_URL = require("./url");
const getAllHabits = require("./requests");

async function requestLogin(e) {
  e.preventDefault(e);
  try {
    const options = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    clearInputs();
    const response = await fetch(`${API_URL}/users/login`, options);
    const data = await response.json();
    // if (data.err) {
    //   loginErr();
    // }
    login(data);
  } catch (err) {
    loginErr();
  }
}

async function newUser(e) {
  e.preventDefault();
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
    // Thank you message
    signupMsg(data);

    return data;
  } catch (err) {
    signupErr();
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
function loginErr() {
  const errMsg = document.querySelector("#loginText");
  errMsg.textContent =
    "The password you entered is incorrect. Please try again.";
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
    symbol.src = "../img/kang.png";
    const textContainer = document.createElement("div");
    textContainer.className = "habit-text-container";
    const habitTitle = document.createElement("h3");
    habitTitle.className = "habit-title";
    habitTitle.textContent = habitData.habit_name;
    const habitFreq = document.createElement("p");
    habitFreq.className = "habit-freq";
    habitFreq.textContent = `Repeat every ${habitData.frequency.days} days`;
    const msg = document.createElement("div");
    msg.className = "habit-reminder";
    msg.textContent = "Click For More";

    //Append
    textContainer.append(habitTitle, habitFreq);
    card.append(symbol, textContainer, msg);
    header.append(title, createButton);
    feed.append(card);
  };

  habits.forEach(renderHabits);
  main.append(header, feed);
}

function openHabitModal(e) {
  e.preventDefault();
  console.log("click");
  // Overlay (export)
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);
  // Setup container modal (export)
  const userframe = document.querySelector("#instance-modal");
  userframe.style.display = "block";
  const habitModal = document.createElement("div");
  habitModal.className = "modal";
  const form = document.createElement("form");

  // Header (export)
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = `Create a New Habit`;

  // buttons (some can be exported)
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  const buttonClose = document.createElement("button");
  buttonClose.className = "button-close btn";
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener("click", closeModal);
  const buttonAdd = document.createElement("input");
  buttonAdd.setAttribute("type", "submit");
  buttonAdd.className = "button-Add btn";
  buttonAdd.textContent = `Add`;

  buttonContainer.append(buttonClose, buttonAdd);

  // frequency (specific)
  const formContainer = document.createElement("div");
  formContainer.className = "formContainer";
  const formLabelName = document.createElement("label");
  formLabelName.textContent = "Track a Habit";
  const formLabelFreq = document.createElement("label");

  const formInputName = document.createElement("input");
  formInputName.setAttribute("type", "text");
  formInputName.setAttribute("required", " ");
  formInputName.className = "text-input";
  formInputName.placeholder = "e.g Running";
  formInputName.name = "habit_name";
  const values = ["1", "2", "3", "4", "5", "6", "7"];
  const select = document.createElement("select");
  select.name = "frequency";
  select.className = "text-input";
  select.id = "freq-day";
  for (const val of values) {
    const option = document.createElement("option");
    option.value = val;
    option.text = val;
    select.appendChild(option);
  }
  formLabelFreq.textContent = `Repeat habit every ${select.value} day(s)`;
  formContainer.append(
    formLabelName,
    formInputName,
    formLabelFreq,
    select,
    buttonContainer
  );
  form.addEventListener("submit", addNewHabit);
  form.append(formContainer);
  habitModal.append(modalTitle, form);
  userframe.append(habitModal);
}

async function addNewHabit(e) {
  e.preventDefault();

  const options = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
  };

  const r = await fetch(`${API_URL}/habits/`, options);
  const d = await r.json();
  console.log(d);
}
// ========================= functionality of each habit

async function openHabitInstance(e) {
  const habitId = e.currentTarget.id.slice(-1);

  const r = await fetch(`${API_URL}/habit-instances/habit/${habitId}`);
  const instance = await r.json();
  const p = await fetch(`${API_URL}/habits/${habitId}`);
  const habit = await p.json();

  renderHabitInstance(instance, habit);
}

// ========================= Create display for each habit

function renderHabitInstance(instance, habit) {
  // Modal setup
  const userframe = document.querySelector("#instance-modal");
  userframe.style.display = "block";
  const habitModal = document.createElement("div");
  habitModal.className = "modal";

  // Header
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = `Update ${habit.habit_name}`;

  // complete div
  const completeContainer = document.createElement("div");
  completeContainer.className = "completeContainer";
  for (i of instance) {
    const completeText = document.createElement("p");
    completeText.className = "completeText";
    completeText.textContent = `Check Off ${i.due_date}`;
    const completeCheck = document.createElement("input");
    completeCheck.className = "habit-checkbox";
    completeCheck.setAttribute("type", "checkbox");
    const habitInstance = document.createElement("div");
    habitInstance.append(completeText, completeCheck);
    completeContainer.append(habitInstance);
  }

  // frequency
  const frequencyContainer = document.createElement("div");
  frequencyContainer.className = "frequencyContainer";
  const frequencyText = document.createElement("p");
  frequencyText.className = "frequencyText";
  frequencyText.textContent = `Repeat habit every ${habit.frequency.days} days`;
  const frequencyButton = document.createElement("button");
  frequencyButton.className = "frequency-button btn";
  frequencyButton.textContent = `Change`;
  frequencyContainer.append(frequencyText, frequencyButton);

  //Streak
  const streakMsg = document.createElement("p");
  streakMsg.textContent = `Your current streak is ...`;

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  const buttonClose = document.createElement("button");
  buttonClose.className = "button-close btn";
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener("click", closeModal);
  const buttonDelete = document.createElement("button");
  buttonDelete.className = "button-delete btn";
  buttonDelete.textContent = `Delete`;
  buttonDelete.addEventListener("click", () => {
    console.log("Delete button clicked");
  });
  buttonContainer.append(buttonClose, buttonDelete);

  // Ovverlay
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);

  habitModal.append(
    modalTitle,
    completeContainer,
    frequencyContainer,
    streakMsg,
    buttonContainer
  );
  userframe.append(habitModal);
}

// Helper function --- Closing the modal of habit instance
function closeModal() {
  const userframe = document.querySelector("#instance-modal");
  userframe.innerHTML = "";
  userframe.style.display = "none";
  document.body.removeChild(document.getElementById("modal-overlay"));
}

module.exports = {
  requestLogin,
  newUser,
};
