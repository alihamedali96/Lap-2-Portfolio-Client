const API_URL = require("./url");

async function getAllHabits() {
  try {
    const response = await fetch(`${API_URL}/habits/user/:id'`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}
module.exports = getAllHabits;
