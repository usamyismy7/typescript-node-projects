export default class Todo {
  private tasks: string[] = [];

  addTask(task: string) {
    this.tasks.push(task);
  }

  removeTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }

  listTasks() {
    return this.tasks;
  }
}
