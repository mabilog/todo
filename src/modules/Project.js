import { toDate, isToday, isThisWeek, subDays } from 'date-fns';

export default class Project {
  // Each project requires to have a name and a list of task to initiate 
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
  getTasks() {
    return this.tasks;
  }

  // This finds a task that matches with taskName
  getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName);
  }

  // Adds a new task to the this.tasks array
  addTask(task) {
    if (this.tasks.indexOf(task) > 0) return;
    this.tasks.push(task);
  }

  // Looks for a task of the same name,
  // Assigns it to taskToDelete 
  // Splices the index of taskToDelete and deletes just 1 entry
  deleteTask(taskName) {
    const taskToDelete = this.tasks.find((task) => task.getName() === taskName);
    this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
  }

  // returns tasks due for today
  // by filtering and getting the formatted date from the Task Class
  // and returning passing it through the isToday function from date-fns
  getTasksToday() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isToday(toDate(taskDate));
    });
  }

  // returns tasks due for this week
  // by filtering and getting the formatted date from the Task Class
  // and returning passing it through the isThisWeek function from date-fns
  getTasksThisWeek() {
    return this.task.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isThisWeek(subDays(toDate(taskDate), 1));
    })
  }
}