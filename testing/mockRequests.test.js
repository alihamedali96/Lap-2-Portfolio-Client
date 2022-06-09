/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
let js;
const app = require('../static/js/app');
jest.mock('../static/js/app');

const test_user = {
  id: 1,
  username: "Ali1",
  name: "Ali",
  email: "Ali1@gmail.com",
  password: "password",
  create_date: "03/06/2022 18:00:00",
};

const test_habit = {
  id: 1,
  user_id: "1",
  habit_name: "something",
  frequency: "12",
  create_date: "03/06/2022 18:00:00",
};
const test_habit_instance = {
  id: 1,
  habit_id: 1,
  complete: true,
  create_date: "03/06/2022 18:00:00",
  due: "05/06/2022 18:00:00",
};

describe("Test Fetch Requests", () => {
  beforeEach(async () => {
    dom = await renderDOM("index.html");
    document = await dom.window.document;
    js = require("../js/bundle");
    fetch.resetMocks();
  });

  test("fetch getAllHabits by User ID works", async () => {
    const result = await js.getAllHabits(1);
    expect(result).toHaveBeenCalled();
  });
});

// https://rooteen.herokuapp.com/
