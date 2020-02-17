import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

class ComponentConfig extends Component {
  componentDidMount() {
    const { getCallDataHandler, sagaKey: id } = this.props;
    const apiArray = [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }];
    getCallDataHandler(id, apiArray);
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const {
      result: { rootMap },
      configInfo: { property },
    } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>분류체계 설정</Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                placeholder="분류체계를 설정해주세요"
                value={(property && property.mapId) || undefined}
                onChange={value => {
                  this.handleChangeViewCompData('mapId', value);
                }}
              >
                {rootMap &&
                  rootMap.rootMapList &&
                  rootMap.rootMapList
                    .filter(item => item.USE_YN === 'Y' && item.CHILDREN_CNT === 0)
                    .map(item => (
                      <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                        {item.NAME_KOR}
                      </Option>
                    ))}
              </Select>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

ComponentConfig.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  mapId: PropTypes.string,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
  result: PropTypes.object,
};

const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="DocStatusLabelConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

configer.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

export default configer;
