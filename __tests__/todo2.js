/* eslint-disable no-undef */
// we will remove dependency of markascoplete on add
const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();

describe("Todolist test suit", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
