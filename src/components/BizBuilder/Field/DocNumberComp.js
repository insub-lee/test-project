import React, { Component } from 'react';

class DocNumberComp extends Component {
  componentDidMount() {
    const { sagaKey: id, COMP_FIELD, changeFormData } = this.props;
    changeFormData(id, COMP_FIELD, this.props.compProps && this.props.compProps.docNumber);
  }

  render() {
    const { visible } = this.props;
    return visible ? <span>{this.props.compProps && this.props.compProps.docNumber}</span> : '';
  }
}

export default DocNumberComp;
