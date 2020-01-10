import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

class ComponentConfig extends Component {
  componentDidMount() {}

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { groupIndex, rowIndex, colIndex, configInfo } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>PlaceHolder 설정</Col>
            <Col span={18}>
              <Input
                value={(configInfo && configInfo.property && configInfo.property.placeholder) || ''}
                onChange={e => this.handleChangeViewCompData('placeholder', e.target.value)}
              ></Input>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="TextCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

// ComponentConfig.defaultProps = {};
export default configer;
