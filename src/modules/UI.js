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
      <button class="button-add-task" id="button-add-task">
        <i class="fas fa-plus"></i>
        Add Task
      </button>
      <div class="add-task-popup" id="add-task-popup">
        <input
          class="input-add-task-popup"
          id="input-add-task-popup"
          type="text"
        />
        <div class="add-task-popup-buttons">
          <button class="button-add-task-popup" id="button-add-task-popup">
            Add
          </button>
          <button
            class-"button-cancel-task-popup"
            id="button-cancel-task-popup"
          >
          Cancel
          </button>
        </div>
      </div>
      `
    }
    UI.loadTasks(projectName);
  }

  // CREATING CONTENT

  static createProject(name) {
    const userProjects = document.getElementById('projects-list');
    userProjects.innerHTML = + `
      <button class=button-project" data-project-button>
        <div class="left-project-panel">
          <i class="fas fa-tasks></i>  
          <span>${name}</span>
        </div>
        <div class="right-project-panel">
          <i class="fas fa-times"></i>
        </div>
      </button>`;
    UI.initProjectButtons();
  }

  static createTask(name, dueDate) {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML += `
    <button class="button-task" data-task-button>
      <div class="left-task-panel">
        <i class="far fa-circle"></i>
        <p class="task-content">${name}</p>
        <input type="text" class="input-task-name" data-input-task-name>
      </div>
      <div class="right-task-panel">
        <p class="due-date" id="due-date">${dueDate}</p>
        <i class="fas fa-times></i>
      </div>
    </button>`;

    UI.initTaskButtons();
  }

  static clear() {
    UI.clearProjectPreview();
    UI.clearProjects();
    UI.clearTasks();
  }

  static clearProjectPreview() {
    const projectPreview = document.getElementById('project-preview');
    projectPreview.textContent = '';
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.textContent = '';
  }

  static clearTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.textContent = '';
  }

  static closeAllPopups() {
    UI.closeAddProjectPopup();
    if (document.getElementById('button-add-task')) UI.closeAddTaskPopup();
    if (document.getElementById('tasks-list') && document.getElementById('tasks-list').innerHTML !== '') UI.closeAllInputs();
  }

  static closeAllInputs() {
    const taskButtons = document.querySelectorAll('[data-task-button]');

    taskButtons.forEach(button => {
      UI.closeRenameInput(button);
      UI.closeSetDateInput(button);
    });
  }

  static handleKeyboard(e) {
    if (e.key === 'Escape') UI.closeAllPopups();
  }

  //PROJECT ADD EVENT LISTENERS

  static initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project');
    const addProjectPopupButton = document.getElementById('button-add-project-popup');
    const cancelProjectPopupButton = document.getElementById('button0cancel-project-popup');
    const addProjectPopupInput = document.getElementById('input-add-project-popup');

    addProjectButton.addEventListener('click', UI.openAddProjectPopup);
    addProjectPopupButton.addEventListener('click', UI.addProject);
    cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup);
    addProjectPopupInput.addEventListener('keydown', UI.handleAddProjectPopupInput);
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup');
    const addProjectButton = document.getElemetnById('button-add-project');

    UI.closeAllPopups();
    addProjectPopup.classList.add('active');
    addProjectButton.classList.add('active');
  }

  static closeADdProjectPOpup() {
    const addProjectPopup = document.getElementById('add-project-popup');
    const addProjectButton = document.getElementById('button-add-project');
    const addProjectPopupInput = document.getElementById('input-add-project-popup');

    addProjectPopup.classList.remove('active');
    addProjectButton.classList.remove('active');
    addProjectPopupInput.value = '';
  }

  static addProject() {
    const addProjectPopupInput = document.getElementById('input-add-project-popup');
    const projectName = addProjectPopupInput.value;

    if (projectName === '') {
      alert("Project name can't be empty");
      return
    }

    if (Storage.getTodoList().contains(projectName)) {
      addProjectPopupInput.value = '';
      alert('Project names must be different');
      return;
    }

    Storage.addProject(new Project(projectName));
    UI.createProject(projectName);
    UI.closeAddProjectPopup();
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') UI.addProject();
  }

  static initPRojectButtons() {
    const inboxProjectsButton = document.getElementById('button-inbox-projects');
    const todayProjectsButton = document.getElementById('button-today-projects');
    const weekProjectsButton = document.getElementById('button-week-projects');
    const projectButtons = document.querySelectorAll('[data-project-button]');
    const openNavButton = document.getElementById('button-open-nav');


    inboxProjectsButton.addEventListener('click', UI.openInboxTasks);
    todayProjectsButton.addEventListener('click', UI.openTodayTasks);
    weekProjectsButton.addEventListener('click', UI.openWeekTasks);
    projectButtons.forEach(projectButton => {
      projectButton.addEventListener('click', UI.handleProjectButton);
    })
    openNavButton.addEventListener('click', UI.openNav);
  }

  static openInboxTasks() {
    UI.openProject('Inbox', this);
  }

  static openTodayTasks() {
    Storage.updateTodayProject();
    UI.openProject('Today', this);
  }

  static openWeekTasks() {
    Storage.updateWeekProject();
    UI.openProject('This Week', this);
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent;

    if (e.target.classList.contains('fa-times')) {
      UI.deleteProject(projectName, this);
      return;
    }

    UI.openProject(projectName, this)
  }
}