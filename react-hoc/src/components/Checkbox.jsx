import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: props.todo.completed
    };
  }

  handleStatusChange = () => {
    const newTodo = Object.assign({}, this.props.todo, { completed: !this.state.completed });

    this.setState({ completed: !this.state.completed });
    this.props.onStatusChange(newTodo);
  }

  render() {
    return (
      <div>
        <input
          checked={this.state.completed}
          onChange={this.handleStatusChange}
          type="checkbox"
        />
      </div>
    );
  }
}

export default Checkbox;
