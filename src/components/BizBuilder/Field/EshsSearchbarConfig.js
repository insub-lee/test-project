import React, { Component } from 'react';
import { Row, Col, Input, InputNumber } from 'antd';
import { debounce } from 'lodash';

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    return (
      <div>
        <Row>
          <Col span={6}>WORK_SEQ 설정</Col>
          <Col span={18}>
            <InputNumber
              style={{ width: '100%' }}
              defaultValue={(configInfo && configInfo.property && configInfo.property.searchbarWorkSeq) || ''}
              min={0}
              onChange={value => this.handleChangeViewCompData('searchbarWorkSeq', value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>ListMetaSeq 설정</Col>
          <Col span={18}>
            <InputNumber
              style={{ width: '100%' }}
              defaultValue={(configInfo && configInfo.property && configInfo.property.listMetaSeq) || ''}
              min={0}
              onChange={value => this.handleChangeViewCompData('listMetaSeq', value)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ComponentConfig;
