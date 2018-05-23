import React, { Component } from 'react';

import Filter from './Filter';
import Form from './Form';
import List from './List';
import Search from './Search';

class TodosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      filterValueList: [],
      searchValue: '',
      setFilterInAll: false,
      todos: []
    };
  }

  /* hooks */
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({ data: nextProps.data, todos: nextProps.data }));
  }
  /* hooks */

  handleCreate = value => {
    this.setState(Object.assign(
      {},
      this.state,
      { setFilterInAll: true, searchValue: '' }
    ));
    this.props.onCreate(value);
  };

  handleFilter = id => {
    switch(id) {
      case 'all': {
        this.setState(Object.assign(
          {},
          this.state,
          { todos: this.state.data, setFilterInAll: false, filterValueList: this.state.data, searchValue: '' }
        ));

        break;
      }
      case 'completed': {
        const newTodos = this.state.data.filter(item => {
          return item.completed;
        });

        this.setState(Object.assign(
          {},
          this.state,
          { todos: newTodos, setFilterInAll: false, filterValueList: newTodos, searchValue: '' }
        ));

        break;
      }
      case 'active': {
        const newTodos = this.state.data.filter(item => {
          return !item.completed;
        });

        this.setState(Object.assign(
          {},
          this.state,
          { todos: newTodos, setFilterInAll: false, filterValueList: newTodos, searchValue: '' }
        ));

        break;
      }

      default: {
        console.log('I do not know this id');
      }
    }
  };

  hangleRemove = id => {
    this.setState(Object.assign(
      {},
      this.state,
      { setFilterInAll: true, searchValue: '' }
    ));
    this.props.onRemove(id);
  };

  handelUpdate = value => {
    this.setState(Object.assign(
      {},
      this.state,
      { setFilterInAll: true, searchValue: '' }
    ));
    this.props.onUpdate(value);
  };

  handleSearch = event => {
    const value = event.target.value.toLowerCase();
    const result = this.state.filterValueList.filter(item => {
      return item.title.toLowerCase().indexOf(value) !== -1;
    });

    this.setState(Object.assign(
      {},
      this.state,
      { todos: result, searchValue: event.target.value }
    ));
  };

  render() {
    return (
      <div className="containe-list">
        <Search
          searchValue={this.state.searchValue}
          onSearch={this.handleSearch}
        />
        <Form onSubmit={this.handleCreate} />
        <List
          onRemove={this.hangleRemove}
          onUpdate={this.handelUpdate}
          todos={this.state.todos}
        />
        <Filter
          onFilter={this.handleFilter}
          isSetFilterInAll={this.state.setFilterInAll}
        />
      </div>
    );
  }
}

export default TodosContainer;
