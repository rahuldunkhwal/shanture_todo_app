import React, { useState, useEffect } from "react";

import axios from "axios";
import { jsPDF } from 'jspdf';

import Todo from "./Todo";

const TodoWrapper = () => {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        description,
      });
      console.log(response);
      setDescription("");
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete todo function

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // get all the todos
  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      const jsonData = await response.data;
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.text(100,20,"TO-DO LIST")

    todos.forEach((todo, index) => {
        doc.text(20, 30 + (index * 10), todo.description);
      });
    doc.save("tasks.pdf");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <form className="TodoForm" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="todo-input"
          placeholder="What is the task today?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="todo-btn">Add Task</button>
      </form>
      {todos.map((todo) => (
        <Todo
          key={todo.todo_id}
          task={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
      <button className="todo-btn" onClick={downloadPdf}>
        Download as pdf
      </button>
    </div>
  );
};
export default TodoWrapper;
