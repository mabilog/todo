import { format } from 'date-fns';
import Storage from './Storage';
import Project from './Project';
import Task from './Task';

export default class UI {
  // LOADING CONTENT

  static loadHomepage() {
    Ui.loadProjects();
    Ui.initProjectButtons();
    Ui.openProject('Inbox', document.getElementById('button-inbox-projects'));
    document.addEventListener('keydown', UI.handleKeyboard);
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.name !== 'Inbox' &&
          project.name !== 'Today' &&
          project.name !== 'This Week'
        ) {
          UI.createProject(project.name);
        }
      });
    UI.initAddProjectButtons()
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => UI.createTask(task.name, task.dueDate));

    if (projectName !== 'Today' && projectName !== 'This Week') {
      UI.initAddTaskButtons();
    }
  }

  static loadProjectContent(projectName) {
    const projectPreview = document.getElementById('project-preview');
    projectPreview.innerHTML = `
    <h1 id="project-name">${projectName}</h1>
    <div class="tasks-list" id="tasks-list"></div>
    `;

    if (projectName !== 'Today' && projectName !== 'This Week') {
      projectPreview.innerHTML = `
      `
    }
  }
  static initProjectButtons() {

  }

  static openProject() {

  }

  static init
}