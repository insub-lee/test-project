import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
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
    const { groupIndex, rowIndex, colIndex, configInfo } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>rowCount 설정</Col>
            <Col span={18}>
              <InputNumber
                defaultValue={(configInfo && configInfo.property && configInfo.property.rowCount) || 5}
                onChange={val => this.handleChangeViewCompData('rowCount', val)}
              ></InputNumber>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default ComponentConfig;
