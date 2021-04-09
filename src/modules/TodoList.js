import { compareAsc, toDate } from 'date-fns';
import Project from './Project';
import Task from './Task';

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Inbox'));
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('This Week'));
  }

  setProjects(projects) {
    this.projects = projects;
  }
  getProjects() {
    return this.projects;
  }

  // returns the stated project
  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  constains(projectName) {
    return this.projects.some((project) => project.getName() === projectName)
  }

  addProject(project) {
    if (this.projects.indexOf(project) > 0) return;
    this.projects.push(project);
  }

  deleteProject(projectName) {
    const projectToDelete = this.projects.find((project) => project.getName() === projectName);
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }

  // task: updates today project 
  // it creates an empty project folder for today
  // then passes through a condition if the project selected is 'Today' or 'This Week' and then return undefined;
  // forEach project in the projects array, assign the .getTasksToday() to todayTasks
  // forEach task in todayTasks, 'Today' project adds new task through the Task class constructor
  updateTodayProject() {
    this.getProject('Today').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This Week') return;

      const todayTasks = project.getTasksToday();
      todayTasks.forEach((task) => {
        const taskName = `${task.getName()} (${project.getName()})`;
        this.getProject('Today').addTask(new Task(taskName, task.getDate()));
      });
    });
  }

  // task: updates this week's project 
  // it creates an empty project folder for today
  // then passes through a condition if the project selected is 'Today' or 'This Week' and then return undefined;
  // forEach project in the projects array, assign the .getTasksThisWeek to weekTasks
  // forEach task in weekTasks, 'This Week' project adds new task through the Task class constructor

  // also sorts this weeks tasks in ascending order
  updateWeekProject() {
    this.getProject('This Week').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This Week') return;

      const weekTasks = project.getTasksThisWeek();
      weekTasks.forEach((task) => {
        const taskName = `${task.getName()} (${project.getName()})`;
        this.getProject('This Week').addTask(new Task(taskName, task.getDate()));
      });
    });

    this.getProject('This Week')
      .setTasks(this.getProject('This Week')
        .getTasks()
        .sort((a, b) =>
          compareAsc(
            toDate(new Date(a.getDateFormated())),
            toDate(new Date(b.getDateFormated())),
          ),
        ),
      );
  }
}