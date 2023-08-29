/** @format */

import React, { useState, useEffect } from "react";
import TodoItem from "../component/TodoItem";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [completed, setCompleted] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCompleted, setFilterCompleted] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title) {
      setTasks([
        ...tasks,
        { id: Date.now(), title, description, priority, completed },
      ]);
      setTitle("");
      setDescription("");
      setPriority("low");
      setCompleted(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (
    taskId,
    updatedTitle,
    updatedDescription,
    updatedPriority,
    updatedCompleted
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: updatedTitle,
            description: updatedDescription,
            priority: updatedPriority,
            completed: updatedCompleted,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleCompletedFilterChange = (e) => {
    setFilterCompleted(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filterPriority === "all" || task.priority === filterPriority) &&
      (filterCompleted === "all" ||
        (filterCompleted === "completed" && task.completed) ||
        (filterCompleted === "notCompleted" && !task.completed))
  );

  return (
    <div
      style={{
        padding: "0 10px",
        fontFamily: "Arial, sans-serif",
        width: "100%",
      }}
    >
      <div>
        <h1
          style={{
            height: "50px",
            textAlign: "center",
            margin: "20px auto",
            color: "#333",
          }}
        >
          Todo App
        </h1>
        <hr
          style={{
            marginBottom: "32px",
          }}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
            alignContent: "center",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <input
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label>
              Completed
              <input
                type="checkbox"
                checked={completed}
                style={{ marginLeft: "10px" }}
                onChange={() => setCompleted(!completed)}
              />
            </label>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                backgroundColor: "#33aa33",
                cursor: "pointer",
                color: "white",
                border: "none",
              }}
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <select
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
              value={filterPriority}
              onChange={handlePriorityFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
              value={filterCompleted}
              onChange={handleCompletedFilterChange}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>
          </div>
        </div>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        ))}

        {filteredTasks.length === 0 && (
          <p style={{ textAlign: "center", margin: "50px auto" }}>
            No Task Found
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
