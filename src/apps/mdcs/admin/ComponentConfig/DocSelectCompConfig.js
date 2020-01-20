import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

const customSet = [
  { compTitle: 'SPEC', modalTitle: '사내표준', searchApiType: 'spec', searchApiResultKey: 'specData' },
  { compTitle: 'Drawing', modalTitle: '도면', searchApiType: 'dw', searchApiResultKey: 'dwData' },
];
const customKey = ['compTitle', 'modalTitle', 'searchApiType', 'searchApiResultKey'];

class DocSelectCompConfig extends Component {
  componentDidMount() {}

  onChangeRadio = value => {
    const { changeCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    if (value === 1) {
      customKey.map(key => changeCompData(groupIndex, rowIndex, colIndex, key, customSet[0][key]));
    }

    if (value === 2) {
      customKey.map(key => changeCompData(groupIndex, rowIndex, colIndex, key, customSet[1][key]));
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>커스텀 선택</Col>
          <Col span={18}>
            <Radio.Group onChange={e => this.onChangeRadio(e.target.value)}>
              <Radio value={1}>Spec(사내표준)</Radio>
              <Radio value={2}>Drawing(도면)</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    );
  }
}
const SetDocSelectComp = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    component={DocSelectCompConfig}
    changeCompData={changeCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
  />
);

export default SetDocSelectComp;
