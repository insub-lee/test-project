import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Button } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import CheckSelectList from 'apps/mdcs/components/CheckSelectList';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

const { Option } = Select;

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    value: '',
    type: '',
    groupName: '',
    selectedText: '',
    dataSource: [],
    apiArray: [],
    apiData: {},
  };

  componentDidMount() {
    const { getCallDataHandler, id, apiArray } = this.props;
    getCallDataHandler(id, apiArray);
  }

  onChangeHandler = (e, type) => {
    const { value: selectedValue } = e.target;
    const idx = e.nativeEvent.target.selectedIndex;
    const { text: selectedText } = e.target[idx];
    this.setState({ value: selectedValue, selectedText, type });
  };

  getCategoryMapList = value => {
    const { getCallDataHandler, id } = this.props;
    const apiData = { key: `checkListMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' };
    this.setState({ apiData });

    getCallDataHandler(id, [apiData]);
  };

  onClickAdd = () => {
    const { result } = this.props;
    const { dataSource, groupName, rootMapValue, apiArray, apiData } = this.state;
    const selectedApi = result[`checkListMapInfo${rootMapValue}`];
    if (selectedApi) {
      const isExist = dataSource.findIndex(item => item.groupName === groupName);
      if (isExist === -1) {
        apiArray.push(apiData);
        dataSource.push({ groupName, dataSet: selectedApi.categoryMapList });
        this.setState({ dataSource, apiArray });
      } else {
        console.log('isExist 중복추가방지', groupName);
      }
    }
  };

  onRemoveHandler = () => {
    this.setState({ selectedText: '' });
  };

  onClickSave = () => {
    // 필요한값 apiArray
    const { apiArray } = this.state;

    console.log(JSON.stringify(apiArray));
  };

  render() {
    const { result } = this.props;
    return (
      <StyledContent>
        <div>
          <Row>
            <div className="pop_tit" style={{ background: 'white', color: 'black' }}>
              컴포넌트 설정-CheckList
            </div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={3}>CheckList</Col>
                  <Col span={21}>
                    <Select
                      style={{ width: 300, marginRight: 10 }}
                      placeholder="분류체계를 설정해주세요"
                      value={this.state.rootMapValue}
                      onChange={(value, opt) => {
                        this.setState({ rootMapValue: value, groupName: opt.props.children });
                        this.getCategoryMapList(value);
                      }}
                    >
                      {result.rootMap &&
                        result.rootMap.rootMapList
                          .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT === 0)
                          .map(item => (
                            <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                              {item.NAME_KOR}
                            </Option>
                          ))}
                    </Select>
                    {this.state.dataSource.length < 5 && <Button onClick={this.onClickAdd}>리스트추가</Button>}
                    <Button
                      onClick={() => {
                        this.setState({ apiArray: [], dataSource: [] });
                      }}
                    >
                      데이터 초기화
                    </Button>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>preView</Col>
                  <Col span={21}>
                    <CheckSelectList
                      onChange={this.onChangeHandler}
                      dataSource={this.state.dataSource}
                      selectedText={this.state.selectedText}
                      onRemove={this.onRemoveHandler}
                    ></CheckSelectList>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="btn-wrap">
                  <StyledButton
                    className="btn-primary"
                    onClick={() => {
                      this.onClickSave();
                    }}
                  >
                    등록
                  </StyledButton>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </StyledContent>
    );
  }
}
const configer = () => <BizMicroDevBase id="componentConfig" component={ComponentConfig}></BizMicroDevBase>;

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
