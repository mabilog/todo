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

  static initProjectButtons() {

  }

  static openProject() {

  }

  static init
}