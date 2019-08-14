import React, { Component } from 'react';

class Builder extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // eslint-disable-next-line react/prop-types
    const id = props.match.params.ID ? props.match.params.ID : 0;
    console.log(`Builder : ${this.props}`);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      id,
    };
  }

  render() {
    return (
      <div>
        빌더ID: {this.state.id} 빌더ID: {this.state.id} 빌더ID: {this.state.id} 빌더ID: {this.state.id} 빌더ID: {this.state.id}
      </div>
    );
  }
}

export default Builder;
