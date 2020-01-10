import React, { Component } from 'react';
import { Row, Col, Input, Radio } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

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

  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    return (
      <div>
        <Row>
          <div className="w100Table">
            <Col span={6}>Copy옵션 정의 </Col>
            <Col span={18}>
              <Row>
                CopyKey컬럼명:
                <Input
                  value={(configInfo && configInfo.property && configInfo.property.optionCopyKey) || ''}
                  onChange={e => this.handleChangeConfigData('optionCopyKey', e.target.value)}
                ></Input>
              </Row>
              <Row>
                CompKey컬럼명:
                <Input
                  value={(configInfo && configInfo.optionCompKey) || ''}
                  onChange={e => this.handleChangeConfigData('optionCompKey', e.target.value)}
                ></Input>
              </Row>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default ComponentConfig;
// const configer = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
//   <BizMicroDevBase
//     sagaKey="LabelWithCopyCompConfig"
//     changeCompData={changeCompData}
//     groupIndex={groupIndex}
//     rowIndex={rowIndex}
//     colIndex={colIndex}
//     configInfo={configInfo}
//     component={ComponentConfig}
//   ></BizMicroDevBase>
// );

// export default configer;
