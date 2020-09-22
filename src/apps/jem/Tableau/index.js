import React, { Component } from 'react';

class Tableau extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      hostUrl: '',
    };
  }

  componentDidMount() {

  }

  render() {
    return <div>Tableau 앱</div>;
  }
}

export default Tableau;
