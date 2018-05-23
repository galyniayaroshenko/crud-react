import React, { Component } from 'react';

import Checkbox from './Checkbox';

function Item({ onRemove, onUpdate, todo}) {
  return (
    <div className="todo list-group-item justify-content-between">
      <label>
        <Checkbox todo={todo} onStatusChange={onUpdate} />
        {todo.title}
      </label>
      <button className="btn btn-danger btn-sm" onClick={() => onRemove(todo._id)}>Remove</button>
    </div>
  );
}

export default Item;
