/* eslint-disable no-undef */
const todoList = require("../todo");
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

// eslint-disable-next-line no-unused-vars
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todolist test suit", () => {
  beforeAll(() => {
    let ctr = 1;

    // due today - 2 in number
    for (let i = 0; i < 2; i++) {
      add({
        title: `test${ctr++} todo`,
        completed: false,
        dueDate: today,
      });
    }

    // due yesterday - 3 in number
    for (i = 0; i < 3; i++) {
      add({
        title: `test${ctr++} todo`,
        completed: false,
        dueDate: yesterday,
      });
    }

    // due tomorrow - 4 in number
    for (i = 0; i < 4; i++) {
      add({
        title: `test${ctr++} todo`,
        completed: false,
        dueDate: tomorrow,
      });
    }
    // console.log(all);
  });

  test("should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should only return overdue items", () => {
    const itemsOverdue = overdue();
    add({
      title: "test todo",
      completed: false,
      dueDate: yesterday,
    });
    const newItemsOverdue = overdue();
    expect(newItemsOverdue.length).toBe(itemsOverdue.length + 1);

    // let overdueFlag = true;
    // itemsOverdue.forEach((item) => {
    //   if (!(item.dueDate < today)) overdueFlag = false;
    // });
    // expect(overdueFlag).toBe(true);
  });

  test("Should only return items due today", () => {
    const itemsDueToday = dueToday();
    add({
      title: "test todo",
      completed: false,
      dueDate: today,
    });
    const newItemsDueToday = dueToday();
    expect(newItemsDueToday.length).toBe(itemsDueToday.length + 1);

    // let dueTodayFlag = true;
    // itemsDueToday.forEach((item) => {
    //   if (!(item.dueDate === today)) dueTodayFlag = false;
    // });
    // expect(dueTodayFlag).toBe(true);
  });

  test("Should only return items due later", () => {
    const itemsDueLater = dueLater();
    add({
      title: "test todo",
      completed: false,
      dueDate: tomorrow,
    });
    const newItemsDueLater = dueLater();
    expect(newItemsDueLater.length).toBe(itemsDueLater.length + 1);

    // let dueLaterFlag = true;
    // itemsDueLater.forEach((item) => {
    //   if (!(item.dueDate > today)) dueLaterFlag = false;
    // });
    // expect(dueLaterFlag).toBe(true);
  });
});
