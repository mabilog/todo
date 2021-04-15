"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Project = _interopRequireDefault(require("./Project"));

var _Task = _interopRequireDefault(require("./Task"));

var _TodoList = _interopRequireDefault(require("./TodoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "saveTodoList",
    value: function saveTodoList(data) {
      localStorage.setItem('todoList', JSON.stringify(data));
    }
  }, {
    key: "getTodoList",
    value: function getTodoList() {
      // local storage doesn't store type of data so we have to convert it
      var todoList = Object.assign(new _TodoList["default"](), JSON.parse(localStorage.getItem('todoList')));
      todoList.setProjects(todoList.getProjects().map(function (project) {
        return Object.assign(new _Project["default"](), project);
      }));
      todoList.getProjects().forEach(function (project) {
        return project.setTasks(project.getTasks().map(function (task) {
          return Object.assign(new _Task["default"](), task);
        }));
      });
      return todoList;
    }
  }, {
    key: "addProject",
    value: function addProject(project) {
      var todoList = Storage.getTodoList();
      todoList.addProject(project);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "deleteProject",
    value: function deleteProject(projectName) {
      var todoList = Storage.getTodoList();
      todoList.deleteProject(projectName);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "addTask",
    value: function addTask(projectName, taskName) {
      var todoList = Storage.getTodoList();
      todoList.getProject(projectName).addTask(taskName);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(projectName, taskName) {
      var todoList = Storage.getTodoList();
      todoList.getProject(projectName).deleteTask(taskName);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "renameTast",
    value: function renameTast(projectName, taskName, newTaskName) {
      var todoList = Storage.getTodoList();
      todoList.getProject(projectName).getTask(taskName).setName(newTaskName);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "setTaskDate",
    value: function setTaskDate(projectName, taskName, newDueDate) {
      var todoList = Storage.getTodoList();
      todoList.getProject(projectName).getTask(taskName).setDate(newDueDate);
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "updateTodayProject",
    value: function updateTodayProject() {
      var todoList = Storage.getTodoList();
      todoList.updateTodayProject();
      Storage.saveTodoList(todoList);
    }
  }, {
    key: "updateWeekProject",
    value: function updateWeekProject() {
      var todoList = Storage.getTodoList();
      todoList.updateWeekProject();
      Storage.saveTodoList(todoList);
    }
  }]);

  return Storage;
}();

exports["default"] = Storage;