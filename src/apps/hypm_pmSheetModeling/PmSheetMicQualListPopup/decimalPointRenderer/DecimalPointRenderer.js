import React, { Component } from "react";

class DecimalPointRenderer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setStellen(this.props.data.STELLEN);
  }

  setStellen = (value) => {
    this.setState({
      STELLEN: value ? value : ''
    })
  }

  refresh = (params) => {
    this.setStellen(params.value);
  }

  render() {
    return (
      <div>
        <p>{this.state.STELLEN}</p>
      </div>
    );
  }
}

export default DecimalPointRenderer;