import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
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
            <Col span={6}>PlaceHolder 설정</Col>
            <Col span={18}>
              <Input
                defaultValue={(configInfo && configInfo.property && configInfo.property.placeholder) || ''}
                onChange={e => this.handleChangeViewCompData('placeholder', e.target.value)}
              ></Input>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default ComponentConfig;
