import axios from 'axios';
import React from 'react';

function withCrud(Component, apiUrl) {
  class WithCrud extends React.Component {
    state = {
      data: []
    };

    /* hooks */
    componentDidMount() {
      this.get();
    }
    /* hooks */

    create = data => {
      axios.post(apiUrl, data)
        .then(response => response.data)
        .then(createdItem => {
          const data = [...this.state.data, createdItem];

          this.setState({ data });
        });
    };

    get = () => {
      axios.get(apiUrl)
        .then(response => response.data)
        .then(data => this.setState({ data }));
    };

    remove = id => {
      axios.delete(`${apiUrl}/${id}`)
        .then(response => response.data)
        .then(() => {
          const data = this.state.data.filter(item => item._id !== id);

          this.setState({ data });
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

          this.setState({ data });
        });
    };

    render() {
      return (
        <Component
          create={this.create}
          data={this.state.data}
          get={this.get}
          remove={this.remove}
          update={this.update}
          {...this.props}
        />
      );
    }
  }

  WithCrud.displayName = `WithCrud(${Component.displayName || Component.name || 'Component'})`;

  return WithCrud;
}

export default withCrud;
