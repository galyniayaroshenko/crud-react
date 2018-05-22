import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    completed: this.props.todo.completed
  };

  handleStatusChange = () => {
    const newTodo = Object.assign({}, this.props.todo, { completed: !this.state.completed });

    this.setState({ completed: !this.state.completed });
    this.props.onStatusChange(newTodo);
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.completed}
          onChange={this.handleStatusChange}
        />
      </div>
    );
  }
}

export default Checkbox;
