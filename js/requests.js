async function getAllHabits() {
  try {
    const response = await fetch("https://rooteen.herokuapp.com/");
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}
module.exports = getAllHabits;
