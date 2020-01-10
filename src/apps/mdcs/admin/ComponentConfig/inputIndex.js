import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

class ComponentConfig extends Component {
  componentDidMount() {}

  render() {
    const { changeCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>PlaceHolder 설정</Col>
            <Col span={18}>
              <Input
                value={(configInfo && configInfo.placeholder) || ''}
                onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'placeholder', e.target.value)}
              ></Input>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}
const configer = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    changeCompData={changeCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

// ComponentConfig.defaultProps = {};
export default configer;
