import React, { Component } from 'react';
import { Button } from 'antd';

class CoverViewComp extends Component {
  render() {
    const { colData, formData, clickCoverView } = this.props;
    const { WORK_SEQ } = formData;
    return <Button onClick={() => clickCoverView(WORK_SEQ, colData)}>표지보기</Button>;
  }
}

export default CoverViewComp;
