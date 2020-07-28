import React, { Component } from 'react';

class ProcessView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.debug('this.props', this.props);
  }

  render() {
    return 'view';
  }
}

export default ProcessView;
