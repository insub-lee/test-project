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
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.selectedValue = value;
    if (value === 1) {
      customKey.map(key => (configInfo.property[key] = customSet[0][key]));
    }
    if (value === 2) {
      customKey.map(key => (configInfo.property[key] = customSet[1][key]));
    }
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    const selectedValue = (configInfo && configInfo.property && configInfo.property.selectedValue) || undefined;
    return (
      <div>
        <Row>
          <Col span={6}>커스텀 선택</Col>
          <Col span={18}>
            <Radio.Group onChange={e => this.onChangeRadio(e.target.value)} value={selectedValue}>
              <Radio value={1}>Spec(사내표준)</Radio>
              <Radio value={2}>Drawing(도면)</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    );
  }
}
const SetDocSelectComp = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="DocSelectCompConfig"
    component={DocSelectCompConfig}
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
  />
);

export default SetDocSelectComp;
