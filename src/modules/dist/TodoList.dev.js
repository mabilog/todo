"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateFns = require("date-fns");

var _Project = _interopRequireDefault(require("./Project"));

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoList =
/*#__PURE__*/
function () {
  function TodoList() {
    _classCallCheck(this, TodoList);

    this.projects = [];
    this.projects.push(new _Project["default"]('Inbox'));
    this.projects.push(new _Project["default"]('Today'));
    this.projects.push(new _Project["default"]('This Week'));
  }

  _createClass(TodoList, [{
    key: "setProjects",
    value: function setProjects(projects) {
      this.projects = projects;
    }
  }, {
    key: "getProjects",
    value: function getProjects() {
      return this.projects;
    } // returns the stated project

  }, {
    key: "getProject",
    value: function getProject(projectName) {
      return this.projects.find(function (project) {
        return project.getName() === projectName;
      });
    }
  }, {
    key: "constains",
    value: function constains(projectName) {
      return this.projects.some(function (project) {
        return project.getName() === projectName;
      });
    }
  }, {
    key: "addProject",
    value: function addProject(project) {
      if (this.projects.indexOf(project) > 0) return;
      this.projects.push(project);
    }
  }, {
    key: "deleteProject",
    value: function deleteProject(projectName) {
      var projectToDelete = this.projects.find(function (project) {
        return project.getName() === projectName;
      });
      this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    } // task: updates today project 
    // it creates an empty project folder for today
    // then passes through a condition if the project selected is 'Today' or 'This Week' and then return undefined;
    // forEach project in the projects array, assign the .getTasksToday() to todayTasks
    // forEach task in todayTasks, 'Today' project adds new task through the Task class constructor

  }, {
    key: "updateTodayProject",
    value: function updateTodayProject() {
      var _this = this;

      this.getProject('Today').tasks = [];
      this.projects.forEach(function (project) {
        if (project.getName() === 'Today' || project.getName() === 'This Week') return;
        var todayTasks = project.getTasksToday();
        todayTasks.forEach(function (task) {
          var taskName = "".concat(task.getName(), " (").concat(project.getName(), ")");

          _this.getProject('Today').addTask(new _Task["default"](taskName, task.getDate()));
        });
      });
    } // task: updates this week's project 
    // it creates an empty project folder for today
    // then passes through a condition if the project selected is 'Today' or 'This Week' and then return undefined;
    // forEach project in the projects array, assign the .getTasksThisWeek to weekTasks
    // forEach task in weekTasks, 'This Week' project adds new task through the Task class constructor

  }, {
    key: "updateWeekProject",
    value: function updateWeekProject() {
      var _this2 = this;

      this.getProject('This Week').tasks = [];
      this.projects.forEach(function (project) {
        if (project.getName() === 'Today' || project.getName() === 'This Week') return;
        var weekTasks = project.getTasksThisWeek();
        weekTasks.forEach(function (task) {
          var taskName = "".concat(task.getName(), " (").concat(project.getName(), ")");

          _this2.getProject('This Week').addTask(new _Task["default"](taskName, task.getDate()));
        });
      }); // also sorts this weeks tasks in ascending order

      this.getProject('This Week').setTasks(this.getProject('This Week').getTasks().sort(function (a, b) {
        return (0, _dateFns.compareAsc)((0, _dateFns.toDate)(new Date(a.getDateFormated())), (0, _dateFns.toDate)(new Date(b.getDateFormated())));
      }));
    }
  }]);

  return TodoList;
}();

exports["default"] = TodoList;