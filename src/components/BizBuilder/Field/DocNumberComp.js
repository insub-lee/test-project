import React, { Component } from 'react';

class DocNumberComp extends Component {
  componentDidMount() {
    const { sagaKey: id, COMP_FIELD, changeFormData, compProps, formData } = this.props;
    if (!(formData && formData.DOCNUMBER && formData.DOCNUMBER.trim().length > 0)) {
      const value = compProps && compProps.docNumber;
      changeFormData(id, COMP_FIELD, value);
    }
  }

  render() {
    const { visible, compProps, formData } = this.props;
    if (formData && formData.DOCNUMBER && formData.DOCNUMBER.trim().length > 0) {
      return visible ? <span>{formData.DOCNUMBER}</span> : '';
    }
    return visible ? <span>{compProps && compProps.docNumber}</span> : '';
  }
}

export default DocNumberComp;
