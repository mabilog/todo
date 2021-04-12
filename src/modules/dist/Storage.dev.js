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
    }
  }]);

  return Storage;
}();

exports["default"] = Storage;