import React, { Component } from 'react';

class Filter extends Component {
  state = {
    all: true,
    active: false,
    completed: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSetFilterInAll) {
      this.setState({ all: true, active: false, completed: false });
    }
  }

  hangleRadioButton = (id) => {
    const idRadioButton = id.target.value;

    if (idRadioButton === 'all') {
      this.setState({ all: true, active: false, completed: false });
    } else
    if (idRadioButton === 'completed') {
      this.setState({ completed: true, all: false, active: false });
    } else
    if (idRadioButton === 'active') {
      this.setState({ active: true, completed: false, all: false });
    } else {
      console.log('I do not know this id');
    }

    this.props.onFilter(idRadioButton);
  };

  render() {
    return (
      <div>
        <input
          type="radio"
          name="filter"
          value="all"
          id="all"
          checked={this.state.all}
          onChange={this.hangleRadioButton}
        />All
        <input
          type="radio"
          name="filter"
          value="completed"
          id="completed"
          checked={this.state.completed}
          onChange={this.hangleRadioButton}
        />Completed
        <input
          type="radio"
          name="filter"
          value="active"
          id="active"
          checked={this.state.active}
          onChange={this.hangleRadioButton}
        />Active
      </div>
    );
  };
}

export default Filter;
