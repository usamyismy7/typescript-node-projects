export default class Todo {
    tasks = [];
    addTask(task) {
        this.tasks.push(task);
    }
    removeTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }
    listTasks() {
        return this.tasks;
    }
}
