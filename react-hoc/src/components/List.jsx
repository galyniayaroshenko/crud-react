import React, { Component } from 'react';

import Item from './Item';

function List({ onRemove, onUpdate, todos }) {
  return (
    <div className="todo-list list-group">
      {
        todos.map(todo => {
          return (
            <Item
              key={todo._id}
              onRemove={onRemove}
              onUpdate={onUpdate}
              todo={todo}
            />
          );
        }
      )}
    </div>
  );
}

export default List;
