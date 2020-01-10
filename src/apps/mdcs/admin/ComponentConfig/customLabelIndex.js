import React, { Component } from 'react';
import { Row, Col, Input, Radio } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

class ComponentConfig extends Component {
  state = {
    lableValue: undefined,
    copyKey: '',
    compKey: '',
  };

  componentDidMount() {}

  onClickSave = () => {
    const { copyKey, compKey } = this.state;
    console.log('copyKey:', copyKey);
    console.log('compKey:', compKey);
  };

  render() {
    const { changeCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    return (
      <div>
        <Row>
          <div className="w100Table">
            <Col span={6}>Copy옵션 정의 </Col>
            <Col span={18}>
              <Row>
                CopyKey컬럼명:
                <Input
                  value={(configInfo && configInfo.optionCopyKey) || ''}
                  onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'optionCopyKey', e.target.value)}
                ></Input>
              </Row>
              <Row>
                CompKey컬럼명:
                <Input
                  value={(configInfo && configInfo.optionCompKey) || ''}
                  onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'optionCompKey', e.target.value)}
                ></Input>
              </Row>
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

export default configer;
