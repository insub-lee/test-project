import React, { Component } from 'react';
import { Row, Col, Radio, Input, Icon, Tag, Select } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

class CheckboxConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: 1,
      etcYn: false,
      plainTypeData: '',
      rootMapValue: undefined,
      objectTypeData: { label: '', value: '' },
      checkboxData: [],
      jsonResult: {
        mapId: undefined,
        returnType: 'StringNum',
        labelKey: 'NAME_KOR',
        valueKey: 'NODE_ID',
        etcIndex: -1,
        etcField: '',
      },
    };
  }

  componentDidMount() {
    const { getCallDataHanlder, sagaKey, apiArray, changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    getCallDataHanlder(sagaKey, apiArray);
    configInfo.property.returnType = 'StringNum';
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    if (configInfo.property.mapId) this.getCategorieMapList(configInfo.property.mapId);
  }

  // etc Input태그 사용여부
  onChangeEtcYn = value => {
    const { jsonResult } = this.state;
    if (value === true) {
      this.setState({
        etcYn: value,
      });
    }

    if (value === false) {
      this.setState({
        etcYn: value,
        jsonResult: {
          ...jsonResult,
          etcIndex: -1,
          etcField: '',
        },
      });
    }
  };

  // Input 태그가 바라볼 필드명 입력
  onChangeResultData = (target, value) => {
    const { jsonResult } = this.state;
    this.setState({
      jsonResult: {
        ...jsonResult,
        [target]: value,
      },
    });
  };

  onSaveProperty = () => {
    const {
      result: { categoryMapInfo },
    } = this.props;
    const { jsonResult, etcYn } = this.state;

    if (categoryMapInfo === undefined) {
      return alert('분류체계를 선택해 주십시오');
    }
    if (categoryMapInfo && categoryMapInfo.categoryMapList) {
      if (etcYn === false) {
        console.debug('설정결과', this.state.jsonResult);
      } else {
        if (jsonResult.etcIndex === -1 || jsonResult.etcField.trim() === '') {
          return alert('필수설정이 입력되지 않았습니다.');
        }
        console.debug('설정결과', this.state.jsonResult);
      }
    }
  };

  // 분류체계 선택
  getCategorieMapList = value => {
    const { getCallDataHanlder, sagaKey } = this.props;
    const { jsonResult } = this.state;
    const apiArray = [{ key: 'categoryMapInfo', url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    getCallDataHanlder(sagaKey, apiArray);
    this.setState({
      rootMapValue: value,
      jsonResult: {
        ...jsonResult,
        etcIndex: -1,
        etcField: '',
        mapId: value,
      },
    });
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { dataType, jsonResult, objectTypeData, plainTypeData, etcYn, checkboxData } = this.state;
    const { Option } = Select;
    const {
      result: { rootMap, categoryMapInfo, categoryMapFieldList },
      groupIndex,
      rowIndex,
      colIndex,
      configInfo,
    } = this.props;

    return (
      <div>
        <Row>
          <Col span={6}>분류체계 선택</Col>
          <Col span={18}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a person"
              optionFilterProp="children"
              value={(configInfo && configInfo.property && configInfo.property.mapId) || undefined}
              onChange={value => {
                this.getCategorieMapList(value);
                this.handleChangeViewCompData('mapId', value);
              }}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {rootMap &&
                rootMap.rootMapList &&
                rootMap.rootMapList
                  .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT === 0)
                  .map(item => (
                    <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                      {item.NAME_KOR}
                    </Option>
                  ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={6}>Value key 선택</Col>
          <Col span={18}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select a item"
              value={(configInfo && configInfo.property && configInfo.property.valueKey) || undefined}
              onChange={value => {
                this.handleChangeViewCompData('valueKey', value);
              }}
            >
              {categoryMapFieldList &&
                categoryMapFieldList.data &&
                categoryMapFieldList.data.map(item => (
                  <Option key={`valueKey_${item.COLUMN_NAME}`} value={item.COLUMN_NAME}>
                    {item.COLUMN_NAME}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={6}>Label key 선택</Col>
          <Col span={18}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select a item"
              value={(configInfo && configInfo.property && configInfo.property.labelKey) || undefined}
              onChange={value => {
                this.handleChangeViewCompData('labelKey', value);
              }}
            >
              {categoryMapFieldList &&
                categoryMapFieldList.data &&
                categoryMapFieldList.data.map(item => (
                  <Option key={`labelKey_${item.COLUMN_NAME}`} value={item.COLUMN_NAME}>
                    {item.COLUMN_NAME}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        {/* <Row style={{ marginBottom: '10px' }} gutter={16}>
            <Col span={5}>리턴타입 설정</Col>
            <Col span={19}>
              <Radio.Group onChange={e => this.onChangeResultData('returnType', e.target.value)} value={jsonResult.returnType}>
                <Radio value="StringNum">StringNum</Radio>
                <Radio value="ArrayNum">ArrayNum</Radio>
                <Radio value="StringValue">StringValue</Radio>
                <Radio value="ArrayValue">ArrayValue</Radio>
              </Radio.Group>
            </Col>
          </Row> */}
        <Row>
          <Col span={6}>기타 텍스트 입력란 사용</Col>
          <Col span={18}>
            <Radio.Group onChange={e => this.onChangeEtcYn(e.target.value)} value={etcYn}>
              <Radio value={false}>Unused</Radio>
              <Radio value>Use</Radio>
            </Radio.Group>
          </Col>
        </Row>
        {etcYn && (
          <Row>
            <Col span={6}>텍스트 입력란 설정</Col>
            <Col span={18}>
              <Row>
                <div>(필수) 기타 Text 입력란을 사용시 View가없는 필드가 1개 필요합니다</div>
                <Input
                  addonBefore="FieldName"
                  type="text"
                  value={(configInfo && configInfo.property && configInfo.property.etcField) || undefined}
                  onChange={e => this.handleChangeViewCompData('etcField', e.target.value)}
                  style={{ width: '300px' }}
                ></Input>
              </Row>
              <Row>
                <div>(필수) Input 활성화 데이터를 선택해 주십시오.</div>
                {categoryMapInfo && categoryMapInfo.categoryMapList && (
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={e => this.handleChangeViewCompData('etcIndex', e)}
                    value={(configInfo && configInfo.property && configInfo.property.etcIndex) || undefined}
                  >
                    <Option value={-1} disabled>
                      데이터 선택
                    </Option>
                    {dataType === 1 && categoryMapInfo.categoryMapList.map((row, index) => <Option value={index}>{row[jsonResult.labelKey]}</Option>)}
                    {dataType === 2 &&
                      categoryMapInfo.categoryMapList.map((row, index) => (
                        <Option value={index}>
                          {row[jsonResult.labelKey]}({row[jsonResult.valueKey]})
                        </Option>
                      ))}
                  </Select>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

// returnType : StringNum, ArrayNum, StringValue, ArrayValue (4가지 리턴타입 아래 설명)
// checkboxData : 체크박스 렌더에 사용할 데이터 array(object) / array(String) / array(number)
// labelKey : array(object) 사용시, 라벨로 사용할 키값
// valueKey : array(object) 사용시, 벨류로 사용할 키값
// etcIndex: 기타(INPUT 태그)를 활성화할 checkboxData index
// etcField: 기타(INPUT 태그)에서 입력한 데이터를 넣어줄 FieldName(view가 none 인 Field가 1개 필요)

CheckboxConfig.defaultProps = {
  apiArray: [
    { key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' },
    { key: 'categoryMapFieldList', url: `/api/builder/v1/work/tableFieldList/FR_CATEGORY_MAP`, type: 'GET' },
  ],
};

const CheckboxCompConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="CheckboxCompConfig"
    component={CheckboxConfig}
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
  />
);

export default CheckboxCompConfig;
