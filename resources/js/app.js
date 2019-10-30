/*eslint-env browser */

const DEFAULT_TASK_DESCRIPTION = "Neue Aufgabe",
  NEW_TASK_ELEMENT_TEMPLATE = document.querySelector("#task-template").innerHTML
  .trim();

var tasks,
  listElement;

class Task {

  constructor(description = DEFAULT_TASK_DESCRIPTION, id = Date.now().toString(),
    isDone = false) {
    this.description = description;
    this.id = id;
    this.isDone = isDone;
  }

  toggleStatus() {
    this.isDone = !this.isDone;
  }
  
}

function init() {
  let newTaskButton = document.querySelector(".button.new-task"),
    clearListButton = document.querySelector(".button.clear-list");
  newTaskButton.addEventListener("click", createNewTask);
  clearListButton.addEventListener("click", clearList);
  tasks = [];
  listElement = document.querySelector(".task-list");

}

function createNewTask() {
  let newTask = new Task();
  tasks.push(newTask);
  renderTask(newTask);
}

function clearList() {
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].isDone === true) {
      remmoveElementForTask(tasks[i]);
      tasks.splice(i, 1);
    }
  }
}

function remmoveElementForTask(task) {
  let taskElement = listElement.querySelector(`[data-id='${task.id}']`);
  if (taskElement !== undefined) {
    taskElement.remove();
  }
}

function renderTask(task) {
  let taskElement, containerElement = document.createElement("div");
  containerElement.innerHTML = NEW_TASK_ELEMENT_TEMPLATE;
  taskElement = containerElement.firstChild;
  taskElement.setAttribute("data-id", task.id);
  taskElement.querySelector(".task-text-input").value = task.description;
  taskElement.querySelector(".task-text-input").addEventListener("change",
    onTaskDescriptionChanged);
  taskElement.querySelector(".task-status-checkbox").checked = task.isDone;
  taskElement.querySelector(".task-status-checkbox").addEventListener("change",
    onTaskStatusChanged);
  listElement.appendChild(taskElement);
}

function onTaskDescriptionChanged(event) {
  let task = getTaskFromElementEvent(event);
  if (task !== null) {
    task.description = event.target.value;
  }
}

function onTaskStatusChanged(event) {
  let task = getTaskFromElementEvent(event);
  if (task !== null) {
    task.toggleStatus();
  }
}

function getTaskFromElementEvent(event) {
  let parentElement = event.target.parentElement;
  if (parentElement === undefined || !parentElement.hasAttribute("data-id")) {
    return null;
  }
  return findTaskWithID(parentElement.getAttribute("data-id"));

}

function findTaskWithID(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

init();