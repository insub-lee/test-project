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
        <div className="backgroundPattern" />
      </PreviewTypeClass>
    );
  }
}

export default BizStorePreviewWidget;
