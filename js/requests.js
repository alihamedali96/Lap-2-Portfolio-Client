const API_URL = require("./url");

async function getAllHabits(id) {
  try {
    const response = await fetch(`${API_URL}/habits/user/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.warn(err);
  }
}
module.exports = getAllHabits;
