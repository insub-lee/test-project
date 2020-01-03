import React, { Component } from 'react';

class Footer extends Component {
  componentDidMount() {}

  delFavorite = (e) => {
    e.preventDefault();
    this.props.delFavorite(this.props);
  }

  render() {
    return (
      <button onClick={this.delFavorite}>삭제</button>
    );
  }
}

export default Footer;
