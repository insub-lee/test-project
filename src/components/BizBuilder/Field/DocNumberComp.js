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
    const { visible, compProps, formData, CONFIG } = this.props;
    if (formData && formData.DOCNUMBER && formData.DOCNUMBER.trim().length > 0) {
      return visible ? formData.DOCNUMBER : '';
    }
    return visible ? (compProps && compProps.docNumber) || '' : '';
  }
}

export default DocNumberComp;
