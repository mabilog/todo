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
    // static

  }]);

  return UI;
}();

exports["default"] = UI;