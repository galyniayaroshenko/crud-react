import React from 'react';
import axios from 'axios';

function withCrud(Component, apiUrl) {
  class WithCrud extends React.Component {
    state = {
      data: [],
      todos: [],
      setFilterInAll: false,
      searchValue: '',
      filterValueListList: []
    };

    componentDidMount() {
      this.get();
    }

    get = () => {
      axios.get(apiUrl)
        .then(response => response.data)
        .then(data => {
          this.setState(Object.assign(
            {},
            this.state,
            { data, todos: data, filterValueList: data }
          ));
        });
    };

    create = data => {
      axios.post(apiUrl, data)
        .then(response => response.data)
        .then(createdItem => {
          const data = [...this.state.data, createdItem];

          this.setState(Object.assign(
            {},
            this.state,
            { data, todos: data, setFilterInAll: true, searchValue: '' }
          ));
        });
    };

    update = body => {
      axios.post(`${apiUrl}/${body._id}`, body)
        .then(response => response.data)
        .then(updatedItem => {
          const data = this.state.data.map(item => {
            if (item._id !== updatedItem.data._id) {
              return item;
            }

            return updatedItem.data;
          });

          this.setState(Object.assign(
            {},
            this.state,
            { data, todos: data, setFilterInAll: true, searchValue: '' }
          ));
        });
    };

    remove = id => {
      axios.delete(`${apiUrl}/${id}`)
        .then(response => response.data)
        .then(() => {
          const data = this.state.data.filter(item => item._id !== id);

          this.setState(Object.assign(
            {},
            this.state,
            { data, todos: data, setFilterInAll: true, searchValue: '' }
          ));
        });
    };

    filter = id => {
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

    search = event => {
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
        <Component
          search={this.search}
          searchValue={this.state.searchValue}
          setFilterInAll={this.state.setFilterInAll}
          data={this.state.todos}
          get={this.get}
          create={this.create}
          update={this.update}
          remove={this.remove}
          filter={this.filter}
          {...this.props}
        />
      );
    }
  }

  WithCrud.displayName = `WithCrud(${Component.displayName || Component.name || 'Component'})`;

  return WithCrud;
}

export default withCrud;
