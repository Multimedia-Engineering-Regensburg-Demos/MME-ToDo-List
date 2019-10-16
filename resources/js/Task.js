/* eslint-env browser */

class Task {

  constructor(description, id, completed) {
    this.description = description || "New Task";
    this.id = id || Date.now().toString();
    this.completed = completed || false;
  }

  setDescription(description) {
    this.description = description;
  }

  toggleStatus() {
    this.completed = !this.completed;
    return this.completed;
  }

}

export default Task;