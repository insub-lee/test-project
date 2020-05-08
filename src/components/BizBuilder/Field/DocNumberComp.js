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
      return <span className={CONFIG.property.className || ''}>{visible ? formData.DOCNUMBER : ''}</span>;
    }
    return <span className={CONFIG.property.className || ''}>{visible ? compProps && compProps.docNumber : ''}</span>;
  }
}

export default DocNumberComp;
