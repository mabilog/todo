"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateFns = require("date-fns");

var _Storage = _interopRequireDefault(require("./Storage"));

var _Project = _interopRequireDefault(require("./Project"));

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "loadHomepage",
    // LOADING CONTENT
    value: function loadHomepage() {
      Ui.loadProjects();
      Ui.initProjectButtons();
      Ui.openProject('Inbox', document.getElementById('button-inbox-projects'));
      document.addEventListener('keydown', UI.handleKeyboard);
    }
  }, {
    key: "loadProjects",
    value: function loadProjects() {
      _Storage["default"].getTodoList().getProjects().forEach(function (project) {
        if (project.name !== 'Inbox' && project.name !== 'Today' && project.name !== 'This Week') {
          UI.createProject(project.name);
        }
      });

      UI.initAddProjectButtons();
    }
  }, {
    key: "loadTasks",
    value: function loadTasks(projectName) {
      _Storage["default"].getTodoList().getProject(projectName).getTasks().forEach(function (task) {
        return UI.createTask(task.name, task.dueDate);
      });

      if (projectName !== 'Today' && projectName !== 'This Week') {
        UI.initAddTaskButtons();
      }
    }
  }, {
    key: "loadProjectContent",
    value: function loadProjectContent(projectName) {
      var projectPreview = document.getElementById('project-preview');
      projectPreview.innerHTML = "\n    <h1 id=\"project-name\">".concat(projectName, "</h1>\n    <div class=\"tasks-list\" id=\"tasks-list\"></div>\n    ");

      if (projectName !== 'Today' && projectName !== 'This Week') {
        projectPreview.innerHTML = "\n      <button class=\"button-add-task\" id=\"button-add-task\">\n        <i class=\"fas fa-plus\"></i>\n        Add Task\n      </button>\n      <div class=\"add-task-popup\" id=\"add-task-popup\">\n        <input\n          class=\"input-add-task-popup\"\n          id=\"input-add-task-popup\"\n          type=\"text\"\n        />\n        <div class=\"add-task-popup-buttons\">\n          <button class=\"button-add-task-popup\" id=\"button-add-task-popup\">\n            Add\n          </button>\n          <button\n            class-\"button-cancel-task-popup\"\n            id=\"button-cancel-task-popup\"\n          >\n          Cancel\n          </button>\n        </div>\n      </div>\n      ";
      }

      UI.loadTasks(projectName);
    } // CREATING CONTENT

  }, {
    key: "createProject",
    value: function createProject(name) {
      var userProjects = document.getElementById('projects-list');
      userProjects.innerHTML = +"\n      <button class=button-project\" data-project-button>\n        <div class=\"left-project-panel\">\n          <i class=\"fas fa-tasks></i>  \n          <span>".concat(name, "</span>\n        </div>\n        <div class=\"right-project-panel\">\n          <i class=\"fas fa-times\"></i>\n        </div>\n      </button>");
      UI.initProjectButtons();
    }
  }, {
    key: "createTask",
    value: function createTask(name, dueDate) {
      var tasksList = document.getElementById('tasks-list');
      tasksList.innerHTML += "\n    <button class=\"button-task\" data-task-button>\n      <div class=\"left-task-panel\">\n        <i class=\"far fa-circle\"></i>\n        <p class=\"task-content\">".concat(name, "</p>\n        <input type=\"text\" class=\"input-task-name\" data-input-task-name>\n      </div>\n      <div class=\"right-task-panel\">\n        <p class=\"due-date\" id=\"due-date\">").concat(dueDate, "</p>\n        <i class=\"fas fa-times></i>\n      </div>\n    </button>");
      UI.initTaskButtons();
    }
  }, {
    key: "clear",
    value: function clear() {
      UI.clearProjectPreview();
      UI.clearProjects();
      UI.clearTasks();
    }
  }, {
    key: "clearProjectPreview",
    value: function clearProjectPreview() {
      var projectPreview = document.getElementById('project-preview');
      projectPreview.textContent = '';
    }
  }, {
    key: "clearProjects",
    value: function clearProjects() {
      var projectsList = document.getElementById('projects-list');
      projectsList.textContent = '';
    }
  }, {
    key: "clearTasks",
    value: function clearTasks() {
      var tasksList = document.getElementById('tasks-list');
      tasksList.textContent = '';
    }
  }, {
    key: "closeAllPopups",
    value: function closeAllPopups() {
      UI.closeAddProjectPopup();
      if (document.getElementById('button-add-task')) UI.closeAddTaskPopup();
      if (document.getElementById('tasks-list') && document.getElementById('tasks-list').innerHTML !== '') UI.closeAllInputs();
    }
  }, {
    key: "closeAllInputs",
    value: function closeAllInputs() {
      var taskButtons = document.querySelectorAll('[data-task-button]');
      taskButtons.forEach(function (button) {
        UI.closeRenameInput(button);
        UI.closeSetDateInput(button);
      });
    }
  }, {
    key: "handleKeyboard",
    value: function handleKeyboard(e) {
      if (e.key === 'Escape') UI.closeAllPopups();
    } //PROJECT ADD EVENT LISTENERS

  }, {
    key: "initAddProjectButtons",
    value: function initAddProjectButtons() {
      var addProjectButton = document.getElementById('button-add-project');
      var addProjectPopupButton = document.getElementById('button-add-project-popup');
      var cancelProjectPopupButton = document.getElementById('button0cancel-project-popup');
      var addProjectPopupInput = document.getElementById('input-add-project-popup');
      addProjectButton.addEventListener('click', UI.openAddProjectPopup);
      addProjectPopupButton.addEventListener('click', UI.addProject);
      cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup);
      addProjectPopupInput.addEventListener('keydown', UI.handleAddProjectPopupInput);
    }
  }, {
    key: "openAddProjectPopup",
    value: function openAddProjectPopup() {
      var addProjectPopup = document.getElementById('add-project-popup');
      var addProjectButton = document.getElemetnById('button-add-project');
      UI.closeAllPopups();
      addProjectPopup.classList.add('active');
      addProjectButton.classList.add('active');
    }
  }, {
    key: "closeAddProjectPopup",
    value: function closeAddProjectPopup() {
      var addProjectPopup = document.getElementById('add-project-popup');
      var addProjectButton = document.getElementById('button-add-project');
      var addProjectPopupInput = document.getElementById('input-add-project-popup');
      addProjectPopup.classList.remove('active');
      addProjectButton.classList.remove('active');
      addProjectPopupInput.value = '';
    }
  }, {
    key: "addProject",
    value: function addProject() {
      var addProjectPopupInput = document.getElementById('input-add-project-popup');
      var projectName = addProjectPopupInput.value;

      if (projectName === '') {
        alert("Project name can't be empty");
        return;
      }

      if (_Storage["default"].getTodoList().contains(projectName)) {
        addProjectPopupInput.value = '';
        alert('Project names must be different');
        return;
      }

      _Storage["default"].addProject(new _Project["default"](projectName));

      UI.createProject(projectName);
      UI.closeAddProjectPopup();
    }
  }, {
    key: "handleAddProjectPopupInput",
    value: function handleAddProjectPopupInput(e) {
      if (e.key === 'Enter') UI.addProject();
    }
  }, {
    key: "initProjectButtons",
    value: function initProjectButtons() {
      var inboxProjectsButton = document.getElementById('button-inbox-projects');
      var todayProjectsButton = document.getElementById('button-today-projects');
      var weekProjectsButton = document.getElementById('button-week-projects');
      var projectButtons = document.querySelectorAll('[data-project-button]');
      var openNavButton = document.getElementById('button-open-nav');
      inboxProjectsButton.addEventListener('click', UI.openInboxTasks);
      todayProjectsButton.addEventListener('click', UI.openTodayTasks);
      weekProjectsButton.addEventListener('click', UI.openWeekTasks);
      projectButtons.forEach(function (projectButton) {
        projectButton.addEventListener('click', UI.handleProjectButton);
      });
      openNavButton.addEventListener('click', UI.openNav);
    }
  }, {
    key: "openInboxTasks",
    value: function openInboxTasks() {
      UI.openProject('Inbox', this);
    }
  }, {
    key: "openTodayTasks",
    value: function openTodayTasks() {
      _Storage["default"].updateTodayProject();

      UI.openProject('Today', this);
    }
  }, {
    key: "openWeekTasks",
    value: function openWeekTasks() {
      _Storage["default"].updateWeekProject();

      UI.openProject('This Week', this);
    }
  }, {
    key: "handleProjectButton",
    value: function handleProjectButton(e) {
      var projectName = this.children[0].children[1].textContent;

      if (e.target.classList.contains('fa-times')) {
        UI.deleteProject(projectName, this);
        return;
      }

      UI.openProject(projectName, this);
    }
  }, {
    key: "openProject",
    value: function openProject(projectName, projectButton) {
      var defaultProjectButtons = docuemtn.querySelectorAll('.button-default-project');
      var projectButtons = document.querySelectorAll('.button-project');
      var buttons = [].concat(_toConsumableArray(defaultProjectButtons), _toConsumableArray(projectButtons));
      buttons.forEach(function (button) {
        return button.classList.remove('active');
      });
      projectButton.classList.add('active');
      UI.closeAddProjectPopup();
      UI.loadProjectContent(projectName);
    }
  }, {
    key: "openNav",
    value: function openNav() {
      var nav = document.getElementById('nav');
      UI.closeAllPopups();
      nav.classList.toggle('active');
    } // ADD TASK EVENT LISTENERS

  }, {
    key: "initAddTaskButtons",
    value: function initAddTaskButtons() {
      var addTaskButtons = document.getElementById('button-add-task');
      var addTaskPopupButton = document.getElementById('button-add-task-popup');
      var cancelTaskPopupButton = document.getElementById('button-cancel-task-popup');
      var addTaskPopupInput = document.getElementById('input-add-task-popup');
    }
  }]);

  return UI;
}();

exports["default"] = UI;