import React, { Component } from "react";

class QkurztextRenderer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setQkurztext(this.props.data.QKURZTEXT);
  }

  setQkurztext = (value) => {
    this.setState({
      QKURZTEXT: value ? value : ''
    })
  }

  refresh = (params) => {
    this.setQkurztext(params.value);
  }

  render() {
    return (
      <div>
        <p>{this.state.QKURZTEXT.NAME}</p>
      </div>
    );
  }
}

export default QkurztextRenderer;