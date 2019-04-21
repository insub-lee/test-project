import React, { Component } from "react";

class MasseinhsRenderer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setMasseinhsw(this.props.data.MASSEINHSW);
  }

  setMasseinhsw = (value) => {
    this.setState({
      MASSEINHSW: value ? value : ''
    })
  }

  refresh = (params) => {
    this.setMasseinhsw(params.value);
  }

  render() {
    return (
      <div>
        <p>{this.state.MASSEINHSW}</p>
      </div>
    );
  }
}

export default MasseinhsRenderer;