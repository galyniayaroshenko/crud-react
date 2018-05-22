import React from 'react';

import Form from './components/Form';
import Filter from './components/Filter';
import List from './components/List';
import Search from './components/Search';
import withCrud from './hoc/withCrud';

function App({ data, create, update, remove, filter, setFilterInAll, searchValue, search }) {
  return (
    <div className="containe-list">
      <Search searchValue={searchValue} onSearch={search} />
      <Form onSubmit={create} />
      <List
        todos={data}
        onUpdate={update}
        onRemove={remove}
      />
      <Filter onFilter={filter} isSetFilterInAll={setFilterInAll} />
    </div>
  );
}

export default withCrud(App, 'http://localhost:8080/todo');
