import React, { Component } from 'react';
import { Row, Col, Select, Input, TreeSelect, Radio } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

const getCategoryMapListAsTree = (flatData, flag) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    placeHolderValue: '',
    selectableFlag: 'Y',
    defaultFlag: 2,
    treeSelectValue: undefined,
    treeSelectDefaultValue: undefined,
    apiArray: '',
    apiKey: '',
  };

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHanlder, id } = this.props;
    const apiArray = [{ key: `categoryMapInfo`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    const saveArray = [{ key: `treeSelectMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    getCallDataHanlder(id, apiArray);
    this.setState({ apiArray: saveArray, apiKey: `treeSelectMapInfo${value}` });
  };

  onClickSave = () => {
    const { placeHolderValue, treeSelectDefaultValue, apiArray, apiKey } = this.state;
    console.log(apiArray);
    console.log(apiKey);
    console.log(placeHolderValue);
    console.log(treeSelectDefaultValue);
  };

  render() {
    const {
      result: { rootMap, categoryMapInfo },
    } = this.props;
    const categoryData =
      categoryMapInfo && categoryMapInfo.categoryMapList && getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y')).length > 0
        ? getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'), this.state.selectableFlag)[0]
        : [];
    return (
      <StyledContent>
        <div>
          <Row>
            <div className="pop_tit" style={{ background: 'white', color: 'black' }}>
              컴포넌트 설정
            </div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={3}>분류체계설정</Col>
                  <Col span={21}>
                    <Select
                      placeholder="분류체계를 설정해주세요"
                      value={this.state.rootMapValue}
                      onChange={value => {
                        this.setState({ rootMapValue: value, treeSelectValue: undefined, treeSelectDefaultValue: undefined });
                        this.getCategorieMapList(value);
                      }}
                    >
                      {rootMap &&
                        rootMap.rootMapList &&
                        rootMap.rootMapList
                          .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT !== 0)
                          .map(item => (
                            <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                              {item.NAME_KOR}
                            </Option>
                          ))}
                    </Select>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>PlaceHolder 설정</Col>
                  <Col span={21}>
                    <Input value={this.state.placeHolderValue} onChange={e => this.setState({ placeHolderValue: e.target.value })}></Input>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>상위노드 선택 가능여부</Col>
                  <Col span={21}>
                    {' '}
                    <Radio.Group
                      value={this.state.selectableFlag}
                      onChange={e => {
                        this.setState({ selectableFlag: e.target.value, treeSelectValue: undefined, treeSelectDefaultValue: undefined });
                      }}
                    >
                      <Radio value="Y">가능</Radio>
                      <Radio value="N">불가능</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>기본값 설정여부</Col>
                  <Col span={21}>
                    {' '}
                    <Radio.Group
                      value={this.state.defaultFlag}
                      onChange={e => {
                        this.setState({ defaultFlag: e.target.value, treeSelectDefaultValue: undefined });
                      }}
                    >
                      <Radio value={1}>가능</Radio>
                      <Radio value={2}>불가능</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>기본값 설정</Col>
                  <Col span={21}>
                    <TreeSelect
                      style={{ width: 300, marginRight: 10 }}
                      value={this.state.treeSelectDefaultValue}
                      disabled={this.state.defaultFlag === 2}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={categoryData.children}
                      onChange={value => this.setState({ treeSelectDefaultValue: value })}
                      placeholder="기본값 설정"
                    />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>PreView</Col>
                  <Col span={21}>
                    <TreeSelect
                      style={{ width: 300, marginRight: 10 }}
                      value={this.state.treeSelectValue || this.state.treeSelectDefaultValue}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={categoryData.children}
                      onChange={value => this.setState({ treeSelectValue: value })}
                      placeholder={this.state.placeHolderValue}
                    />
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
