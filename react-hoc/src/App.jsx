import React from 'react';

import TodosContainer from './components/TodosContainer';
import withCrud from './hoc/withCrud';

function App({ create, data, remove, update }) {
  return (
    <TodosContainer
      data={data}
      onCreate={create}
      onRemove={remove}
      onUpdate={update}
    />
  );
}

export default withCrud(App, 'http://localhost:8080/todo');
