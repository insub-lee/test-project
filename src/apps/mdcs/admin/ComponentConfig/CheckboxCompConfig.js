import React, { Component } from 'react';
import { Row, Col, Radio, Input, Icon, Tag, Select } from 'antd';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';
import StyledContent from '../../styled/Modals/StyledContent';

class CheckboxConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: 1,
      etcYn: false,
      plainTypeData: '',
      rootMapValue: undefined,
      objectTypeData: { label: '', value: '' },
      jsonResult: {
        returnType: 'StringNum',
        checkboxData: [],
        labelKey: 'NAME_KOR',
        valueKey: 'NODE_ID',
        etcIndex: -1,
        etcField: '',
      },
    };
  }

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
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
        this.setState(
          {
            jsonResult: {
              ...jsonResult,
              checkboxData: categoryMapInfo.categoryMapList,
            },
          },
          () => console.debug('설정결과', this.state.jsonResult),
        );
      } else {
        if (jsonResult.etcIndex === -1 || jsonResult.etcField.trim() === '') {
          return alert('필수설정이 입력되지 않았습니다.');
        }
        this.setState(
          {
            jsonResult: {
              ...jsonResult,
              checkboxData: categoryMapInfo.categoryMapList,
            },
          },
          () => console.debug('설정결과', this.state.jsonResult),
        );
      }
    }
  };

  setRootMapList = () => {
    const {
      result: { categoryMapInfo },
    } = this.props;
    const { jsonResult } = this.state;

    if (categoryMapInfo && categoryMapInfo.categoryMapList) {
      this.setState({
        jsonResult: {
          ...jsonResult,
          checkboxData: categoryMapInfo.categoryMapList,
        },
      });
    }
  };

  // 분류체계 선택
  getCategorieMapList = value => {
    const { getCallDataHanlder, id } = this.props;
    const { jsonResult } = this.state;
    const apiArray = [{ key: 'categoryMapInfo', url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    getCallDataHanlder(id, apiArray, this.setRootMapList);
    this.setState({
      rootMapValue: value,
      jsonResult: {
        ...jsonResult,
        etcIndex: -1,
        etcField: '',
        jsonResult: {
          ...jsonResult,
          mapId: value,
        },
      },
    });
  };

  render() {
    const { dataType, jsonResult, objectTypeData, plainTypeData, etcYn } = this.state;
    const { Option } = Select;
    const {
      result: { rootMap, categoryMapInfo },
    } = this.props;

    return (
      <StyledContent>
        <div className="pop_tit">체크박스 컴포넌트 설정</div>
        <div className="pop_con">
          <Row style={{ marginBottom: '10px' }} gutter={16}>
            <Col span={5}>분류체계 선택</Col>
            <Col span={19}>
              <Select
                showSearch
                style={{ width: 400 }}
                placeholder="Select a person"
                optionFilterProp="children"
                value={this.state.rootMapValue}
                onChange={value => {
                  this.getCategorieMapList(value);
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
          <Row style={{ marginBottom: '10px' }} gutter={16}>
            <Col span={5}>데이터 목록</Col>
            <Col span={19}>Test</Col>
          </Row>
          <Row style={{ marginBottom: '10px' }} gutter={16}>
            <Col span={5}>리턴타입 설정</Col>
            <Col span={19}>
              <Radio.Group onChange={e => this.onChangeResultData('returnType', e.target.value)} value={jsonResult.returnType}>
                <Radio value="StringNum">StringNum</Radio>
                <Radio value="ArrayNum">ArrayNum</Radio>
                <Radio value="StringValue">StringValue</Radio>
                <Radio value="ArrayValue">ArrayValue</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }} gutter={16}>
            <Col span={5}>기타 텍스트 입력란 사용</Col>
            <Col span={19}>
              <Radio.Group onChange={e => this.onChangeEtcYn(e.target.value)} value={etcYn}>
                <Radio value={false}>Unused</Radio>
                <Radio value>Use</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {etcYn && (
            <Row style={{ marginBottom: '10px' }} gutter={16}>
              <Col span={5}>텍스트 입력란 설정</Col>
              <Col span={19}>
                <Row style={{ marginBottom: '10px' }}>
                  <div>(필수) 기타 Text 입력란을 사용시 View가없는 필드가 1개 필요합니다</div>
                  <Input
                    addonBefore="FieldName"
                    type="text"
                    value={jsonResult.etcField}
                    onChange={e => this.onChangeResultData('etcField', e.target.value)}
                    style={{ width: '300px' }}
                  ></Input>
                </Row>
                <Row>
                  <div>(필수) Input 활성화 데이터를 선택해 주십시오.</div>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={e => this.onChangeResultData('etcIndex', e)}
                    value={jsonResult.etcIndex}
                  >
                    <Option value={-1} disabled>
                      데이터 선택
                    </Option>
                    {dataType === 1 && jsonResult.checkboxData.map((row, index) => <Option value={index}>{row[jsonResult.labelKey]}</Option>)}
                    {dataType === 2 &&
                      jsonResult.checkboxData.map((row, index) => (
                        <Option value={index}>
                          {row[jsonResult.labelKey]}({row[jsonResult.valueKey]})
                        </Option>
                      ))}
                  </Select>
                </Row>
              </Col>
            </Row>
          )}
          <Row>
            <div style={{ textAlign: 'center' }}>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.onSaveProperty()}>
                저장
              </StyledButton>
            </div>
          </Row>
        </div>
      </StyledContent>
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
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};

const CheckboxCompConfig = () => <BizMicroDevBase id="componentConfig" component={CheckboxConfig} />;

export default CheckboxCompConfig;
