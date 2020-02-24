import React, { PureComponent } from 'react';
import PreviewTypeClass from './previewTypeClass';

class BizStorePreviewWidget extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <PreviewTypeClass className={`type${item.basic.type}`}>
        <div className="backgroundPattern">{item.SVC_YN && item.SVC_YN !== 'Y' && <div style={{ color: '#f35610', textAlign: 'center' }}>사용중지</div>}</div>
      </PreviewTypeClass>
    );
  }
}

export default BizStorePreviewWidget;
