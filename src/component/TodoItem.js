import React, { useState } from 'react';

const TodoItem = ({ task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [completed, setCompleted] = useState(task.completed);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(task.id, title, description, priority, completed);
    setEditing(false);
  };

  return (
    <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
      {editing ? (
        <div>
          <input style={{ padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '100%' }} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input style={{ padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '100%' }} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <select style={{ padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '100%' }} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label>
            Completed:
            <input style={{ marginLeft: '5px' }} type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
          </label>
          <button style={{ padding: '10px 20px', borderRadius: '10px', backgroundColor: '#3399ff', cursor: 'pointer', color: 'white', border: 'none', marginLeft: '10px' }} onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <label>
            Completed:
            <input style={{ marginLeft: '5px' }} type="checkbox" checked={task.completed} readOnly />
          </label>
          <button style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#ff3300', cursor: 'pointer', color: 'white', border: 'none', marginLeft: '10px' }} onClick={handleEdit}>Edit</button>
          <button style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#cc0000', cursor: 'pointer', color: 'white', border: 'none', marginLeft: '5px' }} onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
