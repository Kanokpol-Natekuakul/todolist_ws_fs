import React from "react";
import "./NewTodoTask.css";
import { useState, useContext } from "react";

import { HandlerContext } from "../contexts/handler-contexts";

function NewTodoTask(props) {
  const ctx = useContext(HandlerContext);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const taskHandler = (event) => {
    setTask(event.target.value);
  };

  const dueDateHandler = (event) => {
    setDate(event.target.value);
  };

  const clickHanlder = () => {
    const newTodo = {
      task: task,
      dueDate: new Date(date),
    };

    ctx.addNewTodo(newTodo);
    ctx.setIsShow(false);

    setTask("");
    setDate("");
  };

  return (
    <div className="add-container">
      <div className="input-container">
        <div>
          <label>Task</label>
          <input type="text" value={task} onChange={taskHandler} />
        </div>
        <div>
      <label>Due date</label>
          <input type="date" value={date} onChange={dueDateHandler} />
        </div>
      </div>
      <div className="add-button">
        <button onClick={clickHanlder}>Add</button>
      </div>
      <div className="add-button">
        <button onClick={() => props.setIsShow(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default NewTodoTask;
