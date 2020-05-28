import React, { Component } from 'react';
import { Icon } from 'antd';

class MDCSDccViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewItem: <span></span>,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, formData } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const viewItem = fieldSelectData[CONFIG.property.compSelectDataKey].map(item => (
          <span>
            {`(${item.DEPT_NAME}) ${item.DCC_NAME} `} <Icon type="phone" />
            {item.TEL_NO}
          </span>
        ));
        this.setState({ viewItem });
      }
    }
  }

  render() {
    const { viewItem } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewItem}</span> : '';
  }
}

export default MDCSDccViewComp;
