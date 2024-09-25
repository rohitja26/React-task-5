import React, { useState } from "react";
import { initialColumns } from "./data/task5data";
import './App.css';  // Custom styles for this task

const App = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [sourceColumnId, setSourceColumnId] = useState(null);

  const onDragStart = (event, columnId, taskId) => {
    setDraggedTaskId(taskId);
    setSourceColumnId(columnId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, destColumnId) => {
    if (!draggedTaskId || !sourceColumnId) return;

    const sourceColumn = columns[sourceColumnId];
    const destColumn = columns[destColumnId];

    const taskToMove = sourceColumn.tasks.find(
      (task) => task.id === draggedTaskId
    );
    const updatedSourceTasks = sourceColumn.tasks.filter(
      (task) => task.id !== draggedTaskId
    );

    const updatedDestTasks = [...destColumn.tasks, taskToMove];

    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        tasks: updatedSourceTasks,
      },
      [destColumnId]: {
        ...destColumn,
        tasks: updatedDestTasks,
      },
    });
    setDraggedTaskId(null);
    setSourceColumnId(null);
  };

  return (
    <div className="drag-drop-container">
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          className="column-container"
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => onDrop(event, columnId)}
        >
          <h3>{column.name}</h3>
          {column.tasks.map((task) => (
            <button
              className="btn-task"
              key={task.id}
              draggable
              onDragStart={(event) => onDragStart(event, columnId, task.id)}
            >
              {task.content}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
