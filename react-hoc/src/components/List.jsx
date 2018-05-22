import React, { Component } from 'react';

import Item from './Item';

function List({ todos, onUpdate, onRemove }) {
  return (
    <div className="todo-list list-group">
      {
        todos.map(todo => {
          return (
            <Item
              key={todo._id}
              todo={todo}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          );
        }
      )}
    </div>
  );
}

export default List;
