import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <div class="checkbox-wrapper-11">
        <input id="02-11" type="checkbox" name="r" value="2" />
        <label for="02-11">{task.description}</label>
      </div>
      <div>
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.todo_id)}
        />
      </div>
    </div>
  );
};

export default Todo;
